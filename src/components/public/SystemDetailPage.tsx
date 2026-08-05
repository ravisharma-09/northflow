import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  FileText,
  LayoutTemplate,
  Mail,
  MessageCircle,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
import { ButtonLink, Container, Eyebrow, Section } from "./Primitives";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

type IconName = "layout" | "sparkles" | "workflow" | "message" | "mail" | "calendar" | "settings" | "users" | "chart" | "shield" | "file" | "zap";

export type SystemPageConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{ title: string; icon: IconName; items: string[] }>;
  additional: string[];
};

const icons = {
  layout: LayoutTemplate,
  sparkles: Sparkles,
  workflow: Workflow,
  message: MessageCircle,
  mail: Mail,
  calendar: Calendar,
  settings: Settings,
  users: Users,
  chart: BarChart3,
  shield: ShieldCheck,
  file: FileText,
  zap: Zap,
};

export default function SystemDetailPage({ config }: { config: SystemPageConfig }) {
  return (
    <div className="public-site min-h-screen bg-background text-foreground">
      <PublicHeader />
      <main>
        <section className="public-paper-gradient border-b border-border py-20 md:py-28">
          <Container>
            <a href="/#systems" className="public-focus group inline-flex items-center gap-2 text-sm font-black text-muted hover:text-foreground">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to systems
            </a>
            <Reveal className="mt-14 max-w-5xl">
              <Eyebrow className="text-muted">{config.eyebrow}</Eyebrow>
              <h1 className="mt-7 text-[clamp(3.8rem,7vw,6.8rem)] font-black leading-[0.9]">{config.title}</h1>
              <p className="mt-8 max-w-2xl text-base font-medium leading-8 text-muted md:text-lg">{config.intro}</p>
              <ButtonLink href="/start" className="mt-9">
                Book a strategy call
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </Reveal>
          </Container>
        </section>

        <Section>
          <Container>
            <RevealGroup className="grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">
              {config.sections.map((section, index) => {
                const Icon = icons[section.icon];
                return (
                  <RevealItem key={section.title} className="border-b border-r border-border bg-surface p-6 md:min-h-[360px] md:p-8">
                    <div className="flex items-start justify-between gap-5">
                      <span className="text-xs font-black text-brand">{String(index + 1).padStart(2, "0")}</span>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-14 text-3xl font-black leading-tight">{section.title}</h2>
                    <ul className="mt-7 grid gap-3">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm font-bold leading-6 text-muted">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </Container>
        </Section>

        <Section className="border-y border-border bg-surface">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <Eyebrow className="text-muted">Additional options</Eyebrow>
                <h2 className="mt-7 text-4xl font-black leading-[0.96] md:text-5xl">Scope expands around the real workflow.</h2>
              </div>
              <div className="grid border-l border-t border-border sm:grid-cols-2">
                {config.additional.map((item) => (
                  <div key={item} className="border-b border-r border-border p-5 text-sm font-black">{item}</div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <section className="public-ink py-20 md:py-24">
          <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow className="text-muted">Custom system</Eyebrow>
              <h2 className="mt-7 max-w-4xl text-[clamp(3rem,5.3vw,5rem)] font-black leading-[0.94]">Design the right layer around the tools and process you already have.</h2>
            </div>
            <ButtonLink href="/start" variant="light">
              Book a strategy call
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Container>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
