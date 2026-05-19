import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "../shared/routes";
import { z } from "zod";
import { sendEmail } from "./email";
import { verifyAdminAuth, generateTwoFASecret, verifyTwoFAToken, generateQRCode } from "./auth";
import speakeasy from "speakeasy";

// ------------------------------------------------------------
// EMAIL TEMPLATES
// ------------------------------------------------------------

function waitlistTemplate(email: string) {
  return `
  <html>
    <head>
      <meta name="color-scheme" content="dark light">
      <meta name="supported-color-schemes" content="dark light">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: linear-gradient(135deg, #000000 0%, #0a0a0a 100%);
          color: #fff;
          font-family: 'Space Grotesk', sans-serif;
          padding: 20px;
        }

        .wrapper {
          max-width: 600px;
          margin: 0 auto;
        }

        .container {
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 48px 32px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }

        .logo {
          width: 56px;
          height: 56px;
          margin-bottom: 24px;
        }

        h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
        }

        p {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 16px;
        }

        p:last-child {
          margin-bottom: 0;
        }

        .footer {
          margin-top: 40px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 24px;
        }

        .unsubscribe {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .unsubscribe a {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-size: 11px;
        }

        .unsubscribe a:hover {
          color: rgba(255, 255, 255, 0.7);
        }

        @media (max-width: 600px) {
          .container {
            padding: 32px 24px;
          }

          h1 {
            font-size: 24px;
          }
        }
      </style>
    </head>

    <body>
      <div class="wrapper">
        <div class="container">
          <img class="logo" src="https://shxdowmouse.onrender.com/logo.png" alt="shxdowmouse" />

          <h1>You're on the list.</h1>

          <p>
            Thanks for joining the <span style="color: #fff; font-weight: 600;">shxdowmouse</span> community.
          </p>
          <p>
            You're now part of an exclusive group that will get early access and insider updates about our revolutionary precision gaming mouse engineered for competitive excellence.
          </p>
          <p>
            We'll keep you updated every step of the way—don't miss what's coming.
          </p>

          <p class="footer">
            © 2026 shxdowmouse. All rights reserved.<br/>
            Precision. Innovation. Excellence.
            <div class="unsubscribe">
              <a href="https://shxdowmouse.onrender.com/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe from this list</a>
            </div>
          </p>
        </div>
      </div>
    </body>
  </html>
  `;
}

function supportTemplate(name: string, email: string, subject: string, message: string) {
  return `
  <html>
    <head>
      <meta name="color-scheme" content="dark light">
      <meta name="supported-color-schemes" content="dark light">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&display=swap');

        body {
          margin: 0;
          padding: 0;
          background: #000;
          color: #fff;
          font-family: 'Space Grotesk', sans-serif;
        }

        .container {
          max-width: 520px;
          margin: 0 auto;
          padding: 40px 24px;
          background: #0a0a0a;
          border-radius: 12px;
        }

        .logo {
          width: 48px;
          margin-bottom: 24px;
        }

        h1 {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        p {
          font-size: 15px;
          line-height: 1.6;
          opacity: 0.9;
        }

        .footer {
          margin-top: 40px;
          font-size: 12px;
          opacity: 0.5;
          text-align: center;
        }
      </style>
    </head>

    <body>
      <div class="container">
        <img class="logo" src="https://shxdowmouse.onrender.com/logo.png" alt="SHXDOWMOUSE" />

        <h1>New Support Message</h1>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br />${message}</p>

        <p class="footer">
          © 2026 SHXDOWMOUSE. All rights reserved.
        </p>
      </div>
    </body>
  </html>
  `;
}

// ------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && emailRegex.test(value);
}

