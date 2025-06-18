import { users, savedPrompts, type User, type InsertUser, type SavedPrompt, type InsertSavedPrompt } from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, and, like, or } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPlan(userId: number, plan: string, promptsLimit: number): Promise<void>;
  incrementPromptsUsed(userId: number): Promise<void>;
  
  // Saved prompts
  createSavedPrompt(prompt: InsertSavedPrompt): Promise<SavedPrompt>;
  getUserSavedPrompts(userId: number): Promise<SavedPrompt[]>;
  getSavedPrompt(id: number, userId: number): Promise<SavedPrompt | undefined>;
  updateSavedPrompt(id: number, userId: number, updates: Partial<SavedPrompt>): Promise<void>;
  deleteSavedPrompt(id: number, userId: number): Promise<void>;
  searchSavedPrompts(userId: number, query: string, taskType?: string): Promise<SavedPrompt[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserPlan(userId: number, plan: string, promptsLimit: number): Promise<void> {
    await db
      .update(users)
      .set({ plan, promptsLimit, promptsUsed: 0 })
      .where(eq(users.id, userId));
  }

  async incrementPromptsUsed(userId: number): Promise<void> {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (user) {
      await db
        .update(users)
        .set({ promptsUsed: user.promptsUsed + 1 })
        .where(eq(users.id, userId));
    }
  }

  // Saved prompts methods
  async createSavedPrompt(prompt: InsertSavedPrompt): Promise<SavedPrompt> {
    const [savedPrompt] = await db
      .insert(savedPrompts)
      .values(prompt)
      .returning();
    return savedPrompt;
  }

  async getUserSavedPrompts(userId: number): Promise<SavedPrompt[]> {
    return await db
      .select()
      .from(savedPrompts)
      .where(eq(savedPrompts.userId, userId))
      .orderBy(desc(savedPrompts.createdAt));
  }

  async getSavedPrompt(id: number, userId: number): Promise<SavedPrompt | undefined> {
    const [prompt] = await db
      .select()
      .from(savedPrompts)
      .where(and(eq(savedPrompts.id, id), eq(savedPrompts.userId, userId)));
    return prompt || undefined;
  }

  async updateSavedPrompt(id: number, userId: number, updates: Partial<SavedPrompt>): Promise<void> {
    await db
      .update(savedPrompts)
      .set(updates)
      .where(and(eq(savedPrompts.id, id), eq(savedPrompts.userId, userId)));
  }

  async deleteSavedPrompt(id: number, userId: number): Promise<void> {
    await db
      .delete(savedPrompts)
      .where(and(eq(savedPrompts.id, id), eq(savedPrompts.userId, userId)));
  }

  async searchSavedPrompts(userId: number, query: string, taskType?: string): Promise<SavedPrompt[]> {
    let whereCondition = eq(savedPrompts.userId, userId);
    
    if (query) {
      whereCondition = and(
        whereCondition,
        or(
          like(savedPrompts.name, `%${query}%`),
          like(savedPrompts.originalPrompt, `%${query}%`),
          like(savedPrompts.generatedOutput, `%${query}%`)
        )
      );
    }
    
    if (taskType && taskType !== 'all') {
      whereCondition = and(whereCondition, eq(savedPrompts.taskType, taskType));
    }

    return await db
      .select()
      .from(savedPrompts)
      .where(whereCondition)
      .orderBy(desc(savedPrompts.createdAt));
  }
}

export const storage = new DatabaseStorage();
