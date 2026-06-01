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

export const metadata: Metadata = {
  title: "NorthFlow | Digital Systems Built For Growth",
  description: "NorthFlow helps businesses automate operations, capture more leads and scale efficiently through modern digital systems.",
  keywords: ["Digital Systems Studio", "Website Systems", "Business Automation", "Custom Dashboards", "NorthFlow", "Operations OS", "Web App Development"],
  authors: [{ name: "NorthFlow" }],
  openGraph: {
    title: "NorthFlow | Digital Systems Built For Growth",
    description: "NorthFlow helps businesses automate operations, capture more leads and scale efficiently through modern digital systems.",
    type: "website",
    locale: "en_US",
    siteName: "NorthFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "NorthFlow | Digital Systems Built For Growth",
    description: "We build websites, automation & dashboards that scale businesses.",
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NorthFlow",
  "url": "https://northflow.com",
  "logo": "https://northflow.com/logo.png",
  "description": "NorthFlow builds premium websites, intelligent automations, and custom business dashboards.",
};

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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
