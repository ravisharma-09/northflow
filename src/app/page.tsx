import PublicHeader from "@/components/public/PublicHeader";
import EditorialHero from "@/components/public/EditorialHero";
import CapabilityStrip from "@/components/public/CapabilityStrip";
import ProblemSection from "@/components/public/ProblemSection";
import ConnectedSystem from "@/components/public/ConnectedSystem";
import SolutionPanels from "@/components/public/SolutionPanels";
import SystemShowcase from "@/components/public/SystemShowcase";
import DemoPreview from "@/components/public/DemoPreview";
import ProcessSection from "@/components/public/ProcessSection";
import PublicFAQ from "@/components/public/PublicFAQ";
import StrategyCTA from "@/components/public/StrategyCTA";
import PublicFooter from "@/components/public/PublicFooter";

export default function Home() {
  return (
    <div className="public-site min-h-screen bg-background text-foreground">
      <PublicHeader />
      <main>
        <EditorialHero />
        <CapabilityStrip />
        <ProblemSection />
        <ConnectedSystem />
        <SolutionPanels />
        <SystemShowcase />
        <DemoPreview />
        <ProcessSection />
        <PublicFAQ />
        <StrategyCTA />
      </main>
      <PublicFooter />
    </div>
  );
}
