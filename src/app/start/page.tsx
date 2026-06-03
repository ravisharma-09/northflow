'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// --- Reusable Animated Input ---
const FloatingInput = ({ 
  label, type = 'text', name, value, onChange, required = false, as = 'input' 
}: { 
  label: string; type?: string; name: string; value: string; onChange: any; required?: boolean; as?: 'input' | 'textarea' 
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative w-full flex flex-col group">
      <motion.label
        initial={false}
        animate={{
          y: active ? -24 : 14,
          x: active ? 0 : 16,
          scale: active ? 0.85 : 1,
          color: active ? 'var(--foreground)' : 'var(--muted)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute origin-top-left pointer-events-none text-base font-medium z-10"
      >
        {label} {required && <span className="text-red-500/70">*</span>}
      </motion.label>
      
      <div className={`relative transition-all duration-300 rounded-2xl bg-surface/30 border ${focused ? 'border-brand/40 shadow-[0_0_15px_rgba(52,210,121,0.1)]' : 'border-border/80'}`}>
        {as === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required={required}
            className="w-full bg-transparent px-4 py-3.5 text-foreground focus:outline-none resize-none h-[110px] text-base"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required={required}
            className="w-full bg-transparent px-4 py-3.5 text-foreground focus:outline-none text-base"
          />
        )}
      </div>
    </div>
  );
};

// --- Premium Select Buttons ---
const ChipSelect = ({ label, options, selected, onChange, multi = false }: any) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="text-sm font-semibold text-foreground/80">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt: string) => {
          const isSelected = multi ? selected.includes(opt) : selected === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                isSelected 
                ? 'bg-foreground text-background border-foreground shadow-sm scale-[1.02]' 
                : 'bg-surface/20 text-muted border-border hover:border-foreground/30 hover:text-foreground hover:scale-[1.02]'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  );
};

// --- Magnetic Button ---
const MagneticButton = ({ children, onClick, type = "button", submitting = false }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      disabled={submitting}
      className="relative flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm w-full transition-all duration-300 group bg-foreground text-background hover:opacity-90 active:scale-[0.98] shadow-sm disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
    >
      {submitting ? (
        <span className="w-5 h-5 border-2 border-background/20 border-t-background rounded-full animate-spin" />
      ) : (
        <>
          <span className="relative z-10">{children}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
        </>
      )}
    </motion.button>
  );
};

