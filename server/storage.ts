import { products, orders, waitlist, adminUsers, type Product, type InsertProduct, type Order, type InsertOrder, type Waitlist, type InsertWaitlist, type AdminUser, type InsertAdminUser } from "../shared/schema";
import { db } from "./db";
import { eq, desc, count } from "drizzle-orm";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  createProduct(product: InsertProduct): Promise<Product>; // For seeding
  getOrders(): Promise<Order[]>;
  getWaitlist(): Promise<Waitlist[]>;
  addToWaitlist(email: string, name?: string): Promise<Waitlist>;
  removeFromWaitlist(email: string): Promise<boolean>;
  getStats(): Promise<{
    totalOrders: number;
    totalWaitlistSignups: number;
    pendingOrders: number;
    recentOrders: Order[];
  }>;
  // Admin users
  getAdminUser(username: string): Promise<AdminUser | undefined>;
  createAdminUser(data: {
    username: string;
    passwordHash: string;
    twoFaSecret: string | null;
    twoFaEnabled: boolean;
  }): Promise<AdminUser>;
  updateAdminUser2FA(username: string, secret: string | null, enabled: boolean): Promise<AdminUser>;
  getAllAdminUsers(): Promise<AdminUser[]>;
  deleteAllAdminSessions(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  async getOrders(): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async getWaitlist(): Promise<Waitlist[]> {
    return await db.select().from(waitlist).orderBy(desc(waitlist.createdAt));
  }

  async addToWaitlist(email: string, name?: string): Promise<Waitlist> {
    const [entry] = await db.insert(waitlist).values({ email, name }).returning();
    return entry;
  }

  async getStats(): Promise<{
    totalOrders: number;
    totalWaitlistSignups: number;
    pendingOrders: number;
    recentOrders: Order[];
  }> {
    const ordersCount = await db.select({ count: count() }).from(orders);
    const waitlistCount = await db.select({ count: count() }).from(waitlist);
    const pendingCount = await db.select({ count: count() }).from(orders).where(eq(orders.status, "pending"));
    const recentOrders = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(5);

    return {
      totalOrders: ordersCount[0]?.count || 0,
      totalWaitlistSignups: waitlistCount[0]?.count || 0,
      pendingOrders: pendingCount[0]?.count || 0,
      recentOrders,
    };
  }

  async removeFromWaitlist(email: string): Promise<boolean> {
    const result = await db.delete(waitlist).where(eq(waitlist.email, email));
    return true;
  }

  async getAdminUser(username: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return user;
  }

  async createAdminUser(data: {
    username: string;
    passwordHash: string;
    twoFaSecret: string | null;
    twoFaEnabled: boolean;
  }): Promise<AdminUser> {
    const [user] = await db.insert(adminUsers).values(data).returning();
    return user;
  }

  async updateAdminUser2FA(username: string, secret: string | null, enabled: boolean): Promise<AdminUser> {
    const [user] = await db
      .update(adminUsers)
      .set({
        twoFaSecret: secret,
        twoFaEnabled: enabled,
        updatedAt: new Date(),
      })
      .where(eq(adminUsers.username, username))
      .returning();
    return user;
  }

  async getAllAdminUsers(): Promise<AdminUser[]> {
    return await db.select().from(adminUsers);
  }

  async deleteAllAdminSessions(): Promise<void> {
    // Clear 2FA secrets to force re-authentication
    await db.update(adminUsers).set({ twoFaEnabled: false, twoFaSecret: null, updatedAt: new Date() });
  }
}

export const storage = new DatabaseStorage();
