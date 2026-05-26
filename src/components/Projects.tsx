'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from './ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tag: string;
  result: string;
}

const projects: Project[] = [
  {
    title: 'Atlas Studio',
    category: 'Digital Platform',
    description: 'Bespoke portfolio and content experience designed for an international architecture house.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tag: 'Web Design',
    result: '+80% Engagement',
  },
  {
    title: 'Horizon Labs',
    category: 'SaaS Architecture',
    description: 'Next-generation bio-tech interfaces with built-in visual data workflow engines.',
    imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
    tag: 'Interface Engine',
    result: 'Seed-Round Funded',
  },
  {
    title: 'Luma Dining',
    category: 'Digital Experience',
    description: 'Immersive online booking platforms and brand touchpoints for hospitality giants.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    tag: 'Interactive',
    result: '+250% Booking Conv.',
  },
  {
    title: 'Vertex Systems',
    category: 'Intelligent Automation',
    description: 'Unified automated routing, scheduling, and qualified pipeline engine.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tag: 'System Automation',
    result: '12.5k Auto Leads',
  },
];

export default function Projects() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        if (!scrollContainerRef.current || !pinSectionRef.current) return;

        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;

        // Horizontal pinning with inertia scroll
        gsap.to(scrollContainerRef.current, {
          x: () => -(scrollWidth - viewportWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: pinSectionRef.current,
            pin: true,
            scrub: 1.1, // watery, magnetic inertia feeling
            start: 'top top',
            end: () => `+=${scrollWidth - viewportWidth}`,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pinSectionRef} id="projects" className="relative overflow-hidden bg-background md:min-h-screen flex flex-col justify-center select-none py-20">
      
      {/* Mobile Stacked Layout */}
      <div className="md:hidden py-12 px-6 relative z-10 flex flex-col gap-12">
        <ScrollReveal>
          <div className="flex flex-col text-left">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-muted text-brand border border-brand/20 mb-4 w-fit uppercase tracking-widest">
              Selected Cases
            </span>
            <h2 className="text-3xl font-display font-black tracking-tight text-foreground mb-4">
              Bespoke Digital Works
            </h2>
            <p className="text-sm font-medium text-muted max-w-sm">
              We design, develop, and automate systems built for high-performance brands.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 bg-surface border border-border rounded-[32px] overflow-hidden p-6"
            >
              <div className="w-full h-52 rounded-2xl overflow-hidden bg-[#121212] relative">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-display font-black text-foreground">{project.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-semibold text-muted">{project.category}</span>
                  <span className="text-xs font-bold text-foreground flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5 text-brand" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop Horizontal Scroll Layout */}
      <div className="hidden md:block relative z-10 w-full overflow-hidden">
        <div ref={scrollContainerRef} className="flex items-center gap-24 px-24 h-screen w-fit">
          
          {/* Header Panel */}
          <div className="w-[380px] flex flex-col justify-center text-left flex-shrink-0">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-muted text-brand border border-brand/20 mb-6 w-fit uppercase tracking-widest">
              Selected Cases
            </span>
            <h2 className="text-4xl lg:text-5.5xl font-display font-black tracking-tight leading-tight text-foreground mb-6">
              Bespoke <br /> Portfolio
            </h2>
            <p className="text-base text-muted font-medium mb-8 leading-relaxed">
              We design, engineer, and automate premium digital systems. Scroll horizontally to inspect our global studio cases.
            </p>
            <div className="flex items-center gap-3 text-sm font-bold text-muted">
              Scroll Down to Slide <span className="text-brand animate-pulse">→</span>
            </div>
          </div>

          {/* Project Panels */}
          {projects.map((project, idx) => {
            // Apply slight horizontal offsets to different panels for parallax scroll speed differences
            const parallaxOffset = (idx % 2 === 0) ? -20 : 20;

            return (
              /* Low gravity float animation */
              <motion.div
                key={idx}
                animate={{
                  y: idx % 2 === 0 ? [-6, 6, -6] : [6, -6, 6],
                }}
                transition={{
                  duration: 6 + idx * 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex-shrink-0"
                style={{
                  transform: `translateX(${parallaxOffset}px)`
                }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.025, // expand card
                    borderColor: 'rgba(52, 210, 121, 0.3)'
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-[740px] h-[480px] bg-surface border border-border rounded-[32px] overflow-hidden p-8 flex items-center gap-8 hover:shadow-premium transition-all duration-500 group relative cursor-pointer"
                >
                  {/* Image side with Zoom/Parallax effect */}
                  <div className="w-[50%] h-full rounded-[24px] overflow-hidden relative bg-[#121212]">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent z-10 transition-colors duration-500" />
                    <motion.img
                      src={project.imageUrl}
                      alt={project.title}
                      whileHover={{ scale: 1.04 }} // exact 1.04 zoom reveal
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover bg-surface"
                    />
                    {/* Float Badge */}
                    <span className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[var(--surface)] border border-border text-foreground shadow-sm">
                      {project.tag}
                    </span>
                  </div>

                  {/* Info side */}
                  <div className="w-[50%] h-full flex flex-col justify-between text-left py-4">
                    <div className="flex flex-col gap-3">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-brand">
                        {project.category}
                      </span>
                      <h3 className="text-2xl lg:text-3.5xl font-display font-black tracking-tight text-foreground group-hover:text-brand transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm font-medium text-muted leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 border-t border-border/40 pt-4">
                      {/* Results row */}
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-brand animate-pulse" />
                        <span className="text-xs font-extrabold text-brand uppercase tracking-wider">
                          {project.result}
                        </span>
                      </div>
                      {/* Action Link */}
                      <div className="flex items-center gap-2 text-sm font-bold text-foreground group-hover:text-brand transition-colors duration-300">
                        View Case 
                        <span className="flex items-center justify-center w-6 h-6 rounded-full border border-border bg-[#161616] text-muted group-hover:bg-brand group-hover:border-brand group-hover:text-black transition-all duration-300">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
