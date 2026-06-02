'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const processes = [
  {
    num: '01',
    title: 'Strategy Call',
    desc: 'We map out your current bottlenecks, lead flow, and define the exact systems needed to scale your operations.',
  },
  {
    num: '02',
    title: 'System Planning',
    desc: 'Architecting the database, designing the UI/UX, and planning the automation triggers before writing a single line of code.',
  },
  {
    num: '03',
    title: 'Development',
    desc: 'Engineering the front-end website, back-end CRM, and integrating all third-party APIs into a cohesive environment.',
  },
  {
    num: '04',
    title: 'Launch',
    desc: 'Deploying the system to production, running stress tests, and training your team on how to manage the new infrastructure.',
  },
  {
    num: '05',
    title: 'Optimization',
    desc: 'Continuous monitoring, AB testing, and scaling the system as your traffic and lead volume grows.',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-16 relative overflow-hidden bg-background border-t border-border/40">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center text-center mb-12 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-muted mb-4 uppercase tracking-widest">
              Execution
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter leading-tight text-foreground">
              The NorthFlow <br />
              <span className="text-muted">Process.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Process List */}
        <div className="flex flex-col">
          {processes.map((step, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 py-10 border-b border-border/40 group">
                {/* Number */}
                <div className="text-5xl md:text-6xl font-display font-black text-muted/30 group-hover:text-foreground transition-colors duration-500 w-24">
                  {step.num}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-display font-black tracking-tight text-foreground mb-3 group-hover:translate-x-2 transition-transform duration-500">
                    {step.title}
                  </h3>
                  <p className="text-base font-medium text-muted leading-relaxed max-w-2xl group-hover:translate-x-2 transition-transform duration-500 delay-75">
                    {step.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
