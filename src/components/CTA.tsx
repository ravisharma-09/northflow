'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function CTA() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  // Magnetic button spring physics configuration
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 120, damping: 15, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Magnetic boundary coordinates
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX * 0.4);
    y.set(mouseY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Pre-configured positions for floating particles inside the panel
  const particles = [
    { size: 4, top: '20%', left: '10%', delay: 0 },
    { size: 6, top: '70%', left: '15%', delay: 1 },
    { size: 3, top: '40%', left: '50%', delay: 2 },
    { size: 5, top: '80%', left: '55%', delay: 0.5 },
    { size: 4, top: '15%', left: '85%', delay: 1.5 },
    { size: 6, top: '65%', left: '90%', delay: 2.2 },
  ];

  return (
    <section id="cta" className="py-32 relative overflow-hidden bg-background">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Floating Anti-Gravity Panel */}
        <ScrollReveal>
          <motion.div
          animate={{
            y: [-6, 6, -6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full rounded-[32px] bg-surface border border-border p-8 sm:p-12 md:p-20 overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-12 shadow-premium"
        >
          {/* Moving Field Radial Glow Background */}
          <motion.div 
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 moving-field-bg opacity-30 pointer-events-none z-0"
          />

          {/* Floating Particles in Panel */}
          {particles.map((p, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-12, 12, -12],
                x: [-6, 6, -6],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: p.delay,
              }}
              style={{
                position: 'absolute',
                top: p.top,
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
              className="bg-brand rounded-full pointer-events-none z-10"
            />
          ))}

          {/* Background decoration - Wavy flowing lines */}
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] pointer-events-none opacity-40 z-0">
            <svg className="w-full h-full" viewBox="0 0 500 200" fill="none">
              <motion.path
                d="M 50,150 Q 150,100 250,150 T 450,150"
                stroke="#34D279"
                strokeWidth="1.5"
                strokeDasharray="6 12"
                animate={{ strokeDashoffset: [-60, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                opacity="0.35"
              />
              <motion.path
                d="M 50,110 Q 150,60 250,110 T 450,110"
                stroke="#34D279"
                strokeWidth="1"
                strokeDasharray="4 8"
                animate={{ strokeDashoffset: [60, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                opacity="0.25"
              />
              <motion.path
                d="M 50,70 Q 150,20 250,70 T 450,70"
                stroke="#34D279"
                strokeWidth="1.5"
                strokeDasharray="8 16"
                animate={{ strokeDashoffset: [-80, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                opacity="0.2"
              />
              <circle cx="250" cy="110" r="4" fill="#34D279" opacity="0.4" />
              <circle cx="350" cy="130" r="3" fill="#34D279" opacity="0.3" />
            </svg>
          </div>

          {/* Copy - Left Side */}
          <div className="flex flex-col text-left max-w-xl z-10 relative">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-muted text-brand border border-brand/20 mb-4 w-fit uppercase tracking-widest animate-breathing">
              Collab
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight leading-[1.08] text-foreground mb-4">
              Build Something <br /> People Remember.
            </h2>
            <p className="text-sm sm:text-base font-semibold text-muted leading-relaxed">
              Websites, automation and systems designed to scale.
            </p>
          </div>

          {/* CTA - Right Side */}
          <div className="flex flex-col items-start md:items-end justify-center gap-3 z-10 relative flex-shrink-0">
            {/* Magnetic Button */}
            <motion.a
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ x: springX, y: springY }}
              href="/start"
              className="flex items-center gap-3 px-8 py-4.5 rounded-full bg-white text-black font-bold text-base hover:shadow-lg transition-shadow duration-300 group"
            >
              Start Your System
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand text-black group-hover:translate-x-0.5 transition-transform duration-300">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.a>
          </div>

        </motion.div>
        </ScrollReveal>
        
      </div>
    </section>
  );
}
