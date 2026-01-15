import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import FadeInSection from '@/components/FadeInSection';

interface GlossaryTerm {
  term: string;
  definition: string;
  relatedTerms?: string[];
  category: 'principles' | 'practices' | 'places' | 'concepts';
}

const glossaryTerms: GlossaryTerm[] = [
  // Principles
  {
    term: "Carrying Capacity",
    definition: "The maximum population size of a species that an environment can sustain indefinitely. In human systems, this extends to economic, social, and ecological limits that cannot be exceeded without degradation.",
    relatedTerms: ["Limits", "Threshold", "Overshoot"],
    category: "principles"
  },
  {
    term: "Feedback Loop",
    definition: "A circular causal process where the output of a system influences its own input. Positive feedback amplifies change; negative feedback stabilizes. Understanding which loops dominate determines system behavior.",
    relatedTerms: ["Systems Thinking", "Exponential Growth", "Homeostasis"],
    category: "principles"
  },
  {
    term: "Threshold",
    definition: "A critical point at which a system shifts from one state to another, often irreversibly. Ecosystems, societies, and economies all exhibit threshold behavior—gradual stress followed by sudden transformation.",
    relatedTerms: ["Phase Transition", "Tipping Point", "Resilience"],
    category: "principles"
  },
  {
    term: "Subsidiarity",
    definition: "The principle that decisions should be made at the lowest capable level. Central authorities should only handle matters that cannot be effectively addressed locally. Power flows from periphery to center, not vice versa.",
    relatedTerms: ["Governance", "Decentralization", "Local Knowledge"],
    category: "principles"
  },
  {
    term: "Intergenerational Responsibility",
    definition: "The ethical obligation to consider the wellbeing of future generations in present decisions. What we inherit from ancestors we owe to descendants. This is structural necessity, not mere sentiment.",
    relatedTerms: ["Seven-Generation Thinking", "Stewardship", "Temporal Ethics"],
    category: "principles"
  },
  {
    term: "Coherence",
    definition: "Internal consistency of a system's parts working together toward shared purpose. Distinguished from mere consistency (rigid rule-following) by its responsiveness to context and circumstances.",
    relatedTerms: ["Integration", "Wholeness", "Pattern Language"],
    category: "principles"
  },

  // Practices
  {
    term: "Keyline Design",
    definition: "A water harvesting and land development technique that uses the natural topography to distribute water evenly across a landscape. Developed by P.A. Yeomans in Australia, it transforms erosion patterns into irrigation patterns.",
    relatedTerms: ["Water Harvesting", "Contour", "Hydrology"],
    category: "practices"
  },
  {
    term: "Food Forest",
    definition: "A designed agricultural ecosystem modeled on natural forest structure, with multiple layers of perennial plants producing food, medicine, fiber, and fuel. Once established, requires minimal inputs while providing abundant yields.",
    relatedTerms: ["Permaculture", "Perennial Agriculture", "Agroforestry"],
    category: "practices"
  },
  {
    term: "Cover Cropping",
    definition: "Planting crops primarily to protect and enrich soil rather than for harvest. Cover crops prevent erosion, fix nitrogen, add organic matter, and maintain soil biology during fallow periods.",
    relatedTerms: ["Soil Building", "Green Manure", "No-Till"],
    category: "practices"
  },
  {
    term: "Observational Practice",
    definition: "Sustained, attentive watching of natural systems before intervention. Years of observation precede design decisions. The land teaches those who listen; imposed designs often fail.",
    relatedTerms: ["Pattern Recognition", "Site Analysis", "Genius Loci"],
    category: "practices"
  },
  {
    term: "Apprenticeship",
    definition: "Learning through extended relationship with a skilled practitioner. Tacit knowledge—embodied wisdom that cannot be written down—transfers only through demonstration, practice, and correction over time.",
    relatedTerms: ["Mentorship", "Craft Knowledge", "Tacit Knowledge"],
    category: "practices"
  },

  // Places
  {
    term: "Habitat One",
    definition: "The first physical site where Codex principles are applied. A modest-scale research habitat operating on multi-decade timescales, focused on regenerative land practice, community patterns, and long-term observation.",
    relatedTerms: ["Atlas Codex", "Sanctum", "Research Site"],
    category: "places"
  },
  {
    term: "Atlas Sanctum",
    definition: "The institutional expression of the Codex—the organizational structure through which principles are translated into practice beyond Habitat One. Derivative of the Codex, not its source.",
    relatedTerms: ["Institution", "Governance", "Network"],
    category: "places"
  },
  {
    term: "Bioregion",
    definition: "A geographic area defined by natural boundaries—watersheds, mountain ranges, ecological zones—rather than political borders. The appropriate scale for understanding ecological and often social systems.",
    relatedTerms: ["Watershed", "Ecosystem", "Place-Based"],
    category: "places"
  },

  // Concepts
  {
    term: "Regenerative",
    definition: "Systems that restore, renew, and revitalize their own sources of energy and materials. Beyond sustainable (maintaining current state), regenerative practices actively improve conditions over time.",
    relatedTerms: ["Restoration", "Healing", "Net Positive"],
    category: "concepts"
  },
  {
    term: "Living Systems",
    definition: "Complex adaptive systems characterized by self-organization, emergence, feedback, and evolution. Includes biological organisms but extends to ecosystems, economies, cultures, and institutions that exhibit life-like properties.",
    relatedTerms: ["Complexity", "Emergence", "Adaptation"],
    category: "concepts"
  },
  {
    term: "The Commons",
    definition: "Resources that are shared by a community and cannot be privately owned without destruction of their value. Air, water, fisheries, knowledge, and language are commons. Require collective governance to persist.",
    relatedTerms: ["Tragedy of the Commons", "Collective Action", "Governance"],
    category: "concepts"
  },
  {
    term: "Stewardship",
    definition: "The responsible management of something entrusted to one's care. Implies temporary custody rather than ownership, accountability to future users, and priority of the thing's wellbeing over personal benefit.",
    relatedTerms: ["Care", "Responsibility", "Trusteeship"],
    category: "concepts"
  },
  {
    term: "Emergence",
    definition: "Properties that arise from complex interactions but cannot be predicted from the properties of individual components. Consciousness emerges from neurons; culture emerges from individuals; ecosystems emerge from species.",
    relatedTerms: ["Complexity", "Self-Organization", "Holism"],
    category: "concepts"
  },
  {
    term: "Tacit Knowledge",
    definition: "Knowledge that cannot be fully articulated or transferred through verbal instruction. The carpenter's feel for wood, the farmer's reading of weather, the craftsperson's embodied skill. Acquired only through practice.",
    relatedTerms: ["Embodied Knowledge", "Craft", "Skill"],
    category: "concepts"
  },
  {
    term: "Pattern Language",
    definition: "A structured method of describing good design practices within a domain. Each pattern describes a problem and a solution that can be used repeatedly. Patterns connect to form a language of design.",
    relatedTerms: ["Design Patterns", "Christopher Alexander", "Wholeness"],
    category: "concepts"
  },
  {
    term: "Seven-Generation Thinking",
    definition: "Decision-making framework considering impacts across seven generations—three past, the present, and three future. Derived from Haudenosaunee (Iroquois) philosophy. Expands temporal horizon of responsibility.",
    relatedTerms: ["Long-Term Thinking", "Intergenerational", "Indigenous Wisdom"],
    category: "concepts"
  }
];

