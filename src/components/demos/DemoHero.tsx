import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { DemoSite } from "@/data/demo-sites";

export default function DemoHero({ demo }: { demo: DemoSite }) {
  const headlineClass =
    demo.slug === "event-rental"
      ? "editorial-serif font-semibold"
      : demo.slug === "auto-detailing"
        ? "uppercase font-black"
        : "font-black";

  return (
    <section className="px-5 pb-16 pt-12 md:px-10 md:pb-24 md:pt-20">
      <div className="mx-auto grid max-w-[1220px] gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--demo-accent)]">
            {demo.eyebrow}
          </p>
          <h1 className={`mt-7 text-[clamp(3.7rem,6.8vw,6.8rem)] leading-[0.88] ${headlineClass}`}>
            {demo.headline}
          </h1>
          <p className="mt-8 max-w-xl text-base font-medium leading-8 text-[var(--demo-muted)] md:text-lg">
            {demo.description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#request"
              className="public-focus group inline-flex min-h-13 items-center justify-center gap-3 rounded-[7px] border border-[var(--demo-accent)] bg-[var(--demo-accent)] px-6 py-3 text-sm font-black text-[var(--demo-accent-text)] transition-transform hover:-translate-y-0.5"
            >
              {demo.primaryAction}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="public-focus inline-flex min-h-13 items-center justify-center gap-3 rounded-[7px] border border-[var(--demo-border)] px-6 py-3 text-sm font-black"
            >
              Explore the service
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-8 flex items-center gap-3 text-xs font-bold text-[var(--demo-muted)]">
            <span className="h-2 w-2 rounded-full bg-[var(--demo-accent)] shadow-[0_0_0_5px_color-mix(in_srgb,var(--demo-accent)_16%,transparent)]" />
            {demo.location}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[8px] border border-[var(--demo-border)] bg-[var(--demo-text)]">
          <div className="relative aspect-[4/3] lg:aspect-[1.06/1]">
            <Image
              src={demo.image}
              alt={demo.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover"
            />
            <div className="absolute left-5 top-5 rounded-[5px] border border-white/30 bg-black/55 px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-white backdrop-blur-sm">
              Built around the customer journey
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-[7px] border border-white/20 bg-black/75 p-5 text-white md:left-auto md:w-[54%]">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/60">Qualified request</p>
              <p className="mt-3 text-lg font-black">Details ready for team review</p>
              <div className="mt-5 h-0.5 bg-white/20">
                <div className="h-full w-3/4 bg-[var(--demo-accent)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
