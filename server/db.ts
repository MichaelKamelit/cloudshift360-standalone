import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, InsertInquiry, inquiries } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<any> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return null;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Create a new inquiry from contact form submission
 */
export async function createInquiry(inquiry: InsertInquiry): Promise<Inquiry | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create inquiry: database not available");
    return null;
  }

  try {
    const result = await db.insert(inquiries).values(inquiry);
    const inquiryId = result[0]?.insertId;
    
    if (!inquiryId) {
      throw new Error("Failed to get inquiry ID");
    }

    const created = await db.select().from(inquiries).where(eq(inquiries.id, Number(inquiryId))).limit(1);
    return created.length > 0 ? created[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create inquiry:", error);
    throw error;
  }
}

/**
 * Get all inquiries (admin only)
 */
export async function getInquiries() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get inquiries: database not available");
    return [];
  }

  try {
    return await db.select().from(inquiries);
  } catch (error) {
    console.error("[Database] Failed to get inquiries:", error);
    return [];
  }
}

/**
 * Update inquiry status (admin only)
 */
export async function updateInquiryStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update inquiry: database not available");
    return null;
  }

  try {
    await db.update(inquiries).set({ status: status as any }).where(eq(inquiries.id, id));
    const updated = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
    return updated.length > 0 ? updated[0] : null;
  } catch (error) {
    console.error("[Database] Failed to update inquiry:", error);
    throw error;
  }
}

export type Inquiry = typeof inquiries.$inferSelect;
