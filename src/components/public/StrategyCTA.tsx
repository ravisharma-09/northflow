import { ArrowUpRight } from "lucide-react";
import { ButtonLink, Container, Eyebrow, Section } from "./Primitives";
import { Reveal } from "./Reveal";

export default function StrategyCTA() {
  return (
    <Section className="public-ink">
      <Container>
        <Reveal className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <Eyebrow className="text-muted">Start with the workflow</Eyebrow>
            <h2 className="mt-7 text-[clamp(3.25rem,6.3vw,6rem)] font-black leading-[0.92]">
              Let&apos;s build the system <span className="editorial-serif block">your business is missing.</span>
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-xl text-base font-medium leading-8 text-muted">
              Bring the current process, the tools you already use and the point where work keeps falling apart. We will map the right next system.
            </p>
            <ButtonLink href="/start" variant="light" className="mt-8">
              Book a strategy call
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
