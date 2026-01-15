import FadeInSection from './FadeInSection';
import CollapsibleSection from './CollapsibleSection';
import HabitatTimeline from './HabitatTimeline';

const focusAreas = [
  {
    title: "Soil Regeneration",
    description: "Building living soil through composting, cover cropping, minimal tillage, and integration of animals. Measuring organic matter increase, microbial diversity, and water retention over multi-year cycles.",
    metrics: "Target: 1% organic matter increase per decade"
  },
  {
    title: "Water Systems",
    description: "Keyline design for water harvesting, constructed wetlands for greywater treatment, rainwater collection, and aquifer recharge. Understanding the site's hydrology before any intervention.",
    metrics: "Goal: Net positive water balance"
  },
  {
    title: "Perennial Food Production",
    description: "Food forests, perennial vegetables, nut trees, and integrated animal systems. Reducing annual inputs while increasing caloric and nutritional output over time.",
    metrics: "Horizon: 20-year establishment cycle"
  },
  {
    title: "Community Patterns",
    description: "Studying how small groups organize work, make decisions, resolve conflicts, and transmit knowledge. What institutional forms enable persistence across generations?",
    metrics: "Focus: Governance and succession"
  }
];

const principles = [
  "Start small, observe long, expand slowly",
  "Document failures more thoroughly than successes",
  "Let the land teach before imposing designs",
  "Build for the grandchildren of those not yet born",
  "Measure in decades, not quarters"
];

const HabitatSection = () => {
  return (
    <section id="habitat" className="section-spacing border-t divider bg-card">
      <div className="container-reading">
        <FadeInSection>
          <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
            III
          </p>
          <h2 className="text-3xl md:text-4xl font-light mb-12">
            Atlas Habitat One
          </h2>
        </FadeInSection>
        
        <FadeInSection delay={100}>
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

            <div className="mt-8 pt-8 border-t divider">
              <h3 className="text-xl font-medium mb-4">Site Philosophy</h3>
              <p className="text-muted-foreground">
                Every landscape has a genius—a pattern of flows, relationships, and 
                potentials that preceded human presence. Our task is not to impose 
                a vision but to read what is already written in the contours of the 
                land, the movement of water, the composition of soil, and the rhythm 
                of seasons. Only after years of observation do we begin to make changes, 
                and even then with humility about our understanding.
              </p>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="mt-16">
            <h3 className="text-xl font-medium mb-8">Current Focus Areas</h3>
            <div className="space-y-3">
              {focusAreas.map((area, index) => (
                <CollapsibleSection 
                  key={area.title} 
                  title={area.title} 
                  defaultOpen={index === 0}
                  variant="card"
                >
                  <p className="text-sm text-muted-foreground mb-4">{area.description}</p>
                  <p className="text-xs font-sans-nav tracking-wide text-primary/70">{area.metrics}</p>
                </CollapsibleSection>
              ))}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={300}>
          <div className="mt-16 p-8 border divider bg-background">
            <h3 className="text-lg font-medium mb-6 text-center">Operating Principles</h3>
            <ul className="space-y-3">
              {principles.map((principle, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-3">
                  <span className="text-primary/50 font-sans-nav text-xs mt-0.5">{String(index + 1).padStart(2, '0')}</span>
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </FadeInSection>

        <FadeInSection delay={400}>
          <div className="mt-16 prose-codex">
            <h3 className="text-xl font-medium mb-4">On Timescales</h3>
            <p className="text-muted-foreground">
              Modern projects measure success in months or quarters. Habitat One operates 
              on different timescales: the three-year cycle of soil building, the decade 
              required for a food forest to mature, the generation needed to establish 
              durable community patterns. We are planting trees whose shade we will never 
              enjoy, building institutions whose beneficiaries are not yet born.
            </p>
            <p className="text-muted-foreground mt-4">
              This is not patience as virtue but patience as method—the only approach 
              capable of producing outcomes that last. Quick results are often illusory, 
              their costs deferred to the future. We prefer slow results that compound.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={500}>
          <HabitatTimeline />
        </FadeInSection>
      </div>
    </section>
  );
};

export default HabitatSection;
