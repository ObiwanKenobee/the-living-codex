import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterRequest = await req.json();

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id, unsubscribed_at")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (existing && !existing.unsubscribed_at) {
      return new Response(
        JSON.stringify({ message: "Already subscribed" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .upsert({
        email: email.toLowerCase().trim(),
        subscribed_at: new Date().toISOString(),
        confirmed: true,
        unsubscribed_at: null,
      }, { onConflict: "email" });

    if (insertError) {
      console.error("Database error:", insertError);
      throw new Error("Failed to save subscription");
    }

    // Send confirmation email
    const emailResponse = await resend.emails.send({
      from: "Atlas Codex Foundation <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to the Atlas Codex Foundation",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
          <h1 style="font-weight: 300; font-size: 24px; margin-bottom: 24px;">Welcome</h1>
          <p style="line-height: 1.7; margin-bottom: 16px;">
            Thank you for subscribing to updates from the Atlas Codex Foundation.
          </p>
          <p style="line-height: 1.7; margin-bottom: 16px;">
            You will receive occasional correspondence as our understanding of living systems develops—new field notes, 
            research insights, and reflections on regeneration across natural and human systems.
          </p>
          <p style="line-height: 1.7; margin-bottom: 24px;">
            This work unfolds slowly. We appreciate your patience and attention.
          </p>
          <p style="font-style: italic; color: #666;">
            — The Atlas Codex Foundation
          </p>
        </div>
      `,
    });

    console.log("Newsletter subscription successful:", email);
    console.log("Email sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Subscribed successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in newsletter-subscribe function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
