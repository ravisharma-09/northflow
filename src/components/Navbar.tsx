'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Set scrolled state for background change
    setScrolled(latest > 50);

    // Hide/show logic based on scroll direction
    if (latest > 150 && latest > previous) {
      setHidden(true); // scrolling down
    } else {
      setHidden(false); // scrolling up or at top
    }
  });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Our Work', href: '#projects' },
    { name: 'About Us', href: '#metrics' },
  ];

  return (
    <>
      <header
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-8 pointer-events-none"
      >
        <motion.div
          variants={{
            visible: { y: 0, opacity: 1 },
            hidden: { y: "-150%", opacity: 0 }
          }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="w-full max-w-[1040px] flex items-center justify-between border rounded-full px-8 py-3.5 pointer-events-auto transition-colors duration-500"
          style={{
            backgroundColor: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
            borderColor: scrolled ? 'var(--nav-border-scrolled)' : 'var(--nav-border)',
            boxShadow: scrolled ? 'var(--nav-shadow-scrolled)' : 'var(--nav-shadow)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background font-extrabold text-lg shadow-sm">
              N
            </span>
            <span className="font-display font-bold tracking-tight text-lg text-foreground">
              NorthFlow
            </span>
          </a>

          {/* Nav Links - Desktop */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-semibold text-muted hover:text-foreground transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA, Theme Toggle & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-surface/50 text-muted hover:text-foreground hover:bg-surface transition-all duration-300"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* CTA Button */}
            <a
              href="/start"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-bold text-sm hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-md group pointer-events-auto"
            >
              Start Your System
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background text-foreground group-hover:translate-x-0.5 transition-transform duration-300">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-full border border-border bg-surface/50 text-foreground hover:bg-surface cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-24 left-4 right-4 z-40 md:hidden bg-glass-bg border border-glass-border shadow-premium rounded-[32px] p-6 backdrop-blur-lg flex flex-col gap-4"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl text-base font-semibold text-foreground hover:text-brand hover:bg-surface transition-all duration-300"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <a
              href="/start"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-foreground text-background font-bold text-base hover:opacity-90 active:scale-95 transition-all duration-300 shadow-md group"
            >
              Start Your System
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background text-foreground group-hover:translate-x-0.5 transition-transform duration-300">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
