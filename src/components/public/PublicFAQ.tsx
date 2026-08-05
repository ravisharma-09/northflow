"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Container, Section, SectionHeading } from "./Primitives";

const questions = [
  ["Can I start with only a website?", "Yes. The public website can launch first, with automation, CRM and dashboards added when the workflow is ready."],
  ["Can NorthFlow connect tools I already use?", "Yes. Existing calendars, booking tools, CRMs and communication systems can be assessed during discovery and preserved where they already work."],
  ["Will my team be able to manage the system?", "That is the aim. The operating layer is designed around clear ownership, usable interfaces and a handoff your team can understand."],
  ["Do you provide ongoing support?", "Yes. Maintenance, updates and future improvements can be scoped after launch without presenting unsupported public pricing."],
  ["How do we get started?", "Book a strategy call. We will review the business, current workflow and the right first system to build."],
];

export default function PublicFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <Section>
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeading eyebrow="Common questions" title="Clear answers before the build starts." />
          <div className="border-t border-border">
            {questions.map(([question, answer], index) => {
              const expanded = open === index;
              return (
                <div key={question} className="border-b border-border">
                  <button
                    type="button"
                    className="public-focus flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={expanded}
                    onClick={() => setOpen(expanded ? -1 : index)}
                  >
                    <span className="text-lg font-black leading-tight md:text-xl">{question}</span>
                    <Plus className={`h-5 w-5 shrink-0 transition-transform ${expanded ? "rotate-45" : ""}`} />
                  </button>
                  {expanded ? <p className="max-w-2xl pb-7 text-sm font-medium leading-7 text-muted">{answer}</p> : null}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
