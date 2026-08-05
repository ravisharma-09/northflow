const capabilities = [
  "Lead capture",
  "Booking automation",
  "Follow-up systems",
  "CRM pipelines",
  "Business dashboards",
];

export default function CapabilityStrip() {
  const items = [...capabilities, ...capabilities];

  return (
    <section className="overflow-hidden border-b border-border bg-surface" aria-label="NorthFlow capabilities">
      <div className="public-marquee py-5">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            aria-hidden={index >= capabilities.length}
            className="flex items-center gap-7 px-6 text-[11px] font-black uppercase tracking-[0.16em] text-foreground"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
        ))}
      </div>
    </section>
  );
}
