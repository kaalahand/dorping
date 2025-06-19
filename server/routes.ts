import type { Express } from "express";
import { createServer, type Server } from "http";
import passport from "passport";
import session from "express-session";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { setupGoogleAuth } from "./googleAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration for Passport
  app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret-here',
    resave: false,
    saveUninitialized: true, // Changed to true for OAuth
    cookie: { 
      secure: false, // Set to false for development
      sameSite: 'lax',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Passport session serialization
  passport.serializeUser((user: any, done) => {
    console.log('Serializing user:', user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      console.log('Deserializing user ID:', id);
      const user = await storage.getUser(id);
      console.log('Deserialized user:', user);
      done(null, user);
    } catch (error) {
      console.error('Deserialize error:', error);
      done(error, null);
    }
  });

  // Setup Google OAuth
  setupGoogleAuth(app);
  // Check authentication status
  app.get("/api/auth/check", (req, res) => {
    console.log('Auth check - Session ID:', req.sessionID);
    console.log('Auth check - Is authenticated:', req.isAuthenticated());
    console.log('Auth check - User:', req.user);
    
    if (req.isAuthenticated()) {
      res.json({ authenticated: true, user: req.user });
    } else {
      res.json({ authenticated: false });
    }
  });

  // Manual authentication endpoint for Google OAuth users
  app.post("/api/auth/google-login", async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await storage.getUser(userId);
      
      if (user) {
        // Manually log in the user
        req.login(user, (err) => {
          if (err) {
            console.error('Manual login error:', err);
            return res.status(500).json({ error: 'Login failed' });
          }
          res.json({ authenticated: true, user });
        });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Google login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  });

  // Logout route
  app.get("/api/auth/logout", (req, res) => {
    req.logout(() => {
      res.redirect('/');
    });
  });

  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      console.log("Registration request:", req.body);
      
      // For signup, we need to create a username from email (since users sign up with email)
      const { email, password, plan } = req.body;
      const username = email; // Use email as username for simplicity
      
      const userData = {
        username,
        email,
        password,
        plan: plan?.name || "Free"
      };
      
      const validatedData = insertUserSchema.parse(userData);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const existingEmail = await storage.getUserByEmail(validatedData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await storage.createUser(validatedData);
      console.log("User created:", user.id);
      
      // Don't return password
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      console.log("Login request:", req.body);
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      console.log("User authenticated:", user.id);
      
      // Don't return password
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // User profile route
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

  const httpServer = createServer(app);
  return httpServer;
}
