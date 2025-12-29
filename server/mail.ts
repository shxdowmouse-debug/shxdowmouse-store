import nodemailer from "nodemailer";

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendMail(to: string, subject: string, text: string) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn("Gmail credentials (GMAIL_USER, GMAIL_APP_PASSWORD) not set, skipping email sending.");
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
    });
    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
