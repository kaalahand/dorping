import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  plan: text("plan").notNull().default("Free"),
  promptsUsed: integer("prompts_used").notNull().default(0),
  promptsLimit: integer("prompts_limit").notNull().default(50),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const savedPrompts = pgTable("saved_prompts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  taskType: text("task_type").notNull(),
  originalPrompt: text("original_prompt").notNull(),
  goal: text("goal").notNull(),
  audience: text("audience").notNull(),
  tone: text("tone").notNull(),
  generatedOutput: text("generated_output").notNull(),
  rating: integer("rating"),
  tags: text("tags").array().default([]),
  isFavorite: boolean("is_favorite").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  lastUsed: timestamp("last_used"),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  savedPrompts: many(savedPrompts),
}));

export const savedPromptsRelations = relations(savedPrompts, ({ one }) => ({
  user: one(users, {
    fields: [savedPrompts.userId],
    references: [users.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertSavedPromptSchema = createInsertSchema(savedPrompts).omit({
  id: true,
  createdAt: true,
  lastUsed: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SavedPrompt = typeof savedPrompts.$inferSelect;
export type InsertSavedPrompt = z.infer<typeof insertSavedPromptSchema>;
