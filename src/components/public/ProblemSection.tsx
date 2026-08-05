import { Container, Section, SectionHeading } from "./Primitives";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const problems = [
  ["Enquiries arrive without enough information", "Your team starts every conversation by reconstructing the basics."],
  ["Follow-ups are handled manually", "Good leads go quiet while reminders depend on someone remembering."],
  ["Customer records become scattered", "Messages, notes and booking details live in different tools and inboxes."],
  ["Owners cannot clearly see what is happening", "There is no dependable view of the pipeline, ownership or next action."],
];

export default function ProblemSection() {
  return (
    <Section>
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <SectionHeading
              eyebrow="The operating problem"
              title="Your business should not run through scattered tabs, calls and messages."
              description="A connected system gives every enquiry a clear path and gives your team one place to continue the work."
            />
          </Reveal>

          <RevealGroup className="border-t border-border">
            {problems.map(([title, text], index) => (
              <RevealItem key={title} className="grid gap-4 border-b border-border py-7 sm:grid-cols-[72px_1fr]">
                <span className="text-xs font-black text-brand">0{index + 1}</span>
                <div>
                  <h3 className="text-xl font-black leading-tight md:text-2xl">{title}</h3>
                  <p className="mt-3 max-w-xl text-sm font-medium leading-7 text-muted">{text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