// ------------------------------------------------------------
// ROUTES
// ------------------------------------------------------------

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  // ----------------------------------------------------------
  // Seed database with default product if empty
  // ----------------------------------------------------------
  try {
    const existingProducts = await storage.getProducts();
    if (existingProducts.length === 0) {
      await storage.createProduct({
        name: "shxdowmouse",
        description:
          "The ultimate minimalist gaming mouse. Precision engineered for the shadows.",
        price: 8999,
        features: [
          "26k DPI Optical Sensor",
          "60g Ultra-lightweight",
          "Wireless Connectivity",
          "Silent Switches",
        ],
        imageUrl: "/images/mouse.png",
      });
      console.log("[SEED] Seeded database with shxdowmouse");
    }

    // Ensure admin user record exists for 2FA state storage
    const adminUser = await storage.getAdminUser("admin");
    if (!adminUser) {
      await storage.createAdminUser({
        username: "admin",
        passwordHash: "",
        twoFaSecret: null,
        twoFaEnabled: false,
      });
      console.log("[SEED] Created admin user record for 2FA management");
    }
  } catch (error) {
    console.error("[SEED] Error seeding database:", error);
  }

  // ----------------------------------------------------------
  // Product routes
  // ----------------------------------------------------------

  app.get(api.products.list.path, async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("[API] GET products.list error:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get(api.products.get.path, async (req, res) => {
    try {
      const productId = Number(req.params.id);
      if (Number.isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product id" });
      }

      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      console.error("[API] GET products.get error:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // ----------------------------------------------------------
  // Order route
  // ----------------------------------------------------------

  app.post(api.orders.create.path, async (req, res) => {
    try {
      const input = api.orders.create.input.parse(req.body);
      const order = await storage.createOrder(input);
      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }

      console.error("[API] POST orders.create error:", err);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // ----------------------------------------------------------
  // WAITLIST EMAIL
  // ----------------------------------------------------------

  app.post("/api/notify", async (req, res) => {
    const { email, name } = req.body ?? {};

    console.log("[WAITLIST] Route hit with payload:", req.body);

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    try {
      // Save to waitlist database first (required)
      const waitlistEntry = await storage.addToWaitlist(email, name);
      console.log("[WAITLIST] Successfully added email to waitlist:", email);

      // Send confirmation email asynchronously (non-blocking)
      sendEmail(
        email,
        "You're on the list – shxdowmouse",
        waitlistTemplate(email)
      ).catch((error) => {
        console.error("[WAITLIST] Failed to send confirmation email to", email, ":", error);
        // Email failure is not critical - user is already added to waitlist
      });

      res.json({
        success: true,
        message: "Successfully added to waitlist. Check your email for confirmation.",
        email: email
      });
    } catch (error) {
      console.error("[WAITLIST] Error:", error);
      // Check if it's a duplicate email error
      if (error instanceof Error && error.message.includes("unique")) {
        return res.status(409).json({ message: "This email is already on the waitlist" });
      }
      res.status(500).json({ message: "Failed to process signup" });
    }
  });

  // ----------------------------------------------------------
  // SUPPORT EMAIL
  // ----------------------------------------------------------

  app.post("/api/support", async (req, res) => {
    const { name, email, subject, message } = req.body ?? {};

    console.log("[SUPPORT] Route hit with payload:", {
      name,
      email,
      subject,
      hasMessage: typeof message === "string" && message.length > 0,
    });

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const supportInbox = process.env.SUPPORT_EMAIL || "onboarding@resend.dev";

    try {
      await sendEmail(
        supportInbox,
        `Support: ${subject}`,
        supportTemplate(name, email, subject, message),
        email
      );

      res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("[SUPPORT] Email error:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // ----------------------------------------------------------
  // UNSUBSCRIBE
  // ----------------------------------------------------------

  app.post("/api/unsubscribe", async (req, res) => {
    const { email } = req.body ?? {};

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      await storage.removeFromWaitlist(email);
      res.json({
        success: true,
        message: "You have been unsubscribed successfully",
      });
    } catch (error) {
      console.error("[UNSUBSCRIBE] Error:", error);
      res.status(500).json({ message: "Failed to unsubscribe" });
    }
  });

  // Delete all waitlist entries
  app.delete("/api/admin/waitlist", verifyAdminAuth, async (req, res) => {
    try {
      // Get all waitlist entries first
      const waitlistData = await storage.getWaitlist();
      
      // Delete each entry
      for (const entry of waitlistData) {
        await storage.removeFromWaitlist(entry.email);
      }

      res.json({
        success: true,
        message: `Cleared ${waitlistData.length} entries from waitlist`,
      });
    } catch (error) {
      console.error("[ADMIN] Clear waitlist error:", error);
      res.status(500).json({ message: "Failed to clear waitlist" });
    }
  });

  // ----------------------------------------------------------
  // ADMIN DASHBOARD ROUTES
  // ----------------------------------------------------------

  // Get dashboard statistics
  app.get("/api/admin/stats", verifyAdminAuth, async (_req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error("[ADMIN] GET stats error:", error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  // Get all orders
  app.get("/api/admin/orders", verifyAdminAuth, async (_req, res) => {
    try {
      const allOrders = await storage.getOrders();
      res.json(allOrders);
    } catch (error) {
      console.error("[ADMIN] GET orders error:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // Get all waitlist signups
  app.get("/api/admin/waitlist", verifyAdminAuth, async (_req, res) => {
    try {
      const waitlistData = await storage.getWaitlist();
      res.json(waitlistData);
    } catch (error) {
      console.error("[ADMIN] GET waitlist error:", error);
      res.status(500).json({ message: "Failed to fetch waitlist" });
    }
  });

  // Send broadcast email to all waitlist subscribers
  app.post("/api/admin/broadcast", verifyAdminAuth, async (req, res) => {
    const { subject, message } = req.body ?? {};

    if (!subject || !message) {
      return res.status(400).json({ message: "Subject and message are required" });
    }

    try {
      const waitlistData = await storage.getWaitlist();
      
      // Send email to all waitlist subscribers
      const sendPromises = waitlistData.map((entry) =>
        sendEmail(entry.email, subject, `<html><body style="font-family: 'Space Grotesk', sans-serif; background: #000; color: #fff;"><div style="max-width: 600px; margin: 0 auto; padding: 40px; background: #0a0a0a; border-radius: 16px;">${message}</div></body></html>`)
      );

      await Promise.all(sendPromises);

      res.json({
        success: true,
        message: `Broadcast email sent to ${waitlistData.length} subscribers`,
        count: waitlistData.length,
      });
    } catch (error) {
      console.error("[ADMIN] Broadcast error:", error);
      res.status(500).json({ message: "Failed to send broadcast email" });
    }
  });

  // ----------------------------------------------------------
  // 2FA ROUTES
  // ----------------------------------------------------------

  // Generate 2FA secret and QR code
  app.post("/api/admin/2fa/setup", verifyAdminAuth, async (req, res) => {
    const username = "admin"; // In a real app, this would come from the logged-in user

    try {
      const { secret, backupCodes } = generateTwoFASecret(username);

      const totpUri = speakeasy.otpauthURL({
        secret: secret,
        label: `shxdowmouse (${username})`,
        issuer: "shxdowmouse",
        encoding: "base32",
      });

      const qrCodeDataUrl = await generateQRCode(totpUri);

      res.json({
        success: true,
        secret,
        qrCodeDataUrl,
        backupCodes,
      });
    } catch (error) {
      console.error("[2FA] Setup error:", error);
      res.status(500).json({ message: "Failed to generate 2FA setup" });
    }
  });

  // Verify and enable 2FA
  app.post("/api/admin/2fa/verify", verifyAdminAuth, async (req, res) => {
    const { secret, token } = req.body ?? {};
    const username = "admin";

    if (!secret || !token) {
      return res.status(400).json({ message: "Secret and token are required" });
    }

    if (!verifyTwoFAToken(secret, token)) {
      return res.status(401).json({ message: "Invalid 2FA token" });
    }

    try {
      await storage.updateAdminUser2FA(username, secret, true);

      res.json({
        success: true,
        message: "2FA enabled successfully",
      });
    } catch (error) {
      console.error("[2FA] Verify error:", error);
      res.status(500).json({ message: "Failed to enable 2FA" });
    }
  });

  // Verify 2FA token (for login)
  app.post("/api/admin/2fa/verify-login", async (req, res) => {
    const { password, token } = req.body ?? {};
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || password !== adminPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    try {
      const admin = await storage.getAdminUser("admin");

      if (!admin || !admin.twoFaEnabled || !admin.twoFaSecret) {
        // 2FA not enabled, just return token
        return res.json({
          success: true,
          token: password,
          message: "Login successful",
        });
      }

      if (token === "check") {
        return res.status(400).json({
          success: false,
          message: "2FA required",
          needs2FA: true,
        });
      }

      if (!token) {
        return res.status(400).json({ message: "2FA token is required" });
      }

      if (!verifyTwoFAToken(admin.twoFaSecret, token)) {
        return res.status(401).json({ message: "Invalid 2FA token" });
      }

      res.json({
        success: true,
        token: password,
        message: "Login successful",
      });
    } catch (error) {
      console.error("[2FA] Login verification error:", error);
      res.status(500).json({ message: "Failed to verify 2FA token" });
    }
  });

  // Get 2FA status
  app.get("/api/admin/2fa/status", verifyAdminAuth, async (_req, res) => {
    try {
      const admin = await storage.getAdminUser("admin");
      res.json({
        success: true,
        enabled: Boolean(admin?.twoFaEnabled),
      });
    } catch (error) {
      console.error("[2FA] Status error:", error);
      res.status(500).json({ message: "Failed to fetch 2FA status" });
    }
  });

  // Disable 2FA
  app.post("/api/admin/2fa/disable", verifyAdminAuth, async (req, res) => {
    const username = "admin";

    try {
      await storage.updateAdminUser2FA(username, null, false);

      res.json({
        success: true,
        message: "2FA disabled successfully",
      });
    } catch (error) {
      console.error("[2FA] Disable error:", error);
      res.status(500).json({ message: "Failed to disable 2FA" });
    }
  });

  // Logout all admin sessions
  app.post("/api/admin/logout-all", verifyAdminAuth, async (req, res) => {
    try {
      await storage.deleteAllAdminSessions();

      res.json({
        success: true,
        message: "All admin sessions have been cleared",
      });
    } catch (error) {
      console.error("[ADMIN] Logout all error:", error);
      res.status(500).json({ message: "Failed to logout all sessions" });
    }
  });

  return httpServer;
