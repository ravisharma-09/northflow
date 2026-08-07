"use client";

import { ArrowLeft, ArrowRight, Menu } from "lucide-react";
import type { DemoSite } from "@/data/demo-sites";
import DemoHero from "./DemoHero";
import DemoJourney from "./DemoJourney";
import DemoRequestBuilder from "./DemoRequestBuilder";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";

const displayFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const sansFont = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

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
      className={`min-h-screen bg-[var(--demo-background)] text-[var(--demo-text)] ${sansFont.className} overflow-hidden relative selection:bg-[var(--demo-accent)] selection:text-[var(--demo-accent-text)]`}
      style={style}
    >
      
      {/* Top Warning Banner - Dark neutral */}
      <div className="bg-[#11100d] border-b border-black/10 px-6 py-2.5 flex items-center justify-between text-[10px] font-bold text-white/50 tracking-widest uppercase">
        <p><strong className="text-[#e08d57]">NorthFlow Concept Demo</strong> <span className="hidden sm:inline">· Fictional business</span></p>
        <a href="/demos" className="flex items-center gap-2 hover:text-white transition-colors">
          <ArrowLeft className="w-3 h-3" />
          Back to Showcases
        </a>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--demo-border)] bg-[var(--demo-background)]/90 backdrop-blur-xl px-6 md:px-12">
        <div className="mx-auto flex h-[80px] md:h-[96px] max-w-7xl items-center justify-between">
          <a href={`/demos/${demo.slug}`} className="inline-flex items-center gap-4 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--demo-accent)] text-sm font-black text-[var(--demo-accent)] transition-colors">
              {demo.initials}
            </div>
            <span className={`${displayFont.className} text-xl md:text-2xl font-bold tracking-tight text-[var(--demo-text)]`}>
              {demo.businessName}
            </span>
          </a>
          
          <nav className="hidden items-center gap-10 lg:flex">
            <a href="#services" className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--demo-muted)] hover:text-[var(--demo-text)] transition-colors">Services</a>
            <a href="#journey" className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--demo-muted)] hover:text-[var(--demo-text)] transition-colors">Process</a>
            <a href="#faq" className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--demo-muted)] hover:text-[var(--demo-text)] transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="#request" className="hidden min-h-12 items-center gap-2 rounded-full bg-[var(--demo-accent)] px-6 text-sm font-bold text-[var(--demo-accent-text)] sm:inline-flex hover:scale-105 transform transition-transform duration-300">
              {demo.primaryAction}
            </a>
            <button className="lg:hidden p-2 text-[var(--demo-muted)] hover:text-[var(--demo-text)]">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <DemoHero demo={demo} />
        
        {/* Trust Strip */}
        <section className="border-y border-[var(--demo-border)] bg-[var(--demo-text)] px-6 py-6 text-[var(--demo-background)]">
          <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-3 text-center">
            {demo.trustPoints.map((point) => (
              <div 
                key={point} 
                className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em]"
              >
                <span className="text-[var(--demo-accent)]">✓</span>{point}
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="px-6 py-24 md:py-32 relative">
          <div className="mx-auto max-w-7xl relative z-10">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--demo-accent)] mb-6">Relevant Services</p>
                <h2 className={`${displayFont.className} text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.9] max-w-2xl text-[var(--demo-text)] tracking-tight`}>
                  A clear offer before the request begins.
                </h2>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {demo.services.map((service, index) => (
                  <motion.article 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    key={service.title} 
                    className="group min-h-[300px] flex flex-col justify-between rounded-none border border-[var(--demo-border)] bg-[var(--demo-surface)] p-8 transition-colors hover:border-[var(--demo-accent)]"
                  >
                    <span className={`${displayFont.className} text-4xl font-black text-[var(--demo-accent)] opacity-40 group-hover:opacity-100 transition-colors`}>0{index + 1}</span>
                    <div>
                      <h3 className={`${displayFont.className} text-3xl font-black text-[var(--demo-text)] mb-4`}>{service.title}</h3>
                      <p className="text-base font-medium leading-relaxed text-[var(--demo-muted)]">{service.text}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <DemoJourney demo={demo} />
        <DemoRequestBuilder demo={demo} />

        {/* FAQ Section */}
        <section id="faq" className="border-t border-[var(--demo-border)] bg-[var(--demo-surface)] px-6 py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--demo-accent)] mb-6">Common Questions</p>
              <h2 className={`${displayFont.className} text-5xl md:text-6xl lg:text-[5rem] font-black leading-[0.9] text-[var(--demo-text)] tracking-tight`}>Clear expectations build trust.</h2>
            </div>
            <div className="border-t border-[var(--demo-border)]">
              {demo.faq.map((item, index) => (
                <motion.article 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={item.question} 
                  className="border-b border-[var(--demo-border)] py-8"
                >
                  <h3 className={`${displayFont.className} text-2xl font-black text-[var(--demo-text)] mb-4`}>{item.question}</h3>
                  <p className="text-base font-medium leading-relaxed text-[var(--demo-muted)]">{item.answer}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action for NorthFlow */}
        <section className="bg-[var(--demo-text)] px-6 py-24 md:py-32 text-[var(--demo-background)]">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--demo-accent)] mb-6">NorthFlow</p>
              <h2 className={`${displayFont.className} max-w-4xl text-[clamp(3.5rem,6vw,5.5rem)] font-black leading-[0.9] tracking-tight`}>
                Build the real system behind your customer journey.
              </h2>
            </div>
            <a href="/start" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-[6px] bg-[var(--demo-accent)] px-8 text-sm font-bold text-[var(--demo-accent-text)] hover:-translate-y-1 transition-transform whitespace-nowrap">
              Book a strategy call
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--demo-border)] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 text-[11px] font-bold uppercase tracking-wider text-[var(--demo-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>{demo.businessName} is a fictional Concept Demo created by NorthFlow.</p>
          <a href="/demos" className="inline-flex items-center gap-2 hover:text-[var(--demo-text)] transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to all showcases
          </a>
        </div>
      </footer>
    </div>
  );
}
