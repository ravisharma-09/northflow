'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Globe, Calendar, Database, Zap } from 'lucide-react';

export default function SystemArchitecture() {
  const systems = [
    {
      title: "Lead Capture",
      desc: "High-performance marketing sites designed to convert cold traffic into qualified inquiries.",
      icon: Globe
    },
    {
      title: "Booking Engine",
      desc: "Frictionless scheduling with automated Google Meet links and smart calendar syncing.",
      icon: Calendar
    },
    {
      title: "CRM Dashboard",
      desc: "Centralized lead management, pipeline tracking, and revenue forecasting.",
      icon: Database
    },
    {
      title: "Automation",
      desc: "Instant follow-ups, internal notifications, and zero-touch operational workflows.",
      icon: Zap
    }
  ];

  return (
    <section className="py-16 bg-surface border-y border-border/40 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center text-center mb-12 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-muted mb-4 uppercase tracking-[0.15em]">
              The Architecture
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-foreground">
              Connected Systems. <br />
              <span className="text-muted">Zero Friction.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Connection Line Background */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[1px] bg-border/60" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {systems.map((sys, idx) => {
              const Icon = sys.icon;
              return (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-24 h-24 rounded-2xl bg-background border border-border/50 shadow-sm flex items-center justify-center mb-6 group-hover:-translate-y-2 group-hover:shadow-md transition-all duration-500 relative">
                      {idx < systems.length - 1 && (
                        <div className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 text-muted/30">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </div>
                      )}
                      <Icon className="w-8 h-8 text-foreground" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-3">{sys.title}</h3>
                    <p className="text-sm text-muted font-medium leading-relaxed max-w-[240px]">{sys.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