export default function BookACall() {
  const [step, setStep] = useState(1); 
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    businessName: '',
    services: [] as string[],
    timeline: '',
    budget: '',
    message: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (srv: string) => {
    setFormData(prev => {
      const current = prev.services;
      if (current.includes(srv)) return { ...prev, services: current.filter(s => s !== srv) };
      return { ...prev, services: [...current, srv] };
    });
  };

  const setSingleSelection = (field: string) => (val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStep(3);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Depth Parallax for the main wrapper
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(springMouseY, [-0.5, 0.5], ['1deg', '-1deg']);
  const rotateY = useTransform(springMouseX, [-0.5, 0.5], ['-1deg', '1deg']);

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Step transitions based on requested easing
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 40 : -40,
      opacity: 0,
    })
  };

  if (!mounted) return null;

  return (
    <main 
      ref={containerRef}
      onMouseMove={handleGlobalMouseMove}
      className="min-h-screen h-screen w-full relative overflow-hidden bg-background flex flex-col cursor-crosshair"
    >
      {/* Subtle Grid & Radial Glow */}
      <div className="absolute inset-0 grid-floor bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.04]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 blur-[200px] rounded-full pointer-events-none" />

      {/* Top Nav (Compressed) */}
      <nav className="absolute top-0 inset-x-0 h-24 px-6 md:px-12 flex items-center justify-between z-50">
        <Link href="/" className="flex items-center gap-2 group p-2 -ml-2 rounded-full hover:bg-surface/50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-sm text-foreground">Return</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-foreground text-background font-bold text-lg">
            N
          </span>
          <span className="font-display font-bold tracking-tight text-lg text-foreground hidden sm:block">
            NorthFlow
          </span>
        </div>
      </nav>

      {/* Center Aligned Layout */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center h-full pt-20">
        
        {/* Left: Headline */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-brand-muted text-brand border border-brand/20 mb-6 inline-block uppercase tracking-widest">
              Let's Talk
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.05] text-foreground mb-6">
              Tell us about <br />
              <span className="text-brand">your project.</span>
            </h1>
            <p className="text-lg text-muted font-medium max-w-[400px] leading-relaxed">
              We design and build high-performing systems for modern brands. Fill out the details to get started.
            </p>
          </motion.div>
        </div>

        {/* Right: Interactive Booking Card */}
        <div className="lg:col-span-7 flex justify-center lg:justify-end w-full relative z-20 perspective-[2000px]">
          <motion.div
            style={{ rotateX, rotateY }}
            whileHover={{ translateY: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="w-full max-w-[680px] bg-card-bg/80 backdrop-blur-[24px] border border-border/60 rounded-[32px] p-8 md:p-12 shadow-[0_40px_80px_rgba(0,0,0,0.4)] relative"
          >
            
            {/* Step Indicators */}
            {step < 3 && (
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${step === 1 ? 'text-foreground' : 'text-muted'}`}>Contact</div>
                  <div className="w-8 h-[2px] bg-border rounded-full relative overflow-hidden">
                    <motion.div className="absolute inset-0 bg-brand origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: step >= 2 ? 1 : 0 }} />
                  </div>
                  <div className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${step === 2 ? 'text-foreground' : 'text-muted'}`}>Project</div>
                </div>
                <div className="text-xs font-semibold text-muted">
                  0{step} / 02
                </div>
              </div>
            )}

            <div className="relative w-full h-[480px] md:h-[500px] overflow-hidden">
              <AnimatePresence initial={false} custom={1} mode="wait">
                
                {/* STEP 1: Contact Details */}
                {step === 1 && (
                  <motion.form
                    key="step1"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-col gap-8 pt-4"
                    onSubmit={handleNext}
                  >
                    <FloatingInput label="Full Name" name="name" value={formData.name} onChange={(e: any) => updateField('name', e.target.value)} required />
                    <FloatingInput label="Email Address" type="email" name="email" value={formData.email} onChange={(e: any) => updateField('email', e.target.value)} required />
                    <FloatingInput label="WhatsApp (optional)" type="tel" name="whatsapp" value={formData.whatsapp} onChange={(e: any) => updateField('whatsapp', e.target.value)} />
                    
                    <div className="mt-auto">
                      <MagneticButton type="submit">
                        Continue to Project Details
                      </MagneticButton>
                    </div>
                  </motion.form>
                )}

                {/* STEP 2: Project Details */}
                {step === 2 && (
                  <motion.form
                    key="step2"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-col gap-6 overflow-y-auto scrollbar-none pb-4"
                    onSubmit={handleSubmit}
                  >
                    <FloatingInput label="Company / Project Name" name="businessName" value={formData.businessName} onChange={(e: any) => updateField('businessName', e.target.value)} required />
                    
                    <ChipSelect 
                      label="What do you need?" 
                      options={['Website', 'Landing Page', 'Automation', 'Growth']} 
                      selected={formData.services} 
                      onChange={toggleService} 
                      multi={true} 
                    />
                    
                    <div className="flex flex-col sm:flex-row gap-6 w-full">
                      <ChipSelect 
                        label="Timeline" 
                        options={['ASAP', '1-2 Months', '3+ Months']} 
                        selected={formData.timeline} 
                        onChange={setSingleSelection('timeline')} 
                      />
                      <ChipSelect 
                        label="Budget" 
                        options={['< $5k', '$5k - 10k', '$10k+']} 
                        selected={formData.budget} 
                        onChange={setSingleSelection('budget')} 
                      />
                    </div>

                    <div className="pt-2">
                      <FloatingInput label="Message" name="message" as="textarea" value={formData.message} onChange={(e: any) => updateField('message', e.target.value)} required />
                    </div>

                    <div className="mt-2 flex items-center gap-4">
                      <button type="button" onClick={() => setStep(1)} className="p-4 rounded-xl border border-border/80 bg-surface/30 text-muted hover:text-foreground transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <MagneticButton type="submit" submitting={submitting}>
                        Submit Request
                      </MagneticButton>
                    </div>
                  </motion.form>
                )}

                {/* STEP 3: Success Screen */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center gap-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-10 h-10 text-brand" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-display font-black text-foreground mb-3">Request Received</h2>
                      <p className="text-base text-muted max-w-sm mx-auto leading-relaxed">
                        We'll review your details and get back to you shortly with next steps.
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-6">
                      <Link href="/" className="px-6 py-3 rounded-full border border-border bg-surface/50 text-foreground font-bold text-sm hover:bg-surface transition-all">
                        Back Home
                      </Link>
                      <a href="https://calendly.com" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-foreground text-background font-bold text-sm hover:scale-[1.03] transition-all shadow-md">
                        Book Time Instead
                      </a>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
