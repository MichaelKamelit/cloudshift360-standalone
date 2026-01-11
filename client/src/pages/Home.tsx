import { Link } from "wouter";
import { ArrowRight, Cloud, Shield, TrendingUp, Award, Users, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";

export default function Home() {
  const stats = [
    { value: "20+", label: "Years of Experience" },
    { value: "88", label: "Successful Projects" },
    { value: "25-40%", label: "Avg Cost Reduction" },
    { value: "99.9%", label: "Uptime Achievement" },
  ];

  const services = [
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description: "AWS & Azure architecture, migration, optimization, and CI/CD automation.",
      href: "/services/cloud-devops",
    },
    {
      icon: Shield,
      title: "IT Security",
      description: "Infrastructure security, VPN, firewalls, and disaster recovery solutions.",
      href: "/services/it-security",
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description: "SEO, paid ads, YouTube marketing, and conversion optimization.",
      href: "/services/digital-marketing",
    },
  ];



  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32 lg:py-40 border-b border-border">
        <div className="container">
          <div className="max-w-4xl">
            <div className="inline-block mb-4 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <span className="text-sm font-semibold text-accent">20+ Years of Cloud Excellence</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
              Enterprise Cloud Solutions for <span className="gradient-text">Measurable Results</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Transform your infrastructure with AWS & Azure expertise, DevOps automation, and proven security practices. Reduce costs by 25-40% while achieving 99.9% uptime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <a className="btn-primary inline-flex items-center justify-center gap-2">
                  Start Your Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
              <Link href="/services">
                <a className="btn-secondary inline-flex items-center justify-center">
                  Explore Services
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Core Services</h2>
            <p className="section-subtitle">
              Comprehensive solutions spanning cloud infrastructure, security, and digital growth.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Link key={idx} href={service.href}>
                  <a className="service-card group">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex items-center gap-2 text-accent font-semibold">
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

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 border-b border-border bg-secondary/30">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose CloudShift360</h2>
            <p className="section-subtitle">
              Proven expertise, transparent communication, and results-driven solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-8">
              <Award className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-foreground">Proven Track Record</h3>
              <p className="text-muted-foreground">
                88+ successful projects with consistent 5-star ratings. Real results: 25-40% cost reduction, 99.9% uptime.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8">
              <Users className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-foreground">Client-Focused</h3>
              <p className="text-muted-foreground">
                Clear communication, transparent pricing, and solutions tailored to your business goals.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8">
              <Zap className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-foreground">Fast & Reliable</h3>
              <p className="text-muted-foreground">
                Quick response times, production-ready solutions, and ongoing support when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-16 md:py-24 border-b border-border bg-gradient-to-r from-accent/5 to-blue-600/5">
        <div className="container text-center">
          <h2 className="section-title mb-6">Ready to Transform Your Infrastructure?</h2>
          <p className="section-subtitle mx-auto mb-8">
            Let's discuss how we can help your business scale efficiently and securely.
          </p>
          <Link href="/contact">
            <a className="btn-primary inline-flex items-center justify-center gap-2">
              Schedule a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
