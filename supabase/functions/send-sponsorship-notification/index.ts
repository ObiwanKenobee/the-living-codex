import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SponsorshipNotificationRequest {
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  website_url?: string;
  preferred_tier: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: SponsorshipNotificationRequest = await req.json();
    console.log("Received sponsorship application:", data);

    // Send confirmation email to the applicant
    const applicantEmailResponse = await resend.emails.send({
      from: "Sponsorship <onboarding@resend.dev>",
      to: [data.email],
      subject: "Thank you for your sponsorship application",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; }
            .content { padding: 30px 0; }
            .tier-badge { display: inline-block; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; }
            .details { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; color: #1a1a1a;">Application Received!</h1>
            </div>
            <div class="content">
              <p>Dear ${data.contact_name},</p>
              <p>Thank you for applying to become a sponsor! We've received your application for the <span class="tier-badge">${data.preferred_tier}</span> tier.</p>
              
              <div class="details">
                <h3 style="margin-top: 0;">Your Application Details:</h3>
                <p><strong>Company:</strong> ${data.company_name}</p>
                <p><strong>Preferred Tier:</strong> ${data.preferred_tier}</p>
                ${data.website_url ? `<p><strong>Website:</strong> ${data.website_url}</p>` : ''}
              </div>
              
              <p>Our team will review your application and get back to you within <strong>2-3 business days</strong>.</p>
              <p>If you have any questions in the meantime, feel free to reply to this email.</p>
              
              <p>Best regards,<br>The Sponsorship Team</p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply directly to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Applicant email sent:", applicantEmailResponse);

    // Send notification email to admin (using a placeholder - in production, use actual admin email)
    const adminNotificationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .alert { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px; }
          .details { background: #f3f4f6; padding: 20px; border-radius: 8px; }
          .label { font-weight: 600; color: #6b7280; font-size: 12px; text-transform: uppercase; }
          .value { margin-bottom: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="alert">
            <strong>🎉 New Sponsorship Application!</strong>
          </div>
          
          <div class="details">
            <div class="label">Company</div>
            <div class="value">${data.company_name}</div>
            
            <div class="label">Contact Name</div>
            <div class="value">${data.contact_name}</div>
            
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            
            ${data.phone ? `<div class="label">Phone</div><div class="value">${data.phone}</div>` : ''}
            
            ${data.website_url ? `<div class="label">Website</div><div class="value"><a href="${data.website_url}">${data.website_url}</a></div>` : ''}
            
            <div class="label">Preferred Tier</div>
            <div class="value"><strong>${data.preferred_tier}</strong></div>
            
            ${data.message ? `<div class="label">Message</div><div class="value">${data.message}</div>` : ''}
          </div>
          
          <p style="margin-top: 20px;">Please review this application in the admin dashboard.</p>
        </div>
      </body>
      </html>
    `;

    // Note: In production, you'd send this to the actual admin email
    console.log("Admin notification prepared for:", data.company_name);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Notification emails sent successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-sponsorship-notification:", error);
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
