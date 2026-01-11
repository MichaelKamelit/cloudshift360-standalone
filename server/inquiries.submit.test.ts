import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";

describe("inquiries.submit", () => {
  it("should successfully submit an inquiry with valid data", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.inquiries.submit({
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      company: "Tech Corp",
      serviceType: "cloud-devops",
      message: "We need help with our cloud infrastructure migration.",
      budget: "25k-50k",
      timeline: "asap",
    });

    expect(result.success).toBe(true);
    expect(result.inquiryId).toBeDefined();
    expect(typeof result.inquiryId).toBe("number");
  });

  it("should reject inquiry with missing required fields", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    try {
      await caller.inquiries.submit({
        name: "",
        email: "john@example.com",
        serviceType: "cloud-devops",
        message: "Test message",
      } as any);
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should reject inquiry with invalid email", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    try {
      await caller.inquiries.submit({
        name: "John Doe",
        email: "invalid-email",
        serviceType: "cloud-devops",
        message: "Test message",
      } as any);
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should reject inquiry with short message", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    try {
      await caller.inquiries.submit({
        name: "John Doe",
        email: "john@example.com",
        serviceType: "cloud-devops",
        message: "Short",
      } as any);
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should accept optional fields", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.inquiries.submit({
      name: "Jane Smith",
      email: "jane@example.com",
      serviceType: "it-security",
      message: "We need to improve our network security infrastructure.",
    });

    expect(result.success).toBe(true);
    expect(result.inquiryId).toBeDefined();
  });
});
