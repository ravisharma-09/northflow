import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Projects from "@/components/Projects";
import Metrics from "@/components/Metrics";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Floating Pill Navbar */}
      <Navbar />
      
      <main className="relative flex-1">
        {/* Section 1: Hero Scene with 3D Canvas */}
        <Hero />
        
        {/* Section 2: Services with Spotlight 3D Tilt cards */}
        <Services />
        
        {/* Section 3: Animated timeline how-it-works process */}
        <HowItWorks />
        
        {/* Section 4: Desktop horizontal / Mobile vertical projects showcaser */}
        <Projects />
        
        {/* Section 5: Why Choose Us & Scroll count-up metrics */}
        <Metrics />
        
        {/* Section 6: Large floating CTA with magnetic pull button */}
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
