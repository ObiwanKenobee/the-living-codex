import FadeInSection from './FadeInSection';

const examples = [
  {
    title: "Wes Jackson and the Land Institute",
    description: "Perennial polyculture research spanning four decades—replacing annual monocultures with grain-producing ecosystems that mimic prairie dynamics."
  },
  {
    title: "Traditional Irrigation Systems",
    description: "The acequias of New Mexico, the qanat systems of Persia—water management designed for centuries, governed by communities rather than individuals."
  },
  {
    title: "Japanese Forest Bathing Reserves",
    description: "Forests protected not for timber extraction but for their relationship to human health and wellbeing, measured across generations."
  },
  {
    title: "The Mondragon Cooperatives",
    description: "Worker-owned enterprises in the Basque region, demonstrating economic structures designed for community stability rather than maximum extraction."
  }
];

const PracticeSection = () => {
  return (
    <section className="section-spacing border-t divider bg-card">
      <div className="container-wide">
        <FadeInSection>
          <div className="container-reading mx-auto mb-16">
            <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
              V
            </p>
            <h2 className="text-3xl md:text-4xl font-light mb-8">
              The Codex in Practice
            </h2>
            <p className="prose-codex">
              The principles described here are not new inventions. They have been 
              discovered and rediscovered throughout human history, in contexts 
              ranging from traditional agriculture to contemporary ecology. These 
              are some examples—not endorsements, but recognitions.
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {examples.map((example, index) => (
            <FadeInSection key={example.title} delay={index * 100}>
              <article className="p-6 border divider bg-background h-full">
                <h3 className="text-lg font-medium mb-3">
                  {example.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {example.description}
                </p>
              </article>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={400}>
          <div className="container-reading mx-auto mt-16 text-center">
            <p className="text-sm text-muted-foreground italic">
              What unites these examples is not ideology but pattern: regeneration, 
              restraint, and commitment to timescales longer than a single life.
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default PracticeSection;
