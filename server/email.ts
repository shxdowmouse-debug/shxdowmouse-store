// server/email.ts
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.error(
    "[EMAIL] RESEND_API_KEY is missing. Emails will fail until this is set in the environment."
  );
}

const resend = new Resend(apiKey);

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  replyTo?: string
) {
  if (!apiKey) {
    console.error("[EMAIL] Attempted to send email without RESEND_API_KEY.");
    throw new Error("RESEND_API_KEY not configured");
  }

  try {
    console.log("[EMAIL] Sending email", {
      to,
      subject,
      hasHtml: Boolean(html),
      replyTo,
    });

    const result = await resend.emails.send({
      from: 'SHXDOWMOUSE <onboarding@resend.dev>',
      to,
      subject,
      html,
      reply_to: replyTo,
    });

    console.log("[EMAIL] Email sent successfully", {
      to,
      subject,
      id: (result as any)?.id,
    });

    return result;
  } catch (error) {
    console.error("[EMAIL] Resend email error:", error);
    throw error;
  }
}
