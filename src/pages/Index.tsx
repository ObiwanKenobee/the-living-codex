import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CodexSection from "@/components/CodexSection";
import PillarsSection from "@/components/PillarsSection";
import HabitatSection from "@/components/HabitatSection";
import SanctumSection from "@/components/SanctumSection";
import PracticeSection from "@/components/PracticeSection";
import WritingsSection from "@/components/WritingsSection";
import EthosSection from "@/components/EthosSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <CodexSection />
        <PillarsSection />
        <HabitatSection />
        <SanctumSection />
        <PracticeSection />
        <WritingsSection />
        <EthosSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
