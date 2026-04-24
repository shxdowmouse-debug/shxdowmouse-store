import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  replyTo?: string
) {
  try {
    const info = await transporter.sendMail({
      from: `"SHXDOWMOUSE" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
      ...(replyTo && { replyTo }),
    });

    console.log("[GMAIL] Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("[GMAIL] Error sending email:", error);
    throw error;
  }
}
