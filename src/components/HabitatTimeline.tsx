import { useState } from 'react';
import FadeInSection from './FadeInSection';

interface Phase {
  period: string;
  title: string;
  description: string;
  milestones: string[];
  status: 'completed' | 'active' | 'future';
}

const phases: Phase[] = [
  {
    period: "2020–2023",
    title: "Foundation & Observation",
    description: "Establishing baseline understanding of the site. Minimal intervention while gathering data on water flows, soil composition, existing ecology, and seasonal patterns.",
    milestones: [
      "Comprehensive site mapping and soil analysis",
      "Hydrological survey and water pattern documentation",
      "Species inventory of existing flora and fauna",
      "Initial infrastructure: access, shelter, water collection"
    ],
    status: "completed"
  },
  {
    period: "2023–2028",
    title: "Soil Building & Water Infrastructure",
    description: "Active regeneration of degraded soils through composting, cover cropping, and organic matter accumulation. Installation of keyline water systems.",
    milestones: [
      "Keyline design implementation across primary contours",
      "Composting systems at scale",
      "Cover crop rotation established",
      "Greywater treatment wetlands constructed",
      "Target: 0.5% organic matter increase"
    ],
    status: "active"
  },
  {
    period: "2028–2035",
    title: "Perennial Systems Establishment",
    description: "Planting of food forests, perennial polycultures, and integration of animals into the system. Long-term production begins to emerge.",
    milestones: [
      "Food forest planting: 500+ perennial species",
      "Integration of poultry and small ruminants",
      "Perennial vegetable gardens established",
      "First significant harvests from tree crops"
    ],
    status: "future"
  },
  {
    period: "2035–2045",
    title: "Maturation & Community Patterns",
    description: "Food forest reaches productive maturity. Focus shifts toward community governance, knowledge transmission, and institutional development.",
    milestones: [
      "Food forest self-sustaining with minimal inputs",
      "Apprenticeship programs formalized",
      "Community governance structures tested",
      "Documentation and pattern codification"
    ],
    status: "future"
  },
  {
    period: "2045–2060",
    title: "Generational Transition",
    description: "Transfer of stewardship to next generation. Emphasis on succession planning, knowledge preservation, and institutional resilience.",
    milestones: [
      "Next generation stewards identified and trained",
      "Legal and governance succession complete",
      "Living archive of practices established",
      "Replication at additional sites begins"
    ],
    status: "future"
  },
  {
    period: "2060+",
    title: "Long-Term Stewardship",
    description: "Mature ecosystem management focused on maintenance, adaptation to changing conditions, and continuous learning. The work continues indefinitely.",
    milestones: [
      "Multi-generational community established",
      "Climate adaptation strategies implemented",
      "Regional network of aligned habitats",
      "Contribution to global knowledge commons"
    ],
    status: "future"
  }
];

const statusColors: Record<string, { bg: string; border: string; text: string }> = {
  completed: { bg: 'bg-primary/10', border: 'border-primary', text: 'text-primary' },
  active: { bg: 'bg-accent/10', border: 'border-accent', text: 'text-accent-foreground' },
  future: { bg: 'bg-muted', border: 'border-border', text: 'text-muted-foreground' }
};

const HabitatTimeline = () => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  return (
    <div className="mt-16">
      <h3 className="text-xl font-medium mb-8">Multi-Decade Development Timeline</h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-4 bottom-4 w-px bg-border" />

        <div className="space-y-6">
          {phases.map((phase, index) => {
            const colors = statusColors[phase.status];
            const isExpanded = expandedPhase === index;

            return (
              <FadeInSection key={phase.period} delay={index * 50}>
                <div className="relative pl-8">
                  {/* Timeline dot */}
                  <div 
                    className={`absolute left-0 top-2 w-4 h-4 rounded-full border-2 ${colors.border} ${
                      phase.status === 'completed' ? 'bg-primary' : 
                      phase.status === 'active' ? 'bg-accent animate-pulse' : 'bg-background'
                    }`}
                  />

                  <button
                    onClick={() => setExpandedPhase(isExpanded ? null : index)}
                    className={`w-full text-left p-6 border transition-all duration-300 ${colors.border} ${
                      isExpanded ? colors.bg : 'bg-background hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <span className="font-sans-nav text-xs tracking-widest text-muted-foreground">
                        {phase.period}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-sans-nav tracking-widest uppercase ${colors.text} ${colors.bg} border ${colors.border}`}>
                        {phase.status}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-medium mb-2">{phase.title}</h4>
                    
                    <p className="text-sm text-muted-foreground">
                      {phase.description}
                    </p>

                    {isExpanded && (
                      <div className="mt-6 pt-4 border-t border-border/50">
                        <p className="text-xs font-sans-nav tracking-widest text-muted-foreground mb-3">
                          KEY MILESTONES
                        </p>
                        <ul className="space-y-2">
                          {phase.milestones.map((milestone, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${
                                phase.status === 'completed' ? 'bg-primary' :
                                phase.status === 'active' ? 'bg-accent' : 'bg-border'
                              }`} />
                              {milestone}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </button>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>

      <div className="mt-8 p-4 bg-muted/50 border divider">
        <p className="text-xs text-muted-foreground text-center">
          Timeline represents intention, not prediction. All phases subject to revision 
          based on what the land teaches and what circumstances allow.
        </p>
      </div>
    </div>
  );
};

export default HabitatTimeline;
