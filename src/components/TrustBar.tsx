'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TrustBar() {
  // We'll use generic high-end corporate placeholders that feel like a $50k agency client list
  const companies = [
    "ACME CORP", "GLOBAL VENTURES", "HORIZON LABS", "VERTEX SYSTEMS", "NEXUS HOLDINGS", "ATLAS STUDIO"
  ];

  return (
    <section className="py-12 border-y border-border/40 bg-background overflow-hidden relative">
      <div className="flex flex-col items-center justify-center gap-6">
        <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
          Operating Systems Built For
        </span>
        
        {/* Marquee Container */}
        <div className="relative flex overflow-x-hidden w-full max-w-[1440px] mx-auto opacity-50">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          
          <motion.div 
            className="flex whitespace-nowrap gap-16 items-center px-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20,
            }}
          >
            {[...companies, ...companies, ...companies].map((name, i) => (
              <span key={i} className="text-xl md:text-2xl font-display font-black tracking-tight text-foreground/40">
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
