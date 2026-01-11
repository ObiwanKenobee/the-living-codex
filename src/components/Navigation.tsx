import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ThemeToggle from "./ThemeToggle";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navItems = [
  { label: "The Codex", href: "#codex" },
  { label: "Four Pillars", href: "#pillars" },
  { label: "Habitat One", href: "#habitat" },
  { label: "Writings", href: "#writings" },
  { label: "Events", href: "/events", isRoute: true },
  { label: "Resources", href: "/resources", isRoute: true },
  { label: "Sponsorship", href: "/sponsorship", isRoute: true },
  { label: "About", href: "/about", isRoute: true },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-wide">
        <div className="flex items-center justify-between h-14">
          <a href="#" className="font-sans-nav text-foreground tracking-widest">
            Atlas Codex
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="font-sans-nav text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-sans-nav text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {item.label}
                </a>
              )
            ))}
            
            {/* Auth Link */}
            {user ? (
              <Link
                to="/dashboard"
                className="font-sans-nav text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1"
              >
                <User size={16} />
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="font-sans-nav text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1"
              >
                <LogIn size={16} />
                Sign In
              </Link>
            )}
            
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-sans-nav text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-sans-nav text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                )
              ))}
              
              {/* Mobile Auth Link */}
              {user ? (
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="font-sans-nav text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1"
                >
                  <User size={16} />
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="font-sans-nav text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1"
                >
                  <LogIn size={16} />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
