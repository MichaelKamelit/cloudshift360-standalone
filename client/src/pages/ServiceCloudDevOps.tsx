import { Link } from "wouter";
import { ArrowRight, Check, Cloud, Code, Zap, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ServiceCloudDevOps() {
  const features = [
    {
      icon: Cloud,
      title: "AWS & Azure Architecture",
      description: "Design scalable, secure cloud infrastructure tailored to your business needs.",
    },
    {
      icon: Code,
      title: "CI/CD Pipelines",
      description: "Automate deployments with GitHub Actions, Azure DevOps, and Jenkins.",
    },
    {
      icon: Zap,
      title: "Docker & Kubernetes",
      description: "Containerize applications and orchestrate at scale.",
    },
    {
      icon: Shield,
      title: "Infrastructure as Code",
      description: "Version-controlled, reproducible infrastructure with Terraform.",
    },
  ];

  const services = [
    {
      title: "Cloud Migration",
      description: "Move from on-premise to AWS or Azure with minimal downtime.",
      benefits: [
        "Zero-downtime migration strategy",
        "Data integrity verification",
        "Performance optimization",
        "Cost analysis and planning",
      ],
    },
    {
      title: "Performance Optimization",
      description: "Reduce latency, improve throughput, and optimize resource utilization.",
      benefits: [
        "Infrastructure audit",
        "Bottleneck identification",
        "Right-sizing recommendations",
        "Continuous monitoring setup",
      ],
    },
    {
      title: "Security Hardening",
      description: "Implement best practices for cloud security and compliance.",
      benefits: [
        "Security assessment",
        "IAM configuration",
        "Encryption setup",
        "Compliance documentation",
      ],
    },
    {
      title: "Disaster Recovery",
      description: "Ensure business continuity with robust backup and recovery solutions.",
      benefits: [
        "DR strategy design",
        "Backup automation",
        "Recovery testing",
        "RTO/RPO optimization",
      ],
    },
  ];

  const techStack = [
    "AWS (EC2, RDS, S3, Lambda, CloudFront)",
    "Azure (VMs, App Service, SQL Database, Cosmos DB)",
    "Docker & Kubernetes",
    "Terraform & CloudFormation",
    "GitHub Actions & Azure DevOps",
    "Jenkins & GitLab CI",
    "Prometheus & Grafana",
    "ELK Stack",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24 border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-block mb-4 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <span className="text-sm font-semibold text-accent">Cloud Infrastructure & DevOps</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Enterprise Cloud & DevOps Solutions
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Design, deploy, and manage scalable cloud infrastructure on AWS and Azure. Automate your deployments, reduce costs, and achieve 99.9% uptime.
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

      {/* Tech Stack */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container">
          <h2 className="section-title mb-12">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {techStack.map((tech, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-foreground font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 md:py-24 border-b border-border bg-gradient-to-r from-accent/5 to-blue-600/5">
        <div className="container">
          <h2 className="section-title mb-12">Proven Results</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime Achieved</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">40%</div>
              <div className="text-muted-foreground">Avg Cost Reduction</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">15min</div>
              <div className="text-muted-foreground">Deployment Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to Transform Your Infrastructure?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your cloud architecture needs and create a scalable solution for your business.
          </p>
          <Link href="/contact">
            <a className="btn-primary inline-flex items-center justify-center gap-2">
              Start Your Free Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
