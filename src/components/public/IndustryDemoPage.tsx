import Image from "next/image";
import { ArrowLeft, ArrowRight, CalendarCheck, Check, ClipboardList, Route, Workflow } from "lucide-react";
import type { IndustryDemo } from "@/lib/industryDemos";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/public/Primitives";

export function IndustryDemoPage({ demo }: { demo: IndustryDemo }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${demo.businessName} Concept Demo`,
    description: demo.metadata.description,
    url: `https://northflow.in/demos/${demo.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: "NorthFlow",
      url: "https://northflow.in",
    },
    about: {
      "@type": "Service",
      name: `${demo.industry} business system concept`,
      provider: {
        "@type": "Organization",
        name: "NorthFlow",
      },
    },
  };

  return (
    <div className="public-redesign min-h-screen">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        <Section className="pt-32 md:pt-40">
          <Container>
            <a
              href="/demos"
              className="premium-focus inline-flex items-center gap-2 text-sm font-black text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              All concept demos
            </a>

            <div className="mt-10 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div>
                <Eyebrow>{demo.industry}</Eyebrow>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span
                    className="rounded-[4px] border px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em]"
                    style={{
                      borderColor: demo.accent,
                      backgroundColor: demo.accentMuted,
                      color: demo.accent,
                    }}
                  >
                    Concept Demo
                  </span>
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                    Fictional business system
                  </span>
                </div>
                <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[0.94] tracking-normal text-foreground md:text-7xl">
                  {demo.businessName}
                </h1>
                <p className="mt-5 text-3xl font-black leading-tight text-foreground md:text-4xl">
                  {demo.headline}
                </p>
                <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-muted">
                  {demo.subheadline}
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/start">
                    Build a system like this
                    <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                  <ButtonLink href="/" variant="secondary">
                    Back to NorthFlow
                  </ButtonLink>
                </div>
              </div>

              <div className="overflow-hidden rounded-[8px] border border-foreground bg-foreground shadow-premium">
                <div className="flex items-center justify-between border-b border-background/15 px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-background/65">
                  <span>{demo.category}</span>
                  <span>{demo.location}</span>
                </div>
                <div className="relative aspect-[4/3]">
                  <Image
                    src={demo.image}
                    alt={demo.imageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-border bg-surface/45">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <SectionHeading
                eyebrow="Customer journey"
                title="From public enquiry to organized follow-up."
                description={demo.journeyIntro}
              />
              <div className="grid gap-4">
                {demo.journey.map((step, index) => (
                  <Card key={step.title} className="grid gap-5 p-6 sm:grid-cols-[72px_1fr]">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-full border text-sm font-black"
                      style={{
                        borderColor: demo.accent,
                        backgroundColor: demo.accentMuted,
                        color: demo.accent,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="text-2xl font-black leading-tight text-foreground">
                        {step.title}
                      </h2>
                      <p className="mt-4 text-sm font-medium leading-7 text-muted">
                        {step.text}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHeading
              eyebrow="Shared system"
              title="One reusable NorthFlow pattern, adapted to the industry."
              description="The visual design, content and request details change by industry. The underlying system remains a connected public website, automation layer and CRM-ready operating flow."
            />
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {demo.system.map((item) => (
                <Card key={item.title} className="p-6">
                  <div className="mb-12 flex h-11 w-11 items-center justify-center rounded-[6px] bg-foreground text-background">
                    {item.title === "Website" ? <Route className="h-5 w-5" /> : null}
                    {item.title === "Automation" ? <Workflow className="h-5 w-5" /> : null}
                    {item.title === "CRM" ? <ClipboardList className="h-5 w-5" /> : null}
                  </div>
                  <h2 className="text-3xl font-black tracking-normal">
                    {item.title}
                  </h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-muted">
                    {item.text}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="border-y border-border bg-foreground text-background">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <div>
                <Eyebrow>Conversion flow</Eyebrow>
                <h2 className="mt-8 text-5xl font-black leading-[0.96] tracking-normal md:text-7xl">
                  A request path built around real operating details.
                </h2>
                <p className="mt-7 max-w-xl text-lg font-medium leading-8 text-background/72">
                  This concept does not claim to be live client work. It shows
                  the kind of practical information a NorthFlow system can
                  collect before your team responds.
                </p>
              </div>
              <Card className="border-background/14 bg-background p-6 text-foreground">
                <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                      Example enquiry
                    </p>
                    <h3 className="mt-3 text-3xl font-black leading-tight">
                      {demo.leadScenario}
                    </h3>
                  </div>
                  <span
                    className="rounded-[4px] border px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em]"
                    style={{
                      borderColor: demo.accent,
                      backgroundColor: demo.accentMuted,
                      color: demo.accent,
                    }}
                  >
                    Concept Demo
                  </span>
                </div>
                <div className="mt-7 grid gap-3">
                  {demo.requestFields.map((field) => (
                    <div key={field} className="flex items-center gap-3 text-sm font-bold text-foreground">
                      <Check className="h-4 w-4 text-brand" />
                      {field}
                    </div>
                  ))}
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <ButtonLink href="/start" className="w-full">
                    {demo.primaryAction}
                  </ButtonLink>
                  <ButtonLink href="/demos" variant="secondary" className="w-full">
                    {demo.secondaryAction}
                  </ButtonLink>
                </div>
              </Card>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <SectionHeading
                eyebrow="NorthFlow CTA"
                title="Use the concept as a starting point for your own system."
                description="The demo business is fictional. The strategy call is where we map your actual offer, lead path, booking flow and operating constraints."
              />
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <ButtonLink href="/start">
                  Book a strategy call
                  <CalendarCheck className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/" variant="secondary">
                  Visit homepage
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
