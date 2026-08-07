"use client";

import type { DemoSite } from "@/data/demo-sites";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";

const displayFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function DemoJourney({ demo }: { demo: DemoSite }) {
  const imageStyle = demo.designConfig.imageStyle;
  return (
    <section id="journey" className="border-y border-[var(--demo-border)] bg-[var(--demo-surface)] px-6 py-24 md:px-12 md:py-32 relative">
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--demo-accent)]">The Customer Journey</p>
            <h2 className={`${displayFont.className} mt-6 max-w-xl text-5xl md:text-6xl lg:text-[5rem] font-black leading-[0.9] text-[var(--demo-text)] tracking-tight`}>
              From interest to a request the team can use.
            </h2>
            <p className="mt-6 text-[var(--demo-muted)] text-lg font-medium leading-relaxed max-w-md">
              We design paths that qualify intent before your team ever gets involved, saving hours of back-and-forth.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 md:left-[35px] top-4 bottom-12 w-0.5 bg-[var(--demo-border)] hidden sm:block" />
            
            <div className="flex flex-col gap-12">
              {demo.journey.map((step, index) => (
                <motion.article 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  key={step.number} 
                  className="relative grid gap-6 sm:grid-cols-[72px_1fr] group"
                >
                  <div className="flex flex-col items-start sm:items-center relative z-10">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--demo-accent)] bg-[var(--demo-surface)] text-sm font-black text-[var(--demo-accent)] transition-colors group-hover:bg-[var(--demo-accent)] group-hover:text-[var(--demo-accent-text)]">
                      {step.number}
                    </span>
                  </div>
                  
                  <div 
                    className="border-l-[3px] border-[var(--demo-border)] bg-[var(--demo-background)] p-8 transition-colors group-hover:border-[var(--demo-accent)] shadow-sm"
                    style={{ borderRadius: imageStyle === 'rounded' ? '16px' : imageStyle === 'soft-edges' ? '8px' : '0px' }}
                  >
                    <h3 className={`${displayFont.className} text-2xl font-black leading-tight text-[var(--demo-text)] mb-4`}>
                      {step.title}
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-[var(--demo-muted)]">
                      {step.text}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
