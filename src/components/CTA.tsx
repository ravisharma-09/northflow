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

  return (
    <section id="cta" aria-labelledby="cta-heading" className="py-24 relative overflow-hidden bg-background">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Massive Whitespace CTA */}
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center text-center">
            
            <h2 id="cta-heading" className="text-4xl md:text-5xl lg:text-7xl font-display font-black tracking-tighter leading-[1.05] text-foreground mb-8">
              Let's Build The Infrastructure <br />
              <span className="text-muted">Behind Your Growth.</span>
            </h2>
            
            <p className="text-lg md:text-xl font-medium text-muted leading-relaxed max-w-2xl mx-auto mb-10">
              Whether you need a website, automation or a complete business system, we'll help you design the right solution.
            </p>

            {/* Magnetic Button */}
            <motion.a
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ x: springX, y: springY }}
              href="/start"
              className="flex items-center gap-3 px-10 py-5 rounded-full bg-foreground text-background font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-premium group"
            >
              Start With A Strategy Call
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-background text-foreground group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </motion.a>

          </div>
        </ScrollReveal>
        
      </div>
    </section>
  );
}
