import { ArrowRight, BarChart3, Check, LayoutTemplate, Workflow } from "lucide-react";
import { Container, Section, SectionHeading } from "./Primitives";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const solutions = [
  {
    category: "Public experience",
    title: "Website Systems",
    href: "/systems/website",
    text: "Premium public pages designed to explain the offer, answer the right questions and turn visits into useful enquiries.",
    features: ["Mobile-first design", "Lead and quote forms", "Booking integration", "SEO foundations"],
    icon: LayoutTemplate,
    className: "lg:col-span-7",
  },
  {
    category: "Workflow layer",
    title: "Automation Systems",
    href: "/systems/automation",
    text: "Connected confirmations, reminders, notifications and follow-up sequences that remove repetitive work.",
    features: ["Email follow-up", "Booking reminders", "Lead notifications", "Workflow connections"],
    icon: Workflow,
    className: "lg:col-span-5 lg:mt-20",
  },
  {
    category: "Operating visibility",
    title: "CRM & Business Dashboards",
    href: "/systems/dashboards",
    text: "A practical operating layer for lead ownership, pipeline movement, team activity and decisions.",
    features: ["Lead records", "Sales pipeline", "Team visibility", "Custom reporting"],
    icon: BarChart3,
    className: "lg:col-span-8 lg:col-start-3",
  },
];

export default function SolutionPanels() {
  return (
    <Section>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Core solutions"
            title="Build the public experience and the operating system behind it."
            description="Each layer can stand alone. The strongest result comes from connecting them around one clear customer journey."
          />
        </Reveal>

        <RevealGroup className="mt-16 grid gap-5 lg:grid-cols-12">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <RevealItem key={solution.title} className={solution.className}>
                <a
                  href={solution.href}
                  className="public-focus group flex min-h-[420px] flex-col rounded-[8px] border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:border-foreground"
                >
                  <div className="flex items-start justify-between gap-6 border-b border-border p-6 md:p-8">
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-[0.16em] text-muted">{solution.category}</span>
                      <h3 className="mt-10 text-4xl font-black leading-[0.96] md:text-5xl">{solution.title}</h3>
                    </div>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="grid flex-1 gap-8 p-6 md:grid-cols-[1fr_0.85fr] md:p-8">
                    <p className="text-base font-medium leading-8 text-muted">{solution.text}</p>
                    <div className="grid content-start gap-3">
                      {solution.features.map((feature) => (
                        <span key={feature} className="flex items-center gap-3 text-sm font-bold">
                          <Check className="h-4 w-4 text-brand" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-border px-6 py-5 text-sm font-black md:px-8">
                    Explore the system
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
