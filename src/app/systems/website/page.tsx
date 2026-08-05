import SystemDetailPage, { type SystemPageConfig } from "@/components/public/SystemDetailPage";

const config: SystemPageConfig = {
  eyebrow: "Digital presence",
  title: "Website Systems",
  intro: "High-performance, conversion-focused websites designed to act as the central hub for lead generation and the customer journey behind it.",
  sections: [
    { title: "Included Features", icon: "layout", items: ["Custom website design", "Mobile responsive", "Fast loading", "SEO foundations", "Service pages", "FAQ sections"] },
    { title: "Lead Generation", icon: "sparkles", items: ["Lead capture forms", "Quote request forms", "Consultation booking", "Call-to-action optimization"] },
    { title: "Integrations", icon: "workflow", items: ["Google Analytics", "Google Search Console", "Google Calendar", "Booking integrations"] },
  ],
  additional: ["Landing pages", "Blog systems", "Portfolio galleries", "E-commerce stores", "Membership areas", "Client portals", "Multi-language websites", "Subscription payments"],
};

export default function WebsiteSystems() {
  return <SystemDetailPage config={config} />;
}
