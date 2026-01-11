import { notifyOwner } from "./_core/notification";

export interface InquiryEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceType: string;
  message: string;
  budget?: string;
  timeline?: string;
}

/**
 * Send email notification to owner when new inquiry is submitted
 */
export async function sendInquiryNotification(inquiry: InquiryEmailData): Promise<boolean> {
  try {
    const serviceTypeLabel = getServiceTypeLabel(inquiry.serviceType);
    
    const emailContent = `
New Inquiry Received

Name: ${inquiry.name}
Email: ${inquiry.email}
${inquiry.phone ? `Phone: ${inquiry.phone}` : ""}
${inquiry.company ? `Company: ${inquiry.company}` : ""}

Service Type: ${serviceTypeLabel}
${inquiry.budget ? `Budget: ${inquiry.budget}` : ""}
${inquiry.timeline ? `Timeline: ${inquiry.timeline}` : ""}

Message:
${inquiry.message}

---
Reply to: ${inquiry.email}
`;

    const success = await notifyOwner({
      title: `New Inquiry: ${inquiry.name} - ${serviceTypeLabel}`,
      content: emailContent,
    });

    if (!success) {
      console.warn("[Email] Failed to send notification to owner");
      return false;
    }

    console.log(`[Email] Notification sent for inquiry from ${inquiry.email}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send inquiry notification:", error);
    return false;
  }
}

/**
 * Convert service type code to human-readable label
 */
function getServiceTypeLabel(serviceType: string): string {
  const labels: Record<string, string> = {
    "cloud-devops": "Cloud & DevOps",
    "it-security": "IT Security & Infrastructure",
    "digital-marketing": "Digital Marketing & Growth",
    "ai-consultation": "AI Consultation",
    "cloud-cost-audit": "Cloud Cost Audit",
    "technical-consultation": "Technical Consultation",
    "other": "Other",
  };
  return labels[serviceType] || serviceType;
}
