import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactRequest = await req.json();

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save message to database
    const { error: insertError } = await supabase
      .from("contact_messages")
      .insert({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        subject: subject.trim(),
        message: message.trim(),
      });

    if (insertError) {
      console.error("Database error:", insertError);
      throw new Error("Failed to save message");
    }

    // Send notification email to Foundation
    const notificationEmail = await resend.emails.send({
      from: "Atlas Codex Foundation <onboarding@resend.dev>",
      to: ["correspondence@atlascodex.org"],
      reply_to: email,
      subject: `[Contact Form] ${subject}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
          <h1 style="font-weight: 300; font-size: 24px; margin-bottom: 24px;">New Contact Message</h1>
          <p style="margin-bottom: 8px;"><strong>From:</strong> ${name}</p>
          <p style="margin-bottom: 8px;"><strong>Email:</strong> ${email}</p>
          <p style="margin-bottom: 16px;"><strong>Subject:</strong> ${subject}</p>
          <div style="border-top: 1px solid #ddd; padding-top: 16px; margin-top: 16px;">
            <p style="line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to sender
    const confirmationEmail = await resend.emails.send({
      from: "Atlas Codex Foundation <onboarding@resend.dev>",
      to: [email],
      subject: "We received your message",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
          <h1 style="font-weight: 300; font-size: 24px; margin-bottom: 24px;">Thank You</h1>
          <p style="line-height: 1.7; margin-bottom: 16px;">
            Dear ${name},
          </p>
          <p style="line-height: 1.7; margin-bottom: 16px;">
            We have received your message and appreciate you taking the time to write.
          </p>
          <p style="line-height: 1.7; margin-bottom: 16px;">
            We read everything carefully. If your inquiry requires a response, we will be in touch.
            Patience is appreciated—this work unfolds slowly.
          </p>
          <p style="font-style: italic; color: #666;">
            — The Atlas Codex Foundation
          </p>
        </div>
      `,
    });

    console.log("Contact form submitted successfully");
    console.log("Notification email:", notificationEmail);
    console.log("Confirmation email:", confirmationEmail);

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-contact function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
