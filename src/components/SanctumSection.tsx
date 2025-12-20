import FadeInSection from './FadeInSection';

const SanctumSection = () => {
  return (
    <section className="section-spacing border-t divider">
      <div className="container-reading">
        <FadeInSection>
          <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
            IV
          </p>
          <h2 className="text-3xl md:text-4xl font-light mb-12">
            Atlas Sanctum
          </h2>
        </FadeInSection>
        
        <FadeInSection delay={100}>
          <div className="prose-codex space-y-6">
            <p>
              Atlas Sanctum is the applied arm that emerges from the Codex—the 
              institutional structure through which its principles are translated 
              into practice across contexts beyond Habitat One.
            </p>
            
            <p className="text-muted-foreground">
              The relationship is clear: the Codex comes first. It is the 
              foundation. Sanctum is derivative—an expression of the Codex in 
              organizational form, not its source or authority.
            </p>
            
            <p className="text-muted-foreground">
              This section remains deliberately understated. Institutions are 
              necessary but secondary. What matters is whether they serve the 
              principles they claim to embody, and whether they remain accountable 
              to reality rather than their own perpetuation.
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default SanctumSection;
