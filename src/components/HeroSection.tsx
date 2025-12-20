import FadeInSection from './FadeInSection';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center section-spacing pt-32 relative">
      <div className="container-reading text-center">
        <FadeInSection>
          <p className="font-sans-nav text-muted-foreground mb-8 tracking-widest">
            A Foundational Framework
          </p>
        </FadeInSection>
        
        <FadeInSection delay={200}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-12 text-balance">
            The Atlas Codex<br />of Living Systems
          </h1>
        </FadeInSection>
        
        <FadeInSection delay={400}>
          <div className="decorative-line" />
        </FadeInSection>
        
        <FadeInSection delay={600}>
          <div className="mt-12">
            <p className="prose-codex max-w-xl mx-auto text-balance">
              A scientific–philosophical framework that explains how life, matter, 
              ecosystems, societies, and human meaning organize, sustain, collapse, 
              and regenerate.
            </p>
          </div>

          <div className="mt-16">
            <p className="text-sm text-muted-foreground italic">
              This is not a product. It is a reference for understanding.
            </p>
          </div>
        </FadeInSection>

        {/* Subtle scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
