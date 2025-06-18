import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  plan: text("plan").notNull().default("Free"),
  promptsUsed: integer("prompts_used").notNull().default(0),
  promptsLimit: integer("prompts_limit").notNull().default(50),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  // Future Google Sign-In support
  googleId: text("google_id"),
  authProvider: text("auth_provider").notNull().default("email"),
  isEmailVerified: integer("is_email_verified").notNull().default(0), // 0 = false, 1 = true
  // Analytics and tracking fields
  registrationSource: text("registration_source"),
  utmData: jsonb("utm_data"),
  analyticsId: text("analytics_id"),
  lastLogin: timestamp("last_login"),
  loginCount: integer("login_count").notNull().default(0),
  // Flexible metadata
  userPreferences: jsonb("user_preferences"),
  externalIds: jsonb("external_ids"),
  featureFlags: jsonb("feature_flags"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  plan: true,
  registrationSource: true,
  utmData: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
