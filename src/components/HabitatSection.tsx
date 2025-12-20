const HabitatSection = () => {
  return (
    <section id="habitat" className="section-spacing border-t divider bg-card">
      <div className="container-reading">
        <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
          III
        </p>
        <h2 className="text-3xl md:text-4xl font-light mb-12">
          Atlas Habitat One
        </h2>
        
        <div className="prose-codex space-y-6">
          <p>
            The Codex cannot remain theoretical. It must be tested against 
            reality—against soil, weather, community, time, and the countless 
            variables that theory cannot anticipate.
          </p>
          
          <p>
            Atlas Habitat One is the first physical site where these principles 
            are being applied. It is modest in scale, deliberately so. The time 
            horizon is long—measured in decades, not quarters. The primary mode 
            is learning through failure.
          </p>
          
          <p className="text-muted-foreground">
            This is a habitat, not a demonstration. It exists for the work itself, 
            not for observation. Visitors are rare. Documentation is internal. 
            What matters is what the land teaches, and whether we are capable of 
            listening.
          </p>
        </div>

        <div className="mt-16 p-8 border divider">
          <p className="text-sm text-muted-foreground text-center">
            Current focus: soil regeneration, water systems, perennial food 
            production, and the patterns by which small communities persist.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HabitatSection;
