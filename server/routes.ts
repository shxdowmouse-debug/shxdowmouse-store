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
        <img class="logo" src="https://shxdowmouse.onrender.com/logo.png" alt="SHXDOWMOUSE">

        <h1>You're on the list.</h1>

        <p>
          Thanks for signing up for <strong>SHXDOWMOUSE</strong>.  
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
        <img class="logo" src="https://shxdowmouse.onrender.com/logo.png" alt="SHXDOWMOUSE">

        <h1>New Support Message</h1>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>

        <p class="footer">
          © 2026 SHXDOWMOUSE. All rights reserved.
        </p>
      </div>
    </body>
  </html>
  `;
}

// ------------------------------------------------------------
// ROUTES
// ------------------------------------------------------------

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  // Seed database with default product if empty
  try {
    const existingProducts = await storage.getProducts();
    if (existingProducts.length === 0) {
      await storage.createProduct({
        name: "shxdowmouse",
        description: "The ultimate minimalist gaming mouse. Precision engineered for the shadows.",
        price: 8999,
        features: [
          "26k DPI Optical Sensor",
          "60g Ultra-lightweight",
          "Wireless Connectivity",
          "Silent Switches"
        ],
        imageUrl: "/images/mouse.png"
      });
      console.log("Seeded database with shxdowmouse");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }

  // Product routes
  app.get(api.products.list.path, async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  // Order route
  app.post(api.orders.create.path, async (req, res) => {
    try {
      const input = api.orders.create.input.parse(req.body);
      const order = await storage.createOrder(input);
      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // ------------------------------------------------------------
  // WAITLIST EMAIL
  // ------------------------------------------------------------

  app.post("/waitlist.notify", async (req, res) => {
    console.log("WAITLIST ROUTE HIT:", req.body.email);
    console.log("RESEND KEY LOADED:", !!process.env.RESEND_API_KEY);

    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    try {
      console.log("SENDING EMAIL TO:", email);

      await sendEmail(
        email,
        "You're on the list – SHXDOWMOUSE",
        waitlistTemplate()
      );

      console.log("EMAIL SENT SUCCESSFULLY");

      res.json({ success: true, message: "Confirmation email sent successfully" });
    } catch (error) {
      console.error("EMAIL ERROR:", error);
      res.status(500).json({ message: "Failed to send confirmation email" });
    }
  });

  // ------------------------------------------------------------
  // SUPPORT EMAIL
  // ------------------------------------------------------------

  app.post("/api/support", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    try {
      await sendEmail(
        process.env.SUPPORT_EMAIL || "support@shxdowmouse.com",
        `Support: ${subject}`,
        supportTemplate(name, email, subject, message),
        email
      );

      res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Support form error:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  return httpServer;
}
