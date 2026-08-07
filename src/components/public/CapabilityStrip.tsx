const capabilities = [
  "Lead capture",
  "Booking automation",
  "Follow up systems",
  "CRM pipelines",
  "Business dashboards",
];

export default function CapabilityStrip() {
  const items = [...capabilities, ...capabilities];

  return (
    <section className="overflow-hidden border-b border-border bg-surface" aria-label="NorthFlow capabilities">
      <div className="public-marquee py-6">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            aria-hidden={index >= capabilities.length}
            className="flex items-center px-12 text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
