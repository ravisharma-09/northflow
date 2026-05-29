'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BarChart3, Globe, Zap } from 'lucide-react';

export default function HeroVisual() {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-4 sm:p-8">
      {/* 
        The Bento Grid
        - Highly structured
        - Minimalist
        - 1px borders
        - Monochromatic with tiny brand accents
      */}
      <div className="w-full max-w-[500px] aspect-square grid grid-cols-2 grid-rows-2 gap-4 relative z-10">
        
        {/* Top Left: Main Visual / Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-2 row-span-1 bg-surface/40 backdrop-blur-md border border-border/60 rounded-2xl overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" 
            alt="Dashboard" 
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Overlay UI element */}
          <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-xl border border-border/80 rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Live Data</span>
              <span className="text-sm font-semibold text-foreground">Global Reach</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand">
              <Globe className="w-4 h-4" />
            </div>
          </div>
        </motion.div>

        {/* Bottom Left: Metric */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 row-span-1 bg-background border border-border/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-10 h-10 rounded-xl bg-surface border border-border/50 flex items-center justify-center text-foreground">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="flex flex-col mt-4">
            <span className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1">Conversion</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-black text-foreground">4.2</span>
              <span className="text-sm font-bold text-brand">%</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Right: Action/Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 row-span-1 bg-foreground text-background rounded-2xl p-6 flex flex-col justify-between shadow-lg shadow-foreground/10 relative overflow-hidden group"
        >
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-background/20 blur-2xl -translate-y-1/2 translate-x-1/2 rounded-full" />
          
          <div className="flex justify-between items-start relative z-10">
            <div className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center text-background backdrop-blur-sm">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <ArrowUpRight className="w-5 h-5 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
          <div className="flex flex-col mt-4 relative z-10">
            <span className="text-[11px] font-bold text-background/70 uppercase tracking-wider mb-1">System Status</span>
            <span className="text-lg font-bold text-background leading-tight">Optimized <br/>& Active</span>
          </div>
        </motion.div>

      </div>
      
      {/* Background Decorative Grid for the right side */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
    </div>
  );
}
