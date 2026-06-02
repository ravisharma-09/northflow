'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Bot, BarChart3, Calendar, Database, ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const capabilities = [
  { name: 'Website', icon: Layout },
  { name: 'Automation', icon: Bot },
  { name: 'Dashboards', icon: BarChart3 },
  { name: 'Booking Systems', icon: Calendar },
  { name: 'CRM', icon: Database },
  { name: 'Ongoing Support', icon: ShieldCheck },
];

export default function Metrics() {
  return (
    <section className="py-32 bg-background border-t border-border/40">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-muted mb-4 uppercase tracking-[0.15em] block">
              Why NorthFlow
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-foreground mb-6">
              Why Businesses Choose NorthFlow
            </h2>
            <p className="text-muted font-medium leading-relaxed max-w-2xl mx-auto">
              We focus on building systems that solve real operational problems. Instead of selling disconnected tools, we create complete solutions that combine websites, automation and business management into one streamlined system.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="flex flex-col items-center justify-center text-center p-8 bg-surface border border-border/50 rounded-2xl group hover:border-foreground/20 transition-colors duration-500">
                  <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {cap.name}
                  </span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
