import { Link } from "wouter";
import { ArrowRight, Check, TrendingUp, Search, Video, BarChart3 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ServiceDigitalMarketing() {
  const features = [
    {
      icon: Search,
      title: "Technical SEO",
      description: "Optimize your website for search engines with technical best practices.",
    },
    {
      icon: TrendingUp,
      title: "Paid Advertising",
      description: "Strategic Google Ads and Facebook campaigns for maximum ROI.",
    },
    {
      icon: Video,
      title: "YouTube Marketing",
      description: "Grow your YouTube channel and reach your target audience.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Conversion",
      description: "Track, analyze, and optimize your marketing performance.",
    },
  ];

  const services = [
    {
      title: "Technical SEO & Optimization",
      description: "Improve your website's search visibility with technical optimization.",
      benefits: [
        "Sitemap & indexing fixes",
        "Google Search Console optimization",
        "Core Web Vitals improvement",
        "Schema markup implementation",
      ],
    },
    {
      title: "Google Ads Campaigns",
      description: "Drive qualified traffic with targeted Google Ads campaigns.",
      benefits: [
        "Keyword research & strategy",
        "Campaign setup & optimization",
        "Bid management",
        "Conversion tracking",
      ],
    },
    {
      title: "Facebook & Social Ads",
      description: "Reach your audience on social platforms with targeted campaigns.",
      benefits: [
        "Audience targeting",
        "Creative optimization",
        "A/B testing",
        "ROI optimization",
      ],
    },
    {
      title: "YouTube Channel Growth",
      description: "Build and grow your YouTube presence with strategic marketing.",
      benefits: [
        "Channel optimization",
        "Video SEO",
        "Audience growth strategies",
        "Monetization setup",
      ],
    },
  ];

  const expertise = [
    "Google Search Console",
    "Google Analytics 4",
    "Google Ads (Search, Display, Shopping)",
    "Facebook Ads Manager",
    "YouTube Analytics",
    "Keyword Research Tools",
    "SEO Audit Tools",
    "Conversion Rate Optimization",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24 border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-block mb-4 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <span className="text-sm font-semibold text-accent">Digital Marketing & Growth</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Data-Driven Digital Marketing Solutions
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Increase visibility, generate leads, and improve conversions with strategic SEO, paid advertising, and YouTube marketing.
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

      {/* Expertise */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container">
          <h2 className="section-title mb-12">Tools & Platforms</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {expertise.map((tool, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-foreground font-medium">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 md:py-24 border-b border-border bg-gradient-to-r from-accent/5 to-blue-600/5">
        <div className="container">
          <h2 className="section-title mb-12">Marketing Results</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">300%</div>
              <div className="text-muted-foreground">Avg Traffic Increase</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">45%</div>
              <div className="text-muted-foreground">Conversion Improvement</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">2.5x</div>
              <div className="text-muted-foreground">ROI Multiplier</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to Grow Your Digital Presence?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's develop a data-driven marketing strategy to reach your target audience and drive conversions.
          </p>
          <Link href="/contact">
            <a className="btn-primary inline-flex items-center justify-center gap-2">
              Get Your Marketing Audit
              <ArrowRight className="w-4 h-4" />
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
