'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Check, LayoutGrid, TrendingUp, ShieldAlert, Clock } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface MetricItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<any>;
  isStatic?: boolean;
  staticText?: string;
}

const metrics: MetricItem[] = [
  {
    value: 20,
    suffix: '+',
    label: 'Projects',
    sublabel: 'Bespoke deployments',
    icon: LayoutGrid,
  },
  {
    value: 300,
    suffix: '%',
    label: 'Growth',
    sublabel: 'Average scale achieved',
    icon: TrendingUp,
  },
  {
    value: 7,
    suffix: ' Days',
    label: 'Delivery',
    sublabel: 'First draft turnaround',
    icon: Clock,
    isStatic: true,
    staticText: '7 Days',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Support',
    sublabel: 'Active monitoring',
    icon: ShieldAlert,
    isStatic: true,
    staticText: '24/7',
  },
];

function CountUp({ item }: { item: MetricItem }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView || item.isStatic) return;

    const node = ref.current;
    if (!node) return;

    const controls = animate(0, item.value, {
      duration: 2.0,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        node.textContent = Math.round(value).toString() + item.suffix;
      },
    });

    return () => controls.stop();
  }, [inView, item]);

  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-surface border border-border rounded-[28px] md:rounded-[32px] p-8 flex flex-col justify-between items-start gap-8 hover:border-brand/20 transition-all duration-300"
    >
      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#161616] border border-border text-brand">
        <Icon className="w-5 h-5" />
      </div>

      <div className="text-left">
        <h4 className="text-3xl md:text-4.5xl font-display font-black tracking-tight text-foreground">
          {item.isStatic ? (
            <span>{item.staticText}</span>
          ) : (
            <span ref={ref}>0{item.suffix}</span>
          )}
        </h4>
        <p className="text-sm font-extrabold text-foreground mt-2">{item.label}</p>
        <p className="text-xs font-semibold text-muted mt-0.5">{item.sublabel}</p>
      </div>
    </motion.div>
  );
}

export default function Metrics() {
  const bulletPoints = [
    'Custom systems',
    'Premium execution',
    'Automation first',
    'Fast iteration',
    'Long-term support',
  ];

  return (
    <section id="metrics" className="py-32 relative overflow-hidden bg-background">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
        
        {/* Left Side: Why Choose Us */}
        <ScrollReveal className="lg:col-span-5 w-full">
          <div className="flex flex-col text-left">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-muted text-brand border border-brand/20 mb-4 w-fit uppercase tracking-widest">
              Why Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight leading-[1.1] text-foreground mb-8">
              Built For Results. <br />
              Focused On <span className="text-brand">Growth.</span>
            </h2>
            
            <div className="flex flex-col gap-5 mt-2">
              {bulletPoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-5.5 h-5.5 rounded-full bg-brand/10 text-brand flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span className="text-base font-semibold text-muted">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Right Side: Metrics Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-6 w-full">
          {metrics.map((item, idx) => (
            <CountUp key={idx} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}
