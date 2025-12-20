import diagramMathematical from '@/assets/diagram-mathematical.png';
import diagramMaterial from '@/assets/diagram-material.png';
import diagramHuman from '@/assets/diagram-human.png';
import diagramMoral from '@/assets/diagram-moral.png';
import FadeInSection from './FadeInSection';

const pillars = [
  {
    number: "II.i",
    title: "Mathematical Principles of Life",
    description: `Every living system operates according to patterns that can be 
      described mathematically—not as rigid formulas, but as tendencies and 
      relationships. Growth curves. Feedback loops. Thresholds beyond which 
      stability gives way to collapse or transformation.`,
    details: `These patterns appear at every scale: in cells, in forests, in 
      economies, in civilizations. Understanding them does not mean controlling 
      them. It means recognizing where a system stands in relation to its 
      natural boundaries.`,
    image: diagramMathematical,
    imageAlt: "Diagram showing growth curves and feedback loop patterns"
  },
  {
    number: "II.ii",
    title: "Material Expressions",
    description: `The physical world is the ground of all systems. Soil, water, 
      air, minerals, and the countless materials we shape from them. Matter 
      constrains what is possible and reveals what is sustainable.`,
    details: `We learn through making—through physical experimentation with 
      materials, through observation of natural processes, through the slow 
      accumulation of craft knowledge passed across generations. Theory without 
      material practice remains incomplete.`,
    image: diagramMaterial,
    imageAlt: "Cross-section diagram of soil layers and root systems"
  },
  {
    number: "II.iii",
    title: "Human Systems",
    description: `Communities, education, work, meaning—these are not separate 
      from natural systems but expressions of the same underlying principles. 
      Human societies organize themselves, maintain coherence, face thresholds, 
      and either adapt or decline.`,
    details: `The patterns that govern a watershed also govern a neighborhood. 
      The feedback loops that stabilize an ecosystem also stabilize a culture. 
      To build lasting human systems, we must understand their continuity with 
      the living world.`,
    image: diagramHuman,
    imageAlt: "Network diagram showing interconnected community relationships"
  },
  {
    number: "II.iv",
    title: "Moral Architecture",
    description: `Ethics is not separate from physics. How we treat the systems 
      we depend on determines whether those systems can continue to support us. 
      Stewardship is not sentiment—it is practical wisdom about cause and effect 
      across time.`,
    details: `We inherit from those who came before. We owe to those who come 
      after. Intergenerational responsibility is not an abstract ideal but a 
      structural requirement for any system that intends to persist. Limits are 
      not restrictions on freedom but the conditions that make freedom possible.`,
    image: diagramMoral,
    imageAlt: "Circular mandala pattern representing intergenerational cycles"
  }
];

const PillarsSection = () => {
  return (
    <section id="pillars" className="section-spacing border-t divider">
      <div className="container-wide">
        <FadeInSection>
          <div className="container-reading mx-auto mb-16">
            <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
              II
            </p>
            <h2 className="text-3xl md:text-4xl font-light mb-8">
              The Four Pillars
            </h2>
            <p className="prose-codex">
              The Codex rests on four foundational pillars—not as separate domains, 
              but as four perspectives on the same underlying reality.
            </p>
          </div>
        </FadeInSection>

        <div className="space-y-32">
          {pillars.map((pillar, index) => (
            <FadeInSection key={pillar.number} delay={index * 100}>
              <article 
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`container-reading mx-auto lg:mx-0 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <p className="font-sans-nav text-muted-foreground mb-3 tracking-widest">
                    {pillar.number}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-light mb-8">
                    {pillar.title}
                  </h3>
                  <div className="prose-codex">
                    <p>{pillar.description}</p>
                    <p className="text-muted-foreground">{pillar.details}</p>
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative mx-auto max-w-md lg:max-w-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none z-10" />
                    <img 
                      src={pillar.image} 
                      alt={pillar.imageAlt}
                      className="w-full h-auto opacity-80 mix-blend-multiply"
                      loading="lazy"
                    />
                  </div>
                </div>
              </article>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
