"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { DemoSite } from "@/data/demo-sites";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";

const displayFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function DemoHero({ demo }: { demo: DemoSite }) {
  return (
    <section className="px-6 pb-16 pt-12 md:px-12 md:pb-32 md:pt-24 bg-[var(--demo-background)]">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--demo-accent)]">
            {demo.eyebrow}
          </p>
          <h1 className={`${displayFont.className} mt-8 text-[clamp(4rem,7vw,7rem)] font-black leading-[0.88] text-[var(--demo-text)] tracking-tighter`}>
            {demo.headline}
          </h1>
          <p className="mt-8 max-w-lg text-lg font-medium leading-relaxed text-[var(--demo-muted)]">
            {demo.description}
          </p>
          
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#request"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-[6px] bg-[var(--demo-accent)] px-8 text-sm font-black text-[var(--demo-accent-text)] transition-transform hover:-translate-y-1"
            >
              {demo.primaryAction}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#services"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-[6px] border-2 border-[var(--demo-border)] px-8 text-sm font-black text-[var(--demo-text)] transition-colors hover:border-[var(--demo-text)]"
            >
              Explore the service
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.15em] text-[var(--demo-muted)]">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--demo-accent)] opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--demo-accent)]"></span>
            </span>
            {demo.location}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/3] lg:aspect-[1.05/1] overflow-hidden rounded-none bg-[var(--demo-text)] shadow-2xl">
            <Image
              src={demo.image}
              alt={demo.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-1000 hover:scale-105"
            />
            
            {/* Minimalist Floating Status */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute left-6 top-6 bg-[var(--demo-background)] px-4 py-3 shadow-lg border border-[var(--demo-border)] rounded-[4px]"
            >
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--demo-accent)] mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                <p className="text-[11px] font-bold text-[var(--demo-text)]">Accepting requests</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute bottom-6 left-6 right-6 bg-[var(--demo-text)] p-6 shadow-2xl md:left-auto md:w-[65%] rounded-[6px]"
            >
              <div className="flex justify-between items-center mb-3">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--demo-background)] opacity-60">Journey Stage</p>
              </div>
              <p className={`${displayFont.className} text-xl font-black text-[var(--demo-background)] mb-4`}>Details ready for review</p>
              <div className="h-1 w-full bg-[var(--demo-background)]/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="h-full bg-[var(--demo-accent)]"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
