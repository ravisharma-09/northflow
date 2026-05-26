'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { MessageSquare, Code, Cpu, TrendingUp } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Align on objectives, target demographics, and system architecture.',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Build',
    description: 'Design and engineer premium, bespoke software environments.',
    icon: Code,
  },
  {
    number: '03',
    title: 'Automate',
    description: 'Orchestrate intelligent workflows and automated agent pipelines.',
    icon: Cpu,
  },
  {
    number: '04',
    title: 'Scale',
    description: 'Continuously optimize conversions, velocity, and global performance.',
    icon: TrendingUp,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-32 relative overflow-hidden bg-background">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center text-center mb-24">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-muted text-brand border border-brand/20 mb-4 uppercase tracking-widest">
              Our Method
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight leading-tight text-foreground">
              Simple Path. <span className="text-brand">Massive Scale.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Timeline Container */}
        <div className="relative mt-16 max-w-6xl mx-auto">
          
          {/* Connection Line - Desktop (Flowing SVG) */}
          <svg className="hidden md:block absolute top-[30px] left-[12.5%] right-[12.5%] w-[75%] h-[6px] overflow-visible z-0" pointerEvents="none">
            <line x1="0" y1="3" x2="100%" y2="3" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
            <motion.line 
              x1="0" y1="3" x2="100%" y2="3" 
              stroke="#34D279" 
              strokeWidth="2" 
              strokeDasharray="15 30"
              animate={{ strokeDashoffset: [-90, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          {/* Connection Line - Mobile (Flowing SVG) */}
          <svg className="md:hidden absolute left-[31px] top-8 bottom-8 w-[6px] h-[92%] overflow-visible z-0" pointerEvents="none">
            <line x1="3" y1="0" x2="3" y2="100%" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
            <motion.line 
              x1="3" y1="0" x2="3" y2="100%" 
              stroke="#34D279" 
              strokeWidth="2" 
              strokeDasharray="15 30"
              animate={{ strokeDashoffset: [-90, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          {/* Steps List */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-start md:items-center text-left md:text-center group"
                >
                  {/* Pulse Outer ring */}
                  <div className="flex items-center gap-4 md:flex-col md:gap-0">
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-surface border border-border group-hover:border-brand shadow-premium transition-all duration-500 hover:scale-105 cursor-pointer">
                      
                      {/* Pulsing glow ring around node */}
                      <span className="absolute inset-0 rounded-full border border-brand/30 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      {/* Step Number Badge */}
                      <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-[var(--background)] border border-border text-[10px] font-extrabold text-foreground shadow-xs">
                        {step.number}
                      </span>
                      
                      {/* Icon */}
                      <Icon className="w-5 h-5 text-muted group-hover:text-brand transition-colors duration-500 animate-breathing" />
                    </div>

                    {/* Step Title (Mobile Inline layout helper) */}
                    <div className="md:hidden">
                      <h3 className="text-xl font-display font-black text-foreground">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Desktop Title & Subtitle / Mobile description */}
                  <div className="mt-5 pl-20 md:pl-0">
                    <h3 className="hidden md:block text-lg font-display font-black tracking-tight text-foreground mb-2 group-hover:text-brand transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm font-medium text-muted leading-relaxed max-w-[220px]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
