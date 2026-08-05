import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Database,
  Layers3,
  MousePointer2,
  Workflow,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { industryDemos } from "@/lib/industryDemos";
import { IndustryDemoCard } from "@/components/public/IndustryDemoCard";
import {
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/public/Primitives";

const problems = [
  "Website enquiries disappear into inboxes with no clear owner.",
  "Bookings depend on manual messages, reminders and calendar checks.",
  "Follow-up is inconsistent because every lead lives in a different tool.",
  "Owners cannot see pipeline, value or next actions without asking the team.",
];

const connectedSystem = [
  {
    title: "Website",
    description:
      "Premium public pages that explain the offer, filter poor-fit requests and capture useful lead context.",
    icon: MousePointer2,
  },
  {
    title: "Automation",
    description:
      "Confirmations, reminders and follow-up flows that reduce the manual work after an enquiry.",
    icon: Workflow,
  },
  {
    title: "CRM",
    description:
      "A private operating layer for leads, notes, bookings, assignments, email templates and next actions.",
    icon: Database,
  },
];

const solutions = [
  {
    title: "Website systems",
    href: "/systems/website",
    summary: "Conversion-focused websites with service pages, lead forms and booking paths.",
    includes: ["Core pages", "Lead capture", "SEO foundations"],
  },
  {
    title: "Automation systems",
    href: "/systems/automation",
    summary: "Follow-up, reminders and workflow automations around real customer journeys.",
    includes: ["Email flows", "Calendar sync", "Internal alerts"],
  },
  {
    title: "Business dashboards",
    href: "/systems/dashboards",
    summary: "CRM dashboards that organize leads, activity, team ownership and pipeline visibility.",
    includes: ["Lead pipeline", "Team roles", "Activity history"],
  },
];

const process = [
  {
    title: "Map the customer journey",
    text: "We document how enquiries, bookings, follow-up and internal handoff should actually work.",
  },
  {
    title: "Design the public conversion path",
    text: "The website makes the offer clear and captures the details your team needs to respond well.",
  },
  {
    title: "Connect the operating layer",
    text: "Calendar, CRM, notifications and email flows are tied together around the same lead record.",
  },
  {
    title: "Launch, review and improve",
    text: "After launch, care plans keep the system maintained while new workflow needs become visible.",
  },
];

const pricing = [
  {
    name: "Website Launch",
    price: "$1,490 USD",
    description: "For a premium site and clear lead-capture foundation.",
  },
  {
    name: "Growth System",
    price: "$2,900 USD",
    description: "For the full website, booking and follow-up system most service businesses need.",
  },
  {
    name: "Operations System",
    price: "$5,500+ USD",
    description: "For deeper CRM, workflow and operational dashboard requirements.",
  },
];

const carePlans = [
  "Essential Care - $149/month",
  "Growth Care - $299/month",
];

export default function Home() {
  return (
    <div className="public-redesign min-h-screen">
      <Navbar />

      <main>
        <Section id="home" className="min-h-screen pt-32 md:pt-40">
          <Container>
            <div className="grid items-start gap-14 lg:grid-cols-[1.04fr_0.96fr]">
              <div>
                <Eyebrow>Business systems studio</Eyebrow>
                <h1 className="mt-8 max-w-5xl text-6xl font-black leading-[0.92] tracking-normal text-foreground sm:text-7xl lg:text-8xl">
                  Complete systems for service businesses that cannot run on a basic website.
                </h1>
                <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-muted md:text-xl">
                  NorthFlow builds premium websites connected to lead capture,
                  booking automation, follow-up and CRM infrastructure, so your
                  customer journey is easier to sell and easier to operate.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/start">
                    Book a strategy call
                    <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                  <ButtonLink href="/demos" variant="secondary">
                    View concept demos
                  </ButtonLink>
                </div>
              </div>

              <div className="overflow-hidden rounded-[8px] border border-[#11120f] bg-[#11120f] text-[#f4efe7] shadow-premium">
                <div className="border-b border-[#f4efe7]/15 p-5">
                  <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-[0.18em] text-background/70">
                    <span>NorthFlow operating layer</span>
                    <span>Live build map</span>
                  </div>
                </div>
                <div className="grid gap-4 p-5">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] border border-[#f4efe7]/15 bg-[#1b1c18]">
                    <Image
                      src="/macbook_screen.png"
                      alt="NorthFlow dashboard preview"
                      fill
                      priority
                      className="object-cover opacity-75"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,18,15,0.76),rgba(17,18,15,0.12))]" />
                    <div className="absolute left-5 top-5 rounded-[4px] border border-[#f4efe7]/20 bg-[#11120f]/85 px-3 py-2 text-xs font-black uppercase tracking-[0.14em]">
                      Lead captured
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 rounded-[6px] border border-[#f4efe7]/15 bg-[#11120f]/88 p-4">
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#f4efe7]/55">
                        New request
                      </p>
                      <p className="mt-2 text-2xl font-black">Service enquiry - ready for follow-up</p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[6px] border border-[#f4efe7]/15 p-4">
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-background/55">
                        Lead path
                      </p>
                      <p className="mt-3 text-xl font-black">Website to CRM</p>
                    </div>
                    <div className="rounded-[6px] border border-[#f4efe7]/15 p-4">
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-background/55">
                        Next step
                      </p>
                      <p className="mt-3 text-xl font-black">Booked call</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="problems" className="border-y border-border bg-surface/45">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading
                eyebrow="Problems we solve"
                title="The website is only one part of the revenue path."
                description="Most service businesses do not need another isolated marketing page. They need a connected system that keeps leads moving after the form is submitted."
              />
              <div className="grid gap-3">
                {problems.map((problem, index) => (
                  <Card key={problem} className="flex gap-5 p-5">
                    <span className="mt-1 text-sm font-black text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-lg font-bold leading-7 text-foreground">
                      {problem}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section id="system">
          <Container>
            <SectionHeading
              eyebrow="Connected system"
              title="Website, automation and CRM designed as one workflow."
              description="NorthFlow treats every public page, booking prompt and internal dashboard as parts of the same customer journey."
            />
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {connectedSystem.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="p-6">
                    <div className="mb-12 flex h-11 w-11 items-center justify-center rounded-[6px] bg-foreground text-background">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-3xl font-black tracking-normal">
                      {item.title}
                    </h3>
                    <p className="mt-5 text-sm font-medium leading-7 text-muted">
                      {item.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </Container>
        </Section>

        <Section id="systems" className="border-y border-border bg-foreground text-background">
          <Container>
            <SectionHeading
              eyebrow="Core solutions"
              title="Build the parts your business is missing."
              description="Start with the public conversion layer, add automation where work repeats, and organize everything inside a CRM your team can use."
              className="[--foreground:#f4efe7] [--muted:rgba(244,239,231,0.72)]"
            />
            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {solutions.map((solution) => (
                <a
                  key={solution.title}
                  href={solution.href}
                  className="premium-focus group flex min-h-[360px] flex-col justify-between rounded-[8px] border border-background/18 p-6 transition-colors hover:bg-background hover:text-foreground"
                >
                  <div>
                    <Layers3 className="h-6 w-6 text-brand" />
                    <h3 className="mt-8 text-3xl font-black">
                      {solution.title}
                    </h3>
                    <p className="mt-5 text-sm font-medium leading-7 opacity-75">
                      {solution.summary}
                    </p>
                    <ul className="mt-8 grid gap-3">
                      {solution.includes.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm font-bold">
                          <Check className="h-4 w-4 text-brand" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="mt-10 inline-flex items-center gap-2 text-sm font-black">
                    Explore system
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>
          </Container>
        </Section>

        <Section id="industry-demos">
          <Container>
            <SectionHeading
              eyebrow="Industry concept demos"
              title="Five ways to package the same NorthFlow system."
              description="Each fictional business is clearly marked as a Concept Demo. The point is the workflow pattern: better requests, cleaner follow-up and a more useful operating layer."
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
            <div className="mt-8 flex justify-center">
              <ButtonLink href="/demos" variant="secondary">
                View all concept demos
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Container>
        </Section>

        <Section id="process" className="border-y border-border bg-surface/45">
          <Container>
            <SectionHeading
              eyebrow="Delivery process"
              title="A clear path from messy workflow to working system."
              description="The process stays practical: understand the business, design the conversion path, connect the tools, then improve the system after launch."
            />
            <div className="mt-14 grid gap-4 lg:grid-cols-4">
              {process.map((step, index) => (
                <Card key={step.title} className="p-6">
                  <span className="text-sm font-black text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-10 text-2xl font-black leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-5 text-sm font-medium leading-7 text-muted">
                    {step.text}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <Section id="pricing">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading
                eyebrow="Pricing preview"
                title="Starting points that protect the scope."
                description="Final scope is confirmed after discovery. Care plans are separate from project builds."
              />
              <div className="grid gap-4">
                {pricing.map((plan) => (
                  <Card
                    key={plan.name}
                    className="grid gap-5 p-6 md:grid-cols-[0.8fr_0.7fr_1fr] md:items-center"
                  >
                    <h3 className="text-2xl font-black">{plan.name}</h3>
                    <p className="text-xl font-black text-brand">
                      {plan.price}
                    </p>
                    <p className="text-sm font-medium leading-7 text-muted">
                      {plan.description}
                    </p>
                  </Card>
                ))}
                <Card className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                        Care plans
                      </p>
                      <p className="mt-3 text-2xl font-black">
                        Maintenance and iteration after launch.
                      </p>
                    </div>
                    <div className="grid gap-2 text-sm font-black text-foreground">
                      {carePlans.map((plan) => (
                        <span key={plan}>{plan}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="cta" className="bg-foreground text-background">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
              <div>
                <Eyebrow>Strategy call</Eyebrow>
                <h2 className="mt-8 max-w-4xl text-5xl font-black leading-[0.96] tracking-normal md:text-7xl">
                  Build the system behind the growth, not another isolated website.
                </h2>
              </div>
              <div>
                <p className="text-lg font-medium leading-8 text-background/72">
                  Use the existing NorthFlow booking journey to share your
                  workflow, choose a meeting slot and start with a practical
                  system plan.
                </p>
                <ButtonLink href="/start" variant="primary" className="mt-8 bg-background text-foreground hover:bg-brand hover:text-background">
                  Start with a strategy call
                  <CalendarCheck className="h-4 w-4" />
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
