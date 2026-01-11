import { Link } from "wouter";
import { ArrowRight, TrendingDown, Zap, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Portfolio() {
  const caseStudies = [
    {
      title: "Azure Migration for 500+ Users",
      category: "Cloud Migration",
      challenge: "Legacy on-premise infrastructure causing performance bottlenecks and high maintenance costs.",
      solution: "Designed and executed comprehensive Azure migration strategy with zero downtime.",
      results: [
        "500+ users migrated seamlessly",
        "40% reduction in infrastructure costs",
        "99.9% uptime achieved",
        "Improved performance by 60%",
      ],
      icon: Users,
    },
    {
      title: "Cloud Cost Optimization Project",
      category: "Cost Optimization",
      challenge: "Excessive cloud spending with unused resources and inefficient configurations.",
      solution: "Comprehensive audit and optimization of cloud infrastructure across AWS and Azure.",
      results: [
        "35% total cost reduction",
        "Identified $150K+ in annual savings",
        "Implemented automated cost monitoring",
        "Right-sized all instances",
      ],
      icon: TrendingDown,
    },
    {
      title: "CI/CD Pipeline Implementation",
      category: "DevOps Automation",
      challenge: "Manual deployment processes causing delays and inconsistencies.",
      solution: "Built complete CI/CD pipeline using GitHub Actions and Docker.",
      results: [
        "Deployment time reduced from 4 hours to 15 minutes",
        "100% automation of testing and deployment",
        "Zero-downtime deployments",
        "Improved code quality and reliability",
      ],
      icon: Zap,
    },
  ];

  const stats = [
    { value: "88+", label: "Completed Projects" },
    { value: "25-40%", label: "Average Cost Reduction" },
    { value: "99.9%", label: "Uptime Achieved" },
    { value: "5.0★", label: "Average Rating" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24 border-b border-border">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Portfolio & Case Studies
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Real projects, real results. See how we've helped businesses transform their infrastructure.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="space-y-12">
            {caseStudies.map((study, idx) => {
              const Icon = study.icon;
              return (
                <div key={idx} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                    {/* Left: Content */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-sm font-semibold text-accent">{study.category}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                        {study.title}
                      </h3>

                      <div className="mb-8">
                        <h4 className="font-semibold text-foreground mb-2">Challenge</h4>
                        <p className="text-muted-foreground">{study.challenge}</p>
                      </div>

                      <div className="mb-8">
                        <h4 className="font-semibold text-foreground mb-2">Solution</h4>
                        <p className="text-muted-foreground">{study.solution}</p>
                      </div>
                    </div>

                    {/* Right: Results */}
                    <div className="bg-secondary/50 rounded-lg p-8 flex flex-col justify-center">
                      <h4 className="font-semibold text-foreground mb-6">Results Achieved</h4>
                      <ul className="space-y-4">
                        {study.results.map((result, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-foreground font-medium">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-accent/5 to-blue-600/5 border-t border-border">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to Achieve Similar Results?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help your business reach its infrastructure and growth goals.
          </p>
          <Link href="/contact">
            <a className="btn-primary inline-flex items-center justify-center gap-2">
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
