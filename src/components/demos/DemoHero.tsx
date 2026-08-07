"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { DemoSite } from "@/data/demo-sites";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";

const displayFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function DemoHero({ demo }: { demo: DemoSite }) {
  const variant = demo.designConfig.heroVariant;
  const imageStyle = demo.designConfig.imageStyle;

  // Render the Image Block so we can reuse it
  const renderImageBlock = (className: string = "") => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${className}`}
    >
      <div className={`relative overflow-hidden bg-[var(--demo-text)] shadow-2xl h-full w-full ${
        imageStyle === 'rounded' ? 'rounded-[24px]' :
        imageStyle === 'soft-edges' ? 'rounded-[12px]' : 'rounded-none'
      } ${imageStyle === 'high-contrast' ? 'border-4 border-[var(--demo-border)]' : ''}`}>
        <Image
          src={demo.image}
          alt={demo.imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="object-cover transition-transform duration-1000 hover:scale-105"
        />
        
        {/* Floating Status */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={`absolute left-6 top-6 bg-[var(--demo-background)] px-4 py-3 shadow-lg border border-[var(--demo-border)] ${imageStyle === 'rounded' || imageStyle === 'soft-edges' ? 'rounded-full' : 'rounded-none'}`}
        >
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--demo-accent)] mb-1">Status</p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
            <p className="text-[11px] font-bold text-[var(--demo-text)]">Accepting requests</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={`absolute bottom-6 left-6 right-6 bg-[var(--demo-text)] p-6 shadow-2xl md:left-auto md:w-[65%] ${imageStyle === 'rounded' ? 'rounded-[16px]' : imageStyle === 'soft-edges' ? 'rounded-[8px]' : 'rounded-none'}`}
        >
          <div className="flex justify-between items-center mb-3">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--demo-background)] opacity-60">Journey Stage</p>
          </div>
          <p className={`${displayFont.className} text-xl font-black text-[var(--demo-background)] mb-4`}>Details ready for review</p>
          <div className="h-1 w-full bg-[var(--demo-background)]/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="h-full bg-[var(--demo-accent)]"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // Render the Text Block so we can reuse it
  const renderTextBlock = (centered: boolean = false) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${centered ? 'items-center text-center max-w-4xl mx-auto' : ''}`}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--demo-accent)]">
        {demo.eyebrow}
      </p>
      <h1 className={`${displayFont.className} mt-8 text-[clamp(3.5rem,7vw,7rem)] font-black leading-[0.88] text-[var(--demo-text)] tracking-tighter`}>
        {demo.headline}
      </h1>
      <p className={`mt-8 text-lg font-medium leading-relaxed text-[var(--demo-muted)] ${centered ? 'max-w-2xl' : 'max-w-lg'}`}>
        {demo.description}
      </p>
      
      <div className={`mt-10 flex flex-col gap-4 sm:flex-row ${centered ? 'justify-center' : ''}`}>
        <a
          href="#request"
          className="inline-flex min-h-14 items-center justify-center gap-3 bg-[var(--demo-accent)] px-8 text-sm font-black text-[var(--demo-accent-text)] transition-transform hover:-translate-y-1"
          style={{ borderRadius: imageStyle === 'rounded' ? '9999px' : imageStyle === 'soft-edges' ? '8px' : '0px' }}
        >
          {demo.primaryAction}
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="#services"
          className="inline-flex min-h-14 items-center justify-center gap-3 border-2 border-[var(--demo-border)] px-8 text-sm font-black text-[var(--demo-text)] transition-colors hover:border-[var(--demo-text)]"
          style={{ borderRadius: imageStyle === 'rounded' ? '9999px' : imageStyle === 'soft-edges' ? '8px' : '0px' }}
        >
          Explore the service
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
      
      <div className={`mt-12 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.15em] text-[var(--demo-muted)] ${centered ? 'justify-center' : ''}`}>
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--demo-accent)] opacity-75"></span>
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--demo-accent)]"></span>
        </span>
        {demo.location}
      </div>
    </motion.div>
  );

  // Variant: full-background (Event Rental)
  if (variant === 'full-background') {
    return (
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-24 md:px-12 bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src={demo.image}
            alt={demo.imageAlt}
            fill
            priority
            className="object-cover opacity-50 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--demo-background)] via-[var(--demo-background)]/80 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto pt-32">
          {renderTextBlock(true)}
        </div>
      </section>
    );
  }

  // Variant: centered (Barbershop)
  if (variant === 'centered') {
    return (
      <section className="px-6 pb-16 pt-16 md:px-12 md:pb-32 md:pt-32 bg-[var(--demo-background)]">
        <div className="mx-auto max-w-7xl">
          {renderTextBlock(true)}
          <div className="mt-20 mx-auto max-w-5xl">
            {renderImageBlock("aspect-[16/9]")}
          </div>
        </div>
      </section>
    );
  }

  // Variant: split-left (Auto Detailing)
  if (variant === 'split-left') {
    return (
      <section className="px-6 pb-16 pt-12 md:px-12 md:pb-32 md:pt-24 bg-[var(--demo-background)]">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {renderImageBlock("aspect-[4/3] lg:aspect-[1.05/1] order-last lg:order-first")}
          {renderTextBlock(false)}
        </div>
      </section>
    );
  }

  // Variant: offset-grid (Car Rental)
  if (variant === 'offset-grid') {
    return (
      <section className="px-6 pb-16 pt-12 md:px-12 md:pb-32 md:pt-24 bg-[var(--demo-background)]">
        <div className="mx-auto max-w-7xl relative">
          <div className="lg:w-2/3 relative z-10 bg-[var(--demo-background)]/90 backdrop-blur-md p-8 lg:p-12 -mx-8 lg:mx-0 shadow-2xl border border-[var(--demo-border)]">
            {renderTextBlock(false)}
          </div>
          <div className="lg:absolute lg:top-12 lg:right-0 lg:w-3/5 lg:h-[120%] mt-8 lg:mt-0 z-0">
            {renderImageBlock("h-full min-h-[400px]")}
          </div>
        </div>
      </section>
    );
  }

  // Variant: split-right (Moving - Default)
  return (
    <section className="px-6 pb-16 pt-12 md:px-12 md:pb-32 md:pt-24 bg-[var(--demo-background)]">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        {renderTextBlock(false)}
        {renderImageBlock("aspect-[4/3] lg:aspect-[1.05/1]")}
      </div>
    </section>
  );
}
