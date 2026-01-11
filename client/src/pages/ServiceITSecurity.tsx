import { Link } from "wouter";
import { ArrowRight, Check, Lock, Server, Shield, Database } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ServiceITSecurity() {
  const features = [
    {
      icon: Lock,
      title: "VPN & Firewall Configuration",
      description: "Secure remote access and network protection with enterprise-grade solutions.",
    },
    {
      icon: Server,
      title: "Proxmox & VMware",
      description: "Virtualization infrastructure setup, management, and optimization.",
    },
    {
      icon: Database,
      title: "Synology NAS Setup",
      description: "Network storage configuration with RAID, backup, and disaster recovery.",
    },
    {
      icon: Shield,
      title: "Disaster Recovery",
      description: "Comprehensive backup and recovery solutions for business continuity.",
    },
  ];

  const services = [
    {
      title: "Network Security",
      description: "Implement robust security measures to protect your infrastructure.",
      benefits: [
        "Firewall configuration (Sophos, pfSense)",
        "VPN setup and management",
        "Network segmentation",
        "Intrusion detection systems",
      ],
    },
    {
      title: "Virtualization",
      description: "Deploy and manage virtualized infrastructure for scalability and efficiency.",
      benefits: [
        "Proxmox cluster setup",
        "VMware vSphere configuration",
        "VM optimization",
        "High availability setup",
      ],
    },
    {
      title: "Storage Solutions",
      description: "Reliable storage infrastructure with backup and redundancy.",
      benefits: [
        "Synology NAS configuration",
        "RAID setup and optimization",
        "Backup automation",
        "Disaster recovery planning",
      ],
    },
    {
      title: "Data Recovery",
      description: "Professional data recovery and restoration services.",
      benefits: [
        "Emergency recovery support",
        "Data integrity verification",
        "Recovery documentation",
        "Prevention strategies",
      ],
    },
  ];

  const solutions = [
    "Sophos UTM9 Firewall",
    "Proxmox VE Virtualization",
    "VMware vSphere",
    "Synology NAS Storage",
    "OpenVPN & WireGuard",
    "Backup & Restore Solutions",
    "CRM Integrations",
    "Access Control Systems",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24 border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-block mb-4 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <span className="text-sm font-semibold text-accent">IT Security & Infrastructure</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Enterprise IT Security & Infrastructure
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Secure your infrastructure with enterprise-grade firewalls, virtualization, storage solutions, and disaster recovery planning.
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

      {/* Solutions */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container">
          <h2 className="section-title mb-12">Solutions & Technologies</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {solutions.map((solution, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-foreground font-medium">{solution}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Benefits */}
      <section className="py-16 md:py-24 border-b border-border bg-gradient-to-r from-accent/5 to-blue-600/5">
        <div className="container">
          <h2 className="section-title mb-12">Security & Reliability</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">99.9%</div>
              <div className="text-muted-foreground">Infrastructure Uptime</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-muted-foreground">Monitoring & Support</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">Zero</div>
              <div className="text-muted-foreground">Data Loss Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Secure Your Infrastructure Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's assess your current security posture and implement enterprise-grade protection.
          </p>
          <Link href="/contact">
            <a className="btn-primary inline-flex items-center justify-center gap-2">
              Start Your Free Security Audit
              <ArrowRight className="w-4 h-4" />
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
