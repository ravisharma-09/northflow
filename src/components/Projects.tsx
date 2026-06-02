'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bot, Users, BarChart3, Globe, TrendingUp, Zap, MessageSquare } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// --- MINIMAL CSS UI MOCKUPS ---

const WebsiteUI = () => (
  <div className="w-full h-full bg-background border border-border/50 rounded-xl p-4 flex flex-col gap-4 shadow-sm select-none">
    <div className="flex items-center justify-between border-b border-border/40 pb-3">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-foreground" />
        <div className="h-3 w-16 bg-surface rounded" />
      </div>
      <div className="flex gap-2">
        <div className="h-2 w-8 bg-surface rounded" />
        <div className="h-2 w-8 bg-surface rounded" />
      </div>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
      <div className="h-4 w-3/4 bg-surface rounded" />
      <div className="h-4 w-1/2 bg-surface rounded" />
      <div className="h-6 w-24 bg-foreground rounded-full mt-2 shadow-sm" />
    </div>
  </div>
);

const BookingUI = () => (
  <div className="w-full h-full bg-background border border-border/50 rounded-xl p-4 flex flex-col gap-3 shadow-sm select-none">
    <div className="flex items-center gap-3 border-b border-border/40 pb-3">
      <div className="w-8 h-8 bg-surface rounded flex items-center justify-center">
        <Calendar className="w-4 h-4 text-muted" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="h-2 w-20 bg-surface rounded" />
        <div className="h-2 w-12 bg-surface/60 rounded" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2 flex-1">
      {[...Array(9)].map((_, i) => (
        <div key={i} className={`rounded text-[8px] font-bold flex items-center justify-center ${i === 4 ? 'bg-foreground text-background shadow-sm' : 'bg-surface text-muted/40'}`}>
          {i + 9}:00
        </div>
      ))}
    </div>
  </div>
);

const CRMUI = () => (
  <div className="w-full h-full bg-background border border-border/50 rounded-xl p-4 flex flex-col gap-2 shadow-sm select-none">
    <div className="flex justify-between pb-2 border-b border-border/40">
      <div className="h-3 w-16 bg-surface rounded" />
      <div className="h-3 w-12 bg-surface rounded" />
    </div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-center gap-3 py-1">
        <div className="w-6 h-6 rounded-full bg-surface shrink-0" />
        <div className="flex flex-col gap-1 flex-1">
          <div className="h-2 w-20 bg-surface rounded" />
          <div className="h-1.5 w-24 bg-surface/50 rounded" />
        </div>
        <div className={`h-2 w-10 rounded ${i === 1 ? 'bg-foreground' : 'bg-surface'}`} />
      </div>
    ))}
  </div>
);

const AutomationUI = () => (
  <div className="w-full h-full bg-background border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center relative shadow-sm select-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:8px_8px]" />
    <div className="flex flex-col gap-2 relative z-10 w-full max-w-[140px]">
      <div className="bg-surface border border-border/80 rounded p-1.5 flex items-center gap-2">
        <Calendar className="w-3 h-3 text-muted" />
        <div className="h-1.5 w-12 bg-muted/30 rounded" />
      </div>
      <div className="flex justify-center -my-1"><div className="w-[1px] h-3 bg-border" /></div>
      <div className="bg-surface border border-border/80 rounded p-1.5 flex items-center gap-2">
        <Bot className="w-3 h-3 text-muted" />
        <div className="h-1.5 w-16 bg-muted/30 rounded" />
      </div>
      <div className="flex justify-center -my-1"><div className="w-[1px] h-3 bg-border" /></div>
      <div className="bg-foreground text-background rounded p-1.5 flex items-center gap-2 shadow-sm">
        <Zap className="w-3 h-3 fill-current" />
        <div className="text-[8px] font-bold">Trigger API</div>
      </div>
    </div>
  </div>
);

const FollowUpUI = () => (
  <div className="w-full h-full bg-background border border-border/50 rounded-xl p-4 flex flex-col gap-3 shadow-sm select-none">
    <div className="flex justify-center border-b border-border/40 pb-2">
      <MessageSquare className="w-4 h-4 text-muted" />
    </div>
    <div className="flex flex-col gap-2 mt-2">
      <div className="self-end bg-surface border border-border/50 rounded-l-lg rounded-tr-lg p-2 max-w-[80%]">
        <div className="h-2 w-20 bg-muted/50 rounded mb-1" />
        <div className="h-2 w-12 bg-muted/50 rounded" />
      </div>
      <div className="self-start bg-foreground text-background rounded-r-lg rounded-tl-lg p-2 max-w-[80%] shadow-sm">
        <div className="h-2 w-24 bg-background/50 rounded mb-1" />
        <div className="h-2 w-16 bg-background/50 rounded" />
      </div>
    </div>
  </div>
);

const GrowthUI = () => (
  <div className="w-full h-full bg-background border border-border/50 rounded-2xl p-5 flex flex-col gap-4 shadow-sm select-none">
    <div className="flex justify-between items-end">
      <div className="flex flex-col gap-2">
        <div className="text-[10px] font-bold text-muted uppercase tracking-wider">Revenue</div>
        <div className="h-6 w-24 bg-surface rounded" />
      </div>
      <div className="h-4 w-12 bg-foreground rounded-full shadow-sm" />
    </div>
    <div className="flex-1 flex items-end gap-1.5 mt-2">
      {[30, 45, 40, 60, 50, 80, 100].map((h, i) => (
        <div key={i} className="flex-1 bg-surface rounded-t-sm" style={{ height: `${h}%` }}>
          {i === 6 && <div className="w-full h-full bg-foreground rounded-t-sm shadow-sm" />}
        </div>
      ))}
    </div>
  </div>
);

export default function Projects() {
  const journey = [
    { title: '1. Website System', desc: 'High-converting landing page captures the lead.', ui: <WebsiteUI /> },
    { title: '2. Booking System', desc: 'Lead self-schedules a strategy call instantly.', ui: <BookingUI /> },
    { title: '3. CRM Dashboard', desc: 'Lead appears in your pipeline automatically.', ui: <CRMUI /> },
    { title: '4. Automation Engine', desc: 'System assigns lead to sales and creates Meet link.', ui: <AutomationUI /> },
    { title: '5. Follow-Up System', desc: 'Automated SMS/Email reminders prevent no-shows.', ui: <FollowUpUI /> },
    { title: '6. Business Growth', desc: 'Higher close rates, shorter sales cycles, predictable revenue.', ui: <GrowthUI /> },
  ];

  return (
    <section id="journey" className="py-32 relative overflow-hidden bg-surface border-t border-border/40">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center text-center mb-24 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-muted mb-4 uppercase tracking-[0.15em]">
              System Showcase
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-foreground">
              The Complete Journey.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journey.map((step, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="bg-background border border-border rounded-2xl overflow-hidden flex flex-col group h-full hover:border-foreground/20 transition-colors duration-500">
                <div className="h-48 bg-surface/50 p-6 flex items-center justify-center border-b border-border/50 relative overflow-hidden">
                  <div className="w-full h-full max-w-[240px] mx-auto transition-transform duration-700 ease-out group-hover:scale-105">
                    {step.ui}
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-2">
                  <h3 className="text-lg font-display font-bold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
