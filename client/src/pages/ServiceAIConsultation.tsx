import { Link } from "wouter";
import { ArrowRight, Check, Brain, Lightbulb, Zap, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ServiceAIConsultation() {
  const features = [
    {
      icon: Brain,
      title: "AI Strategy & Planning",
      description: "Develop a comprehensive AI adoption strategy aligned with your business goals.",
    },
    {
      icon: Lightbulb,
      title: "Use Case Identification",
      description: "Identify high-impact AI opportunities in your business processes.",
    },
    {
      icon: Zap,
      title: "Implementation Guidance",
      description: "Expert guidance on AI tool selection and implementation.",
    },
    {
      icon: TrendingUp,
      title: "ROI Optimization",
      description: "Maximize return on investment from your AI initiatives.",
    },
  ];

  const services = [
    {
      title: "AI Readiness Assessment",
      description: "Evaluate your organization's readiness for AI adoption.",
      benefits: [
        "Current state analysis",
        "Data infrastructure review",
        "Team capability assessment",
        "Roadmap development",
      ],
    },
    {
      title: "AI Tool Evaluation",
      description: "Compare and select the right AI tools for your needs.",
      benefits: [
        "Tool comparison analysis",
        "Vendor evaluation",
        "Cost-benefit analysis",
        "Implementation planning",
      ],
    },
    {
      title: "Workflow Automation",
      description: "Automate repetitive tasks with AI and machine learning.",
      benefits: [
        "Process automation",
        "Document processing",
        "Customer service automation",
        "Data analysis automation",
      ],
    },
    {
      title: "Team Training",
      description: "Train your team on AI tools and best practices.",
      benefits: [
        "AI fundamentals training",
        "Tool-specific training",
        "Best practices guidance",
        "Ongoing support",
      ],
    },
  ];

  const aiTools = [
    "ChatGPT & GPT-4",
    "Claude AI",
    "Gemini Pro",
    "Midjourney",
    "Zapier AI",
    "Make.com Automation",
    "Custom LLM Integration",
    "AI Analytics Tools",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24 border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-block mb-4 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <span className="text-sm font-semibold text-accent">AI Strategy & Implementation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              AI Consultation & Strategy
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Unlock the potential of artificial intelligence for your business. From strategy to implementation, we guide you through your AI transformation journey.
            </p>
            <Link href="/contact">
              <a className="btn-primary inline-flex items-center justify-center gap-2">
                Schedule Consultation
                <ArrowRight className="w-4 h-4" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container">
          <h2 className="section-title mb-12">Core Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-card border border-border rounded-xl p-8">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 border-b border-border bg-secondary/30">
        <div className="container">
          <h2 className="section-title mb-12">Our Services</h2>
          <div className="space-y-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl p-8 md:p-12">
                <h3 className="text-2xl font-semibold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools & Platforms */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container">
          <h2 className="section-title mb-12">AI Tools & Platforms We Work With</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {aiTools.map((tool, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-foreground font-medium">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Impact */}
      <section className="py-16 md:py-24 border-b border-border bg-gradient-to-r from-accent/5 to-blue-600/5">
        <div className="container">
          <h2 className="section-title mb-12">AI Impact Metrics</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">50%</div>
              <div className="text-muted-foreground">Time Savings with Automation</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">3x</div>
              <div className="text-muted-foreground">Productivity Increase</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">$100K+</div>
              <div className="text-muted-foreground">Annual Savings Potential</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to Embrace AI for Your Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how AI can transform your operations and create competitive advantages.
          </p>
          <Link href="/contact">
            <a className="btn-primary inline-flex items-center justify-center gap-2">
              Start Your AI Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