const categoryLabels: Record<string, string> = {
  principles: "Principles",
  practices: "Practices",
  places: "Places",
  concepts: "Concepts"
};

const GlossaryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !activeCategory || term.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const firstLetter = term.term[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(term);
    return acc;
  }, {} as Record<string, GlossaryTerm[]>);

  const sortedLetters = Object.keys(groupedTerms).sort();

  return (
    <div className="min-h-screen bg-background">
      <div className="container-reading py-24">
        <FadeInSection>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span className="font-sans-nav text-sm">Back to Codex</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-light mb-4">Glossary</h1>
          <p className="prose-codex text-muted-foreground mb-12">
            Key terms and concepts used throughout the Living Codex. Each definition
            aims for precision without sacrificing accessibility.
          </p>
        </FadeInSection>

        <FadeInSection delay={100}>
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1 text-xs font-sans-nav tracking-wider transition-colors border ${
                  !activeCategory 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-transparent text-muted-foreground border-border hover:border-foreground'
                }`}
              >
                All
              </button>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                  className={`px-3 py-1 text-xs font-sans-nav tracking-wider transition-colors border ${
                    activeCategory === key 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-transparent text-muted-foreground border-border hover:border-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          {/* Alphabet navigation */}
          <div className="flex flex-wrap gap-1 mb-8 pb-4 border-b divider">
            {sortedLetters.map(letter => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-8 h-8 flex items-center justify-center text-sm font-sans-nav text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>

          {/* Terms */}
          <div className="space-y-12">
            {sortedLetters.map(letter => (
              <div key={letter} id={`letter-${letter}`}>
                <h2 className="text-2xl font-light mb-6 pb-2 border-b divider">{letter}</h2>
                <div className="space-y-8">
                  {groupedTerms[letter].map(term => (
                    <article key={term.term} className="group">
                      <div className="flex items-start gap-4">
                        <span className="px-2 py-0.5 text-[10px] font-sans-nav tracking-widest text-muted-foreground bg-muted capitalize">
                          {term.category}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium mb-2">{term.term}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {term.definition}
                          </p>
                          {term.relatedTerms && term.relatedTerms.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              <span className="text-xs text-muted-foreground/60">See also:</span>
                              {term.relatedTerms.map(related => (
                                <span 
                                  key={related} 
                                  className="text-xs text-primary/70 hover:text-primary cursor-pointer"
                                >
                                  {related}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No terms found matching your search.
            </p>
          )}
        </FadeInSection>
      </div>
    </div>
  );
};

export default GlossaryPage;
