import { Link } from "wouter";
import { ArrowRight, Check, TrendingDown, BarChart3, Zap, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ServiceCloudCostAudit() {
  const features = [
    {
      icon: BarChart3,
      title: "Comprehensive Cost Analysis",
      description: "Detailed breakdown of your cloud spending across services and resources.",
    },
    {
      icon: TrendingDown,
      title: "Optimization Recommendations",
      description: "Identify cost-saving opportunities without sacrificing performance.",
    },
    {
      icon: Target,
      title: "Right-Sizing Strategy",
      description: "Optimize instance sizes and configurations for your actual usage.",
    },
    {
      icon: Zap,
      title: "Continuous Monitoring",
      description: "Ongoing cost tracking and optimization recommendations.",
    },
  ];

  const services = [
    {
      title: "Initial Cloud Audit",
      description: "Complete analysis of your current cloud infrastructure and spending.",
      benefits: [
        "Cost breakdown by service",
        "Usage pattern analysis",
        "Waste identification",
        "Savings opportunities report",
      ],
    },
    {
      title: "Reserved Instances & Savings Plans",
      description: "Leverage AWS/Azure reserved capacity for maximum savings.",
      benefits: [
        "RI/SP recommendations",
        "Commitment analysis",
        "Purchase planning",
        "20-40% savings potential",
      ],
    },
    {
      title: "Resource Optimization",
      description: "Right-size and optimize your cloud resources.",
      benefits: [
        "Instance right-sizing",
        "Storage optimization",
        "Network cost reduction",
        "Database optimization",
      ],
    },
    {
      title: "Cost Governance Setup",
      description: "Implement controls to prevent future cost overruns.",
      benefits: [
        "Budget alerts",
        "Tagging strategy",
        "Cost allocation",
        "Governance policies",
      ],
    },
  ];

  const auditAreas = [
    "Compute (EC2, App Service)",
    "Storage (S3, Blob Storage)",
    "Databases (RDS, Cosmos DB)",
    "Networking (Data Transfer, CDN)",
    "Unused Resources",
    "Reserved Instances",
    "Savings Plans",
    "Licensing Optimization",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24 border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-block mb-4 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <span className="text-sm font-semibold text-accent">Cloud Cost Optimization</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Cloud Cost Audit & Optimization
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Reduce your cloud spending by 25-40% without sacrificing performance. Comprehensive audits and ongoing optimization strategies.
            </p>
            <Link href="/contact">
              <a className="btn-primary inline-flex items-center justify-center gap-2">
                Schedule Free Audit
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

      {/* Audit Areas */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container">
          <h2 className="section-title mb-12">What We Audit</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {auditAreas.map((area, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-foreground font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 md:py-24 border-b border-border bg-gradient-to-r from-accent/5 to-blue-600/5">
        <div className="container">
          <h2 className="section-title mb-12">Typical Audit Results</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">35%</div>
              <div className="text-muted-foreground">Average Cost Reduction</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">$150K+</div>
              <div className="text-muted-foreground">Annual Savings Identified</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">2 weeks</div>
              <div className="text-muted-foreground">Implementation Timeline</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to Optimize Your Cloud Costs?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's conduct a comprehensive audit and identify your cost-saving opportunities.
          </p>
          <Link href="/contact">
            <a className="btn-primary inline-flex items-center justify-center gap-2">
              Schedule Your Free Audit
              <ArrowRight className="w-4 h-4" />
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
