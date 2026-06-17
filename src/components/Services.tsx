'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Layout, Bot, BarChart3, ArrowUpRight, Check } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import Link from 'next/link';

interface Service {
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<any>;
  link: string;
}

const services: Service[] = [
  {
    title: 'Website Systems',
    description: 'Professional websites designed to convert visitors into customers.',
    features: [
      'Mobile Responsive',
      'Fast Loading',
      'Lead Capture Forms',
      'Booking Integration',
      'SEO Ready'
    ],
    icon: Layout,
    link: '/systems/website',
  },
  {
    title: 'Automation Systems',
    description: 'Eliminate repetitive work and respond to customers faster.',
    features: [
      'Appointment Booking',
      'Email Follow-Ups',
      'WhatsApp Automation',
      'Lead Notifications',
      'Meeting Reminders',
      'Workflow Automation'
    ],
    icon: Bot,
    link: '/systems/automation',
  },
  {
    title: 'Business Dashboards',
    description: 'Track leads, meetings and business performance from one place.',
    features: [
      'CRM Dashboard',
      'Lead Pipeline',
      'Revenue Tracking',
      'Team Activity',
      'Analytics Reporting'
    ],
    icon: BarChart3,
    link: '/systems/dashboards',
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
        className="group relative flex flex-col justify-between bg-surface border border-border rounded-3xl p-6 lg:p-10 min-h-[460px] hover:border-foreground/20 transition-colors duration-500 select-none cursor-pointer overflow-hidden h-full"
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl z-0"
          style={{ background: spotlightGlow }}
        />

        <div style={{ transform: 'translateZ(30px)' }} className="flex flex-col gap-6 text-left relative z-10">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-background border border-border text-foreground shadow-sm group-hover:scale-105 transition-transform duration-300">
            <Icon className="w-6 h-6 stroke-[1.5]" />
          </div>

          <div>
            <h3 className="text-2xl lg:text-3xl font-display font-black tracking-tight text-foreground mb-3">
              {service.title}
            </h3>
            <p className="text-sm text-muted font-medium leading-relaxed">
              {service.description}
            </p>
          </div>

          <ul className="flex flex-col gap-3 mt-2">
            {service.features.map((feature, fIdx) => (
              <li key={fIdx} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-foreground/10 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground/80">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Link href={service.link} style={{ transform: 'translateZ(15px)' }} className="flex items-center justify-between mt-8 border-t border-border/60 pt-6 text-left relative z-10 group/link">
          <span className="text-sm font-bold text-muted group-hover/link:text-foreground transition-colors duration-300">
            Explore System
          </span>
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background text-muted group-hover/link:text-background group-hover/link:bg-foreground group-hover/link:border-foreground transition-all duration-300 shadow-sm">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-16 relative overflow-hidden bg-background">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <ScrollReveal>
          <div className="flex flex-col items-start justify-start text-left mb-20 max-w-2xl">
            <span className="text-xs font-bold text-muted mb-4 uppercase tracking-widest">
              What We Build
            </span>
            <h2 id="services-heading" className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter leading-tight text-foreground mb-6">
              What We Build
            </h2>
            <p className="text-lg md:text-xl text-muted font-medium leading-relaxed max-w-lg">
              Everything your business needs to capture leads, automate operations and scale efficiently.
            </p>
          </div>
        </ScrollReveal>

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
