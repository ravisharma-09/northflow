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

    // 1.0s browser enters: opacity, translateY(60), rotate(4deg)
    tl.fromTo('.hero-browser', 
      { opacity: 0, y: 60, rotation: 4 }, 
      { opacity: 1, y: 0, rotation: 0, duration: 1, ease: 'power3.out' }, 
      1.0
    );

    // 1.3s AI card appears -> 1.2s
    tl.fromTo('.hero-card-ai', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.2);

    // 1.4s Workflow card appears
    tl.fromTo('.hero-card-workflow', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.4);

    // 1.6s Results card appears
    tl.fromTo('.hero-card-growth', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.6);

    // 1.8s Lead card appears
    tl.fromTo('.hero-card-leads', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.8);



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

    // Init depths for perspective cards
    gsap.set('.hero-parallax-card-1', { z: 40 });
    gsap.set('.hero-parallax-card-2', { z: 60 });
    gsap.set('.hero-parallax-card-3', { z: 20 });
    gsap.set('.hero-parallax-card-4', { z: 80 });

    // Cursor Parallax
    const visualContainer = document.querySelector('.hero-visual-container') as HTMLElement;
    if (visualContainer) {
      const handleVisualMouseMove = (e: MouseEvent) => {
        const rect = visualContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to('.hero-parallax-browser', {
          rotationY: x * 2,
          rotationX: -y * 2,
          x: x * 6,
          y: y * 6,
          duration: 1,
          ease: 'power2.out'
        });

        gsap.to(['.hero-parallax-card-1', '.hero-parallax-card-2', '.hero-parallax-card-3', '.hero-parallax-card-4'], { 
          x: x * 6, 
          y: y * 6, 
          duration: 1, 
          ease: 'power2.out' 
        });
      };

      const handleVisualMouseLeave = () => {
        gsap.to(['.hero-parallax-browser', '.hero-parallax-card-1', '.hero-parallax-card-2', '.hero-parallax-card-3', '.hero-parallax-card-4'], {
          rotationY: 0,
          rotationX: 0,
          x: 0,
          y: 0,
          duration: 1.5,
          ease: 'power2.out'
        });
      };

      visualContainer.addEventListener('mousemove', handleVisualMouseMove);
      visualContainer.addEventListener('mouseleave', handleVisualMouseLeave);
      
      cleanups.push(() => {
        visualContainer.removeEventListener('mousemove', handleVisualMouseMove);
        visualContainer.removeEventListener('mouseleave', handleVisualMouseLeave);
      });
    }

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
    { name: 'Fast Delivery', icon: Clock },
    { name: 'Modern Design', icon: Sparkles },
    { name: 'Results Driven', icon: Zap },
    { name: '24/7 Support', icon: Shield },
    { name: 'Satisfaction Guarantee', icon: CheckCircle },
  ];

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen pt-36 pb-24 flex flex-col justify-between overflow-x-clip">
      {/* Background with fading grid and soft glow */}
      <div className="hero-bg absolute inset-0 opacity-0 z-0 pointer-events-none">
        <div className="absolute inset-0 grid-floor bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.03]" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-brand/10 blur-[150px] rounded-full transform -translate-y-1/2 translate-x-1/3" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 items-center z-10 relative">
        
        {/* Left Side: Headlines and CTAs */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          
          {/* Top Label */}
          <div className="hero-headline inline-flex items-center gap-2 mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-muted text-brand border border-brand/20">
              Build
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-muted/40"></span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-muted text-brand border border-brand/20">
              Automate
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-muted/40"></span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-muted text-brand border border-brand/20">
              Scale
            </span>
          </div>

          {/* Heading */}
          <h1 className="hero-headline text-4xl sm:text-5xl lg:text-6.5xl font-display font-black tracking-tight leading-[1.05] text-foreground mb-8 max-w-[620px]">
            Websites & <br />
            Automation <br />
            That Turn Visitors <br />
            Into <span className="text-brand">Customers.</span>
          </h1>

          {/* Subtext */}
          <p className="hero-paragraph text-base sm:text-lg text-muted font-medium max-w-[540px] leading-[1.7] mb-10">
            Premium websites and intelligent systems designed to help businesses move faster.
          </p>

          {/* Call To Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href="#cta"
              className="hero-button flex items-center gap-2 px-7 py-4 rounded-full bg-foreground text-background font-bold text-base hover:scale-[1.03] transition-transform duration-300 shadow-md group"
            >
              Book a Call
              <span className="hero-icon flex items-center justify-center w-5 h-5 rounded-full bg-brand text-white group-hover:translate-x-0.5 transition-transform duration-300">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
            
            <a
              href="#projects"
              className="hero-button flex items-center gap-2 px-7 py-4 rounded-full border border-border bg-surface/50 text-foreground font-bold text-base hover:bg-surface hover:scale-[1.03] transition-transform duration-300"
            >
              View Work
              <span className="hero-icon flex items-center justify-center w-5 h-5 rounded-full bg-brand/10 text-brand">
                <Play className="w-3.5 h-3.5 fill-current" />
              </span>
            </a>
          </div>

          {/* Trust Row */}
          <div className="hero-paragraph flex flex-wrap items-center gap-6 border-t border-border/80 pt-8">
            <div className="flex -space-x-3">
              {[
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
                'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=80&q=80',
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80',
              ].map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar}
                  alt="Client avatar"
                  className="w-9 h-9 rounded-full border-2 border-background object-cover bg-surface"
                />
              ))}
              <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-background bg-surface text-[10px] font-extrabold text-foreground">
                20+
              </div>
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-brand text-brand" />
                ))}
                <span className="text-sm font-extrabold text-foreground ml-1">5.0/5</span>
              </div>
              <span className="text-xs text-muted font-bold mt-0.5">
                Building systems that scale.
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: 2D Visual Container */}
        <div className="lg:col-span-6 h-[450px] lg:h-[600px] w-full relative z-10 overflow-visible">
          <HeroVisual />
        </div>
      </div>

      {/* Trust Badges Row */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-8 lg:mt-0 z-10 relative">
        <div className="w-full border-y border-border/80 py-6 overflow-x-auto scrollbar-none flex gap-8 md:justify-between items-center whitespace-nowrap">
          {featureBadges.map((badge, idx) => {
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
    </section>
  );
}
