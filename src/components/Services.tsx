'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Layout, Compass, Bot, TrendingUp, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  tag: string;
}

const services: Service[] = [
  {
    title: 'Website Design',
    description: 'Editorial digital platforms designed for ambitious brands.',
    icon: Layout,
    tag: 'Design',
  },
  {
    title: 'Landing Pages',
    description: 'High-performance, conversion-engineered digital landing environments.',
    icon: Compass,
    tag: 'Conversion',
  },
  {
    title: 'Automation',
    description: 'Intelligent workflows that connect systems and eliminate friction.',
    icon: Bot,
    tag: 'Workflow',
  },
  {
    title: 'Growth Systems',
    description: 'Data-driven engines engineered to scale customer acquisition automatically.',
    icon: TrendingUp,
    tag: 'Growth',
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
  const rX = useTransform(tiltY, [-0.5, 0.5], ['2deg', '-2deg']);
  const rY = useTransform(tiltX, [-0.5, 0.5], ['-2deg', '2deg']);

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  // Color: rgba(52, 210, 121, 0.10)
  const spotlightGlow = useMotionTemplate`radial-gradient(350px circle at ${glowX}px ${glowY}px, rgba(52, 210, 121, 0.10), transparent 75%)`;

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
    /* Float continuously at different speeds based on index */
    <motion.div
      animate={{
        y: [-8, 8, -8],
      }}
      transition={{
        duration: 5 + index * 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
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
          y: -10, // lift
          rotateZ: 0.5, // rotate subtly
          boxShadow: "0 0 50px rgba(52, 210, 121, 0.08)", // glow
          scale: 1.015, // depth zoom
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="group relative flex flex-col justify-between bg-surface border border-border rounded-[32px] p-8 min-h-[320px] hover:border-brand/30 transition-colors duration-500 select-none cursor-pointer"
      >
        {/* Spotlight cursor glow overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[32px]"
          style={{ background: spotlightGlow }}
        />

        {/* Card Content */}
        <div style={{ transform: 'translateZ(35px)' }} className="flex flex-col gap-6 text-left">
          <div className="flex justify-between items-start">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#121212]/90 border border-border text-brand">
              <Icon className="w-6 h-6 stroke-[1.8]" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand bg-[#112419] border border-brand/10 px-3 py-1 rounded-full">
              {service.tag}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-display font-black tracking-tight text-foreground mb-2">
              {service.title}
            </h3>
            <p className="text-sm font-medium text-muted leading-relaxed max-w-[240px]">
              {service.description}
            </p>
          </div>
        </div>

        {/* Bottom Link indicator */}
        <div style={{ transform: 'translateZ(20px)' }} className="flex items-center justify-between mt-8 border-t border-border/45 pt-4 text-left">
          <span className="text-xs font-bold text-muted group-hover:text-brand transition-colors duration-300">
            Learn More
          </span>
          <div className="flex items-center justify-center w-8 h-8 rounded-full border border-border bg-[#121212]/90 text-muted group-hover:text-black group-hover:bg-brand group-hover:border-brand transition-all duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-32 relative overflow-hidden bg-background">
      {/* Moving gradient background field */}
      <motion.div 
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 moving-field-bg opacity-40 pointer-events-none"
      />

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center text-center mb-24">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-muted text-brand border border-brand/20 mb-4 uppercase tracking-widest">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight leading-tight text-foreground max-w-2xl">
              Intelligent Systems. <br />
              <span className="text-brand">Premium Execution.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards Grid */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={idx} index={idx} service={service} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
