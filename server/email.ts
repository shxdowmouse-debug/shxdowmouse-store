import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  replyTo?: string
) {
  await resend.emails.send({
    from: "Shxdowmouse <onboarding@resend.dev>",
    to,
    subject,
    html,
    ...(replyTo && { reply_to: replyTo })
  });
}
