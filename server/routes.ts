import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import nodemailer from "nodemailer";

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
  app.get(api.products.list.path, async (req, res) => {
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

  // Email helper
  const sendEmail = async (to: string, subject: string, html: string, replyTo?: string) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      html,
      ...(replyTo && { replyTo })
    });
  };

  // Notification signup
  app.post("/api/notify", async (req, res) => {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    try {
      await sendEmail(
        email,
        "You're on the list – shxdowmouse",
        `<p>Thanks for signing up for <strong>shxdowmouse</strong>. We'll notify you when we launch!</p>`
      );
      res.json({ success: true, message: "Confirmation email sent successfully" });
    } catch (error) {
      console.error("Notification error:", error);
      res.status(500).json({ message: "Failed to send confirmation email" });
    }
  });

  // Support form
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
        process.env.GMAIL_USER!,
        `New support message: ${subject}`,
        `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Message:</strong><br>${message}</p>`,
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
