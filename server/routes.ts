import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed data
  // Note: seeding logic should ideally be in a separate script or checked more robustly,
  // but for this lite build, we'll do a quick check here.
  // This might run on every reload, so checking length is good.
  
  // We wrap this in a try-catch or just fire-and-forget to avoid blocking startup if DB isn't ready
  // But since we use await, we expect DB to be ready.
  try {
    const existingProducts = await storage.getProducts();
    if (existingProducts.length === 0) {
      await storage.createProduct({
        name: "shxdowmouse",
        description: "The ultimate minimalist gaming mouse. Precision engineered for the shadows.",
        price: 8999, // $89.99
        features: ["26k DPI Optical Sensor", "60g Ultra-lightweight", "Wireless Connectivity", "Silent Switches"],
        imageUrl: "/images/mouse.png"
      });
      console.log("Seeded database with shxdowmouse");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }

  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  app.post(api.orders.create.path, async (req, res) => {
    try {
      const input = api.orders.create.input.parse(req.body);
      const order = await storage.createOrder(input);
      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message
        });
      }
      throw err;
    }
  });

  // Notification signup endpoint
  app.post("/api/notify", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Email is required" });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Create transporter using Gmail SMTP
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      // Send confirmation email
      await transporter.sendMail({
        from: process.env.GMAIL_EMAIL,
        to: email,
        subject: "You're on the list – shxdowmouse",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background: #000; color: #fff; line-height: 1.6; }
                .wrapper { background: #000; padding: 40px 20px; min-height: 100vh; }
                .container { max-width: 580px; margin: 0 auto; }
                .logo { text-align: center; margin-bottom: 60px; }
                .logo h1 { font-size: 32px; font-weight: 700; letter-spacing: -1px; }
                .hero { background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border: 1px solid #2a2a2a; border-radius: 24px; padding: 60px 40px; text-align: center; margin-bottom: 30px; }
                .hero-icon { width: 80px; height: 80px; background: #fff; border-radius: 50%; margin: 0 auto 30px; display: flex; align-items: center; justify-content: center; font-size: 40px; }
                .hero h2 { font-size: 28px; font-weight: 700; margin-bottom: 16px; letter-spacing: -0.5px; }
                .hero p { font-size: 15px; color: #aaa; margin-bottom: 0; line-height: 1.7; }
                .content-block { background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 16px; padding: 40px; margin-bottom: 30px; }
                .content-block h3 { font-size: 16px; font-weight: 600; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; color: #666; }
                .content-block p { font-size: 15px; color: #bbb; line-height: 1.8; margin-bottom: 0; }
                .divider { height: 1px; background: #1a1a1a; margin: 24px 0; }
                .cta-button { display: inline-block; background: #fff; color: #000; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px; margin: 24px 0; transition: all 0.2s; }
                .cta-button:hover { background: #f5f5f5; transform: scale(1.02); }
                .footer { text-align: center; padding: 40px 0 20px; }
                .footer p { font-size: 13px; color: #555; margin-bottom: 8px; }
                .social-hint { font-size: 12px; color: #444; margin-top: 20px; }
                @media (max-width: 600px) {
                  .wrapper { padding: 30px 16px; }
                  .hero { padding: 40px 24px; }
                  .content-block { padding: 30px 20px; }
                  .hero h2 { font-size: 24px; }
                  .hero-icon { width: 60px; height: 60px; font-size: 32px; }
                }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="container">
                  <div class="logo">
                    <h1>shxdowmouse</h1>
                  </div>
                  
                  <div class="hero">
                    <div class="hero-icon">✓</div>
                    <h2>You're on the list</h2>
                    <p>Thanks for signing up. We'll notify you the moment shxdowmouse one launches.</p>
                  </div>

                  <div class="content-block">
                    <h3>What's coming</h3>
                    <p>The shxdowmouse one is our flagship gaming mouse. Precision engineered for the shadows with a focus on minimalism and performance. You'll be notified the instant it's available.</p>
                  </div>

                  <div class="content-block">
                    <h3>In the meantime</h3>
                    <p>Keep an eye on our website for updates and behind-the-scenes content. Questions? We're here to help — reach out anytime.</p>
                  </div>

                  <div class="footer">
                    <p>© ${new Date().getFullYear()} shxdowmouse inc. All rights reserved.</p>
                    <p style="margin-top: 20px; border-top: 1px solid #1a1a1a; padding-top: 20px; color: #444;">This is an automated message. Please don't reply directly to this email.</p>
                    <p class="social-hint">shxdowmouse — The pursuit of precision</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `
      });

      res.json({ 
        success: true, 
        message: "Confirmation email sent successfully" 
      });
    } catch (error) {
      console.error("Notification error:", error);
      res.status(500).json({ message: "Failed to send confirmation email" });
    }
  });

  // Support form endpoint
  app.post("/api/support", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      // Validate inputs
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Create transporter using Gmail SMTP
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      // Send support email to shxdowmouse@gmail.com
      await transporter.sendMail({
        from: process.env.GMAIL_EMAIL,
        to: process.env.GMAIL_EMAIL,
        replyTo: email,
        subject: `New support message: ${subject}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background: #000; color: #fff; line-height: 1.6; }
                .wrapper { background: #000; padding: 40px 20px; min-height: 100vh; }
                .container { max-width: 580px; margin: 0 auto; }
                .header { margin-bottom: 40px; }
                .header h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
                .header p { font-size: 14px; color: #888; }
                .alert { background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border-left: 4px solid #fff; border-radius: 8px; padding: 20px; margin-bottom: 30px; }
                .alert-title { font-size: 13px; font-weight: 600; text-transform: uppercase; color: #666; margin-bottom: 8px; letter-spacing: 1px; }
                .alert-content { font-size: 14px; color: #bbb; }
                .field-group { background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
                .field-label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #555; margin-bottom: 8px; letter-spacing: 1px; }
                .field-value { font-size: 15px; color: #fff; word-break: break-word; }
                .message-box { background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 30px; }
                .message-label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #555; margin-bottom: 12px; letter-spacing: 1px; }
                .message-content { font-size: 14px; color: #bbb; white-space: pre-wrap; line-height: 1.8; }
                .action-box { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 30px; }
                .reply-button { display: inline-block; background: #fff; color: #000; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 13px; transition: all 0.2s; }
                .reply-button:hover { background: #f5f5f5; transform: scale(1.02); }
                .footer { text-align: center; padding: 30px 0 20px; border-top: 1px solid #1a1a1a; }
                .footer p { font-size: 12px; color: #555; margin-bottom: 8px; }
                @media (max-width: 600px) {
                  .wrapper { padding: 30px 16px; }
                  .container { max-width: 100%; }
                  .field-group { padding: 16px; }
                  .message-box { padding: 16px; }
                }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="container">
                  <div class="header">
                    <h1>New Support Message</h1>
                    <p>You have a new message from your website visitors.</p>
                  </div>

                  <div class="alert">
                    <div class="alert-title">Quick Reply</div>
                    <div class="alert-content">Reply to: <strong>${email}</strong></div>
                  </div>

                  <div style="display: grid; gap: 16px; margin-bottom: 30px;">
                    <div class="field-group">
                      <div class="field-label">From</div>
                      <div class="field-value">${name}</div>
                    </div>
                    <div class="field-group">
                      <div class="field-label">Email</div>
                      <div class="field-value"><a href="mailto:${email}" style="color: #fff; text-decoration: none;">${email}</a></div>
                    </div>
                    <div class="field-group">
                      <div class="field-label">Subject</div>
                      <div class="field-value">${subject}</div>
                    </div>
                  </div>

                  <div class="message-box">
                    <div class="message-label">Message</div>
                    <div class="message-content">${message}</div>
                  </div>

                  <div class="action-box">
                    <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi ${name},

[Your response here]

---

ORIGINAL MESSAGE:
Subject: ${subject}
Message: ${message}

---
shxdowmouse Support Team
The pursuit of precision`)}" class="reply-button">Reply to ${name.split(' ')[0]}</a>
                  </div>

                  <div class="footer">
                    <p>© ${new Date().getFullYear()} shxdowmouse inc. All rights reserved.</p>
                    <p style="margin-top: 12px;">This is an automated message from your website support form.</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `
      });

      res.json({
        success: true,
        message: "Message sent successfully"
      });
    } catch (error) {
      console.error("Support form error:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  return httpServer;
}
