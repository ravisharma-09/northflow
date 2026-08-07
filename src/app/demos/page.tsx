import type { Metadata } from "next";
import DemosClient from "./DemosClient";
import { demoSites } from "@/data/demo-sites";

export const metadata: Metadata = {
  title: "Industry Concept Demos",
  description:
    "Explore five fictional NorthFlow Concept Demos for moving, event rental, auto detailing, barbershop and independent car-rental businesses.",
  alternates: { canonical: "/demos" },
  openGraph: {
    title: "Industry Concept Demos | NorthFlow",
    description: "Five fictional service-business websites with complete interactive customer journeys.",
    url: "/demos",
    images: [{ url: "/demos/moving-hero.png", width: 1672, height: 941, alt: "NorthFlow Concept Demo gallery" }],
  },
};

export default function DemosPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "NorthFlow Industry Concept Demos",
    description: "Five fictional service-business website and customer-journey demonstrations.",
    url: "https://northflow.in/demos",
    hasPart: demoSites.map((demo) => ({
      "@type": "WebPage",
      name: `${demo.businessName} Concept Demo`,
      url: `https://northflow.in/demos/${demo.slug}`,
      description: demo.metadata.description,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="bg-[#050505]">
        <DemosClient />
      </main>
    </>
  );
}
