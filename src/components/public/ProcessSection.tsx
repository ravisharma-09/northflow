"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container, Section, SectionHeading } from "./Primitives";

const stages = [
  ["01", "Discover", "Map the offer, customer journey, bottlenecks and tools already in place."],
  ["02", "Design", "Shape the public experience and the operating workflow around the real business."],
  ["03", "Connect", "Build the pages, forms, booking, automation and CRM connections that belong together."],
  ["04", "Launch and improve", "Release the system, verify the handoffs and refine it as the business learns."],
];

export default function ProcessSection() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="process" className="border-y border-border bg-surface">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="A deliberate path from scattered workflow to connected system."
          description="No unsupported timeline promise. Scope, integrations and launch sequence are confirmed after discovery."
        />

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-4 hidden h-px bg-border md:block" />
          <motion.div
            className="absolute left-0 top-4 hidden h-px bg-brand md:block"
            initial={reduceMotion ? { width: "100%" } : { width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="grid gap-10 md:grid-cols-4">
            {stages.map(([number, title, text]) => (
              <article key={number} className="relative border-t border-border pt-7 md:border-0 md:pt-12">
                <span className="absolute left-0 top-[9px] hidden h-4 w-4 rounded-full border border-brand bg-surface md:block" />
                <span className="text-xs font-black text-brand">{number}</span>
                <h3 className="mt-5 text-2xl font-black leading-tight">{title}</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
