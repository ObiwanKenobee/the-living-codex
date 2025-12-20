import FadeInSection from './FadeInSection';

const values = [
  {
    title: "Humility before reality",
    description: "What exists precedes what we think. Our models are approximations, always subject to revision by observation."
  },
  {
    title: "Learning through making",
    description: "Theory without practice is incomplete. Understanding deepens through physical engagement with materials and systems."
  },
  {
    title: "Respect for limits",
    description: "Boundaries are not obstacles but the conditions that make flourishing possible. Systems that exceed their limits collapse."
  },
  {
    title: "Responsibility to future generations",
    description: "We inherit from those who came before. We owe to those who come after. This is not sentiment but structural necessity."
  }
];

const EthosSection = () => {
  return (
    <section id="ethos" className="section-spacing border-t divider bg-card">
      <div className="container-reading">
        <FadeInSection>
          <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
            VII
          </p>
          <h2 className="text-3xl md:text-4xl font-light mb-12">
            Ethos
          </h2>
        </FadeInSection>

        <div className="space-y-12">
          {values.map((value, index) => (
            <FadeInSection key={value.title} delay={index * 100}>
              <article>
                <h3 className="text-xl font-medium mb-3 text-foreground">
                  {value.title}
                </h3>
                <p className="prose-codex text-muted-foreground">
                  {value.description}
                </p>
              </article>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EthosSection;
