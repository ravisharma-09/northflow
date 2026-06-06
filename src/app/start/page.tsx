'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import BookingCalendar from '@/components/BookingCalendar';

// --- Extracted Components to prevent re-mounting ---

const CleanInput = ({ name, label, type = 'text', as = 'input', required = false, formData, updateField }: any) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-foreground/80 ml-1">
        {label} {required && <span className="text-red-500/70">*</span>}
      </label>
      {as === 'textarea' ? (
        <textarea
          required={required}
          name={name}
          value={formData[name]}
          onChange={(e) => updateField(name, e.target.value)}
          className="w-full bg-surface/30 border border-border/80 rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:border-foreground/40 focus:ring-1 focus:ring-foreground/10 transition-all duration-300 resize-none h-[120px] text-base"
          placeholder="Tell us a bit more about what you need..."
        />
      ) : (
        <input
          required={required}
          type={type}
          name={name}
          value={formData[name]}
          onChange={(e) => updateField(name, e.target.value)}
          className="w-full bg-surface/30 border border-border/80 rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:border-foreground/40 focus:ring-1 focus:ring-foreground/10 transition-all duration-300 text-base"
          placeholder={label}
        />
      )}
    </div>
  );
};

const ServiceOptions = ({ formData, toggleService }: any) => {
  const serviceList = ['Website', 'Automation', 'Growth', 'Other'];
  return (
    <div className="flex flex-col gap-1.5 mb-2">
      <label className="text-sm font-semibold text-foreground/80 ml-1">What are you looking for?</label>
      <div className="flex flex-wrap gap-2 mt-1">
        {serviceList.map((srv) => {
          const isSelected = formData.services.includes(srv);
          return (
            <button
              key={srv}
              type="button"
              onClick={() => toggleService(srv)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                isSelected 
                ? 'bg-foreground text-background border-foreground shadow-sm' 
                : 'bg-surface/20 text-muted border-border hover:border-foreground/30 hover:text-foreground'
              }`}
            >
              {srv}
            </button>
          )
        })}
      </div>
    </div>
  );
};

const PrimaryButton = ({ children, onClick, type = "button" }: any) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm w-full transition-all duration-300 group bg-foreground text-background hover:opacity-90 active:scale-[0.98] shadow-sm"
    >
      <span>{children}</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
    </button>
  );
};

// --- Main Page Component ---

export default function StartYourSystem() {
  const [step, setStep] = useState(0); 
  // 0 = Personal, 1 = Business, 2 = Calendar

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    whatsapp: string;
    businessName: string;
    services: string[];
    message: string;
  }>({
    name: '',
    email: '',
    whatsapp: '',
    businessName: '',
    services: [],
    message: ''
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Transition from Form to Calendar
      console.log('Sending lead to database...', formData);
      setStep(2);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    setStep((s) => Math.max(0, s - 1));
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (srv: string) => {
    setFormData((prev) => {
      const current = prev.services;
      if (current.includes(srv)) {
        return { ...prev, services: current.filter(s => s !== srv) };
      } else {
        return { ...prev, services: [...current, srv] };
      }
    });
  };

  const stepVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <main className="min-h-screen w-full relative flex items-center justify-center bg-background px-4 md:px-6 py-20">
      
      {/* Ultra Clean Background (No heavy neon) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface/40 via-background to-background pointer-events-none z-0" />
      
      {/* Simple Top Nav */}
      <div className="absolute top-8 left-6 md:left-12 z-50 flex items-center gap-4">
        <Link href="/" className="p-2 rounded-full hover:bg-surface text-foreground/60 hover:text-foreground transition-colors flex items-center justify-center group-hover:-translate-x-1 duration-300">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-foreground text-background font-bold text-lg">
            N
          </span>
          <span className="font-display font-bold tracking-tight text-lg text-foreground hidden md:block">
            NorthFlow
          </span>
        </Link>
      </div>

      <div className={`w-full mx-auto z-10 flex flex-col relative transition-all duration-700 ease-in-out ${step === 2 ? 'max-w-5xl' : 'max-w-[520px]'}`}>
        
        {/* Step Indicators */}
        {mounted && step < 2 && (
          <div className="flex items-center gap-2 mb-8 px-2">
            {[0, 1].map((idx) => (
              <div key={idx} className="flex-1 h-1 rounded-full bg-border relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-foreground origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: step >= idx ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            ))}
          </div>
        )}

        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full relative overflow-hidden transition-all duration-700 ${
              step < 2 
                ? 'bg-card-bg/90 border border-border rounded-[24px] p-6 sm:p-10 shadow-sm backdrop-blur-xl' 
                : 'bg-transparent'
            }`}
          >
            <AnimatePresence mode="wait">
              
              {/* Step 0: Personal Details */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1.5">Personal Details</h1>
                    <p className="text-sm text-muted">Let's start with your contact information.</p>
                  </div>

                  <form onSubmit={handleNext} className="flex flex-col gap-5">
                    <CleanInput name="name" label="Full Name" required={true} formData={formData} updateField={updateField} />
                    <CleanInput name="email" label="Email Address" type="email" required={true} formData={formData} updateField={updateField} />
                    <CleanInput name="whatsapp" label="WhatsApp Number" type="tel" required={false} formData={formData} updateField={updateField} />
                    
                    <div className="pt-4">
                      <PrimaryButton type="submit">
                        Continue to Business Details
                      </PrimaryButton>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Step 1: Business Details */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex items-start gap-3">
                    <button type="button" onClick={handlePrev} className="mt-1 p-1.5 rounded-md hover:bg-surface text-muted hover:text-foreground transition-colors">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1.5">Business Needs</h1>
                      <p className="text-sm text-muted">Tell us about your company and what you're looking for.</p>
                    </div>
                  </div>

                  <form onSubmit={handleNext} className="flex flex-col gap-5">
                    <CleanInput name="businessName" label="Company / Business Name" required={true} formData={formData} updateField={updateField} />
                    
                    <ServiceOptions formData={formData} toggleService={toggleService} />

                    <CleanInput name="message" label="Brief Description" as="textarea" required={true} formData={formData} updateField={updateField} />
                    
                    <div className="pt-4">
                      <PrimaryButton type="submit">
                        Continue to Booking
                      </PrimaryButton>
                      <p className="text-[11px] text-muted text-center font-medium mt-4 uppercase tracking-widest">
                        Connect with our team to guide you
                      </p>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Step 2: Calendar */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex flex-col w-full min-h-[600px]"
                >
                  <BookingCalendar formData={formData} onBack={handlePrev} />
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </main>
  );
}
