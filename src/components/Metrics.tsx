'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const reasons = [
  'Systems built around your workflow',
  'No unnecessary software',
  'Website, CRM and automation in one solution',
  'Ongoing support after launch',
  'Built to scale with your business',
];

export default function Metrics() {
  return (
    <section id="metrics" className="py-16 bg-background border-t border-border/40 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <ScrollReveal>
            <div className="flex flex-col items-start text-left">
              <span className="text-xs font-bold text-muted mb-4 uppercase tracking-[0.15em] block">
                Why NorthFlow
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-foreground mb-8 leading-[1.1]">
                Why Businesses <br />
                <span className="text-muted">Choose NorthFlow.</span>
              </h2>
              <p className="text-lg text-muted font-medium leading-relaxed max-w-md">
                We focus on building systems that solve real operational problems. Instead of selling disconnected tools, we create complete solutions that combine websites, automation and business management into one streamlined system.
              </p>
            </div>
          </ScrollReveal>

          {/* Checklist */}
          <ScrollReveal delay={0.2}>
            <div className="bg-surface border border-border/50 rounded-3xl p-8 md:p-12 shadow-premium relative group">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] rounded-3xl z-0" />
              
              <ul className="flex flex-col gap-6 relative z-10">
                {reasons.map((reason, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (idx * 0.1), duration: 0.5 }}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center shadow-sm group-hover/item:border-foreground group-hover/item:bg-foreground group-hover/item:text-background transition-all duration-300">
                      <Check className="w-4 h-4 text-foreground group-hover/item:text-background transition-colors duration-300" />
                    </div>
                    <span className="text-base md:text-lg font-medium text-foreground/90 group-hover/item:text-foreground transition-colors duration-300">
                      {reason}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
