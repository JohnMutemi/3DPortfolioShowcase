import { pgTable, text, serial, integer, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Contact Message Schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Original user schema (kept for compatibility)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Chat schema for AI chatbot
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  content: text("content").notNull(),
  isBot: integer("is_bot").notNull(), // 0 = user, 1 = bot
  mode: text("mode").notNull(),
  metadata: json("metadata").default({}), // Optional metadata like timestamp, context, etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  sessionId: true,
  content: true,
  isBot: true,
  mode: true,
  metadata: true,
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

// Chat mode schema for available conversation modes
export const chatModes = pgTable("chat_modes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  persona: text("persona").notNull(),
  icon: text("icon").notNull(),
  accentColor: text("accent_color").notNull(),
  isDefault: integer("is_default").notNull(), // 0 = not default, 1 = default
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertChatModeSchema = createInsertSchema(chatModes).pick({
  name: true,
  description: true,
  persona: true,
  icon: true,
  accentColor: true,
  isDefault: true,
});

export type InsertChatMode = z.infer<typeof insertChatModeSchema>;
export type ChatMode = typeof chatModes.$inferSelect;
