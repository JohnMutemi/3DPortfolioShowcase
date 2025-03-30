import { 
  users, 
  type User, 
  type InsertUser, 
  contactMessages,
  type ContactMessage,
  type InsertContactMessage,
  type ChatMessage,
  type InsertChatMessage,
  type ChatMode,
  type InsertChatMode
} from "@shared/schema";

// Extended interface with chat functionality
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact message methods
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Chat message methods
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  getChatMessage(id: number): Promise<ChatMessage | undefined>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Chat mode methods
  getChatModes(): Promise<ChatMode[]>;
  getChatMode(id: number): Promise<ChatMode | undefined>;
  getChatModeByName(name: string): Promise<ChatMode | undefined>;
  getDefaultChatMode(): Promise<ChatMode | undefined>;
  createChatMode(mode: InsertChatMode): Promise<ChatMode>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private chatMessages: Map<number, ChatMessage>;
  private chatModes: Map<number, ChatMode>;
  
  private userCurrentId: number;
  private messageCurrentId: number;
  private chatMessageCurrentId: number;
  private chatModeCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.chatMessages = new Map();
    this.chatModes = new Map();
    
    this.userCurrentId = 1;
    this.messageCurrentId = 1;
    this.chatMessageCurrentId = 1;
    this.chatModeCurrentId = 1;
    
    // Initialize with default chat modes
    this.initializeDefaultChatModes();
  }
  
  private async initializeDefaultChatModes() {
    // Portfolio Mode
    await this.createChatMode({
      name: "Portfolio",
      description: "Learn about John's professional portfolio, projects, and expertise",
      persona: "I'm John's portfolio assistant. I can tell you all about my projects, skills, and professional experience.",
      icon: "💼",
      accentColor: "main",
      isDefault: 1
    });
    
    // Technical Mode
    await this.createChatMode({
      name: "Technical",
      description: "Deep dive into technical details of John's work with 3D, React, and other technologies",
      persona: "I'm a technical expert ready to discuss code, technologies, and implementation details of my projects. Ask me about React, Three.js, Express, or any other tech stack!",
      icon: "⚙️",
      accentColor: "secondary",
      isDefault: 0
    });
    
    // Creative Mode
    await this.createChatMode({
      name: "Creative",
      description: "Discuss John's creative process, 3D design philosophy, and artistic approach",
      persona: "I represent John's creative side. I love discussing design principles, 3D modeling techniques, animation, and the creative process behind my work.",
      icon: "🎨",
      accentColor: "tertiary",
      isDefault: 0
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contact message methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageCurrentId++;
    const createdAt = new Date();
    const message: ContactMessage = { ...insertMessage, id, createdAt };
    this.contactMessages.set(id, message);
    return message;
  }
  
  // Chat message methods
  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    const messages = Array.from(this.chatMessages.values());
    return messages
      .filter(msg => msg.sessionId === sessionId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async getChatMessage(id: number): Promise<ChatMessage | undefined> {
    return this.chatMessages.get(id);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.chatMessageCurrentId++;
    const createdAt = new Date();
    // Ensure metadata has default empty object if not provided
    const metadata = insertMessage.metadata || {};
    const message: ChatMessage = { ...insertMessage, id, createdAt, metadata };
    this.chatMessages.set(id, message);
    return message;
  }
  
  // Chat mode methods
  async getChatModes(): Promise<ChatMode[]> {
    return Array.from(this.chatModes.values());
  }

  async getChatMode(id: number): Promise<ChatMode | undefined> {
    return this.chatModes.get(id);
  }
  
  async getChatModeByName(name: string): Promise<ChatMode | undefined> {
    return Array.from(this.chatModes.values()).find(
      (mode) => mode.name.toLowerCase() === name.toLowerCase()
    );
  }
  
  async getDefaultChatMode(): Promise<ChatMode | undefined> {
    const defaultMode = Array.from(this.chatModes.values()).find(
      (mode) => mode.isDefault === 1
    );
    
    // If no default found, return first mode
    if (!defaultMode && this.chatModes.size > 0) {
      return Array.from(this.chatModes.values())[0];
    }
    
    return defaultMode;
  }

  async createChatMode(insertMode: InsertChatMode): Promise<ChatMode> {
    const id = this.chatModeCurrentId++;
    const createdAt = new Date();
    const mode: ChatMode = { ...insertMode, id, createdAt };
    this.chatModes.set(id, mode);
    return mode;
  }
}

export const storage = new MemStorage();
