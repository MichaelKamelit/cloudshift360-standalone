import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@cloudshift360.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("admin dashboard - inquiries.list", () => {
  it("should allow admin to list inquiries", async () => {
    const adminCtx = createAdminContext();
    const caller = appRouter.createCaller(adminCtx);

    // Should not throw error
    const result = await caller.inquiries.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should deny regular users from listing inquiries", async () => {
    const userCtx = createUserContext();
    const caller = appRouter.createCaller(userCtx);

    try {
      await caller.inquiries.list();
      expect.fail("Should have thrown FORBIDDEN error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
      expect(error.message).toContain("Only admins");
    }
  });

  it("should deny unauthenticated users from listing inquiries", async () => {
    const unauthCtx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(unauthCtx);

    try {
      await caller.inquiries.list();
      expect.fail("Should have thrown UNAUTHORIZED error");
    } catch (error: any) {
      expect(error.code).toBe("UNAUTHORIZED");
    }
  });
});

describe("admin dashboard - inquiries.updateStatus", () => {
  it("should allow admin to attempt updating inquiry status", async () => {
    const adminCtx = createAdminContext();
    const caller = appRouter.createCaller(adminCtx);

    try {
      // This will fail because the inquiry doesn't exist, but it proves
      // the permission check passed (admin can attempt the operation)
      await caller.inquiries.updateStatus({
        id: 999,
        status: "contacted",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      // Should fail with NOT_FOUND or INTERNAL_SERVER_ERROR, not FORBIDDEN
      // The key is that permission was granted (no FORBIDDEN error)
      const allowedErrors = ["NOT_FOUND", "INTERNAL_SERVER_ERROR"];
      expect(allowedErrors).toContain(error.code);
    }
  });

  it("should deny regular users from updating inquiry status", async () => {
    const userCtx = createUserContext();
    const caller = appRouter.createCaller(userCtx);

    try {
      await caller.inquiries.updateStatus({
        id: 1,
        status: "contacted",
      });
      expect.fail("Should have thrown FORBIDDEN error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
      expect(error.message).toContain("Only admins");
    }
  });

  it("should deny unauthenticated users from updating inquiry status", async () => {
    const unauthCtx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(unauthCtx);

    try {
      await caller.inquiries.updateStatus({
        id: 1,
        status: "contacted",
      });
      expect.fail("Should have thrown UNAUTHORIZED error");
    } catch (error: any) {
      expect(error.code).toBe("UNAUTHORIZED");
    }
  });
});
