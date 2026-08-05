"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Systems", href: "/#systems" },
  { label: "How It Works", href: "/#process" },
  { label: "Demos", href: "/demos" },
];

export default function PublicHeader() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [open]);

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
      className="public-site sticky top-0 z-50 border-b border-border bg-[rgba(245,238,229,0.97)]"
    >
      <div className="public-container flex h-[70px] items-center justify-between md:h-[90px]">
        <a
          href="/"
          className="public-focus inline-flex items-center gap-2.5"
          onClick={() => setOpen(false)}
          aria-label="NorthFlow home"
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-foreground text-[10px] font-black">
            N
            <span className="absolute -right-px -top-px h-2 w-2 rounded-full bg-brand" />
          </span>
          <span className="text-lg font-black">NorthFlow</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="public-focus text-sm font-bold text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/start"
            className="public-focus group hidden min-h-12 items-center gap-2 rounded-[7px] border border-foreground px-5 text-sm font-extrabold transition-colors hover:bg-foreground hover:text-background sm:inline-flex"
          >
            Start Your System
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            type="button"
            className="public-focus inline-flex h-11 w-11 items-center justify-center border-l border-border md:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <nav className="public-container grid py-5" aria-label="Mobile navigation">
              {links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="public-focus flex min-h-14 items-center justify-between border-b border-border text-xl font-black"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-muted">0{index + 1}</span>
                </a>
              ))}
              <a
                href="/start"
                onClick={() => setOpen(false)}
                className="public-focus mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-[7px] bg-foreground px-5 text-sm font-extrabold text-background"
              >
                Start Your System
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
