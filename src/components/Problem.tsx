'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Problem() {
  const problems = [
    'Leads are not contacted quickly',
    'Follow-ups are inconsistent',
    'Bookings are managed manually',
    'Customer information is scattered',
    'Teams waste time on repetitive tasks',
  ];

  return (
    <section className="py-16 bg-surface border-t border-border/40 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Problem Side */}
          <ScrollReveal>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-muted mb-4 uppercase tracking-[0.15em]">
                The Problem
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-foreground mb-10">
                Most businesses lose <br />
                <span className="text-muted">customers because:</span>
              </h2>
              
              <ul className="flex flex-col gap-6">
                {problems.map((prob, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center shadow-sm">
                      <X className="w-4 h-4 text-muted group-hover:text-foreground transition-colors duration-300" />
                    </div>
                    <span className="text-base md:text-lg font-medium text-foreground/90">
                      {prob}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Solution Side */}
          <ScrollReveal delay={0.2}>
            <div className="bg-background border border-border/50 rounded-3xl p-10 md:p-12 shadow-premium relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-foreground/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center shadow-sm mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight text-foreground leading-tight">
                  NorthFlow fixes this by connecting your website, automation systems and business operations into one streamlined workflow.
                </h3>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
