import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { demoSites } from "@/data/demo-sites";
import { ButtonLink, Container, Section, SectionHeading } from "./Primitives";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

export default function DemoPreview() {
  return (
    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_0.2fr] lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Live concept demos"
              title="Five industries. Five complete customer journeys."
              description="Each fictional business is clearly marked Concept Demo and opens as a real responsive site, never a screenshot."
            />
          </Reveal>
          <Reveal className="lg:justify-self-end">
            <ButtonLink href="/demos" variant="secondary">
              Explore all demos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {demoSites.map((demo, index) => (
            <RevealItem
              key={demo.slug}
              className={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}
            >
              <a
                href={`/demos/${demo.slug}`}
                className="public-focus group block overflow-hidden rounded-[8px] border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:border-foreground"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-foreground">
                  <Image
                    src={demo.image}
                    alt={demo.imageAlt}
                    fill
                    sizes={index < 2 ? "(min-width: 1024px) 46vw, 100vw" : "(min-width: 1024px) 31vw, 100vw"}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-[5px] border border-white/30 bg-[#11100d] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-[#f5eee5]">
                    Concept Demo
                  </span>
                </div>
                <div className="flex min-h-[126px] items-end justify-between gap-5 border-t border-border p-5">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-muted">{demo.industry}</p>
                    <h3 className="mt-3 text-2xl font-black leading-tight">{demo.businessName}</h3>
                  </div>
                  <ArrowRight className="mb-1 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
