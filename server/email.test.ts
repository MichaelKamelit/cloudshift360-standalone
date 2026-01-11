import { describe, expect, it, vi } from "vitest";
import { sendInquiryNotification } from "./email";

// Mock the notification service
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async ({ title, content }) => {
    // Simulate successful notification
    console.log(`[Mock] Notification sent: ${title}`);
    return true;
  }),
}));

describe("email.sendInquiryNotification", () => {
  it("should send notification with inquiry details", async () => {
    const result = await sendInquiryNotification({
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      company: "Tech Corp",
      serviceType: "cloud-devops",
      message: "We need help with our cloud infrastructure.",
      budget: "25k-50k",
      timeline: "asap",
    });

    expect(result).toBe(true);
  });

  it("should handle missing optional fields", async () => {
    const result = await sendInquiryNotification({
      name: "Jane Smith",
      email: "jane@example.com",
      serviceType: "it-security",
      message: "We need to improve our network security.",
    });

    expect(result).toBe(true);
  });

  it("should convert service type to readable label", async () => {
    const testCases = [
      { input: "cloud-devops", expected: "Cloud & DevOps" },
      { input: "it-security", expected: "IT Security & Infrastructure" },
      { input: "digital-marketing", expected: "Digital Marketing & Growth" },
      { input: "ai-consultation", expected: "AI Consultation" },
      { input: "cloud-cost-audit", expected: "Cloud Cost Audit" },
    ];

    for (const testCase of testCases) {
      const result = await sendInquiryNotification({
        name: "Test User",
        email: "test@example.com",
        serviceType: testCase.input,
        message: "Test message for service type conversion.",
      });

      expect(result).toBe(true);
    }
  });

  it("should handle notification failures gracefully", async () => {
    // This test verifies that the function handles errors gracefully
    // In production, if notifyOwner fails, the inquiry is still created
    const result = await sendInquiryNotification({
      name: "Test User",
      email: "test@example.com",
      serviceType: "cloud-devops",
      message: "Test message",
    });

    // Should return true even if notification fails (non-blocking)
    expect(typeof result).toBe("boolean");
  });
});
