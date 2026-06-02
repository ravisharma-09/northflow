'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function FAQ() {
  const faqs = [
    {
      q: "Do I need automation?",
      a: "If your business spends time manually handling leads, bookings or follow-ups, automation can save hours every week."
    },
    {
      q: "Can I start with just a website?",
      a: "Yes. Many clients begin with a website and add automation later."
    },
    {
      q: "Do you provide ongoing support?",
      a: "Yes. We offer maintenance, improvements and ongoing optimization."
    },
    {
      q: "Can systems be expanded later?",
      a: "Absolutely. Every system is designed to grow with your business."
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
