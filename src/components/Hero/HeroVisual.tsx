'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Calendar, Zap, Mail, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
  { id: 1, title: 'Lead Captured', icon: UserPlus, x: 10, y: 10 },
  { id: 2, title: 'Meeting Booked', icon: Calendar, x: 50, y: 30 },
  { id: 3, title: 'Automation Triggered', icon: Zap, x: 90, y: 50 },
  { id: 4, title: 'Follow-up Sent', icon: Mail, x: 50, y: 70 },
  { id: 5, title: 'Deal Closed', icon: CheckCircle, x: 10, y: 90 },
];

export default function HeroVisual() {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-4">
      {/* Container for the nodes */}
      <div className="w-full max-w-[500px] aspect-[4/5] relative z-10 hidden md:block">
        
        {/* SVG Lines connecting nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
          <motion.path
            d="M 10% 10% L 50% 30% L 90% 50% L 50% 70% L 10% 90%"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <motion.path
            d="M 10% 10% L 50% 30% L 90% 50% L 50% 70% L 10% 90%"
            fill="none"
            stroke="var(--foreground)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 1, repeat: Infinity, repeatDelay: 3 }}
          />
        </svg>

        {/* Nodes */}
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.4, ease: "easeOut" }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${step.x}%`, top: `${step.y}%` }}
            >
              <div className="bg-surface backdrop-blur-md border border-border/80 rounded-2xl p-4 shadow-lg shadow-foreground/5 flex items-center gap-4 min-w-[180px]">
                <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-foreground shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-foreground leading-tight">{step.title}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile fallback (linear list) */}
      <div className="md:hidden flex flex-col gap-4 w-full relative z-10 pt-10">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
              className="bg-surface backdrop-blur-md border border-border/80 rounded-2xl p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-foreground shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-foreground">{step.title}</span>
              {index < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted ml-auto" />
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
    </div>
  );
}
