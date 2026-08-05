import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DemoShell from "@/components/demos/DemoShell";
import { demoSites, getDemoSite } from "@/data/demo-sites";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return demoSites.map((demo) => ({ slug: demo.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const demo = getDemoSite(params.slug);
  if (!demo) return { title: "Concept Demo Not Found" };

  return {
    title: demo.metadata.title,
    description: demo.metadata.description,
    alternates: { canonical: `/demos/${demo.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: demo.metadata.title,
      description: demo.metadata.description,
      url: `/demos/${demo.slug}`,
      images: [{ url: demo.image, alt: `${demo.businessName} Concept Demo`, width: 1600, height: 900 }],
    },
    twitter: { card: "summary_large_image", title: demo.metadata.title, description: demo.metadata.description, images: [demo.image] },
  };
}

export default function DemoPage({ params }: Props) {
  const demo = getDemoSite(params.slug);
  if (!demo) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${demo.businessName} Concept Demo`,
    description: demo.metadata.description,
    url: `https://northflow.in/demos/${demo.slug}`,
    additionalType: "Concept Demo",
    isPartOf: { "@type": "WebSite", name: "NorthFlow", url: "https://northflow.in" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoShell demo={demo} />
    </>
  );
}
