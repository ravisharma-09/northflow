"use client";

import { ArrowRight, Check } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import type { DemoField, DemoSite } from "@/data/demo-sites";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";

const displayFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

type Values = Record<string, string | string[]>;

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: DemoField;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}) {
  const base = "w-full rounded-none border-b-2 border-[var(--demo-border)] bg-transparent px-0 py-4 text-lg font-bold text-[var(--demo-text)] outline-none focus:border-[var(--demo-accent)] transition-all placeholder:text-[var(--demo-muted)]";

  if (field.type === "select") {
    return (
      <select required className={`${base} appearance-none cursor-pointer`} value={String(value || "")} onChange={(event) => onChange(event.target.value)}>
        <option value="" disabled>Select one</option>
        {field.options?.map((option) => <option key={option} value={option} className="bg-[var(--demo-background)] text-[var(--demo-text)]">{option}</option>)}
      </select>
    );
  }

  if (field.type === "checkbox") {
    const selected = Array.isArray(value) ? value : [];
    return (
      <div className="grid gap-3 sm:grid-cols-2 pt-2">
        {field.options?.map((option) => {
          const checked = selected.includes(option);
          return (
            <label key={option} className={`flex cursor-pointer items-center gap-4 rounded-[4px] border-2 px-5 py-4 text-sm font-bold transition-all ${checked ? "border-[var(--demo-accent)] bg-[var(--demo-accent)]/10" : "border-[var(--demo-border)] bg-[var(--demo-surface)] hover:border-[var(--demo-accent)]/50"}`}>
              <div className={`flex h-5 w-5 items-center justify-center rounded-[2px] border-2 transition-colors ${checked ? "border-[var(--demo-accent)] bg-[var(--demo-accent)]" : "border-[var(--demo-muted)]"}`}>
                {checked && <Check className="h-3 w-3 text-[var(--demo-accent-text)]" />}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={() => onChange(checked ? selected.filter((item) => item !== option) : [...selected, option])}
              />
              <span className="text-[var(--demo-text)]">{option}</span>
            </label>
          );
        })}
      </div>
    );
  }

  return (
    <input
      required
      className={base}
      type={field.type}
      value={String(value || "")}
      placeholder={field.placeholder}
      min={field.type === "number" ? 1 : undefined}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export default function DemoRequestBuilder({ demo }: { demo: DemoSite }) {
  const imageStyle = demo.designConfig.imageStyle;
  const [values, setValues] = useState<Values>({});
  const [reviewed, setReviewed] = useState(false);
  const rows = useMemo(
    () => demo.fields.map((field) => ({ field, value: values[field.name] })).filter(({ value }) => Array.isArray(value) ? value.length > 0 : Boolean(value)),
    [demo.fields, values]
  );

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setReviewed(true);
  };

  return (
    <section id="request" className="px-6 py-24 md:px-12 md:py-32 relative bg-[var(--demo-background)]">
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <motion.form 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={submit} 
            className="border border-[var(--demo-border)] bg-[var(--demo-surface)] p-8 md:p-12 relative overflow-hidden shadow-sm"
            style={{ borderRadius: imageStyle === 'rounded' ? '24px' : imageStyle === 'soft-edges' ? '12px' : '0px' }}
          >
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--demo-accent)]">Interactive Request Builder</p>
              <h2 className={`${displayFont.className} mt-6 text-4xl md:text-6xl font-black leading-tight text-[var(--demo-text)] tracking-tight`}>{demo.primaryAction}</h2>
              <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-[var(--demo-muted)]">
                This local concept form builds a summary only. It does not send an enquiry or create a booking.
              </p>

              <div className="mt-12 grid gap-10">
                {demo.fields.map((field) => (
                  <label key={field.name} className="grid gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--demo-muted)]">
                    {field.label}
                    <FieldControl
                      field={field}
                      value={values[field.name] || (field.type === "checkbox" ? [] : "")}
                      onChange={(value) => {
                        setValues((current) => ({ ...current, [field.name]: value }));
                        setReviewed(false);
                      }}
                    />
                  </label>
                ))}
              </div>

              <button
                type="submit"
                className="group mt-12 inline-flex min-h-14 w-full items-center justify-center gap-3 bg-[var(--demo-accent)] px-8 text-sm font-black text-[var(--demo-accent-text)] transition-transform hover:-translate-y-1"
                style={{ borderRadius: imageStyle === 'rounded' ? '9999px' : imageStyle === 'soft-edges' ? '8px' : '0px' }}
              >
                Review my request
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.form>

          <aside className="lg:sticky lg:top-32 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-[var(--demo-border)] bg-[var(--demo-text)] p-8 md:p-10 shadow-2xl"
              style={{ borderRadius: imageStyle === 'rounded' ? '24px' : imageStyle === 'soft-edges' ? '12px' : '0px' }}
            >
              <div className="flex items-center justify-between gap-4 border-b border-[var(--demo-background)]/20 pb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--demo-background)]/50">Request summary</p>
                <span className={`rounded-[4px] border px-2 py-1 text-[9px] font-black uppercase tracking-widest ${reviewed ? 'border-[var(--demo-accent)] text-[var(--demo-accent)]' : 'border-[var(--demo-background)]/30 text-[var(--demo-background)]/50'}`}>
                  {reviewed ? 'Ready' : 'Draft'}
                </span>
              </div>

              {rows.length ? (
                <dl className="mt-6 divide-y divide-[var(--demo-background)]/10">
                  {rows.map(({ field, value }) => (
                    <div key={field.name} className="grid gap-2 py-5 sm:grid-cols-[0.8fr_1.2fr]">
                      <dt className="text-[10px] font-black uppercase tracking-widest text-[var(--demo-background)]/50">{field.label}</dt>
                      <dd className="text-base font-bold text-[var(--demo-background)]">{Array.isArray(value) ? value.join(", ") : value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="py-16 text-center text-sm font-medium leading-relaxed text-[var(--demo-background)]/40 border-2 border-dashed border-[var(--demo-background)]/20 mt-6">
                  Your choices will appear here as you build the request.
                </p>
              )}

              {reviewed && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-8 border-t border-[var(--demo-background)]/20 pt-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full bg-[var(--demo-accent)] p-1">
                      <Check className="h-3 w-3 text-[var(--demo-accent-text)]" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[var(--demo-accent)]">Ready for team review</p>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--demo-background)]/70">{demo.nextStep}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border border-[var(--demo-border)] bg-[var(--demo-surface)] p-8"
              style={{ borderRadius: imageStyle === 'rounded' ? '24px' : imageStyle === 'soft-edges' ? '12px' : '0px' }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--demo-accent)]">Want this journey for your business?</p>
              <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--demo-muted)]">NorthFlow can map the real workflow, integrations and production form around your team.</p>
              <a href="/start" className="group mt-6 inline-flex items-center gap-2 text-sm font-black text-[var(--demo-text)] hover:text-[var(--demo-accent)] transition-colors">
                Start with NorthFlow
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  );
}
