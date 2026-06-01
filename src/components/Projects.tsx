'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bot, Users, BarChart3, TrendingUp, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// --- CSS UI MOCKUPS ---

const CRMUI = () => (
  <div className="w-full h-full bg-background border border-border/50 rounded-2xl p-4 flex flex-col gap-3 shadow-sm select-none">
    <div className="flex items-center justify-between border-b border-border/40 pb-3">
      <div className="h-4 w-24 bg-surface rounded" />
      <div className="h-4 w-12 bg-surface rounded" />
    </div>
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-surface shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="h-2.5 w-24 bg-surface rounded" />
          <div className="h-2 w-32 bg-surface/50 rounded" />
        </div>
        <div className={`h-2.5 w-12 rounded ${i === 1 ? 'bg-foreground' : 'bg-surface'}`} />
      </div>
    ))}
  </div>
);

const BookingUI = () => (
  <div className="w-full h-full bg-background border border-border/50 rounded-2xl p-5 flex flex-col gap-4 shadow-sm select-none">
    <div className="flex items-center gap-4 border-b border-border/40 pb-4">
      <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center">
        <Calendar className="w-5 h-5 text-muted" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="h-3 w-32 bg-surface rounded" />
        <div className="h-2 w-20 bg-surface/60 rounded" />
      </div>
    </div>
    <div className="grid grid-cols-4 gap-2 flex-1">
      {[...Array(12)].map((_, i) => (
        <div key={i} className={`rounded-md flex items-center justify-center text-[10px] font-bold ${i === 4 ? 'bg-foreground text-background shadow-sm' : 'bg-surface text-muted/40'}`}>
          {i + 9}:00
        </div>
      ))}
    </div>
  </div>
);

const DashboardUI = () => (
  <div className="w-full h-full bg-background border border-border/50 rounded-2xl p-5 flex flex-col gap-4 shadow-sm select-none">
    <div className="flex justify-between items-end">
      <div className="flex flex-col gap-1">
        <div className="text-[10px] font-bold text-muted uppercase tracking-wider">Revenue</div>
        <div className="text-2xl font-display font-black text-foreground">$42,500</div>
      </div>
      <div className="text-[10px] font-bold text-background bg-foreground px-2 py-1 rounded-full flex items-center gap-1">
        <TrendingUp className="w-3 h-3" /> +12%
      </div>
    </div>
    <div className="flex-1 flex items-end gap-2 mt-2">
      {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
        <div key={i} className="flex-1 bg-surface rounded-t-sm" style={{ height: `${h}%` }}>
          {i === 6 && <div className="w-full h-full bg-foreground rounded-t-sm shadow-sm" />}
        </div>
      ))}
    </div>
  </div>
);

const AutomationUI = () => (
  <div className="w-full h-full bg-background border border-border/50 rounded-2xl p-5 flex flex-col items-center justify-center relative shadow-sm select-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:12px_12px]" />
    
    <div className="flex flex-col gap-4 relative z-10 w-full max-w-[180px]">
      <div className="bg-surface border border-border/80 rounded-lg p-2 flex items-center gap-3">
        <Users className="w-4 h-4 text-muted" />
        <div className="h-2 w-16 bg-muted/30 rounded" />
      </div>
      <div className="flex justify-center -my-2"><div className="w-[1px] h-4 bg-border" /></div>
      <div className="bg-surface border border-border/80 rounded-lg p-2 flex items-center gap-3">
        <Bot className="w-4 h-4 text-muted" />
        <div className="h-2 w-20 bg-muted/30 rounded" />
      </div>
      <div className="flex justify-center -my-2"><div className="w-[1px] h-4 bg-border" /></div>
      <div className="bg-foreground text-background rounded-lg p-2 flex items-center gap-3 shadow-md">
        <Zap className="w-4 h-4 fill-current" />
        <div className="text-[10px] font-bold">Deal Closed</div>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

export default function Projects() {
  const showcases = [
    {
      title: 'Command Center CRM',
      description: 'Manage leads, track pipeline velocity, and view unified client histories in one blazing fast interface.',
      ui: <CRMUI />,
      colSpan: 'lg:col-span-2 md:col-span-1',
    },
    {
      title: 'Automated Booking System',
      description: 'Convert visitors instantly with calendar sync, automatic Google Meet links, and zero-friction scheduling.',
      ui: <BookingUI />,
      colSpan: 'lg:col-span-1 md:col-span-1',
    },
    {
      title: 'Business Dashboards',
      description: 'Monitor your operations in real-time. Connect Stripe, analytics, and CRM data into a single source of truth.',
      ui: <DashboardUI />,
      colSpan: 'lg:col-span-1 md:col-span-1',
    },
    {
      title: 'Intelligent Workflows',
      description: 'Replace manual tasks with automated triggers. Send follow-ups, update records, and notify the team instantly.',
      ui: <AutomationUI />,
      colSpan: 'lg:col-span-2 md:col-span-1',
    },
  ];

  return (
    <section id="showcase" className="py-32 relative overflow-hidden bg-surface">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center text-center mb-24 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-muted mb-4 uppercase tracking-widest">
              System Showcase
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter leading-tight text-foreground">
              Inside The <br />
              <span className="text-muted">Infrastructure.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcases.map((showcase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`bg-background border border-border rounded-3xl overflow-hidden flex flex-col group ${showcase.colSpan}`}
            >
              {/* Graphic Area */}
              <div className="h-64 bg-surface/50 p-6 flex items-center justify-center border-b border-border/50 relative overflow-hidden">
                <div className="w-full h-full max-w-md mx-auto transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                  {showcase.ui}
                </div>
              </div>
              
              {/* Text Area */}
              <div className="p-8 flex flex-col gap-3">
                <h3 className="text-2xl font-display font-black tracking-tight text-foreground">
                  {showcase.title}
                </h3>
                <p className="text-sm font-medium text-muted leading-relaxed">
                  {showcase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
