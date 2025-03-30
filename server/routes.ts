import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertChatMessageSchema, insertChatModeSchema } from "@shared/schema";
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
  
  // ==================== AI Chatbot API Endpoints ====================
  
  // Get all available chat modes
  app.get("/api/chat/modes", async (req: Request, res: Response) => {
    try {
      const modes = await storage.getChatModes();
      res.status(200).json({ modes });
    } catch (error) {
      console.error("Error fetching chat modes:", error);
      res.status(500).json({ message: "Failed to fetch chat modes" });
    }
  });
  
  // Get the default chat mode
  app.get("/api/chat/modes/default", async (req: Request, res: Response) => {
    try {
      const mode = await storage.getDefaultChatMode();
      if (!mode) {
        return res.status(404).json({ message: "No default chat mode found" });
      }
      res.status(200).json({ mode });
    } catch (error) {
      console.error("Error fetching default chat mode:", error);
      res.status(500).json({ message: "Failed to fetch default chat mode" });
    }
  });
  
  // Get a specific chat mode by ID
  app.get("/api/chat/modes/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid mode ID" });
      }
      
      const mode = await storage.getChatMode(id);
      if (!mode) {
        return res.status(404).json({ message: "Chat mode not found" });
      }
      
      res.status(200).json({ mode });
    } catch (error) {
      console.error("Error fetching chat mode:", error);
      res.status(500).json({ message: "Failed to fetch chat mode" });
    }
  });
  
  // Get chat messages for a specific session
  app.get("/api/chat/messages/:sessionId", async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.status(200).json({ messages });
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });
  
  // Send a message in a chat session
  app.post("/api/chat/messages", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertChatMessageSchema.parse(req.body);
      
      // Store the user message
      const userMessage = await storage.createChatMessage(validatedData);
      
      // For this demo, we'll generate a simple bot response based on the chat mode
      // In a real implementation, this would integrate with an external AI API
      const botResponse = await generateBotResponse(validatedData);
      
      // Return both the user message and bot response
      res.status(201).json({ 
        message: "Message sent successfully",
        userMessage,
        botResponse
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error handling chat message:", error);
        res.status(500).json({ message: "Failed to process chat message" });
      }
    }
  });
  
  // Helper function to generate a bot response
  // In a real implementation, this would integrate with an AI service or API
  async function generateBotResponse(userMessage: any) {
    // Get the chat mode to customize the response
    const mode = await storage.getChatModeByName(userMessage.mode);
    const persona = mode?.persona || "I'm an AI assistant";
    
    // Generate a simple response based on the user's message content
    let responseText = "";
    const userContent = userMessage.content.toLowerCase();
    
    if (userContent.includes("hello") || userContent.includes("hi")) {
      responseText = `Hello there! ${persona}`;
    } else if (userContent.includes("help") || userContent.includes("guide")) {
      responseText = `I'd be happy to help! ${persona} What specific assistance do you need?`;
    } else if (userContent.includes("project") || userContent.includes("work")) {
      responseText = `Let me tell you about my projects. I've worked on various technologies including React, Three.js, and Node.js.`;
    } else if (userContent.includes("contact") || userContent.includes("email")) {
      responseText = `You can contact me through the contact form on this website!`;
    } else {
      responseText = `Thank you for your message. ${persona} How else can I assist you today?`;
    }
    
    // Create and store the bot message
    const botMessage = await storage.createChatMessage({
      sessionId: userMessage.sessionId,
      content: responseText,
      isBot: 1,
      mode: userMessage.mode,
      metadata: {
        timestamp: new Date().toISOString(),
        mode: userMessage.mode
      }
    });
    
    return botMessage;
  }

  const httpServer = createServer(app);
  return httpServer;
}
