'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function FAQ() {
  const faqs = [
    {
      q: "Do you only build the website, or the CRM too?",
      a: "We build the entire end-to-end system. This includes the public-facing marketing website, the automated booking engine, the backend CRM, and the automation pipelines that connect them."
    },
    {
      q: "How long does a typical system implementation take?",
      a: "Most bespoke system implementations take between 4 to 8 weeks, depending on the complexity of your custom automation requirements and database structure."
    },
    {
      q: "Can this integrate with our existing tools?",
      a: "Yes. Our architecture is API-first. We can integrate with Stripe, Google Workspace, Slack, Twilio, and most major ERPs or specialized industry tools."
    },
    {
      q: "Do we own the code and the system?",
      a: "Absolutely. Once the project is completed and handed over, you own the infrastructure, the data, and the intellectual property."
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-32 bg-surface border-t border-border/40">
      <div className="w-full max-w-4xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-foreground">
              Frequently Asked
            </h2>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div 
                  className={`border border-border/50 rounded-2xl bg-background overflow-hidden transition-colors duration-300 ${isOpen ? 'border-foreground/20' : ''}`}
                >
                  <button 
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="text-lg font-bold text-foreground">{faq.q}</span>
                    <span className="flex-shrink-0 ml-4 w-8 h-8 rounded-full bg-surface border border-border/50 flex items-center justify-center text-foreground">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-base text-muted font-medium leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
