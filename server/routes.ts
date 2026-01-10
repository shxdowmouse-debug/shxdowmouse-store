// server/routes.ts
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendEmail } from "./email";

// ------------------------------------------------------------
// EMAIL TEMPLATES
// ------------------------------------------------------------

function waitlistTemplate() {
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
          max-width: 480px;
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
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        p {
          font-size: 16px;
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

        <h1>You're on the list.</h1>

        <p>
          Thanks for signing up for <strong>SHXDOWMOUSE</strong>.<br />
          You’ll be the first to know when we launch.
        </p>

        <p class="footer">
          © 2026 SHXDOWMOUSE. All rights reserved.
        </p>
      </div>
    </body>
  </html>
  `;
}

function supportTemplate(
  name: string,
  email: string,
  subject: string,
  message: string
) {
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

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
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
  // Frontend should call: POST /api/notify
  // ----------------------------------------------------------

  app.post("/api/notify", async (req, res) => {
    const { email } = req.body ?? {};

    console.log("[WAITLIST] Route hit with payload:", req.body);
    console.log(
      "[WAITLIST] RESEND_API_KEY loaded:",
      !!process.env.RESEND_API_KEY
    );

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    try {
      await sendEmail(
        email,
        "You're on the list – SHXDOWMOUSE",
        waitlistTemplate()
      );

      res.json({
        success: true,
        message: "Confirmation email sent successfully",
      });
    } catch (error) {
      console.error("[WAITLIST] Email error:", error);
      res
        .status(500)
        .json({ message: "Failed to send confirmation email" });
    }
  });

  // ----------------------------------------------------------
  // SUPPORT EMAIL
  // Frontend: POST /api/support
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

    const supportInbox =
      process.env.SUPPORT_EMAIL || "onboarding@resend.dev";

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

  return httpServer;
}
