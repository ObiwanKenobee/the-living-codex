import FadeInSection from './FadeInSection';

const functions = [
  {
    title: "Knowledge Curation",
    description: "Gathering, organizing, and transmitting the accumulated wisdom from Habitat One and aligned projects. Creating resources that help others apply Codex principles in their own contexts."
  },
  {
    title: "Network Facilitation",
    description: "Connecting practitioners, researchers, and communities working on similar problems. Not a hierarchy but a web of relationships enabling mutual learning and support."
  },
  {
    title: "Resource Stewardship",
    description: "Managing funds, materials, and attention in service of the mission. Ensuring that resources flow to work that matters rather than to institutional overhead."
  },
  {
    title: "Standards & Assessment",
    description: "Developing criteria for evaluating whether practices align with principles. Not certification for its own sake, but honest feedback that enables improvement."
  }
];

const guardrails = [
  {
    principle: "Subsidiarity",
    description: "Decisions should be made at the lowest level capable of making them well. The center exists to serve the periphery, not to control it."
  },
  {
    principle: "Transparency",
    description: "Finances, governance, and decision-making processes are documented and accessible. Opacity breeds distrust and mission drift."
  },
  {
    principle: "Sunset Provisions",
    description: "All programs and positions have built-in review cycles. Nothing persists by inertia—only by continued demonstration of value."
  },
  {
    principle: "Mission Lock",
    description: "The core purpose cannot be amended by simple majority. Institutional capture is anticipated and guarded against structurally."
  }
];

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

        <FadeInSection delay={200}>
          <div className="mt-16">
            <h3 className="text-xl font-medium mb-4">The Problem of Institutions</h3>
            <div className="prose-codex space-y-4">
              <p className="text-muted-foreground">
                Institutions are necessary. Individuals die; communities disperse; 
                knowledge erodes without structures to preserve and transmit it. 
                But institutions are also dangerous. They develop interests distinct 
                from their stated purposes. They accumulate resources and resist 
                dissolution. They become ends rather than means.
              </p>
              <p className="text-muted-foreground">
                The challenge is to create institutions that remain accountable—to 
                their founding principles, to the communities they serve, and to 
                reality itself. This requires deliberate design: constraints that 
                prevent mission drift, transparency that enables accountability, 
                and sunset provisions that force periodic justification.
              </p>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={300}>
          <div className="mt-16">
            <h3 className="text-xl font-medium mb-8">Core Functions</h3>
            <div className="grid gap-6">
              {functions.map((func, index) => (
                <div key={func.title} className="flex gap-4 items-start">
                  <span className="text-primary/50 font-sans-nav text-xs mt-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="font-medium mb-2">{func.title}</h4>
                    <p className="text-sm text-muted-foreground">{func.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={400}>
          <div className="mt-16 p-8 border divider bg-card">
            <h3 className="text-lg font-medium mb-6">Structural Guardrails</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {guardrails.map((guardrail) => (
                <div key={guardrail.principle}>
                  <h4 className="font-medium text-sm mb-2">{guardrail.principle}</h4>
                  <p className="text-xs text-muted-foreground">{guardrail.description}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={500}>
          <div className="mt-16 prose-codex">
            <h3 className="text-xl font-medium mb-4">On Institutional Humility</h3>
            <p className="text-muted-foreground">
              The Sanctum does not claim special wisdom or authority. It is a 
              vehicle, not a destination. If it ever becomes an obstacle to the 
              principles it was created to serve—if it begins to prioritize its 
              own perpetuation over its mission—it should be reformed or dissolved.
            </p>
            <p className="text-muted-foreground mt-4">
              This is not a threat but a promise. Institutions that cannot imagine 
              their own ending tend to become immortal in the worst sense: persisting 
              long after their usefulness has passed, consuming resources better 
              directed elsewhere. We build with an eye toward graceful dissolution.
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default SanctumSection;
