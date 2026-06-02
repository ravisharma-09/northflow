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
    title: 'Discovery Call',
    description: 'We understand your business, current challenges and goals.',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'System Planning',
    description: 'We design the website, automation and infrastructure.',
    icon: Code,
  },
  {
    number: '03',
    title: 'Build & Integration',
    description: 'We develop and connect everything together.',
    icon: Cpu,
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Your new system goes live.',
    icon: TrendingUp,
  },
  {
    number: '05',
    title: 'Optimize & Scale',
    description: 'We continuously improve performance and efficiency.',
    icon: TrendingUp,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <section ref={sectionRef} id="how-it-works" className="py-32 relative overflow-hidden bg-background">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center text-center mb-24">
            <span className="px-3 py-1 rounded-full text-xs font-bold text-muted border border-border mb-4 uppercase tracking-widest bg-surface shadow-sm">
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter leading-tight text-foreground">
              Systems Engineering. <br />
              <span className="text-muted">Simplified.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Timeline Container */}
        <div className="relative mt-16 max-w-6xl mx-auto">
          
          {/* Connection Line - Desktop (Flowing SVG) */}
          <svg className="hidden md:block absolute top-[30px] left-[10%] w-[80%] h-[6px] overflow-visible z-0" pointerEvents="none">
            <line x1="0" y1="3" x2="100%" y2="3" stroke="var(--border)" strokeWidth="2" />
            <motion.line 
              x1="0" y1="3" x2="100%" y2="3" 
              stroke="var(--foreground)" 
              strokeWidth="2" 
              style={{ pathLength: smoothProgress }}
            />
          </svg>

          {/* Connection Line - Mobile (Flowing SVG) */}
          <svg className="md:hidden absolute left-[31px] top-8 bottom-8 w-[6px] h-[92%] overflow-visible z-0" pointerEvents="none">
            <line x1="3" y1="0" x2="3" y2="100%" stroke="var(--border)" strokeWidth="2" />
            <motion.line 
              x1="3" y1="0" x2="3" y2="100%" 
              stroke="var(--foreground)" 
              strokeWidth="2" 
              style={{ pathLength: smoothProgress }}
            />
          </svg>

          {/* Steps List */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative z-10">
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
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-background border border-border group-hover:border-foreground shadow-sm transition-all duration-500 hover:scale-[1.03] cursor-pointer z-10">
                      
                      {/* Step Number Badge */}
                      <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-[10px] font-extrabold text-background shadow-sm">
                        {step.number}
                      </span>
                      
                      {/* Icon */}
                      <Icon className="w-6 h-6 text-foreground stroke-[1.5]" />
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
