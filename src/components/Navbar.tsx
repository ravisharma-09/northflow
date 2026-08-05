"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cx } from "@/components/public/Primitives";

const navLinks = [
  { name: "Problems", href: "/#problems" },
  { name: "System", href: "/#system" },
  { name: "Solutions", href: "/#systems" },
  { name: "Demos", href: "/demos" },
  { name: "Pricing", href: "/#pricing" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="public-redesign fixed inset-x-0 top-0 z-50 border-b border-transparent px-4 py-4 md:px-6">
      <div
        className={cx(
          "mx-auto flex w-full max-w-[1220px] items-center justify-between rounded-[8px] border px-4 py-3 transition-colors duration-200 md:px-5",
          scrolled
            ? "border-border bg-glass-bg shadow-premium backdrop-blur-xl"
            : "border-border/70 bg-glass-bg/80 backdrop-blur-xl"
        )}
      >
        <a
          href="/"
          className="premium-focus flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 bg-surface text-sm font-black text-foreground">
            N
            <span className="absolute -right-0.5 top-0.5 h-2.5 w-2.5 rounded-full bg-brand" />
          </span>
          <span className="font-display text-lg font-black tracking-normal text-foreground">
            NorthFlow
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="premium-focus rounded-[6px] px-3 py-2 text-sm font-bold text-muted transition-colors hover:text-foreground"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/start"
            className="premium-focus hidden min-h-12 items-center justify-center gap-2 rounded-[6px] bg-foreground px-5 py-3 text-sm font-extrabold text-background transition-colors duration-200 hover:bg-brand-hover sm:inline-flex"
          >
            Strategy call
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="premium-focus inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-border bg-surface text-foreground lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mx-auto mt-2 w-full max-w-[1220px] rounded-[8px] border border-border bg-surface p-3 shadow-premium lg:hidden">
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="premium-focus rounded-[6px] px-3 py-3 text-sm font-black text-foreground"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/start"
              onClick={() => setMenuOpen(false)}
              className="premium-focus mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] bg-foreground px-5 py-3 text-sm font-extrabold text-background"
            >
              Book a strategy call
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
