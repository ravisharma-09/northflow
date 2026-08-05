"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { BarChart3, Database, LayoutTemplate, Workflow } from "lucide-react";
import { useRef } from "react";
import { Container, Eyebrow, Section } from "./Primitives";

const stages = [
  { title: "Website", text: "Explains the offer and captures a useful enquiry.", icon: LayoutTemplate },
  { title: "Automation", text: "Sends confirmations, reminders and internal alerts.", icon: Workflow },
  { title: "CRM", text: "Keeps the lead, notes, ownership and next step together.", icon: Database },
  { title: "Dashboard", text: "Makes pipeline and operating activity visible.", icon: BarChart3 },
];

export default function ConnectedSystem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.22 });
  const reduceMotion = useReducedMotion();

  return (
    <Section id="systems" className="public-ink overflow-hidden">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <Eyebrow className="text-muted">The connected system</Eyebrow>
            <h2 className="mt-7 max-w-2xl text-[clamp(3rem,5.5vw,5.25rem)] font-black leading-[0.94]">
              Four layers. <span className="editorial-serif block">One customer journey.</span>
            </h2>
          </div>
          <p className="max-w-xl text-base font-medium leading-8 text-muted lg:justify-self-end">
            The website starts the relationship. Automation keeps it moving. CRM preserves the context. The dashboard shows your team what needs attention.
          </p>
        </div>

        <div ref={ref} className="relative mt-16 hidden pt-2 md:block">
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute left-0 top-0 h-[120px] w-full"
          >
            <motion.path
              d="M150 60 H1050"
              fill="none"
              stroke="rgba(245,238,229,0.28)"
              strokeWidth="2"
              initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
            {inView && !reduceMotion ? (
              <circle r="6" fill="#e08d57">
                <animateMotion dur="5.5s" repeatCount="indefinite" path="M150 60 H1050" />
              </circle>
            ) : null}
          </svg>

          <div className="relative grid grid-cols-4 gap-5">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <motion.article
                  key={stage.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.55, delay: 0.25 + index * 0.28 }}
                  className="relative pt-[88px]"
                >
                  <span className="absolute left-1/2 top-[32px] z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-[rgba(245,238,229,0.44)] bg-[#11100d] text-[#f5eee5]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-h-[220px] rounded-[8px] border border-[rgba(245,238,229,0.2)] bg-[#171612] p-6 text-[#f5eee5]">
                    <span className="text-[11px] font-black text-brand">0{index + 1}</span>
                    <h3 className="mt-10 text-2xl font-black">{stage.title}</h3>
                    <p className="mt-4 text-sm font-medium leading-7 text-muted">{stage.text}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="relative mt-14 md:hidden">
          <div className="absolute bottom-10 left-6 top-6 w-px bg-border" />
          <div className="grid gap-7">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <article key={stage.title} className="relative grid grid-cols-[48px_1fr] gap-5">
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(245,238,229,0.44)] bg-[#11100d]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="absolute left-12 top-6 h-px w-5 bg-[rgba(245,238,229,0.28)]" />
                  <div className="rounded-[8px] border border-[rgba(245,238,229,0.2)] bg-[#171612] p-5 text-[#f5eee5]">
                    <span className="text-[11px] font-black text-brand">0{index + 1}</span>
                    <h3 className="mt-5 text-2xl font-black">{stage.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-7 text-muted">{stage.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
