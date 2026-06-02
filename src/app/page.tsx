import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero/Hero";
import Problem from "@/components/Problem";
import Services from "@/components/Services";
import SystemArchitecture from "@/components/SystemArchitecture";
import HowItWorks from "@/components/HowItWorks";
import Projects from "@/components/Projects";
import Industries from "@/components/Industries";
import Metrics from "@/components/Metrics";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Floating Pill Navbar */}
      <Navbar />
      
      <main className="relative flex-1">
        {/* Section 1: Hero Scene */}
        <Hero />

        {/* Section 2: Problem We Solve */}
        <Problem />

        {/* Section 3: Services (Problem -> Solution) */}
        <Services />
        
        {/* Section 4: System Architecture Flow */}
        <SystemArchitecture />

        {/* Section 5: Animated timeline how-it-works process */}
        <HowItWorks />
        
        {/* Section 6: System Showcase (CSS Mockups) */}
        <Projects />

        {/* Section 7: Industries */}
        <Industries />
        
        {/* Section 8: Proof & Metrics */}
        <Metrics />

        {/* Section 9: Pricing */}
        <Pricing />

        {/* Section 10: FAQ */}
        <FAQ />
        
        {/* Section 11: Final CTA */}
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
