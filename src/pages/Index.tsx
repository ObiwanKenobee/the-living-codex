import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import PartnersCarousel from "@/components/PartnersCarousel";
import Footer from "@/components/Footer";
import CodexSidebar from "@/components/CodexSidebar";
import ContinueReadingPrompt from "@/components/ContinueReadingPrompt";
import { useScrollReadingDetection } from "@/hooks/useScrollReadingDetection";

const Index = () => {
  const location = useLocation();
  
  // Enable scroll-based reading detection
  useScrollReadingDetection();

  // Handle hash navigation on page load
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <CodexSidebar />
      <ContinueReadingPrompt />
      <main>
        <HeroSection />
        <CodexSection />
        <PillarsSection />
        <HabitatSection />
        <SanctumSection />
        <PracticeSection />
        <WritingsSection />
        <EthosSection />
        <PartnersCarousel />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
