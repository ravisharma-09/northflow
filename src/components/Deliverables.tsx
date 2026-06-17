'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const deliverables = [
  'Website Setup',
  'CRM Configuration',
  'Automation Workflows',
  'Booking Systems',
  'Analytics Dashboard',
  'Documentation',
  'Ongoing Support',
];

export default function Deliverables() {
  return (
    <section aria-labelledby="deliverables-heading" className="py-16 bg-background border-t border-border/40 overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-muted mb-4 uppercase tracking-[0.15em] block">
              Deliverables
            </span>
            <h2 id="deliverables-heading" className="text-3xl md:text-4xl font-display font-black tracking-tight text-foreground mb-4">
              What You Get
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-surface border border-border/50 rounded-3xl p-8 md:p-10 shadow-premium relative group">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] rounded-3xl z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              {deliverables.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (idx * 0.05), duration: 0.4 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-background border border-transparent hover:border-border/50 transition-all duration-300 group/item"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground flex items-center justify-center shadow-sm">
                    <Check className="w-3.5 h-3.5 text-background" />
                  </div>
                  <span className="text-sm md:text-base font-semibold text-foreground/90 group-hover/item:text-foreground transition-colors duration-300">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
