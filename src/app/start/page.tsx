"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import BookingCalendar from "@/components/BookingCalendar";
import PublicHeader from "@/components/public/PublicHeader";

type FormData = {
  name: string;
  email: string;
  whatsapp: string;
  businessName: string;
  services: string[];
  message: string;
};

type TextField = Exclude<keyof FormData, "services">;

function CleanInput({
  name,
  label,
  type = "text",
  textarea = false,
  required = false,
  value,
  onChange,
}: {
  name: TextField;
  label: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  value: string;
  onChange: (name: TextField, value: string) => void;
}) {
  const className = "public-focus min-h-12 w-full rounded-[6px] border border-border bg-transparent px-4 py-3 text-base font-semibold text-foreground outline-none transition-colors focus:border-foreground";

  return (
    <label className="grid gap-2 text-sm font-black text-foreground">
      <span>{label} {required ? <span className="text-brand">*</span> : null}</span>
      {textarea ? (
        <textarea
          required={required}
          name={name}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          className={`${className} min-h-[130px] resize-none`}
          placeholder="Tell us about the workflow, bottleneck or system you need."
        />
      ) : (
        <input
          required={required}
          type={type}
          name={name}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          className={className}
          placeholder={label}
        />
      )}
    </label>
  );
}

const serviceList = ["Website", "Automation", "Growth", "Other"];

export default function StartYourSystem() {
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    businessName: "",
    services: [],
    message: "",
  });

  useEffect(() => setMounted(true), []);

  const updateField = (field: TextField, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const toggleService = (service: string) => {
    setFormData((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));
  };

  const handleNext = (event: FormEvent) => {
    event.preventDefault();
    setStep((current) => Math.min(current + 1, 2));
  };

  const handlePrev = () => setStep((current) => Math.max(current - 1, 0));

  const panelMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, x: 0 }, exit: { opacity: 1, x: 0 } }
    : { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } };

  return (
    <div className="public-site min-h-screen bg-background text-foreground">
      <PublicHeader />
      <main className="public-paper-gradient min-h-[calc(100svh-90px)] px-5 py-12 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <aside className="lg:sticky lg:top-32 hidden lg:block">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-muted">Strategy call</p>
            <h1 className="mt-6 text-[clamp(3.4rem,6.5vw,6.3rem)] font-black leading-[0.9]">
              Start with the business. <span className="editorial-serif block">Then design the system.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base font-medium leading-8 text-muted">
              Tell us where the customer journey breaks down. We will use the call to understand the workflow, current tools and the right first layer to build.
            </p>
            <div className="mt-9 grid gap-3 text-sm font-bold">
              {["No public pricing assumptions", "Existing tools considered", "Booking handled by the live NorthFlow calendar"].map((item) => (
                <span key={item} className="flex items-center gap-3"><Check className="h-4 w-4 text-brand" />{item}</span>
              ))}
            </div>
          </aside>

          <div className="w-full max-w-[620px] lg:justify-self-end mx-auto lg:mx-0">
            {step < 2 ? (
              <div className="mb-5 grid grid-cols-2 gap-2" aria-label={`Step ${step + 1} of 2`}>
                {[0, 1].map((index) => (
                  <span key={index} className="h-1 overflow-hidden bg-border rounded-full">
                    <motion.span
                      className="block h-full origin-left bg-foreground"
                      initial={false}
                      animate={{ scaleX: step >= index ? 1 : 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.4 }}
                    />
                  </span>
                ))}
              </div>
            ) : null}

            {mounted ? (
              <div className="overflow-hidden rounded-[8px] border border-border bg-surface p-6 shadow-premium sm:p-9 min-h-[400px]">
                <AnimatePresence mode="wait">
                  {step === 0 ? (
                    <motion.div key="personal" {...panelMotion} transition={{ duration: 0.35 }}>
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-brand">01 · Personal details</p>
                      <h2 className="mt-5 text-3xl font-black">How should we reach you?</h2>
                      <p className="mt-3 text-sm font-medium leading-7 text-muted">Start with the contact information used for the booking.</p>
                      <form onSubmit={handleNext} className="mt-8 grid gap-5">
                        <CleanInput name="name" label="Full Name" required value={formData.name} onChange={updateField} />
                        <CleanInput name="email" label="Email Address" type="email" required value={formData.email} onChange={updateField} />
                        <CleanInput name="whatsapp" label="WhatsApp Number" type="tel" value={formData.whatsapp} onChange={updateField} />
                        <button type="submit" className="public-focus group mt-2 inline-flex min-h-13 items-center justify-center gap-2 rounded-[7px] bg-foreground px-6 text-sm font-black text-background">
                          Continue to business details
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </form>
                    </motion.div>
                  ) : null}

                  {step === 1 ? (
                    <motion.div key="business" {...panelMotion} transition={{ duration: 0.35 }}>
                      <button type="button" onClick={handlePrev} className="public-focus inline-flex items-center gap-2 text-sm font-black text-muted hover:text-foreground">
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                      <p className="mt-7 text-[11px] font-black uppercase tracking-[0.16em] text-brand">02 · Business needs</p>
                      <h2 className="mt-5 text-3xl font-black">What needs to work better?</h2>
                      <form onSubmit={handleNext} className="mt-8 grid gap-5">
                        <CleanInput name="businessName" label="Company / Business Name" required value={formData.businessName} onChange={updateField} />
                        <fieldset>
                          <legend className="text-sm font-black">What are you looking for?</legend>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {serviceList.map((service) => {
                              const selected = formData.services.includes(service);
                              return (
                                <button
                                  key={service}
                                  type="button"
                                  aria-pressed={selected}
                                  onClick={() => toggleService(service)}
                                  className={`public-focus rounded-[6px] border px-4 py-2.5 text-sm font-bold transition-colors ${selected ? "border-foreground bg-foreground text-background" : "border-border bg-transparent text-muted hover:border-foreground hover:text-foreground"}`}
                                >
                                  {service}
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>
                        <CleanInput name="message" label="Brief Description" textarea required value={formData.message} onChange={updateField} />
                        <button type="submit" className="public-focus group mt-2 inline-flex min-h-13 items-center justify-center gap-2 rounded-[7px] bg-foreground px-6 text-sm font-black text-background">
                          Continue to booking
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </form>
                    </motion.div>
                  ) : null}

                  {step === 2 ? (
                    <motion.div key="calendar" {...panelMotion} transition={{ duration: 0.35 }}>
                      <button type="button" onClick={handlePrev} className="mb-6 public-focus inline-flex items-center gap-2 text-sm font-black text-muted hover:text-foreground">
                        <ArrowLeft className="h-4 w-4" /> Back to details
                      </button>
                      <BookingCalendar formData={formData} onBack={handlePrev} />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
