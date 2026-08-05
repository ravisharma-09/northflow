import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { industryDemos } from "@/lib/industryDemos";
import { IndustryDemoCard } from "@/components/public/IndustryDemoCard";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/public/Primitives";

export const metadata: Metadata = {
  title: "Industry Concept Demos",
  description:
    "Explore fictional NorthFlow concept demos for moving, event-rental, auto-detailing, barbershop and independent car-rental businesses.",
  alternates: {
    canonical: "/demos",
  },
  openGraph: {
    title: "Industry Concept Demos | NorthFlow",
    description:
      "Fictional concept demos showing how NorthFlow designs connected websites, automation and CRM journeys for service businesses.",
    url: "/demos",
    images: [
      {
        url: "/demos/gallery-desktop.png",
        width: 1440,
        height: 2200,
        alt: "NorthFlow industry concept demo gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry Concept Demos | NorthFlow",
    description:
      "Fictional concept demos showing premium service-business systems.",
    images: ["/demos/gallery-desktop.png"],
  },
};

export default function DemosPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "NorthFlow Industry Concept Demos",
    description: metadata.description,
    url: "https://northflow.in/demos",
    hasPart: industryDemos.map((demo) => ({
      "@type": "WebPage",
      name: `${demo.businessName} Concept Demo`,
      url: `https://northflow.in/demos/${demo.slug}`,
      description: demo.metadata.description,
    })),
  };

  return (
    <div className="public-redesign min-h-screen">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <main>
        <Section className="pt-32 md:pt-40">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <Eyebrow>Industry demos</Eyebrow>
                <h1 className="mt-8 max-w-5xl text-6xl font-black leading-[0.92] tracking-normal text-foreground sm:text-7xl lg:text-8xl">
                  Concept systems for service businesses.
                </h1>
              </div>
              <div>
                <p className="max-w-2xl text-lg font-medium leading-8 text-muted md:text-xl">
                  These are fictional demo businesses, clearly marked as
                  Concept Demo. They show how NorthFlow packages a premium
                  website, request flow, follow-up logic and CRM-ready journey
                  for different service industries.
                </p>
                <ButtonLink href="/start" className="mt-8">
                  Plan your own system
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-border bg-surface/45">
          <Container>
            <SectionHeading
              eyebrow="Gallery"
              title="Five fictional businesses, one reusable system approach."
              description="Each concept page has its own industry content, colours, image and conversion flow while sharing the same NorthFlow structure."
            />
            <div className="mt-14 grid gap-4 lg:grid-cols-2">
              {industryDemos.map((demo, index) => (
                <IndustryDemoCard
                  key={demo.slug}
                  demo={demo}
                  featured={index === 0}
                />
              ))}
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <SectionHeading
                eyebrow="Strategy call"
                title="Turn a concept pattern into your actual operating system."
                description="NorthFlow maps the real customer journey first, then designs the pages, forms, automation and CRM layer around it."
              />
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <ButtonLink href="/start">
                  Book a strategy call
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/" variant="secondary">
                  Back to homepage
                </ButtonLink>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
