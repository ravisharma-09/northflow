'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Layout, Bot, BarChart3, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Service {
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  icon: React.ComponentType<any>;
  tag: string;
}

const services: Service[] = [
  {
    title: 'Lead Capture Systems',
    problem: 'Traffic bounces. Paid ads bleed cash. Leads slip through the cracks of generic web pages.',
    solution: 'Bespoke, high-performance web architecture optimized strictly for conversion and trust.',
    outcome: 'Increased lead velocity and lower acquisition costs.',
    icon: Layout,
    tag: 'Acquisition',
  },
  {
    title: 'Operational Automation',
    problem: 'Teams waste hours on manual data entry, follow-ups, and copy-pasting between disconnected tools.',
    solution: 'Custom API integrations and logic workflows that connect your stack and trigger instantly.',
    outcome: 'Zero-touch operations. Hundreds of hours saved monthly.',
    icon: Bot,
    tag: 'Efficiency',
  },
  {
    title: 'CRM Infrastructure',
    problem: 'Data is siloed in spreadsheets. Deals stall because no one knows where leads are in the pipeline.',
    solution: 'Centralized, automated dashboards that track revenue, pipeline stages, and team performance.',
    outcome: 'Total visibility and predictable revenue forecasting.',
    icon: BarChart3,
    tag: 'Operations',
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for mouse hover tilt
  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);
  const tiltX = useSpring(rotateXVal, { stiffness: 100, damping: 20 });
  const tiltY = useSpring(rotateYVal, { stiffness: 100, damping: 20 });

  // Map mouse coordinate ratios to exactly 2deg max rotation
  const rX = useTransform(tiltY, [-0.5, 0.5], ['1.5deg', '-1.5deg']);
  const rY = useTransform(tiltX, [-0.5, 0.5], ['-1.5deg', '1.5deg']);

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  
  // Subtle, non-neon glass glow
  const spotlightGlow = useMotionTemplate`radial-gradient(400px circle at ${glowX}px ${glowY}px, var(--brand-muted), transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    
    rotateXVal.set(x / width);
    rotateYVal.set(y / height);

    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rotateXVal.set(0);
    rotateYVal.set(0);
  };

  const Icon = service.icon;

  return (
    <motion.div
      animate={{ y: [-4, 4, -4] }}
      transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rX,
          rotateY: rY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ 
          y: -5,
          boxShadow: "var(--shadow-premium)",
          scale: 1.01,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="group relative flex flex-col justify-between bg-surface border border-border rounded-3xl p-8 lg:p-10 min-h-[460px] hover:border-foreground/20 transition-colors duration-500 select-none cursor-pointer overflow-hidden"
      >
        {/* Spotlight cursor glow overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl z-0"
          style={{ background: spotlightGlow }}
        />

        {/* Card Content */}
        <div style={{ transform: 'translateZ(30px)' }} className="flex flex-col gap-6 text-left relative z-10">
          <div className="flex justify-between items-start">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-background border border-border text-foreground shadow-sm group-hover:scale-105 transition-transform duration-300">
              <Icon className="w-6 h-6 stroke-[1.5]" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted bg-background border border-border px-3 py-1.5 rounded-full shadow-sm">
              {service.tag}
            </span>
          </div>

          <h3 className="text-2xl lg:text-3xl font-display font-black tracking-tight text-foreground mb-2 mt-2">
            {service.title}
          </h3>

          <div className="flex flex-col gap-4 text-sm font-medium">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-muted font-bold">The Problem</span>
              <p className="text-foreground/70 leading-relaxed">{service.problem}</p>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-muted font-bold">The Solution</span>
              <p className="text-foreground/90 leading-relaxed">{service.solution}</p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-muted font-bold">The Outcome</span>
              <p className="text-brand font-bold leading-relaxed">{service.outcome}</p>
            </div>
          </div>
        </div>

        {/* Bottom Link indicator */}
        <div style={{ transform: 'translateZ(15px)' }} className="flex items-center justify-between mt-8 border-t border-border/60 pt-6 text-left relative z-10">
          <span className="text-sm font-bold text-muted group-hover:text-foreground transition-colors duration-300">
            Explore System
          </span>
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background text-muted group-hover:text-background group-hover:bg-foreground group-hover:border-foreground transition-all duration-300 shadow-sm">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-32 relative overflow-hidden bg-background">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col items-start justify-start text-left mb-20 max-w-2xl">
            <span className="text-xs font-bold text-muted mb-4 uppercase tracking-widest">
              What We Build
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter leading-tight text-foreground">
              The Architecture Of <br />
              <span className="text-muted">Modern Business.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards Grid */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={idx} index={idx} service={service} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
