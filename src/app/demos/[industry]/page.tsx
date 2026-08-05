import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndustryDemo, industryDemos } from "@/lib/industryDemos";
import { IndustryDemoPage } from "@/components/public/IndustryDemoPage";

type DemoRouteProps = {
  params: {
    industry: string;
  };
};

export function generateStaticParams() {
  return industryDemos.map((demo) => ({
    industry: demo.slug,
  }));
}

export function generateMetadata({ params }: DemoRouteProps): Metadata {
  const demo = getIndustryDemo(params.industry);

  if (!demo) {
    return {
      title: "Concept Demo Not Found",
    };
  }

  return {
    title: demo.metadata.title,
    description: demo.metadata.description,
    alternates: {
      canonical: `/demos/${demo.slug}`,
    },
    openGraph: {
      title: `${demo.metadata.title} | NorthFlow`,
      description: demo.metadata.description,
      url: `/demos/${demo.slug}`,
      images: [
        {
          url: demo.image,
          width: 1440,
          height: 1100,
          alt: demo.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${demo.metadata.title} | NorthFlow`,
      description: demo.metadata.description,
      images: [demo.image],
    },
  };
}

export default function DemoIndustryPage({ params }: DemoRouteProps) {
  const demo = getIndustryDemo(params.industry);

  if (!demo) {
    notFound();
  }

  return <IndustryDemoPage demo={demo} />;
}
