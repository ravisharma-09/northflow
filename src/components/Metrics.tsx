'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, Bot, TrendingUp, ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const advantages = [
  {
    title: 'Fast Delivery',
    description: 'Rapid deployment of your systems without compromising on code quality or design aesthetics.',
    icon: Rocket,
    colSpan: 'lg:col-span-2'
  },
  {
    title: 'Modern Design',
    description: 'High-end, premium interfaces that build instant trust and authority with your customers.',
    icon: Sparkles,
    colSpan: 'lg:col-span-3'
  },
  {
    title: 'Automation First',
    description: 'Every system is built to minimize human error and automate repetitive daily operations.',
    icon: Bot,
    colSpan: 'lg:col-span-3'
  },
  {
    title: 'Built For Scale',
    description: 'Architecture that handles traffic spikes and business growth seamlessly.',
    icon: TrendingUp,
    colSpan: 'lg:col-span-2'
  },
  {
    title: 'Ongoing Support',
    description: 'Dedicated post-launch monitoring and optimization to ensure peak performance.',
    icon: ShieldCheck,
    colSpan: 'lg:col-span-5 md:col-span-2 lg:col-span-2'
  }
];

export default function Metrics() {
  return (
    <section id="why-us" className="py-32 relative overflow-hidden bg-background">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col items-start justify-start text-left mb-20 max-w-2xl">
            <span className="text-xs font-bold text-muted mb-4 uppercase tracking-widest">
              Why NorthFlow
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter leading-tight text-foreground">
              Built For Scale. <br />
              <span className="text-muted">Engineered For Growth.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            // The 5th item should span differently to make the grid complete 
            // row 1: 2 col + 3 col
            // row 2: 3 col + 2 col
            // Oh wait, if it's 5 items, maybe 3 on top, 2 on bottom. 
            const dynamicColSpan = idx === 0 ? 'md:col-span-1 lg:col-span-2' : 
                                   idx === 1 ? 'md:col-span-1 lg:col-span-3' : 
                                   idx === 2 ? 'md:col-span-1 lg:col-span-2' :
                                   idx === 3 ? 'md:col-span-1 lg:col-span-1' :
                                   idx === 4 ? 'md:col-span-2 lg:col-span-2' : adv.colSpan;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`bg-surface border border-border rounded-3xl p-8 flex flex-col justify-between items-start gap-12 group hover:border-foreground/20 transition-colors duration-500 cursor-default ${dynamicColSpan}`}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-background border border-border text-foreground shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-black tracking-tight text-foreground mb-2">
                    {adv.title}
                  </h4>
                  <p className="text-sm font-medium text-muted leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
