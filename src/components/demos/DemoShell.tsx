import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { DemoSite } from "@/data/demo-sites";
import DemoHero from "./DemoHero";
import DemoJourney from "./DemoJourney";
import DemoRequestBuilder from "./DemoRequestBuilder";

export default function DemoShell({ demo }: { demo: DemoSite }) {
  const style = {
    "--demo-background": demo.theme.background,
    "--demo-surface": demo.theme.surface,
    "--demo-text": demo.theme.text,
    "--demo-muted": demo.theme.muted,
    "--demo-border": demo.theme.border,
    "--demo-accent": demo.theme.accent,
    "--demo-accent-text": demo.theme.accentText,
  } as CSSProperties;

  return (
    <div
      className="public-site min-h-screen bg-[var(--demo-background)] text-[var(--demo-text)]"
      style={style}
    >
      <div className="border-b border-black/15 bg-[#11100d] px-5 py-2.5 text-[#f5eee5] md:px-10">
        <div className="mx-auto flex max-w-[1220px] items-center justify-between gap-5 text-[11px] font-bold">
          <p><strong className="text-[#e08d57]">NorthFlow Concept Demo</strong> · Fictional business</p>
          <a href="/demos" className="public-focus hidden underline underline-offset-4 sm:inline">Browse all demos</a>
        </div>
      </div>

      <header className="border-b border-[var(--demo-border)] px-5 md:px-10">
        <div className="mx-auto flex h-[78px] max-w-[1220px] items-center justify-between gap-5 md:h-[96px]">
          <a href={`/demos/${demo.slug}`} className="public-focus inline-flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--demo-accent)] text-[11px] font-black text-[var(--demo-accent)]">{demo.initials}</span>
            <span className="text-lg font-black md:text-xl">{demo.businessName}</span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label={`${demo.businessName} navigation`}>
            <a href="#services" className="public-focus text-sm font-bold text-[var(--demo-muted)] hover:text-[var(--demo-text)]">Services</a>
            <a href="#journey" className="public-focus text-sm font-bold text-[var(--demo-muted)] hover:text-[var(--demo-text)]">Process</a>
            <a href="#faq" className="public-focus text-sm font-bold text-[var(--demo-muted)] hover:text-[var(--demo-text)]">FAQ</a>
          </nav>
          <a href="#request" className="public-focus hidden min-h-12 items-center gap-2 rounded-[7px] bg-[var(--demo-accent)] px-5 text-sm font-black text-[var(--demo-accent-text)] sm:inline-flex">
            {demo.primaryAction}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main>
        <DemoHero demo={demo} />

        <section className="border-y border-[var(--demo-border)] bg-[var(--demo-text)] px-5 py-5 text-[var(--demo-background)] md:px-10">
          <div className="mx-auto grid max-w-[1220px] gap-4 sm:grid-cols-3">
            {demo.trustPoints.map((point) => (
              <p key={point} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.12em]">
                <span className="text-[var(--demo-accent)]">✓</span>{point}
              </p>
            ))}
          </div>
        </section>

        <section id="services" className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1220px]">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--demo-accent)]">Relevant services</p>
                <h2 className="mt-6 text-[clamp(2.8rem,4.8vw,4.5rem)] font-black leading-[0.94]">A clear offer before the request begins.</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {demo.services.map((service, index) => (
                  <article key={service.title} className="min-h-[280px] rounded-[8px] border border-[var(--demo-border)] bg-[var(--demo-surface)] p-6">
                    <span className="text-[11px] font-black text-[var(--demo-accent)]">0{index + 1}</span>
                    <h3 className="mt-16 text-2xl font-black">{service.title}</h3>
                    <p className="mt-4 text-sm font-medium leading-7 text-[var(--demo-muted)]">{service.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <DemoJourney demo={demo} />
        <DemoRequestBuilder demo={demo} />

        <section id="faq" className="border-t border-[var(--demo-border)] bg-[var(--demo-surface)] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1220px] gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--demo-accent)]">Common questions</p>
              <h2 className="mt-6 text-4xl font-black leading-[0.96] md:text-5xl">Clear expectations build trust.</h2>
            </div>
            <div className="border-t border-[var(--demo-border)]">
              {demo.faq.map((item) => (
                <article key={item.question} className="border-b border-[var(--demo-border)] py-6">
                  <h3 className="text-xl font-black">{item.question}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-[var(--demo-muted)]">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--demo-text)] px-5 py-20 text-[var(--demo-background)] md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--demo-accent)]">NorthFlow</p>
              <h2 className="mt-6 max-w-4xl text-[clamp(3rem,5.5vw,5.2rem)] font-black leading-[0.94]">Build the real system behind your customer journey.</h2>
            </div>
            <a href="/start" className="public-focus group inline-flex min-h-13 items-center justify-center gap-3 rounded-[7px] bg-[var(--demo-accent)] px-6 text-sm font-black text-[var(--demo-accent-text)]">
              Book a strategy call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--demo-border)] px-5 py-8 md:px-10">
        <div className="mx-auto flex max-w-[1220px] flex-col gap-5 text-xs font-bold text-[var(--demo-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>{demo.businessName} is a fictional Concept Demo created by NorthFlow.</p>
          <a href="/demos" className="public-focus inline-flex items-center gap-2 text-[var(--demo-text)]">
            <ArrowLeft className="h-4 w-4" /> Back to all demos
          </a>
        </div>
      </footer>
    </div>
  );
}
