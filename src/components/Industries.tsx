'use client';

import React from 'react';
import ScrollReveal from './ScrollReveal';
import { Building2, Landmark, Stethoscope, Laptop } from 'lucide-react';

export default function Industries() {
  const industries = [
    { name: 'Financial Services', icon: Landmark, desc: 'Wealth management, PE, and accounting firms.' },
    { name: 'Healthcare', icon: Stethoscope, desc: 'Private clinics, specialized medical practices.' },
    { name: 'Enterprise SaaS', icon: Laptop, desc: 'B2B software platforms and enterprise tooling.' },
    { name: 'Real Estate', icon: Building2, desc: 'Commercial brokerages and luxury agencies.' },
  ];

  return (
    <section className="py-32 bg-background border-t border-border/40">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-muted mb-4 uppercase tracking-[0.15em]">
                Who We Serve
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-foreground">
                Built For <br />
                <span className="text-muted">High-Ticket Operators.</span>
              </h2>
            </div>
            <p className="text-base text-muted font-medium max-w-md">
              We design infrastructure exclusively for businesses where a single captured lead or automated workflow generates significant ROI.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="p-8 rounded-3xl bg-surface border border-border/50 hover:border-foreground/20 transition-colors duration-500 group">
                  <div className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">{ind.name}</h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">{ind.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
