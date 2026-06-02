'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function FAQ() {
  const faqs = [
    {
      q: "Do you provide ongoing support?",
      a: "Yes. After launch, you can choose an ongoing support retainer for maintenance, updates, and future improvements."
    },
    {
      q: "How long does it take to build my system?",
      a: "Most projects are completed within 1–4 weeks depending on requirements."
    },
    {
      q: "Can I start with only a website?",
      a: "Yes. You can start with a website and add automation or dashboards later."
    },
    {
      q: "Can you connect my existing tools?",
      a: "Yes. We can integrate tools like Google Calendar, WhatsApp, CRMs, and more."
    },
    {
      q: "Will I be able to manage the system myself?",
      a: "Yes. We build easy-to-use systems and provide guidance after launch."
    },
    {
      q: "What businesses do you work with?",
      a: "We work with service businesses, agencies, consultants, coaches, local businesses, and startups."
    },
    {
      q: "Do I need technical knowledge?",
      a: "No. We handle the setup, integrations, and technical work for you."
    },
    {
      q: "How do we get started?",
      a: "Book a strategy call and we'll discuss your goals, workflow, and the best solution for your business."
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-16 bg-surface border-t border-border/40">
      <div className="w-full max-w-4xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-10">
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
