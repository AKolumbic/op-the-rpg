"use client";

import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { useRole } from "./RoleProvider";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const { theme, toggle } = useTheme();
  const { user, profile } = useRole();
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    function onScroll() {
      setScrolled(window.scrollY > 80);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const displayName = profile?.display_name || user?.email;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card-bg/95 backdrop-blur-sm border-b-2 border-accent/40 translate-y-0"
          : "bg-transparent border-b-0 -translate-y-full"
      }`}
      style={!isHome ? { translate: "0 0" } : undefined}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="font-display text-2xl text-accent hover:text-comic-yellow transition-colors tracking-wide">
            OP the RPG
          </a>
          {user && (
            <div className="flex items-center gap-4">
              <a href="/dashboard" className="font-display text-sm text-foreground/70 hover:text-accent transition-colors tracking-wide">
                Dashboard
              </a>
              <a href="/campaigns" className="font-display text-sm text-foreground/70 hover:text-accent transition-colors tracking-wide">
                Campaigns
              </a>
              <a href="/" className="font-display text-sm text-foreground/70 hover:text-accent transition-colors tracking-wide">
                Explore
              </a>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-9 h-9 flex items-center justify-center border-2 border-card-border hover:border-accent rounded-full transition-colors text-foreground/60 hover:text-accent"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {user ? (
            <>
              <span className="text-sm text-muted hidden sm:inline">{displayName}</span>
              <button
                onClick={handleSignOut}
                className="font-display text-sm text-foreground/60 hover:text-accent transition-colors tracking-wide"
              >
                Sign Out
              </button>
            </>
          ) : (
            <a
              href="/auth/sign-in"
              className="font-display text-sm text-foreground/60 hover:text-accent transition-colors tracking-wide"
            >
              Sign In
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
