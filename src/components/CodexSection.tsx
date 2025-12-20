const CodexSection = () => {
  return (
    <section id="codex" className="section-spacing border-t divider">
      <div className="container-reading">
        <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
          I
        </p>
        <h2 className="text-3xl md:text-4xl font-light mb-12">
          The Codex
        </h2>
        
        <div className="prose-codex space-y-6">
          <p>
            The Atlas Codex is not an invention in the ordinary sense. It is an 
            attempt to describe what already exists—the underlying patterns by 
            which living systems organize themselves, persist through time, and 
            either flourish or collapse.
          </p>
          
          <p>
            It precedes institutions, technologies, and economies. These are 
            expressions of deeper principles, not their source. The Codex seeks 
            to articulate those principles in mathematical and ethical terms, 
            grounded in observation rather than ideology.
          </p>
          
          <p>
            This is a living reference. It evolves through careful observation, 
            physical experimentation, and the humility to be wrong. What is 
            written here today may be refined tomorrow as our understanding 
            deepens through reality-testing.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t divider">
          <p className="text-sm text-muted-foreground italic text-center">
            The map is not the territory, but a good map helps us navigate.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CodexSection;
