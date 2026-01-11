import { Check } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const packages = [
  {
    name: "Starter",
    description: "Perfect for small businesses and startups",
    price: "$2,000",
    period: "per project",
    features: [
      "Initial cloud architecture assessment",
      "Basic AWS/Azure setup and configuration",
      "Security best practices implementation",
      "Performance optimization",
      "30 days of post-deployment support",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    description: "Ideal for growing companies",
    price: "$5,500",
    period: "per project",
    features: [
      "Everything in Starter",
      "Advanced cloud architecture design",
      "Multi-cloud setup (AWS + Azure)",
      "CI/CD pipeline implementation",
      "Database optimization and migration",
      "Security audit and hardening",
      "90 days of post-deployment support",
      "Priority email and chat support",
      "Quarterly optimization reviews",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale operations",
    price: "Custom",
    period: "based on scope",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "24/7 monitoring and support",
      "Custom infrastructure design",
      "Disaster recovery planning",
      "Compliance and regulatory support",
      "Advanced DevOps automation",
      "Team training and documentation",
      "Unlimited support and consultations",
      "Annual strategic planning sessions",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

const faqs = [
  {
    question: "Do you offer custom pricing?",
    answer:
      "Yes, we offer custom pricing for Enterprise packages and unique project requirements. Contact us for a personalized quote.",
  },
  {
    question: "What's included in post-deployment support?",
    answer:
      "Post-deployment support includes monitoring, bug fixes, performance optimization, and general guidance on using your new infrastructure.",
  },
  {
    question: "Can I upgrade my package later?",
    answer:
      "Absolutely! You can upgrade your package at any time. We'll adjust the pricing based on the additional services.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes, we offer flexible payment plans for larger projects. Contact us to discuss options that work for your budget.",
  },
  {
    question: "What if I need services not listed?",
    answer:
      "We offer a wide range of services beyond these packages. Contact us to discuss your specific needs and get a custom quote.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity. Small projects typically take 2-4 weeks, while larger migrations can take 2-3 months.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-accent/5 to-accent/10">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your cloud infrastructure needs. All
            plans include our commitment to measurable results and 99.9% uptime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-xl border transition-all ${
                  pkg.highlighted
                    ? "border-accent bg-accent/5 shadow-lg scale-105 md:scale-100"
                    : "border-border bg-card hover:shadow-lg"
                }`}
              >
                {pkg.highlighted && (
                  <div className="bg-accent text-accent-foreground py-2 px-4 rounded-t-xl text-center text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">
                    {pkg.name}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-sm">
                    {pkg.description}
                  </p>

                  <div className="mb-6">
                    <div className="text-4xl font-bold text-foreground">
                      {pkg.price}
                    </div>
                    <p className="text-muted-foreground text-sm">{pkg.period}</p>
                  </div>

                  <div
                    onClick={() => (window.location.href = "/contact")}
                    className="cursor-pointer"
                  >
                    <Button
                      className="w-full mb-8"
                      variant={pkg.highlighted ? "default" : "outline"}
                    >
                      {pkg.cta}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Note */}
          <div className="bg-muted/30 border border-border rounded-xl p-8 text-center mb-16">
            <p className="text-muted-foreground">
              All packages include cloud architecture assessment, security best
              practices, and performance optimization. Need a custom solution?{" "}
              <span
                onClick={() => (window.location.href = "/contact")}
                className="text-accent font-semibold cursor-pointer hover:underline"
              >
                Contact us
              </span>
              {" "}for a personalized quote.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <Link href="/contact">
              <Button size="lg">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
