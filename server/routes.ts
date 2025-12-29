import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendMail } from "./mail";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Newsletter Subscription
  app.post(api.subscribers.create.path, async (req, res) => {
    try {
      const input = api.subscribers.create.input.parse(req.body);
      
      const existing = await storage.getSubscriberByEmail(input.email);
      if (existing) {
        return res.status(409).json({ message: "Email already subscribed" });
      }

      const subscriber = await storage.createSubscriber(input);

      // Send confirmation email
      await sendMail(
        input.email,
        "Welcome to shxdowmouse Updates",
        "Thanks for signing up! You'll be the first to know when our new mouse drops."
      );

      res.status(201).json(subscriber);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Support Contact Form
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const ticket = await storage.createSupportTicket(input);

      // Send confirmation to user
      await sendMail(
        input.email,
        "We received your message - shxdowmouse Support",
        `Hi ${input.name},\n\nWe received your message: "${input.message}".\n\nOur team will get back to you shortly.`
      );

      // Send notification to owner (using GMAIL_USER as owner email for simplicity)
      if (process.env.GMAIL_USER) {
        await sendMail(
          process.env.GMAIL_USER,
          `New Support Ticket from ${input.name}`,
          `Name: ${input.name}\nEmail: ${input.email}\nMessage: ${input.message}`
        );
      }

      res.status(201).json(ticket);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
