'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const stats = [
  { value: '140+', label: 'Systems Built', suffix: '' },
  { value: '50k+', label: 'Leads Captured', suffix: '' },
  { value: '250+', label: 'Automations Running', suffix: '' },
  { value: '15k+', label: 'Hours Saved', suffix: '' },
];

export default function Metrics() {
  return (
    <section className="py-32 bg-background border-t border-border/40">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-muted mb-4 uppercase tracking-[0.15em] block">
              The Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-foreground">
              Proven Infrastructure.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="flex flex-col items-center justify-center text-center group">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl md:text-6xl font-display font-black tracking-tighter text-foreground mb-4"
                >
                  {stat.value}
                </motion.div>
                <div className="h-[1px] w-12 bg-border mb-4 group-hover:w-24 group-hover:bg-foreground transition-all duration-500" />
                <span className="text-sm font-bold uppercase tracking-wider text-muted">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
