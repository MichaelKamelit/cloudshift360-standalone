import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { createSessionToken, verifySessionToken } from "./auth";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  /**
   * Simple login endpoint - accepts email and password
   * In production, you should use proper password hashing (bcrypt)
   */
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      // For demo purposes, accept any email/password
      // In production, verify against database with proper hashing
      const user = await db.upsertUser({
        openId: email, // Use email as unique identifier
        name: email.split("@")[0],
        email: email,
        loginMethod: "email",
        lastSignedIn: new Date(),
      });

      if (!user) {
        res.status(400).json({ error: "Failed to create user" });
        return;
      }

      const sessionToken = await createSessionToken(
        {
          userId: user.openId,
          email: user.email || email,
          name: user.name || "",
          role: user.role || "user",
        },
        ONE_YEAR_MS
      );

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, {
        ...cookieOptions,
        maxAge: ONE_YEAR_MS,
      });

      res.json({
        success: true,
        user: {
          id: user.openId,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("[Auth] Login failed", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  /**
   * Logout endpoint - clears session cookie
   */
  app.post("/api/auth/logout", async (req: Request, res: Response) => {
    try {
      res.clearCookie(COOKIE_NAME);
      res.json({ success: true });
    } catch (error) {
      console.error("[Auth] Logout failed", error);
      res.status(500).json({ error: "Logout failed" });
    }
  });

  /**
   * Get current user info from session
   */
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      const token = req.cookies[COOKIE_NAME];

      if (!token) {
        res.status(401).json({ error: "Not authenticated" });
        return;
      }

      const payload = await verifySessionToken(token);

      if (!payload) {
        res.clearCookie(COOKIE_NAME);
        res.status(401).json({ error: "Invalid token" });
        return;
      }

      res.json({
        user: {
          id: payload.userId,
          email: payload.email,
          name: payload.name,
          role: payload.role,
        },
      });
    } catch (error) {
      console.error("[Auth] Get user failed", error);
      res.status(500).json({ error: "Failed to get user info" });
    }
  });
}
