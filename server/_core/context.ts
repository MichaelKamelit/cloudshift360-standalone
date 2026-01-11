import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { parse as parseCookieHeader } from "cookie";
import type { User } from "../../drizzle/schema";
import * as db from "../db";
import { verifySessionToken } from "./auth";
import { COOKIE_NAME } from "@shared/const";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    // Get session token from cookies
    const cookieHeader = opts.req.headers.cookie;
    if (!cookieHeader) {
      return { req: opts.req, res: opts.res, user: null };
    }

    const cookies = parseCookieHeader(cookieHeader);
    const sessionToken = cookies[COOKIE_NAME];

    if (!sessionToken) {
      return { req: opts.req, res: opts.res, user: null };
    }

    // Verify the token
    const payload = await verifySessionToken(sessionToken);
    if (!payload) {
      return { req: opts.req, res: opts.res, user: null };
    }

    // Get user from database
    user = await db.getUserByOpenId(payload.userId);
  } catch (error) {
    // Authentication is optional for public procedures
    console.error("[Context] Authentication error:", error);
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
