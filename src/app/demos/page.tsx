import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { ButtonLink, Container, Eyebrow, Section } from "@/components/public/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/public/Reveal";
import { demoSites } from "@/data/demo-sites";

export const metadata: Metadata = {
  title: "Industry Concept Demos",
  description:
    "Explore five fictional NorthFlow Concept Demos for moving, event rental, auto detailing, barbershop and independent car-rental businesses.",
  alternates: { canonical: "/demos" },
  openGraph: {
    title: "Industry Concept Demos | NorthFlow",
    description: "Five fictional service-business websites with complete interactive customer journeys.",
    url: "/demos",
    images: [{ url: "/demos/moving-hero.png", width: 1672, height: 941, alt: "NorthFlow Concept Demo gallery" }],
  },
};

export default function DemosPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "NorthFlow Industry Concept Demos",
    description: "Five fictional service-business website and customer-journey demonstrations.",
    url: "https://northflow.in/demos",
    hasPart: demoSites.map((demo) => ({
      "@type": "WebPage",
      name: `${demo.businessName} Concept Demo`,
      url: `https://northflow.in/demos/${demo.slug}`,
      description: demo.metadata.description,
    })),
  };

  return (
    <div className="public-site min-h-screen bg-background text-foreground">
      <PublicHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main>
        <section className="public-paper-gradient border-b border-border py-20 md:py-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <Reveal>
                <Eyebrow className="text-muted">Industry Concept Demos</Eyebrow>
                <h1 className="mt-8 text-[clamp(3.8rem,7.2vw,6.8rem)] font-black leading-[0.9]">
                  Five industries. <span className="editorial-serif block">Five complete customer journeys.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-xl text-base font-medium leading-8 text-muted md:text-lg">
                  Every business below is fictional and visibly labelled Concept Demo. Open each one as a real responsive site, explore its industry offer and build a local request summary.
                </p>
                <ButtonLink href="/start" className="mt-8">
                  Plan your own system
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              </Reveal>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <RevealGroup className="grid gap-6 lg:grid-cols-2">
              {demoSites.map((demo, index) => (
                <RevealItem key={demo.slug} className={index === 4 ? "lg:col-span-2" : ""}>
                  <article className={`grid overflow-hidden rounded-[8px] border border-border bg-surface ${index === 4 ? "lg:grid-cols-[1.2fr_0.8fr]" : ""}`}>
                    <a href={`/demos/${demo.slug}`} className="public-focus group relative block aspect-[16/11] overflow-hidden bg-foreground">
                      <Image
                        src={demo.image}
                        alt={demo.imageAlt}
                        fill
                        priority={index < 2}
                        sizes={index === 4 ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 47vw, 100vw"}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 text-[10px] font-black uppercase tracking-[0.14em] text-white">
                        <span className="rounded-[4px] bg-[#11100d] px-2.5 py-1">Concept Demo</span>
                        <span>0{index + 1}</span>
                      </div>
                    </a>
                    <div className="flex flex-col justify-between p-6 md:p-8">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-muted">{demo.industry}</p>
                        <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">{demo.businessName}</h2>
                        <p className="mt-4 text-sm font-medium leading-7 text-muted">{demo.description}</p>
                        <div className="mt-6 border-t border-border pt-5">
                          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-muted">Journey demonstrated</p>
                          <p className="mt-2 text-sm font-bold">{demo.journey.map((step) => step.title).join(" → ")}</p>
                        </div>
                      </div>
                      <a href={`/demos/${demo.slug}`} className="public-focus group mt-8 inline-flex items-center gap-2 text-sm font-black">
                        Open live demo
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>

        <section className="public-ink py-20 md:py-24">
          <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow className="text-muted">NorthFlow strategy call</Eyebrow>
              <h2 className="mt-7 max-w-4xl text-[clamp(3rem,5.3vw,5rem)] font-black leading-[0.94]">Turn the right concept into your real working system.</h2>
            </div>
            <ButtonLink href="/start" variant="light">
              Book a strategy call
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
          </Container>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
