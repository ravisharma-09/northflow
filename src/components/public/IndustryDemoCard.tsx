import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { IndustryDemo } from "@/lib/industryDemos";
import { cx } from "@/components/public/Primitives";

export function IndustryDemoCard({
  demo,
  featured = false,
}: {
  demo: IndustryDemo;
  featured?: boolean;
}) {
  return (
    <a
      href={`/demos/${demo.slug}`}
      className={cx(
        "premium-focus group flex h-full flex-col overflow-hidden rounded-[8px] border border-border bg-surface/85 shadow-premium transition-colors hover:border-foreground",
        featured && "lg:grid lg:grid-cols-[1.05fr_0.95fr]"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-foreground lg:aspect-auto">
        <Image
          src={demo.image}
          alt={demo.imageAlt}
          fill
          sizes={featured ? "(min-width: 1024px) 42vw, 100vw" : "(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 100vw"}
          className="object-cover opacity-[0.88] transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 42%, ${demo.accentMuted} 100%)`,
          }}
        />
        <span
          className="absolute left-4 top-4 rounded-[4px] border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em]"
          style={{
            borderColor: demo.accent,
            backgroundColor: demo.accentMuted,
            color: demo.accent,
          }}
        >
          Concept Demo
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-center justify-between gap-5">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full border text-sm font-black"
            style={{
              borderColor: demo.accent,
              backgroundColor: demo.accentMuted,
              color: demo.accent,
            }}
          >
            {demo.initials}
          </span>
          <span className="text-right text-xs font-black uppercase tracking-[0.16em] text-muted">
            {demo.industryPlural}
          </span>
        </div>
        <h3 className="mt-8 text-3xl font-black leading-tight text-foreground">
          {demo.businessName}
        </h3>
        <p className="mt-2 text-xl font-black text-foreground">
          {demo.headline}
        </p>
        <p className="mt-5 flex-1 text-sm font-medium leading-7 text-muted">
          {demo.subheadline}
        </p>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-black text-foreground">
          Open concept demo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}
