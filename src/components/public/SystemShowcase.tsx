import Image from "next/image";
import { Container, Eyebrow, Section } from "./Primitives";
import { Reveal } from "./Reveal";

export default function SystemShowcase() {
  return (
    <Section className="border-y border-border bg-[#f6e8db]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <Reveal>
            <Eyebrow className="text-muted">System interface</Eyebrow>
            <h2 className="mt-7 text-[clamp(3rem,5.4vw,5rem)] font-black leading-[0.94]">
              The work continues <span className="editorial-serif block">after the form is sent.</span>
            </h2>
            <p className="mt-7 max-w-xl text-base font-medium leading-8 text-muted">
              These are product-interface demonstration assets: a lead record, a mobile view and a dashboard surface showing how information can stay connected for the team.
            </p>
          </Reveal>

          <Reveal className="relative min-h-[540px] md:min-h-[620px]" delay={0.12}>
            <div className="absolute inset-x-0 bottom-0 overflow-hidden rounded-[8px] border border-foreground bg-foreground p-3 shadow-premium md:left-[8%]">
              <Image
                src="/macbook_screen.png"
                alt="NorthFlow dashboard interface demonstration"
                width={1440}
                height={900}
                className="h-auto w-full rounded-[4px] opacity-90"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </div>
            <div className="absolute bottom-[-2%] left-0 w-[38%] overflow-hidden rounded-[8px] border border-foreground bg-surface p-2 shadow-premium md:left-[-2%]">
              <Image
                src="/phone_screen.png"
                alt="NorthFlow mobile interface demonstration"
                width={700}
                height={1100}
                className="h-auto w-full rounded-[4px]"
                sizes="(min-width: 1024px) 22vw, 38vw"
              />
            </div>
            <div className="absolute right-0 top-[2%] w-[48%] overflow-hidden rounded-[8px] border border-border bg-surface p-2 shadow-premium md:right-[-3%]">
              <Image
                src="/leads_card.png"
                alt="NorthFlow lead record interface demonstration"
                width={800}
                height={560}
                className="h-auto w-full rounded-[4px]"
                sizes="(min-width: 1024px) 26vw, 48vw"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
