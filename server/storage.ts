import { users, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createGoogleUser(userData: { googleId: string; email: string; username: string; plan: string }): Promise<User>;
  linkGoogleAccount(userId: number, googleId: string): Promise<void>;
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

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.googleId, googleId));
    return user || undefined;
  }

  async createGoogleUser(userData: { googleId: string; email: string; username: string; plan: string }): Promise<User> {
    const promptsLimit = userData.plan === 'Free' ? 50 : 
                        userData.plan === 'Starter' ? 125 : 
                        userData.plan === 'Pro' ? 500 : 1000;

    const [user] = await db
      .insert(users)
      .values({
        username: userData.username,
        password: '', // Empty password for Google OAuth users
        email: userData.email,
        plan: userData.plan,
        promptsUsed: 0,
        promptsLimit: promptsLimit,
        googleId: userData.googleId,
        authProvider: 'google',
        isEmailVerified: 1
      })
      .returning();
    return user;
  }

  async linkGoogleAccount(userId: number, googleId: string): Promise<void> {
    await db
      .update(users)
      .set({ googleId: googleId })
      .where(eq(users.id, userId));
  }
}

export const storage = new DatabaseStorage();
