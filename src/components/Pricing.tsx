'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const plans = [
  {
    name: 'Starter',
    subtitle: 'Website System',
    description: 'Perfect for businesses building their online presence.',
    features: [
      'Professional website',
      'Lead capture forms',
      'Booking integration',
      'Mobile optimization',
      'Basic SEO',
    ],
    recommended: false,
  },
  {
    name: 'Growth',
    subtitle: 'Website + Automation',
    description: 'Perfect for businesses wanting more leads and less manual work.',
    features: [
      'Everything in Starter',
      'Lead notifications',
      'Email automation',
      'Booking automation',
      'WhatsApp workflows',
      'Follow-up systems',
    ],
    recommended: true,
  },
  {
    name: 'Scale',
    subtitle: 'Website + Automation + Dashboard',
    description: 'Perfect for growing businesses that need full control and visibility.',
    features: [
      'Everything in Growth',
      'CRM Dashboard',
      'Lead Pipeline',
      'Revenue Tracking',
      'Business Analytics',
      'Team Visibility',
    ],
    recommended: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-background border-t border-border/40">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-muted mb-4 uppercase tracking-[0.15em] block">
              Pricing & Plans
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-foreground">
              Choose Your Growth System
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className={`relative flex flex-col h-full p-6 lg:p-8 rounded-3xl bg-surface border ${plan.recommended ? 'border-foreground shadow-premium' : 'border-border/50 hover:border-foreground/20'} transition-all duration-300`}>
                
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-sm">
                    Recommended
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-display font-black text-foreground mb-1">{plan.name}</h3>
                  <p className="text-brand font-bold text-sm mb-4">{plan.subtitle}</p>
                  <p className="text-sm font-medium text-muted leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="flex-1">
                  <ul className="flex flex-col gap-4">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-foreground" />
                        </div>
                        <span className={`text-sm font-medium ${fIdx === 0 && plan.name !== 'Starter' ? 'text-foreground font-bold' : 'text-foreground/80'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="/start"
                  className={`mt-10 w-full py-4 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${plan.recommended ? 'bg-foreground text-background hover:opacity-90' : 'bg-background border border-border text-foreground hover:bg-surface'}`}
                >
                  Start With A Strategy Call
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
