"use client";

import { ArrowUp, Mail } from "lucide-react";
import { Container } from "@/components/public/Primitives";

const footerColumns = [
  {
    title: "Systems",
    links: [
      { name: "Website systems", href: "/systems/website" },
      { name: "Automation systems", href: "/systems/automation" },
      { name: "Business dashboards", href: "/systems/dashboards" },
    ],
  },
  {
    title: "Homepage",
    links: [
      { name: "Problems", href: "/#problems" },
      { name: "Concept demos", href: "/demos" },
      { name: "Pricing preview", href: "/#pricing" },
      { name: "Delivery process", href: "/#process" },
    ],
  },
  {
    title: "Start",
    links: [
      { name: "Book a strategy call", href: "/start" },
      { name: "Email NorthFlow", href: "mailto:northflow.work@gmail.com" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="public-redesign border-t border-border bg-background py-14">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <a href="/" className="premium-focus inline-flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 bg-surface text-sm font-black text-foreground">
                N
                <span className="absolute -right-0.5 top-0.5 h-2.5 w-2.5 rounded-full bg-brand" />
              </span>
              <span className="font-display text-xl font-black text-foreground">
                NorthFlow
              </span>
            </a>
            <p className="mt-6 max-w-md text-sm font-medium leading-7 text-muted">
              Premium websites, booking automation and CRM systems for service
              businesses that need cleaner lead capture and stronger operations.
            </p>
            <a
              href="mailto:northflow.work@gmail.com"
              className="premium-focus mt-8 inline-flex items-center gap-2 text-sm font-black text-foreground transition-colors hover:text-brand"
            >
              <Mail className="h-4 w-4" />
              northflow.work@gmail.com
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                  {column.title}
                </h2>
                <div className="mt-5 grid gap-3">
                  {column.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="premium-focus text-sm font-bold text-foreground transition-colors hover:text-brand"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-border pt-8 text-xs font-bold text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} NorthFlow. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="premium-focus inline-flex items-center gap-2 self-start text-foreground transition-colors hover:text-brand"
          >
            Back to top
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </Container>
    </footer>
  );
}
