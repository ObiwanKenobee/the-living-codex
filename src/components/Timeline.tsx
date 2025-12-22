import { useState } from 'react';
import FadeInSection from './FadeInSection';

interface Milestone {
  year: string;
  title: string;
  description: string;
  category: 'founding' | 'research' | 'expansion' | 'publication';
}

const milestones: Milestone[] = [
  {
    year: '2018',
    title: 'The Seed',
    description: 'Initial research into regenerative systems begins. Early field notes explore patterns in ecological restoration.',
    category: 'founding'
  },
  {
    year: '2019',
    title: 'First Principles Emerge',
    description: 'The Four Pillars framework takes shape through synthesis of ecological, philosophical, and systems thinking traditions.',
    category: 'research'
  },
  {
    year: '2020',
    title: 'Foundation Established',
    description: 'Atlas Codex Foundation formally organized to advance understanding of living systems and regeneration.',
    category: 'founding'
  },
  {
    year: '2021',
    title: 'Habitat One Initiative',
    description: 'Physical research space established for applied experiments in regenerative practice.',
    category: 'expansion'
  },
  {
    year: '2022',
    title: 'Field Notes Archive',
    description: 'Public writings archive launched to share research findings and evolving understanding.',
    category: 'publication'
  },
  {
    year: '2023',
    title: 'The Sanctum Framework',
    description: 'Inner contemplative methodology developed to complement external regenerative work.',
    category: 'research'
  },
  {
    year: '2024',
    title: 'Global Correspondence',
    description: 'Network of aligned practitioners and researchers expands across continents.',
    category: 'expansion'
  },
  {
    year: '2025',
    title: 'Living Systems Codex',
    description: 'Comprehensive synthesis of research published as open-access resource for practitioners.',
    category: 'publication'
  }
];

const categoryColors: Record<string, string> = {
  founding: 'bg-primary',
  research: 'bg-accent',
  expansion: 'bg-secondary',
  publication: 'bg-muted-foreground'
};

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <FadeInSection key={milestone.year} delay={index * 100}>
            <div 
              className={`relative flex items-start gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Content */}
              <div className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div 
                  className={`p-6 bg-card border border-border transition-all duration-300 ${
                    activeIndex === index ? 'shadow-lg scale-[1.02]' : ''
                  }`}
                >
                  <p className="font-sans-nav text-xs text-muted-foreground tracking-wider mb-2">
                    {milestone.year}
                  </p>
                  <h3 className="text-xl font-light mb-2">{milestone.title}</h3>
                  <p className="text-sm text-reading leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                <div 
                  className={`w-3 h-3 rounded-full border-2 border-background transition-transform duration-300 ${
                    categoryColors[milestone.category]
                  } ${activeIndex === index ? 'scale-150' : ''}`}
                />
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </div>
          </FadeInSection>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-16 flex flex-wrap justify-center gap-6">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="font-sans-nav text-xs text-muted-foreground tracking-wider capitalize">
              {category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
