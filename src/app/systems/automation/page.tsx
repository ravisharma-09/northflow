'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Zap, MessageCircle, Mail, Calendar, Settings, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

const sections = [
  {
    title: "Lead Management",
    icon: <Zap className="w-5 h-5 text-brand" />,
    items: ["Instant Lead Notifications", "Lead Assignment", "Pipeline Updates", "Follow-Up Sequences"]
  },
  {
    title: "WhatsApp Automation",
    icon: <MessageCircle className="w-5 h-5 text-brand" />,
    items: ["AI WhatsApp Replies", "Welcome Messages", "Appointment Scheduling", "Reminder Messages", "Follow-Up Automation"]
  },
  {
    title: "Email Automation",
    icon: <Mail className="w-5 h-5 text-brand" />,
    items: ["Welcome Emails", "Follow-Up Emails", "Drip Campaigns", "Customer Nurturing"]
  },
  {
    title: "Booking Automation",
    icon: <Calendar className="w-5 h-5 text-brand" />,
    items: ["Calendar Scheduling", "Meeting Confirmations", "Reminder Emails", "Reminder WhatsApp Messages"]
  },
  {
    title: "Operations Automation",
    icon: <Settings className="w-5 h-5 text-brand" />,
    items: ["Team Notifications", "Workflow Automation", "Internal Alerts", "CRM Synchronization"]
  }
];

const additionalOptions = [
  "AI Customer Support", "AI Lead Qualification", "AI Appointment Booking", 
  "Review Request Systems", "Document Generation", "Advanced Approval Workflows", "Finance & Payment Automations"
];

export default function AutomationSystems() {
  return (
    <main className="min-h-screen w-full relative bg-background pb-24">
      {/* Background glow */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/10 via-background to-background pointer-events-none z-0" />
      
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-8 max-w-7xl mx-auto">
        <Link href="/#services" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-sm">Back to Systems</span>
        </Link>
        <Link href="/start" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-bold text-sm hover:scale-[1.03] transition-all shadow-sm">
          Book a Call <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 mt-12">
        <ScrollReveal>
          <div className="mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-muted text-brand border border-brand/20 mb-4 inline-block uppercase tracking-widest">
              Workflow Efficiency
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight text-foreground mb-6">
              Automation Systems
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              Eliminate repetitive tasks, engage with customers instantly, and streamline your operations with intelligent automation sequences.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sections.map((section, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="bg-surface/50 border border-border rounded-[24px] p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-background border border-border shadow-sm">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-display font-black text-foreground">{section.title}</h2>
                </div>
                <ul className="flex flex-col gap-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-semibold text-muted">
                      <Check className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="bg-gradient-to-br from-surface to-background border border-border rounded-[24px] p-8 md:p-10 mb-20">
            <h2 className="text-2xl font-display font-black text-foreground mb-6">Additional Options Available</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {additionalOptions.map((opt, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-semibold text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-border" />
                  {opt}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted/70 italic">* Additional costs may apply for advanced functionality.</p>
          </div>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal delay={0.4}>
          <div className="bg-brand/5 border border-brand/20 rounded-[32px] p-10 md:p-16 text-center max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-4">
              Need something custom?
            </h2>
            <p className="text-base text-muted max-w-xl mx-auto mb-8 leading-relaxed">
              Every business operates differently. We can design custom websites, automations, dashboards and business systems tailored to your workflow and goals.
            </p>
            <Link 
              href="/start"
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-bold text-base hover:scale-[1.03] transition-transform duration-300 shadow-md group"
            >
              Book a Strategy Call 
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand text-background group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
