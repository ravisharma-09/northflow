'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ArrowDown } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const DashboardRealEstate = () => (
  <div className="bg-background border border-border/50 rounded-2xl p-6 shadow-sm select-none">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/40 pb-4 mb-4 gap-2">
      <h4 className="font-bold text-foreground">Recent Leads</h4>
      <span className="text-[10px] font-bold uppercase tracking-wider text-green-500 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        Live Tracking Enabled
      </span>
    </div>
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-surface p-3 rounded-lg border border-border/50 gap-2">
        <span className="text-sm font-semibold text-foreground">Sarah Johnson</span>
        <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20 whitespace-nowrap">New Inquiry</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-surface p-3 rounded-lg border border-border/50 gap-2">
        <span className="text-sm font-semibold text-foreground">Michael Chen</span>
        <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 whitespace-nowrap">Viewing Scheduled</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-surface p-3 rounded-lg border border-border/50 gap-2">
        <span className="text-sm font-semibold text-foreground">Emma Davis</span>
        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 whitespace-nowrap">Follow-up Sent</span>
      </div>
    </div>
  </div>
);

const DashboardCoaching = () => (
  <div className="bg-background border border-border/50 rounded-2xl p-6 shadow-sm select-none">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/40 pb-4 mb-4 gap-2">
      <h4 className="font-bold text-foreground">Upcoming Calls</h4>
      <span className="text-[10px] font-bold uppercase tracking-wider text-green-500 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        Automated Scheduling Active
      </span>
    </div>
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-surface p-3 rounded-lg border border-border/50 gap-2">
        <span className="text-sm font-semibold text-foreground">Monday</span>
        <span className="text-xs font-bold text-foreground bg-foreground/5 px-2.5 py-1 rounded-md border border-border/40 whitespace-nowrap">2:00 PM</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-surface p-3 rounded-lg border border-border/50 gap-2">
        <span className="text-sm font-semibold text-foreground">Tuesday</span>
        <span className="text-xs font-bold text-foreground bg-foreground/5 px-2.5 py-1 rounded-md border border-border/40 whitespace-nowrap">11:00 AM</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-surface p-3 rounded-lg border border-border/50 gap-2">
        <span className="text-sm font-semibold text-foreground">Wednesday</span>
        <span className="text-xs font-bold text-foreground bg-foreground/5 px-2.5 py-1 rounded-md border border-border/40 whitespace-nowrap">4:00 PM</span>
      </div>
    </div>
  </div>
);

const DashboardStartup = () => (
  <div className="bg-background border border-border/50 rounded-2xl p-6 shadow-sm select-none">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/40 pb-4 mb-4 gap-2">
      <h4 className="font-bold text-foreground">Pipeline</h4>
      <span className="text-[10px] font-bold uppercase tracking-wider text-green-500 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        Live Pipeline Tracking
      </span>
    </div>
    <div className="flex flex-col gap-2 relative">
      <div className="absolute left-[9px] top-4 bottom-4 w-[2px] bg-border/40" />
      {[
        { label: "New Leads", count: 12, color: "bg-blue-500", active: true },
        { label: "Qualified", count: 8, color: "bg-amber-500", active: true },
        { label: "Meeting Scheduled", count: 5, color: "bg-emerald-500", active: true },
        { label: "Proposal Sent", count: 3, color: "bg-purple-500", active: true },
        { label: "Closed", count: 2, color: "bg-green-500", active: false }
      ].map((stage, i) => (
        <div key={i} className={`flex justify-between items-center bg-surface p-2.5 rounded-lg border border-border/50 relative z-10 ${stage.active ? '' : 'opacity-60'}`}>
          <div className="flex items-center gap-3">
             <div className={`w-2.5 h-2.5 rounded-full ${stage.color} shrink-0 ring-4 ring-background ml-1`} />
             <span className="text-sm font-semibold text-foreground">{stage.label}</span>
          </div>
          <span className="text-xs font-bold text-foreground bg-background px-2 py-0.5 rounded-md border border-border/40">{stage.count}</span>
        </div>
      ))}
    </div>
  </div>
);

