"use client";

import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { Container } from "./Primitives";

const columns = [
  {
    title: "Systems",
    links: [
      { label: "Website systems", href: "/systems/website" },
      { label: "Automation systems", href: "/systems/automation" },
      { label: "CRM & dashboards", href: "/systems/dashboards" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Connected system", href: "/#systems" },
      { label: "How it works", href: "/#process" },
      { label: "Concept demos", href: "/demos" },
    ],
  },
  {
    title: "Start",
    links: [
      { label: "Book a strategy call", href: "/start" },
      { label: "northflow.work@gmail.com", href: "mailto:northflow.work@gmail.com" },
    ],
  },
];

export default function PublicFooter() {
  return (
    <footer className="public-site border-t border-border bg-background py-16 md:py-20">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <a href="/" className="public-focus inline-flex items-center gap-2.5">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-foreground text-xs font-black">
                N
                <span className="absolute -right-px -top-px h-2 w-2 rounded-full bg-brand" />
              </span>
              <span className="text-xl font-black">NorthFlow</span>
            </a>
            <p className="mt-7 max-w-md text-sm font-medium leading-7 text-muted">
              Premium websites, lead capture, automation, CRM and business dashboards connected into one working system.
            </p>
            <a
              href="mailto:northflow.work@gmail.com"
              className="public-focus mt-8 inline-flex items-center gap-2 text-sm font-black transition-colors hover:text-brand"
            >
              <Mail className="h-4 w-4" />
              northflow.work@gmail.com
            </a>
          </div>

          <div className="grid gap-9 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-[11px] font-black uppercase tracking-[0.16em] text-muted">
                  {column.title}
                </h2>
                <div className="mt-5 grid gap-3">
                  {column.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="public-focus group inline-flex items-center gap-1 text-sm font-bold transition-colors hover:text-brand"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-border pt-7 text-xs font-bold text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NorthFlow. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="public-focus inline-flex items-center gap-2 self-start text-foreground transition-colors hover:text-brand"
          >
            Back to top
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </Container>
    </footer>
  );
}
