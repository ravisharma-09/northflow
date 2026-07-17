import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://northflow.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "NorthFlow | Business Automation, CRM Systems & Custom Dashboards",
    template: "%s | NorthFlow",
  },

  description:
    "Scale your service business with NorthFlow. We specialize in Business Automation, CRM Systems, AI Automation, WhatsApp Automation, Lead Management, Workflow Automation, and custom Business Dashboards.",

  keywords: [
    "Business Automation",
    "CRM Systems",
    "Business Dashboards",
    "AI Automation",
    "WhatsApp Automation",
    "Lead Management",
    "Workflow Automation",
    "lead generation website",
    "booking automation",
    "website for service business",
    "NorthFlow",
    "digital systems studio",
    "operational automation",
    "lead capture system",
    "custom CRM dashboard",
    "business growth system",
  ],

  authors: [{ name: "NorthFlow", url: SITE_URL }],
  creator: "NorthFlow",
  publisher: "NorthFlow",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: "NorthFlow | Business Automation, CRM Systems & Custom Dashboards",
    description:
      "Scale your service business with NorthFlow. We specialize in Business Automation, CRM Systems, AI Automation, WhatsApp Automation, Lead Management, Workflow Automation, and custom Business Dashboards.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "NorthFlow",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "NorthFlow — Business Automation & CRM Systems",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "NorthFlow | Business Automation, CRM Systems & Custom Dashboards",
    description:
      "Scale your service business with NorthFlow. We specialize in Business Automation, CRM Systems, AI Automation, WhatsApp Automation, Lead Management, and Workflow Automation.",
    images: [`${SITE_URL}/og-image.png`],
  },

  category: "technology",
};

// Rich structured data: Organization + WebSite + FAQPage
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NorthFlow",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "NorthFlow builds websites, CRM systems, AI automation, WhatsApp workflows and custom business dashboards for service businesses worldwide.",
  email: "northflow.work@gmail.com",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    email: "northflow.work@gmail.com",
    contactType: "sales",
    availableLanguage: ["English"],
  },
  areaServed: "Worldwide",
  serviceOutput: "Business Automation and CRM Systems",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NorthFlow",
  url: SITE_URL,
  description:
    "NorthFlow specializes in Business Automation, CRM Systems, AI Automation, and Business Dashboards.",
  publisher: {
    "@type": "Organization",
    name: "NorthFlow",
    url: SITE_URL,
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Business Automation & Workflow Automation",
  provider: {
    "@type": "Organization",
    name: "NorthFlow",
    url: SITE_URL,
  },
  areaServed: "Worldwide",
  description:
    "We provide Business Automation, CRM Systems, AI Automation, WhatsApp Automation, Lead Management, Workflow Automation, and Business Dashboards for service businesses.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Business System Plans",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website & Lead Management System",
          description:
            "Professional website with lead capture forms, Lead Management capabilities, mobile optimization and SEO.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website + AI & WhatsApp Automation",
          description:
            "Website with AI Automation, Lead Management notifications, email automation, booking automation, WhatsApp Automation workflows and follow-up systems.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website + Workflow Automation + Business Dashboard System",
          description:
            "Complete business system with a custom CRM System dashboard, lead pipeline, Workflow Automation, revenue tracking, business analytics and team visibility.",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you provide ongoing support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After launch, you can choose an ongoing support retainer for maintenance, updates, and future improvements.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build my system?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most projects are completed within 1–4 weeks depending on requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Can I start with only a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can start with a website and add automation or dashboards later.",
      },
    },
    {
      "@type": "Question",
      name: "Can you connect my existing tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We can integrate tools like Google Calendar, WhatsApp, CRMs, and more.",
      },
    },
    {
      "@type": "Question",
      name: "Will I be able to manage the system myself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We build easy-to-use systems and provide guidance after launch.",
      },
    },
    {
      "@type": "Question",
      name: "What businesses do you work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We work with service businesses, agencies, consultants, coaches, local businesses, and startups.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need technical knowledge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. We handle the setup, integrations, and technical work for you.",
      },
    },
    {
      "@type": "Question",
      name: "How do we get started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Book a strategy call and we'll discuss your goals, workflow, and the best solution for your business.",
      },
    },
  ],
};

const structuredDataArray = [
  organizationSchema,
  websiteSchema,
  serviceSchema,
  faqSchema,
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        {structuredDataArray.map((schema, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="min-h-screen bg-background text-foreground selection:bg-brand/20 selection:text-brand">
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
