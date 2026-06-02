'use client';

import React from 'react';
import { Instagram, Linkedin, Twitter, ArrowUp, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    services: [
      { name: 'Lead Generation Websites', href: '#services' },
      { name: 'CRM Systems', href: '#services' },
      { name: 'Booking Automation', href: '#services' },
      { name: 'WhatsApp Automation', href: '#services' },
      { name: 'Business Dashboards', href: '#services' },
      { name: 'Ongoing Support', href: '#pricing' },
    ],
    company: [
      { name: 'About Us', href: '#metrics' },
      { name: 'Our Work', href: '#projects' },
      { name: 'Start Your System', href: '/start' },
    ],
    resources: [
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Privacy Policy', href: '#home' },
      { name: 'Terms of Service', href: '#home' },
    ],
  };

  return (
    <footer className="bg-surface/30 border-t border-border/60 pt-20 pb-10 relative z-10 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl mx-auto px-6 md:px-12"
      >
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Logo & Description */}
          <div className="lg:col-span-5 flex flex-col items-start text-left gap-5">
            <a href="#home" className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background shadow-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mt-[-1px]">
                  <path d="M12 3L23 21H1L12 3Z" />
                </svg>
              </span>
              <span className="font-display font-bold tracking-tight text-lg text-foreground">
                NorthFlow
              </span>
            </a>
            <p className="text-sm font-medium text-muted leading-relaxed max-w-sm">
              Designing digital experiences and automation systems for modern businesses.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              {[
                { icon: Instagram, href: '#', name: 'Instagram' },
                { icon: Linkedin, href: '#', name: 'LinkedIn' },
                { icon: Twitter, href: '#', name: 'X' },
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    title={social.name}
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-surface/50 text-muted hover:text-brand hover:border-brand hover:scale-105 transition-all duration-300"
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Column 1: Services */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground mb-5">
              Services
            </h4>
            <div className="flex flex-col gap-3">
              {footerLinks.services.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-sm font-semibold text-muted hover:text-brand transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 2: Company */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground mb-5">
              Company
            </h4>
            <div className="flex flex-col gap-3">
              {footerLinks.company.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-sm font-semibold text-muted hover:text-brand transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 3: Contact */}
          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground mb-5">
              Connect
            </h4>
            <div className="flex flex-col gap-3 text-sm font-semibold text-muted">
              <span className="text-foreground/80 font-bold">Remote • Worldwide</span>
              <a href="mailto:northflow.work@gmail.com" className="flex items-center gap-2 hover:text-brand transition-colors duration-300">
                <Mail className="w-5 h-5" />
                northflow.work@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/60 pt-10 mt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs font-bold text-muted">
            © {currentYear} NorthFlow. All rights reserved.
          </p>
          
          {/* Scroll to top */}
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-2 text-xs font-bold text-foreground hover:text-brand transition-colors duration-300 cursor-pointer"
          >
            Back to top
            <span className="flex items-center justify-center w-6 h-6 rounded-full border border-border bg-surface text-foreground">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>

      </motion.div>
    </footer>
  );
}
