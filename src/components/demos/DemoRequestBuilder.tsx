"use client";

import { ArrowRight, Check } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import type { DemoField, DemoSite } from "@/data/demo-sites";

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
  const base = "public-focus min-h-12 w-full rounded-[6px] border border-[var(--demo-border)] bg-transparent px-4 text-sm font-bold text-[var(--demo-text)] outline-none focus:border-[var(--demo-accent)]";

  if (field.type === "select") {
    return (
      <select required className={base} value={String(value || "")} onChange={(event) => onChange(event.target.value)}>
        <option value="">Select one</option>
        {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  }

  if (field.type === "checkbox") {
    const selected = Array.isArray(value) ? value : [];
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {field.options?.map((option) => {
          const checked = selected.includes(option);
          return (
            <label key={option} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-[6px] border px-4 text-sm font-bold transition-colors ${checked ? "border-[var(--demo-accent)] bg-[color-mix(in_srgb,var(--demo-accent)_12%,transparent)]" : "border-[var(--demo-border)]"}`}>
              <input
                type="checkbox"
                className="h-4 w-4 accent-[var(--demo-accent)]"
                checked={checked}
                onChange={() => onChange(checked ? selected.filter((item) => item !== option) : [...selected, option])}
              />
              {option}
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
    <section id="request" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1220px]">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <form onSubmit={submit} className="rounded-[8px] border border-[var(--demo-border)] bg-[var(--demo-surface)] p-6 md:p-9">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--demo-accent)]">Interactive request builder</p>
            <h2 className="mt-6 text-4xl font-black leading-[0.96] md:text-5xl">{demo.primaryAction}</h2>
            <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-[var(--demo-muted)]">
              This local concept form builds a summary only. It does not send an enquiry or create a booking.
            </p>

            <div className="mt-9 grid gap-6">
              {demo.fields.map((field) => (
                <label key={field.name} className="grid gap-2 text-sm font-black">
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
              className="public-focus group mt-8 inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-[7px] border border-[var(--demo-accent)] bg-[var(--demo-accent)] px-6 py-3 text-sm font-black text-[var(--demo-accent-text)] transition-transform hover:-translate-y-0.5"
            >
              Review my request
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <aside className="lg:sticky lg:top-28">
            <div className="rounded-[8px] border border-[var(--demo-border)] bg-[var(--demo-text)] p-6 text-[var(--demo-background)] md:p-9">
              <div className="flex items-center justify-between gap-4 border-b border-current/20 pb-5">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] opacity-60">Request summary</p>
                <span className="rounded-[4px] border border-current/30 px-2 py-1 text-[9px] font-black uppercase tracking-[0.14em]">Not submitted</span>
              </div>

              {rows.length ? (
                <dl className="mt-4 divide-y divide-current/15">
                  {rows.map(({ field, value }) => (
                    <div key={field.name} className="grid gap-1 py-4 sm:grid-cols-[0.8fr_1.2fr]">
                      <dt className="text-xs font-bold opacity-55">{field.label}</dt>
                      <dd className="text-sm font-black">{Array.isArray(value) ? value.join(", ") : value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="py-12 text-sm font-medium leading-7 opacity-60">Your choices will appear here as you build the request.</p>
              )}

              {reviewed ? (
                <div className="mt-6 border-t border-current/20 pt-6">
                  <p className="flex items-center gap-2 text-sm font-black text-[var(--demo-accent)]">
                    <Check className="h-4 w-4" />
                    Ready for a real team review
                  </p>
                  <p className="mt-3 text-sm font-medium leading-7 opacity-70">{demo.nextStep}</p>
                </div>
              ) : null}
            </div>

            <div className="mt-5 rounded-[8px] border border-[var(--demo-border)] p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--demo-accent)]">Want this journey for your business?</p>
              <p className="mt-4 text-sm font-medium leading-7 text-[var(--demo-muted)]">NorthFlow can map the real workflow, integrations and production form around your team.</p>
              <a href="/start" className="public-focus group mt-6 inline-flex items-center gap-2 text-sm font-black">
                Start with NorthFlow
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
