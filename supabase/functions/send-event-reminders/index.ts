import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface EventRegistration {
  id: string;
  email: string;
  name: string;
  event_id: string;
  events: {
    title: string;
    start_date: string;
    location: string | null;
    is_virtual: boolean | null;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting event reminder job...");
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get events happening in the next 24 hours
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    console.log(`Checking for events between ${now.toISOString()} and ${tomorrow.toISOString()}`);

    // Get registrations for upcoming events
    const { data: registrations, error: regError } = await supabase
      .from("event_registrations")
      .select(`
        id,
        email,
        name,
        event_id,
        events (
          title,
          start_date,
          location,
          is_virtual
        )
      `)
      .eq("status", "confirmed");

    if (regError) {
      console.error("Error fetching registrations:", regError);
      throw regError;
    }

    console.log(`Found ${registrations?.length || 0} total registrations`);

    // Filter to events in next 24 hours
    const upcomingRegistrations = (registrations as unknown as EventRegistration[])?.filter((reg) => {
      if (!reg.events) return false;
      const eventDate = new Date(reg.events.start_date);
      return eventDate >= now && eventDate <= tomorrow;
    }) || [];

    console.log(`${upcomingRegistrations.length} registrations for events in next 24 hours`);

    const emailResults = [];

    for (const reg of upcomingRegistrations) {
      const eventDate = new Date(reg.events.start_date);
      const formattedDate = eventDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const formattedTime = eventDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });

      const locationText = reg.events.is_virtual 
        ? "Virtual Event (check your email for the link)" 
        : reg.events.location || "Location TBA";

      try {
        const emailResponse = await resend.emails.send({
          from: "Atlas Codex <onboarding@resend.dev>",
          to: [reg.email],
          subject: `Reminder: ${reg.events.title} is tomorrow!`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; font-weight: normal; margin-bottom: 20px;">
                Event Reminder
              </h1>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Dear ${reg.name},
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                This is a friendly reminder that you are registered for an upcoming event:
              </p>
              
              <div style="background: #f5f5f5; padding: 24px; margin: 24px 0; border-left: 3px solid #333;">
                <h2 style="font-size: 20px; font-weight: normal; margin: 0 0 12px 0;">
                  ${reg.events.title}
                </h2>
                <p style="font-size: 14px; color: #666; margin: 4px 0;">
                  <strong>Date:</strong> ${formattedDate}
                </p>
                <p style="font-size: 14px; color: #666; margin: 4px 0;">
                  <strong>Time:</strong> ${formattedTime}
                </p>
                <p style="font-size: 14px; color: #666; margin: 4px 0;">
                  <strong>Location:</strong> ${locationText}
                </p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                We look forward to seeing you there!
              </p>
              
              <p style="font-size: 14px; color: #999; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                The Atlas Codex Community
              </p>
            </div>
          `,
        });

        console.log(`Email sent to ${reg.email}:`, emailResponse);
        emailResults.push({ email: reg.email, success: true });
      } catch (emailError: any) {
        console.error(`Failed to send email to ${reg.email}:`, emailError);
        emailResults.push({ email: reg.email, success: false, error: emailError.message });
      }
    }

    return new Response(
      JSON.stringify({
        message: `Processed ${upcomingRegistrations.length} reminders`,
        results: emailResults,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-event-reminders function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
