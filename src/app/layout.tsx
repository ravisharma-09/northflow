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

const SITE_URL = "https://northflow.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "NorthFlow — Websites, Automation & Business Systems Built For Growth",
    template: "%s | NorthFlow",
  },

  description:
    "NorthFlow builds websites, CRM systems, booking automation, WhatsApp workflows and custom dashboards that help service businesses capture more leads, automate follow-ups and scale operations.",

  keywords: [
    "business automation",
    "lead generation website",
    "CRM system",
    "booking automation",
    "WhatsApp automation",
    "business dashboard",
    "website for service business",
    "NorthFlow",
    "digital systems studio",
    "operational automation",
    "lead capture system",
    "custom CRM dashboard",
    "business growth system",
    "web development agency",
    "automation agency",
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
    title: "NorthFlow — Websites, Automation & Business Systems Built For Growth",
    description:
      "We build websites, CRM systems, booking automation, WhatsApp workflows and custom dashboards for service businesses worldwide.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "NorthFlow",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "NorthFlow — Websites, Automation & Business Systems",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "NorthFlow — Websites, Automation & Business Systems",
    description:
      "We build websites, CRM systems, booking automation and custom dashboards for service businesses.",
    images: [`${SITE_URL}/og-image.png`],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
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
    "NorthFlow builds websites, CRM systems, booking automation, WhatsApp workflows and custom dashboards for service businesses worldwide.",
  email: "northflow.work@gmail.com",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    email: "northflow.work@gmail.com",
    contactType: "sales",
    availableLanguage: ["English"],
  },
  areaServed: "Worldwide",
  serviceOutput: "Digital Business Systems",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NorthFlow",
  url: SITE_URL,
  description:
    "NorthFlow builds websites, automation systems, and business dashboards for service businesses.",
  publisher: {
    "@type": "Organization",
    name: "NorthFlow",
    url: SITE_URL,
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Digital Business Systems",
  provider: {
    "@type": "Organization",
    name: "NorthFlow",
    url: SITE_URL,
  },
  areaServed: "Worldwide",
  description:
    "We build websites, CRM systems, booking automation, WhatsApp workflows and custom dashboards for service businesses.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Business System Plans",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website System",
          description:
            "Professional website with lead capture forms, booking integration, mobile optimization and SEO.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website + Automation System",
          description:
            "Website with lead notifications, email automation, booking automation, WhatsApp workflows and follow-up systems.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website + Automation + Dashboard System",
          description:
            "Complete business system with CRM dashboard, lead pipeline, revenue tracking, business analytics and team visibility.",
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
