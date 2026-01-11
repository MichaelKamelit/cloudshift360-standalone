import { Link } from "wouter";
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks: Record<string, Array<{ label: string; href: string; external?: boolean }>> = {
    Services: [
      { label: "Cloud & DevOps", href: "/services/cloud-devops" },
      { label: "IT Security", href: "/services/it-security" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "AI Consultation", href: "/services/ai-consultation" },
    ],
    Company: [
      { label: "Home", href: "/" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contact", href: "/contact" },
    ],
    Connect: [
      { label: "Upwork Profile", href: "https://www.upwork.com/freelancers/~01d72498331fb8e9ed", external: true },
      { label: "GitHub", href: "https://github.com/michaelkamel", external: true },
      { label: "LinkedIn", href: "https://linkedin.com", external: true },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-accent-foreground font-bold">
                CS
              </div>
              <span className="font-bold text-lg">CloudShift360</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              20+ years of expertise in cloud architecture, DevOps, and digital transformation.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:michael@cloudshift360.com"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external === true ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link href={link.href}>
                        <a className="text-sm text-muted-foreground hover:text-accent transition-colors">
                          {link.label}
                        </a>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} CloudShift360. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
