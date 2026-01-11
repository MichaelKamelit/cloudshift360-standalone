import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 font-bold text-xl md:text-2xl text-foreground hover:text-accent transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-accent-foreground font-bold">
              CS
            </div>
            <span className="hidden sm:inline">CloudShift360</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="nav-link cursor-pointer">{link.label}</div>
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <Button
              onClick={() => logout()}
              variant="outline"
              size="sm"
            >
              Logout
            </Button>
          ) : (
            <Button
              asChild
              size="sm"
            >
              <a href={getLoginUrl()}>Login</a>
            </Button>
          )}
          <Link href="/contact">
            <div className="btn-primary text-sm cursor-pointer">Get Started</div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="container py-4 space-y-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  className="block py-2 text-foreground hover:text-accent transition-colors cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </div>
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              {isAuthenticated ? (
                <Button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  asChild
                  className="w-full"
                >
                  <a href={getLoginUrl()}>Login</a>
                </Button>
              )}
              <Link href="/contact">
                <div
                  className="block btn-primary text-center text-sm cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </div>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
