import diagramMathematical from '@/assets/diagram-mathematical.png';
import diagramMaterial from '@/assets/diagram-material.png';
import diagramHuman from '@/assets/diagram-human.png';
import diagramMoral from '@/assets/diagram-moral.png';
import FadeInSection from './FadeInSection';
import CollapsibleSection from './CollapsibleSection';

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
    expanded: [
      {
        subtitle: "Exponential & Logistic Growth",
        content: `Systems rarely grow forever. They accelerate, then encounter limits—resource 
          constraints, carrying capacities, systemic friction. The S-curve is universal: 
          from bacterial colonies to market adoption to forest succession.`
      },
      {
        subtitle: "Feedback Dynamics",
        content: `Positive feedback amplifies: erosion begets erosion, trust builds trust. 
          Negative feedback stabilizes: predator-prey oscillations, thermoregulation, 
          price corrections. Mastery lies in knowing which loops dominate when.`
      },
      {
        subtitle: "Threshold & Phase Transitions",
        content: `Systems tolerate stress until they don't. Ice becomes water. Ecosystems 
          flip states. Social contracts unravel. These transitions are often sudden and 
          irreversible—the mathematics of catastrophe theory made manifest.`
      }
    ],
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
    expanded: [
      {
        subtitle: "Soil as Foundation",
        content: `One gram of healthy soil contains more microorganisms than humans on Earth. 
          Soil is not dirt—it is a living system that took millennia to form. Its loss 
          is measured in civilizations: Mesopotamia, the Dust Bowl, the Sahel.`
      },
      {
        subtitle: "Water Cycles & Flows",
        content: `Water connects everything. Its movement through watersheds, aquifers, and 
          atmosphere determines where life can flourish. Understanding hydrology is 
          understanding the circulatory system of the planet.`
      },
      {
        subtitle: "Craft Knowledge",
        content: `Traditional builders knew materials through generations of failure and refinement. 
          This embodied knowledge—how timber seasons, how clay behaves, how stone weathers—
          cannot be fully captured in specifications. It lives in practice.`
      }
    ],
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
    expanded: [
      {
        subtitle: "Scale & Governance",
        content: `Dunbar's number suggests cognitive limits on community size. Beyond ~150, 
          different organizing principles emerge. Villages, cities, nations—each scale 
          requires different institutions, different kinds of trust.`
      },
      {
        subtitle: "Knowledge Transmission",
        content: `Education is not content delivery. It is the cultivation of judgment, the 
          transmission of tacit knowledge, the formation of character. Apprenticeship 
          models persist because they work—learning requires relationship.`
      },
      {
        subtitle: "Economic Metabolism",
        content: `Economies are metabolic systems: they consume, transform, and excrete. 
          Healthy economies recycle. Unhealthy ones accumulate waste and externalize costs. 
          The question is not growth versus degrowth, but throughput versus accumulation.`
      }
    ],
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
    expanded: [
      {
        subtitle: "Temporal Ethics",
        content: `Most ethical frameworks optimize for the present. But the present is thin—
          a knife-edge between past and future. Decisions that make sense in the short term 
          often produce suffering across generations. Long-termism is not idealism; it is realism.`
      },
      {
        subtitle: "The Commons",
        content: `Some things cannot be owned without being destroyed: air, water, fisheries, 
          knowledge. The tragedy of the commons is not inevitable—it results from specific 
          institutional failures. Successful commons require boundaries, monitoring, and voice.`
      },
      {
        subtitle: "Virtue as Practice",
        content: `Character is not given; it is cultivated through repeated action. The virtues 
          required for sustainable living—patience, restraint, attentiveness, care—are formed 
          through practice, not declaration. Moral architecture is built one habit at a time.`
      }
    ],
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
                  <div className="prose-codex space-y-4">
                    <p>{pillar.description}</p>
                    <p className="text-muted-foreground">{pillar.details}</p>
                    
                    {pillar.expanded && (
                      <div className="mt-8 pt-8 border-t divider space-y-2">
                        {pillar.expanded.map((item, i) => (
                          <CollapsibleSection 
                            key={item.subtitle} 
                            title={item.subtitle}
                            defaultOpen={i === 0}
                            variant="minimal"
                          >
                            <p className="text-sm text-muted-foreground">{item.content}</p>
                          </CollapsibleSection>
                        ))}
                      </div>
                    )}
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
