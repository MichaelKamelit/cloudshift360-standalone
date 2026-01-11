import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "cloud-devops",
    message: "",
    budget: "",
    timeline: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitInquiry = trpc.inquiries.submit.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.message) {
        toast.error("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      // Submit inquiry via tRPC
      const result = await submitInquiry.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        serviceType: formData.serviceType,
        message: formData.message,
        budget: formData.budget || undefined,
        timeline: formData.timeline || undefined,
      });

      if (result.success) {
        toast.success("Thank you! We'll be in touch within 24 hours.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          serviceType: "cloud-devops",
          message: "",
          budget: "",
          timeline: "",
        });
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to submit form. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "michael@cloudshift360.com",
      href: "mailto:michael@cloudshift360.com",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "World Wide",
      href: null,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24 border-b border-border">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Have a project in mind? Let's discuss how we can help transform your infrastructure.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow"
                >
                  {info.href ? (
                    <a href={info.href} className="block">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{info.title}</h3>
                      <p className="text-muted-foreground hover:text-accent transition-colors">{info.content}</p>
                    </a>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{info.title}</h3>
                      <p className="text-muted-foreground">{info.content}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-2 text-foreground">Send us a Message</h2>
            <p className="text-muted-foreground mb-8">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input-field"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="input-field"
                  required
                />
              </div>

              {/* Phone & Company */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="input-field"
                  />
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Service Type *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="cloud-devops">Cloud & DevOps</option>
                  <option value="it-security">IT Security & Infrastructure</option>
                  <option value="digital-marketing">Digital Marketing & Growth</option>
                  <option value="ai-consultation">AI Consultation</option>
                  <option value="cloud-cost-audit">Cloud Cost Audit</option>
                  <option value="technical-consultation">Technical Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Budget & Timeline */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select timeline</option>
                    <option value="urgent">Urgent (This week)</option>
                    <option value="asap">ASAP (This month)</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, challenges, and goals..."
                  rows={6}
                  className="input-field resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || submitInquiry.isPending}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                {isSubmitting || submitInquiry.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                We respect your privacy. Your information will only be used to contact you about your inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-secondary/30 border-t border-border">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-foreground text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "What's your typical response time?",
                a: "We usually respond to inquiries within 24 hours during business days.",
              },
              {
                q: "Do you offer free consultations?",
                a: "Yes! We offer a free 30-minute consultation to discuss your needs and determine the best solution.",
              },
              {
                q: "What's your engagement model?",
                a: "We work on both fixed-price projects and hourly engagements, depending on your needs.",
              },
              {
                q: "Can you work with existing infrastructure?",
                a: "Absolutely. We specialize in auditing and optimizing existing systems across AWS, Azure, and on-premise infrastructure.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
