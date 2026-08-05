"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ButtonLink, Container, Eyebrow } from "./Primitives";

export default function EditorialHero() {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number, y = 18) => ({
    initial: reduceMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="public-paper-gradient flex min-h-[calc(100svh-158px)] items-center border-b border-border py-16 md:py-20">
      <Container>
        <motion.div {...rise(0.08, 14)}>
          <Eyebrow className="text-muted">Websites · Automation · Business Systems</Eyebrow>
        </motion.div>

        <h1 className="mt-8 max-w-[1160px] text-[clamp(3.25rem,7.5vw,6.75rem)] font-black leading-[0.92] text-foreground">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block" {...rise(0.16, 42)}>
              One connected system.
            </motion.span>
          </span>
          <span className="editorial-serif block overflow-hidden pb-[0.12em] text-[clamp(2.75rem,7vw,6.25rem)] leading-[0.94]">
            <motion.span className="block" {...rise(0.26, 42)}>
              <span className="md:hidden">Built to capture leads and save time.</span>
              <span className="hidden md:block">Built to capture leads</span>
              <span className="hidden md:block">and save time.</span>
            </motion.span>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-end">
          <motion.p
            className="max-w-2xl text-base font-medium leading-8 text-muted md:text-lg"
            {...rise(0.4)}
          >
            NorthFlow connects a premium website, lead capture, booking, follow-up, CRM and business dashboards into one system built around the way your service business actually works.
          </motion.p>
          <motion.div
            className="flex flex-col gap-3 sm:flex-row lg:justify-end"
            {...rise(0.5)}
          >
            <ButtonLink href="/start">
              Book a strategy call
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </ButtonLink>
            <ButtonLink href="/demos" variant="secondary">
              Explore live demos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
