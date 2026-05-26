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
  title: "NorthFlow | Premium Websites & Intelligent Automation",
  description: "Designing digital experiences and automation systems for modern businesses.",
  keywords: ["Website Design", "Intelligent Automation Systems", "Web development", "Lead generation", "SaaS marketing", "NorthFlow", "Premium Web Design"],
  authors: [{ name: "NorthFlow" }],
  openGraph: {
    title: "NorthFlow | Premium Websites & Intelligent Automation",
    description: "Designing digital experiences and automation systems for modern businesses.",
    type: "website",
    locale: "en_US",
  },
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
