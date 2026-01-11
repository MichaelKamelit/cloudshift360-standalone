import { SignJWT, jwtVerify } from "jose";
import { ENV } from "./env";

export type SessionPayload = {
  userId: string;
  email: string;
  name: string;
  role: "admin" | "user";
};

const JWT_SECRET = new TextEncoder().encode(ENV.jwtSecret);

/**
 * Create a JWT session token
 */
export async function createSessionToken(
  payload: SessionPayload,
  expiresInMs: number = 365 * 24 * 60 * 60 * 1000 // 1 year
): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor((Date.now() + expiresInMs) / 1000))
    .sign(JWT_SECRET);

  return token;
}

/**
 * Verify and decode a JWT token
 */
export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as SessionPayload;
  } catch (error) {
    console.error("[Auth] Token verification failed:", error);
    return null;
  }
}

/**
 * Generate a random token for password reset or email verification
 */
export function generateRandomToken(length: number = 32): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

/**
 * Hash a password using a simple approach (in production, use bcrypt)
 * For now, we'll use a basic approach - in production use proper hashing
 */
export async function hashPassword(password: string): Promise<string> {
  // In production, use bcrypt or similar
  // For now, return a placeholder
  return Buffer.from(password).toString("base64");
}

/**
 * Verify a password
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  // In production, use bcrypt comparison
  return Buffer.from(hash, "base64").toString() === password;
}
