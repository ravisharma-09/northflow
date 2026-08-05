import type { DemoSite } from "@/data/demo-sites";

export default function DemoJourney({ demo }: { demo: DemoSite }) {
  return (
    <section id="journey" className="border-y border-[var(--demo-border)] bg-[var(--demo-surface)] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1220px]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--demo-accent)]">The customer journey</p>
            <h2 className="mt-6 max-w-xl text-[clamp(2.8rem,5vw,4.8rem)] font-black leading-[0.94]">
              From interest to a request the team can use.
            </h2>
          </div>
          <div className="border-t border-[var(--demo-border)]">
            {demo.journey.map((step) => (
              <article key={step.number} className="grid gap-4 border-b border-[var(--demo-border)] py-7 sm:grid-cols-[72px_1fr]">
                <span className="text-xs font-black text-[var(--demo-accent)]">{step.number}</span>
                <div>
                  <h3 className="text-2xl font-black leading-tight">{step.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-[var(--demo-muted)]">{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
