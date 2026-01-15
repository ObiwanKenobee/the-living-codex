import { useState } from 'react';
import FadeInSection from './FadeInSection';
import CollapsibleSection from './CollapsibleSection';

const values = [
  {
    title: "Humility before reality",
    description: "What exists precedes what we think. Our models are approximations, always subject to revision by observation.",
    elaboration: `The map is never the territory. Every theory, however elegant, is a simplification of 
      something more complex. This is not a weakness to overcome but a permanent condition to embrace. 
      The scientist who thinks their model is complete has become an ideologue. The practitioner who 
      ignores feedback from reality has become dangerous. True understanding requires holding our 
      certainties loosely, remaining perpetually open to correction.`,
    practices: [
      "Regular revision of assumptions based on new evidence",
      "Cultivation of observational skills before theoretical frameworks",
      "Willingness to say 'I don't know' and 'I was wrong'"
    ]
  },
  {
    title: "Learning through making",
    description: "Theory without practice is incomplete. Understanding deepens through physical engagement with materials and systems.",
    elaboration: `Knowledge lives in the hands as much as the mind. The carpenter knows wood in ways 
      no textbook can convey. The gardener reads soil through touch and smell. This embodied wisdom 
      cannot be downloaded or accelerated—it accumulates through thousands of hours of attentive 
      practice. We privilege making not as anti-intellectual, but as a deeper form of intelligence 
      that integrates mind, body, and material in a single act of understanding.`,
    practices: [
      "Direct physical work with natural materials",
      "Apprenticeship and mentorship relationships",
      "Documentation of failures as primary learning events"
    ]
  },
  {
    title: "Respect for limits",
    description: "Boundaries are not obstacles but the conditions that make flourishing possible. Systems that exceed their limits collapse.",
    elaboration: `Modern culture treats limits as problems to be overcome. This is a category error. 
      A river without banks is a flood. A body without skin is a wound. Constraints create form; 
      form enables function. The sustainable society is not one that transcends limits but one that 
      works within them gracefully. This requires knowing what can be expanded, what must be 
      maintained, and what must never be crossed—the difference between growth and metastasis.`,
    practices: [
      "Mapping of system carrying capacities before expansion",
      "Precautionary principle for irreversible decisions",
      "Celebration of sufficiency over maximization"
    ]
  },
  {
    title: "Responsibility to future generations",
    description: "We inherit from those who came before. We owe to those who come after. This is not sentiment but structural necessity.",
    elaboration: `We are links in a chain extending backward and forward through time. The soil we 
      farm was built by organisms over millennia. The institutions we inhabit were shaped by 
      ancestors we never knew. We are temporary stewards, not ultimate owners. Every decision we 
      make either enriches or depletes the inheritance we will leave. This temporal consciousness 
      is not about sacrifice but about expanding our sense of self to include those who cannot yet 
      speak for themselves.`,
    practices: [
      "Seven-generation thinking in major decisions",
      "Explicit accounting of externalities and deferred costs",
      "Investment in regenerative rather than extractive practices"
    ]
  },
  {
    title: "Coherence over consistency",
    description: "Living systems are not mechanical. Context matters. Wisdom lies in knowing when principles must yield to circumstances.",
    elaboration: `Rules are generalizations from past situations. But no two situations are identical. 
      Rigid application of principles can produce outcomes that violate their spirit. The wise person 
      holds multiple principles simultaneously, reading context to determine which should prevail. 
      This is not relativism—some things are always wrong. But it is recognition that moral life 
      requires judgment, not just compliance.`,
    practices: [
      "Case-based reasoning alongside principle-based reasoning",
      "Regular examination of unintended consequences",
      "Tolerance for productive ambiguity"
    ]
  },
  {
    title: "Presence over abstraction",
    description: "The particular precedes the general. Love for actual places and people grounds love for abstractions like 'nature' or 'humanity'.",
    elaboration: `It is easy to love humanity; it is harder to love your neighbor. Abstract 
      commitments that lack grounding in particular relationships become hollow or dangerous. 
      We begin where we are: with this watershed, this community, this craft. From these 
      particular attachments, broader understanding and care can grow organically. But the 
      reverse path—from abstract principle to local engagement—often fails.`,
    practices: [
      "Deep knowledge of one's immediate bioregion",
      "Long-term commitment to place over mobility",
      "Face-to-face relationships as the foundation of community"
    ]
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
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Ethos
          </h2>
          <p className="prose-codex text-muted-foreground mb-12">
            These are not rules to follow but orientations to embody. They emerge 
            from observation of what enables systems—ecological, social, personal—to 
            flourish over time.
          </p>
        </FadeInSection>

        <div className="space-y-16">
          {values.map((value, index) => (
            <FadeInSection key={value.title} delay={index * 100}>
              <article className="border-l-2 border-primary/20 pl-6">
                <h3 className="text-xl font-medium mb-3 text-foreground">
                  {value.title}
                </h3>
                <p className="prose-codex text-foreground/80 mb-4">
                  {value.description}
                </p>
                
                <CollapsibleSection title="Read More" variant="minimal" defaultOpen={index === 0}>
                  <div className="space-y-4">
                    <p className="prose-codex text-muted-foreground text-sm leading-relaxed">
                      {value.elaboration}
                    </p>
                    
                    {value.practices && (
                      <div className="mt-4 p-4 bg-background border divider">
                        <h4 className="text-xs font-sans-nav tracking-widest text-muted-foreground mb-3">
                          PRACTICES
                        </h4>
                        <ul className="space-y-2">
                          {value.practices.map((practice, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary/40 mt-1">•</span>
                              {practice}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CollapsibleSection>
              </article>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EthosSection;
