import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for contact form
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Store the message
      const savedMessage = await storage.createContactMessage(validatedData);
      
      // Send email notification (commented out as it requires email configuration)
      /*
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.example.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER || '',
          pass: process.env.EMAIL_PASS || '',
        },
      });
      
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'portfolio@example.com',
        to: process.env.EMAIL_TO || 'john@example.com',
        subject: `New message: ${validatedData.subject}`,
        text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nMessage: ${validatedData.message}`,
        html: `<p><strong>Name:</strong> ${validatedData.name}</p>
               <p><strong>Email:</strong> ${validatedData.email}</p>
               <p><strong>Message:</strong> ${validatedData.message}</p>`,
      });
      */
      
      res.status(201).json({ 
        message: "Message sent successfully", 
        data: savedMessage 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error handling contact form:", error);
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });
  
  // Endpoint to download CV
  app.get("/api/download-cv", (req: Request, res: Response) => {
    // In a real implementation, this would serve a real CV file
    res.setHeader('Content-Disposition', 'attachment; filename="John_Kisinga_CV.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    
    // For this example, we're just sending a placeholder text
    // In a real implementation, you would serve an actual file
    res.send("This is a placeholder for the actual CV file");
  });

  const httpServer = createServer(app);
  return httpServer;
}
