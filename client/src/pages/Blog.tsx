import { Link } from "wouter";
import { Calendar, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const articles = [
  {
    id: "aws-cost-optimization",
    title: "AWS Cost Optimization Strategies: Save 25-40% on Your Cloud Bill",
    excerpt:
      "Discover proven techniques to reduce your AWS infrastructure costs without sacrificing performance. Learn about reserved instances, spot instances, and cost monitoring best practices.",
    category: "AWS",
    date: "January 3, 2026",
    readTime: "8 min read",
    image: "📊",
    featured: true,
  },
  {
    id: "azure-migration",
    title: "Azure Migration Best Practices: Zero-Downtime Transition Guide",
    excerpt:
      "Step-by-step guide to migrating your infrastructure to Azure with minimal downtime. Covers planning, assessment, execution, and post-migration optimization.",
    category: "Azure",
    date: "December 28, 2025",
    readTime: "12 min read",
    image: "☁️",
    featured: true,
  },
  {
    id: "devops-automation",
    title: "DevOps Automation with CI/CD: Reduce Deployment Time by 90%",
    excerpt:
      "Learn how to implement CI/CD pipelines using Docker, Kubernetes, and GitHub Actions. Automate testing, building, and deployment for faster releases.",
    category: "DevOps",
    date: "December 20, 2025",
    readTime: "10 min read",
    image: "⚙️",
    featured: true,
  },
  {
    id: "kubernetes-security",
    title: "Kubernetes Security Best Practices for Production Environments",
    excerpt:
      "Secure your Kubernetes clusters with RBAC, network policies, and pod security standards. Learn about vulnerability scanning and compliance requirements.",
    category: "Security",
    date: "December 15, 2025",
    readTime: "9 min read",
    image: "🔒",
    featured: false,
  },
  {
    id: "serverless-architecture",
    title: "Serverless Architecture: When and How to Use AWS Lambda",
    excerpt:
      "Understand serverless computing, its benefits and limitations. Learn when to use Lambda, API Gateway, and DynamoDB for cost-effective solutions.",
    category: "AWS",
    date: "December 10, 2025",
    readTime: "7 min read",
    image: "⚡",
    featured: false,
  },
  {
    id: "disaster-recovery",
    title: "Disaster Recovery Planning: Achieving 99.9% Uptime",
    excerpt:
      "Comprehensive guide to designing disaster recovery strategies. Learn about RTO, RPO, backup strategies, and failover mechanisms.",
    category: "Infrastructure",
    date: "December 5, 2025",
    readTime: "11 min read",
    image: "🛡️",
    featured: false,
  },
];

const categories = ["All", "AWS", "Azure", "DevOps", "Security", "Infrastructure"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter((a) => a.featured);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-accent/5 to-accent/10">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Cloud & DevOps Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert articles on AWS, Azure, DevOps, and cloud infrastructure.
            Learn best practices from 20+ years of experience.
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <Link key={article.id} href={`/blog/${article.id}`}>
                <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="h-40 bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center text-5xl">
                    {article.image}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-accent font-semibold text-sm">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container">
          <div className="mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="space-y-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <Link key={article.id} href={`/blog/${article.id}`}>
                  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer flex gap-6">
                    <div className="text-5xl flex-shrink-0">{article.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {article.date}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                      <div className="flex items-center gap-2 text-accent font-semibold">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No articles found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-accent/5 to-blue-600/5">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Need Expert Guidance?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our blog covers best practices, but every business is unique. Let's
            discuss your specific cloud challenges.
          </p>
          <Link href="/contact">
            <Button size="lg">Schedule a Free Consultation</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
