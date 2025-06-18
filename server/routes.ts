import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertSavedPromptSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(validatedData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await storage.createUser(validatedData);
      
      // Don't return password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Don't return password
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // User profile routes
  app.get("/api/user/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/user/:id/plan", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { plan } = req.body;
      
      const promptLimits = {
        "Free": 50,
        "Starter": 125,
        "Pro": 500,
        "Unlimited": -1 // -1 represents unlimited
      };

      const promptsLimit = promptLimits[plan as keyof typeof promptLimits];
      if (promptsLimit === undefined) {
        return res.status(400).json({ message: "Invalid plan" });
      }

      await storage.updateUserPlan(userId, plan, promptsLimit);
      res.json({ message: "Plan updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Saved prompts routes
  app.post("/api/prompts", async (req, res) => {
    try {
      const validatedData = insertSavedPromptSchema.parse(req.body);
      
      // Check user's prompt limit
      const user = await storage.getUser(validatedData.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.promptsLimit !== -1 && user.promptsUsed >= user.promptsLimit) {
        return res.status(403).json({ message: "Prompt limit exceeded" });
      }

      const savedPrompt = await storage.createSavedPrompt(validatedData);
      await storage.incrementPromptsUsed(validatedData.userId);
      
      res.status(201).json({ prompt: savedPrompt });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/prompts/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const prompts = await storage.getUserSavedPrompts(userId);
      res.json({ prompts });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/prompts/:id/user/:userId", async (req, res) => {
    try {
      const promptId = parseInt(req.params.id);
      const userId = parseInt(req.params.userId);
      
      const prompt = await storage.getSavedPrompt(promptId, userId);
      if (!prompt) {
        return res.status(404).json({ message: "Prompt not found" });
      }

      res.json({ prompt });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/prompts/:id/user/:userId", async (req, res) => {
    try {
      const promptId = parseInt(req.params.id);
      const userId = parseInt(req.params.userId);
      const updates = req.body;

      await storage.updateSavedPrompt(promptId, userId, updates);
      res.json({ message: "Prompt updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/prompts/:id/user/:userId", async (req, res) => {
    try {
      const promptId = parseInt(req.params.id);
      const userId = parseInt(req.params.userId);

      await storage.deleteSavedPrompt(promptId, userId);
      res.json({ message: "Prompt deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/prompts/search/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { query, taskType } = req.query;
      
      const prompts = await storage.searchSavedPrompts(
        userId, 
        query as string || '', 
        taskType as string
      );
      
      res.json({ prompts });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
