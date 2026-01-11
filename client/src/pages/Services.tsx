import { Link } from "wouter";
import { ArrowRight, Cloud, Shield, TrendingUp, Zap, Database, Code } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Services() {
  const mainServices = [
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description: "AWS & Azure architecture, migration, optimization, and CI/CD automation.",
      href: "/services/cloud-devops",
      features: [
        "AWS & Azure Architecture",
        "Cloud Migration (Near-zero downtime)",
        "Cost Optimization (25-40% reduction)",
        "CI/CD Pipelines (GitHub Actions, Azure DevOps, Jenkins)",
        "Docker & Kubernetes",
        "Infrastructure as Code",
        "Networking & IAM",
        "Load Balancers & Auto-scaling"
      ],
    },
    {
      icon: Shield,
      title: "IT Security & Infrastructure",
      description: "Secure infrastructure, VPN setup, firewalls, disaster recovery, and server management.",
      href: "/services/it-security",
      features: [
        "Security Hardening & Best Practices",
        "VPN & Firewalls Configuration",
        "Proxmox VE Server Management",
        "VMware Virtualization",
        "Synology NAS Setup & Management",
        "Data Recovery Services",
        "Remote Technical Support",
        "Backup & Disaster Recovery"
      ],
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing & Growth",
      description: "SEO, paid advertising, YouTube marketing, social media management, and conversion optimization.",
      href: "/services/digital-marketing",
      features: [
        "Technical SEO Optimization",
        "Google Search Console Management",
        "Google Ads & Facebook Ads",
        "YouTube Marketing & Growth",
        "Social Media Management",
        "Sitemap & Indexing Issues",
        "Analytics & Reporting",
        "Conversion Rate Optimization"
      ],
    },
    {
      icon: Zap,
      title: "AI Consultation",
      description: "Strategic guidance on AI integration and implementation for your business and development teams.",
      href: "/services/ai-consultation",
      features: [
        "AI Strategy & Roadmap",
        "Implementation Guidance",
        "Developer Training",
        "Business Integration",
        "Use Case Analysis",
        "Tool Selection & Setup",
        "Performance Optimization",
        "Best Practices"
      ],
    },
    {
      icon: Database,
      title: "Cloud Cost Audit",
      description: "Comprehensive analysis and optimization to reduce cloud spending by 25-40%.",
      href: "/services/cloud-cost-audit",
      features: [
        "Cost Analysis & Benchmarking",
        "Optimization Recommendations",
        "AWS & Azure Cost Review",
        "Resource Right-sizing",
        "Reserved Instances Strategy",
        "Detailed Reporting",
        "Ongoing Monitoring",
        "Budget Planning"
      ],
    },
    {
      icon: Code,
      title: "Technical Consultation",
      description: "Expert guidance on architecture, technology selection, CRM integration, and best practices.",
      href: "/services/technical-consultation",
      features: [
        "Architecture Review",
        "Tech Stack Selection",
        "CRM Integration",
        "System Design",
        "Best Practices",
        "Performance Tuning",
        "Roadmapping",
        "Technology Assessment"
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24 border-b border-border">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Comprehensive Cloud & IT Solutions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            From cloud architecture to digital marketing, we provide end-to-end expertise to transform your business. 20+ years of proven results.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Link key={idx} href={service.href}>
                  <a className="service-card group h-full flex flex-col">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                      {service.features.length > 4 && (
                        <li className="text-sm text-accent font-semibold">
                          + {service.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                    <div className="flex items-center gap-2 text-accent font-semibold mt-auto">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 md:py-24 bg-secondary/30 border-t border-border">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground text-center">
            Why Choose CloudShift360
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">20+</div>
              <p className="text-foreground font-semibold mb-2">Years Experience</p>
              <p className="text-muted-foreground">Proven expertise in cloud architecture and IT solutions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">25-40%</div>
              <p className="text-foreground font-semibold mb-2">Cost Reduction</p>
              <p className="text-muted-foreground">Average savings on cloud infrastructure spending</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">99.9%</div>
              <p className="text-foreground font-semibold mb-2">Uptime</p>
              <p className="text-muted-foreground">Guaranteed reliability for your infrastructure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-accent/5 to-blue-600/5 border-t border-border">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our experts to discuss your specific needs and find the right solution.
          </p>
          <Link href="/contact">
            <a className="btn-primary inline-flex items-center justify-center gap-2">
              Schedule Free Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
