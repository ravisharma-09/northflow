'use client';

import React from 'react';
import ScrollReveal from './ScrollReveal';
import { Building2, Landmark, Stethoscope, Laptop } from 'lucide-react';

export default function Industries() {
  const industries = [
    'Real Estate',
    'Consultants',
    'Agencies',
    'Coaches',
    'Law Firms',
    'Dental Clinics',
    'Construction Companies',
    'Local Businesses',
    'Startups',
  ];

  return (
    <section className="py-24 bg-background border-t border-border/40">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-muted mb-4 uppercase tracking-[0.15em] block">
              Industries We Help
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-foreground">
              Built For Modern <br />
              <span className="text-muted">Service Businesses.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap gap-4">
          {industries.map((ind, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.05}>
              <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-surface border border-border/50 hover:border-foreground/20 transition-colors duration-300">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-foreground text-background">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm font-bold text-foreground">{ind}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
