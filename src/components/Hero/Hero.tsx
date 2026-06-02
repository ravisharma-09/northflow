'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play, Star, CheckCircle, Zap, Shield, Sparkles, Clock } from 'lucide-react';
import HeroVisual from './HeroVisual';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // --- Page Load Timeline ---
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 0.0s background fades
    tl.to('.hero-bg', { opacity: 1, duration: 1 }, 0.0);
    
    // 0.2s navbar slides down (assuming global nav)
    tl.fromTo('nav', { y: -100 }, { y: 0, duration: 0.8 }, 0.2);

    // 0.4s headline reveals line-by-line
    tl.fromTo('.hero-headline', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.4);

    // 0.6s paragraph fades
    tl.fromTo('.hero-paragraph', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.6);

    // 0.8s buttons rise
    tl.fromTo('.hero-button', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 0.8);

    // 1.0s 3D Visual enters
    tl.fromTo('.hero-visual-container', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }, 1.0);



    // Pulse icons every 6s
    gsap.to('.hero-icon', {
      scale: 1.1,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      repeatDelay: 5.7,
      ease: 'power1.inOut'
    });

    // Magnetic Button effect
    const buttons = gsap.utils.toArray('.hero-button') as HTMLElement[];
    const handleMouseMove = (e: MouseEvent, btn: HTMLElement) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' });
    };
    const handleMouseLeave = (btn: HTMLElement) => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    const cleanups: (() => void)[] = [];
    buttons.forEach((btn) => {
      const onMove = (e: MouseEvent) => handleMouseMove(e, btn);
      const onLeave = () => handleMouseLeave(btn);
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
      
      cleanups.push(() => {
        btn.removeEventListener('mousemove', onMove);
        btn.removeEventListener('mouseleave', onLeave);
      });
    });

    // Clean up depths (removed parallax cards)

    // --- Scroll Parallax ---
    gsap.to(containerRef.current, {
      scale: 0.985,
      opacity: 0.85,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Services section transition
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      gsap.fromTo(servicesSection, { y: 40 }, {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: servicesSection,
          start: 'top bottom',
          end: 'top center',
          scrub: true
        }
      });
    }

    return () => {
      cleanups.forEach(fn => fn());
    };
  }, { scope: containerRef });

  const featureBadges = [
    { name: 'Lead Capture Systems', icon: Zap },
    { name: 'Booking Automation', icon: Clock },
    { name: 'CRM Infrastructure', icon: Shield },
    { name: 'Business Dashboards', icon: Sparkles },
    { name: 'Operational Automation', icon: CheckCircle },
  ];

  // Duplicate for seamless marquee
  const marqueeBadges = [...featureBadges, ...featureBadges, ...featureBadges, ...featureBadges];

  return (
    <section ref={containerRef} id="home" className="relative pt-24 md:pt-28 pb-6 md:pb-10 flex flex-col justify-center overflow-x-clip min-h-[90vh] md:min-h-screen">
      {/* Background with fading grid and soft glow */}
      <div className="hero-bg absolute inset-0 opacity-0 z-0 pointer-events-none">
        <div className="absolute inset-0 grid-floor bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.03]" />
        {/* Removed massive radial blur for a cleaner, colder look */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col items-start text-left z-10 relative">
        

          {/* Heading */}
          <h1 className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter leading-[1.05] text-foreground mb-6 max-w-[1000px]">
            Websites, Automation & Business Systems{' '}
            <span className="text-muted block mt-2">Built To Generate More Leads And Save You Time.</span>
          </h1>

          {/* Subtext */}
          <p className="hero-paragraph text-base sm:text-lg lg:text-xl text-muted font-medium max-w-[700px] leading-[1.6] mb-8">
            We help businesses automate bookings, follow-ups, customer communication and operations through modern websites, intelligent automation and custom dashboards.
          </p>

          {/* Call To Actions */}
          <div className="flex flex-col items-start gap-5 mb-10">
            <div className="flex flex-wrap items-center justify-start gap-4">
              <a
                href="#cta"
                className="hero-button flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-bold text-base hover:scale-[1.03] transition-transform duration-300 shadow-md group outline-none"
              >
                Book A Strategy Call
                <span className="hero-icon flex items-center justify-center w-5 h-5 rounded-full bg-background text-foreground group-hover:translate-x-0.5 transition-transform duration-300">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>

            {/* Contact Info */}
            <div className="flex items-center gap-6 text-sm font-bold text-muted hero-paragraph">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
                Remote • Worldwide
              </span>
              <a href="mailto:northflow.work@gmail.com" className="hover:text-foreground transition-colors duration-300">
                northflow.work@gmail.com
              </a>
            </div>
          </div>

        </div>

      {/* Trust Badges Row */}
      <div className="w-full mt-6 md:mt-12 z-10 relative overflow-hidden">
        <div className="w-full border-y border-border/80 py-4 md:py-6 flex bg-background/50 backdrop-blur-sm">
          <div className="animate-marquee gap-12 pr-12">
            {marqueeBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div key={idx} className="flex items-center gap-2 flex-shrink-0 text-foreground/80 hover:text-brand transition-colors duration-300">
                  <Icon className="w-4 h-4 text-brand" />
                  <span className="text-sm font-bold tracking-tight">{badge.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
