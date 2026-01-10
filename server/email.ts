import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  replyTo?: string
) {
  try {
    const result = await resend.emails.send({
      from: "Shxdowmouse <onboarding@resend.dev>",
      to,
      subject,
      html,
      reply_to: replyTo,
    });

    return result;
  } catch (error) {
    console.error("Resend email error:", error);
    return { error };
  }
}