const systemsData = [
  {
    title: "Real Estate Lead Engine",
    flow: [
      "Customer visits landing page",
      "Submits property inquiry",
      "Lead enters CRM automatically",
      "Agent receives instant notification",
      "Automated follow-up sequence starts",
      "Property viewing booked",
      "Lead tracked in dashboard"
    ],
    tech: ["Website", "CRM", "Automation", "Dashboard", "Email", "WhatsApp"],
    benefits: [
      "Faster lead response",
      "No missed inquiries",
      "Centralized lead management"
    ],
    ui: <DashboardRealEstate />
  }
];

export default function Projects() {
  return (
    <section id="journey" className="py-16 relative overflow-hidden bg-surface border-t border-border/40">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-muted mb-4 uppercase tracking-[0.15em]">
              Systems We Build
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-foreground mb-6">
              Real Business Systems.<br/>Built For Growth.
            </h2>
            <p className="text-base text-muted font-medium leading-relaxed">
              Every business has different workflows. We build connected systems that capture leads, automate follow-ups, streamline operations, and give you complete visibility over your business.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-12 lg:gap-16">
          {systemsData.map((sys, idx) => (
            <ScrollReveal key={idx} delay={0.1}>
              <div className="bg-background border border-border/60 rounded-[32px] p-8 lg:p-12 shadow-premium relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-foreground/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                
                <div className="mb-10">
                  <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight text-foreground">{sys.title}</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
                  {/* Left Side: Workflow Timeline */}
                  <div className="relative">
                    <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-border/80" />
                    <div className="flex flex-col gap-6 relative z-10">
                      {sys.flow.map((step, i) => (
                        <div key={i} className="flex gap-4 items-start group/step">
                           <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center shrink-0 mt-[-2px] shadow-sm relative z-10 transition-transform duration-300 group-hover/step:scale-110">
                              <ArrowDown className="w-4 h-4" />
                           </div>
                           <div className="pt-1">
                              <span className="font-semibold text-foreground/90 text-sm md:text-base transition-colors duration-300 group-hover/step:text-foreground">{step}</span>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right Side: Dashboard Preview */}
                  <div className="hidden lg:flex flex-col justify-center">
                     <div className="transform transition-transform duration-500 lg:hover:-translate-y-2 lg:hover:rotate-1">
                       {sys.ui}
                     </div>
                  </div>
                </div>

                {/* Bottom: Tech & Benefits */}
                <div className="pt-10 border-t border-border/60 grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                     <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-muted mb-5">Technologies</h4>
                     <div className="flex flex-wrap gap-2">
                       {sys.tech.map((t, i) => (
                         <span key={i} className="px-3.5 py-1.5 rounded-full bg-surface border border-border/50 text-xs font-bold text-foreground hover:border-foreground/20 transition-colors duration-300">
                           {t}
                         </span>
                       ))}
                     </div>
                  </div>
                  <div>
                     <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-muted mb-5">Typical Benefits</h4>
                     <div className="flex flex-col gap-3.5">
                       {sys.benefits.map((b, i) => (
                         <div key={i} className="flex items-center gap-3">
                           <div className="flex-shrink-0 w-5 h-5 rounded-full bg-foreground/5 flex items-center justify-center text-foreground">
                             <Check className="w-3.5 h-3.5" />
                           </div>
                           <span className="text-sm font-bold text-foreground/90">{b}</span>
                         </div>
                       ))}
                     </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Section CTA */}
        <ScrollReveal delay={0.2}>
          <div className="mt-20 bg-foreground text-background rounded-[32px] p-10 md:p-14 text-center max-w-4xl mx-auto shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-6">
                Let's Build Your Growth System
              </h2>
              <p className="text-background/80 font-medium text-base md:text-lg mb-10 max-w-2xl mx-auto">
                Whether you need a website, automation, CRM, dashboard, or a complete business system, we'll help design the right solution for your business.
              </p>
              <a
                href="/start"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-background text-foreground font-bold text-base hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md group/btn"
              >
                Start With A Strategy Call
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-foreground text-background group-hover/btn:translate-x-0.5 transition-transform duration-300">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
