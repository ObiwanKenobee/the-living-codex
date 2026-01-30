// Centralized searchable content for the Codex
export interface SearchableItem {
  id: string;
  title: string;
  content: string;
  section: string;
  href: string;
  type: 'section' | 'glossary' | 'pillar' | 'ethos' | 'habitat' | 'sanctum';
}

export const codexSearchContent: SearchableItem[] = [
  // The Codex
  {
    id: 'codex-main',
    title: 'The Codex',
    content: 'The Atlas Codex is not an invention in the ordinary sense. It is an attempt to describe what already exists—the underlying patterns by which living systems organize themselves, persist through time, and either flourish or collapse. It precedes institutions, technologies, and economies. These are expressions of deeper principles, not their source. The Codex seeks to articulate those principles in mathematical and ethical terms, grounded in observation rather than ideology.',
    section: 'Core Framework',
    href: '/#codex',
    type: 'section'
  },
  
  // Four Pillars
  {
    id: 'pillar-mathematical',
    title: 'Mathematical Principles of Life',
    content: 'All living systems share underlying mathematical patterns—growth curves, feedback loops, thresholds, and phase transitions. Understanding these patterns allows us to recognize when systems are flourishing, stressed, or approaching collapse. Topics include carrying capacity, exponential growth, feedback dynamics, and phase transitions.',
    section: 'Four Pillars',
    href: '/#pillars',
    type: 'pillar'
  },
  {
    id: 'pillar-material',
    title: 'Material Expressions',
    content: 'Theory without physical testing remains speculation. This pillar grounds the Codex in direct experimentation with soil, water, materials, and living organisms. We learn through making. The hands discover what the mind overlooks. Every material has its own logic; our task is to perceive and work within that logic.',
    section: 'Four Pillars',
    href: '/#pillars',
    type: 'pillar'
  },
  {
    id: 'pillar-human',
    title: 'Human Systems',
    content: 'Communities, education, work, and meaning-making follow the same patterns as other living systems. They can be organized to flourish or structured in ways that guarantee decline. The Codex examines how human systems maintain coherence, transmit knowledge across generations, and balance individual and collective needs.',
    section: 'Four Pillars',
    href: '/#pillars',
    type: 'pillar'
  },
  {
    id: 'pillar-moral',
    title: 'Moral Architecture',
    content: 'Understanding without ethics is dangerous. This pillar addresses stewardship, responsibility, limits, and our obligations to those who will inherit what we leave behind. This is not moralism but architecture—the structural requirements for systems that can persist across generations.',
    section: 'Four Pillars',
    href: '/#pillars',
    type: 'pillar'
  },
  
  // Habitat One
  {
    id: 'habitat-main',
    title: 'Atlas Habitat One',
    content: 'Habitat One is a modest physical site where the Codex is tested against reality. It is not a demonstration project or a showcase. It is a place of learning through failure and observation across seasons and years. The habitat operates on a long time horizon measuring success in decades, not quarters.',
    section: 'Physical Manifestations',
    href: '/#habitat',
    type: 'habitat'
  },
  {
    id: 'habitat-land',
    title: 'Land & Ecology',
    content: 'Regenerative agriculture and permaculture design. Working with natural patterns to restore soil health, water cycles, and biodiversity. Keyline design for water harvesting, food forests, cover cropping, and ecological observation.',
    section: 'Habitat One',
    href: '/#habitat',
    type: 'habitat'
  },
  {
    id: 'habitat-materials',
    title: 'Materials & Making',
    content: 'Traditional crafts and natural building techniques. Working with local materials to develop practical skills. Natural building with earth, timber, and stone. Craft workshops for woodworking, metalworking, and textiles.',
    section: 'Habitat One',
    href: '/#habitat',
    type: 'habitat'
  },
  {
    id: 'habitat-community',
    title: 'Community Patterns',
    content: 'Governance structures, decision-making processes, and social organization. How groups maintain coherence while allowing individual flourishing. Consensus building, conflict resolution, and knowledge transmission.',
    section: 'Habitat One',
    href: '/#habitat',
    type: 'habitat'
  },
  {
    id: 'habitat-education',
    title: 'Education & Knowledge',
    content: 'Apprenticeship models, documentation practices, and the preservation of tacit knowledge. Learning through direct engagement with skilled practitioners across disciplines.',
    section: 'Habitat One',
    href: '/#habitat',
    type: 'habitat'
  },
  
  // Atlas Sanctum
  {
    id: 'sanctum-main',
    title: 'Atlas Sanctum',
    content: 'Atlas Sanctum is the applied arm that may eventually emerge from the Codex—an institution devoted to implementing these principles in the world. It is secondary to the Codex itself. The framework comes first; institutions follow.',
    section: 'Physical Manifestations',
    href: '/#sanctum',
    type: 'sanctum'
  },
  {
    id: 'sanctum-research',
    title: 'Research Function',
    content: 'Long-term observation programs, data collection, and pattern documentation. Multi-generational research spanning decades with rigorous methodology.',
    section: 'Atlas Sanctum',
    href: '/#sanctum',
    type: 'sanctum'
  },
  {
    id: 'sanctum-education',
    title: 'Education Function',
    content: 'Apprenticeship programs, visiting scholars, and knowledge transmission. Training the next generation of practitioners and thinkers.',
    section: 'Atlas Sanctum',
    href: '/#sanctum',
    type: 'sanctum'
  },
  {
    id: 'sanctum-network',
    title: 'Network Function',
    content: 'Connecting practitioners, sharing learnings, and building alliances. Creating a distributed community of aligned individuals and organizations.',
    section: 'Atlas Sanctum',
    href: '/#sanctum',
    type: 'sanctum'
  },
  {
    id: 'sanctum-archive',
    title: 'Archive Function',
    content: 'Preserving knowledge, documenting practices, and maintaining institutional memory. Ensuring that learnings persist beyond individual lifetimes.',
    section: 'Atlas Sanctum',
    href: '/#sanctum',
    type: 'sanctum'
  },
  
  // Ethos
  {
    id: 'ethos-humility',
    title: 'Humility Before Reality',
    content: 'What we think we know is always provisional. Reality is the teacher; we are students. No theory survives contact with the real world unchanged. We must be willing to revise our understanding when evidence demands it.',
    section: 'Ethos',
    href: '/#ethos',
    type: 'ethos'
  },
  {
    id: 'ethos-limits',
    title: 'Respect for Limits',
    content: 'Every system has boundaries. Working within limits is not constraint but wisdom. Understanding carrying capacity, thresholds, and boundaries is essential for sustainable practice.',
    section: 'Ethos',
    href: '/#ethos',
    type: 'ethos'
  },
  {
    id: 'ethos-making',
    title: 'Learning Through Making',
    content: 'Understanding develops through physical engagement, not abstract study alone. The hands discover what the mind overlooks. Theory must be tested against material reality.',
    section: 'Ethos',
    href: '/#ethos',
    type: 'ethos'
  },
  {
    id: 'ethos-future',
    title: 'Responsibility to Future Generations',
    content: 'We are temporary stewards. Our choices shape what others will inherit. Seven-generation thinking requires considering the long-term consequences of our actions.',
    section: 'Ethos',
    href: '/#ethos',
    type: 'ethos'
  },
  {
    id: 'ethos-observation',
    title: 'Observation Before Intervention',
    content: 'Understanding precedes action. Patient observation reveals patterns that hasty intervention obscures. Years of watching before acting leads to wiser choices.',
    section: 'Ethos',
    href: '/#ethos',
    type: 'ethos'
  },
  {
    id: 'ethos-coherence',
    title: 'Coherence Over Consistency',
    content: 'Living systems require adaptation, not rigid rule-following. Principles must be interpreted contextually. What works in one situation may fail in another.',
    section: 'Ethos',
    href: '/#ethos',
    type: 'ethos'
  },

  // Glossary terms
  {
    id: 'glossary-carrying-capacity',
    title: 'Carrying Capacity',
    content: 'The maximum population size of a species that an environment can sustain indefinitely. In human systems, this extends to economic, social, and ecological limits that cannot be exceeded without degradation.',
    section: 'Glossary',
    href: '/glossary#letter-C',
    type: 'glossary'
  },
  {
    id: 'glossary-feedback-loop',
    title: 'Feedback Loop',
    content: 'A circular causal process where the output of a system influences its own input. Positive feedback amplifies change; negative feedback stabilizes.',
    section: 'Glossary',
    href: '/glossary#letter-F',
    type: 'glossary'
  },
  {
    id: 'glossary-threshold',
    title: 'Threshold',
    content: 'A critical point at which a system shifts from one state to another, often irreversibly. Ecosystems, societies, and economies all exhibit threshold behavior.',
    section: 'Glossary',
    href: '/glossary#letter-T',
    type: 'glossary'
  },
  {
    id: 'glossary-subsidiarity',
    title: 'Subsidiarity',
    content: 'The principle that decisions should be made at the lowest capable level. Central authorities should only handle matters that cannot be effectively addressed locally.',
    section: 'Glossary',
    href: '/glossary#letter-S',
    type: 'glossary'
  },
  {
    id: 'glossary-regenerative',
    title: 'Regenerative',
    content: 'Systems that restore, renew, and revitalize their own sources of energy and materials. Beyond sustainable, regenerative practices actively improve conditions over time.',
    section: 'Glossary',
    href: '/glossary#letter-R',
    type: 'glossary'
  },
  {
    id: 'glossary-living-systems',
    title: 'Living Systems',
    content: 'Complex adaptive systems characterized by self-organization, emergence, feedback, and evolution. Includes biological organisms, ecosystems, economies, cultures, and institutions.',
    section: 'Glossary',
    href: '/glossary#letter-L',
    type: 'glossary'
  },
  {
    id: 'glossary-commons',
    title: 'The Commons',
    content: 'Resources that are shared by a community and cannot be privately owned without destruction of their value. Air, water, fisheries, knowledge, and language are commons.',
    section: 'Glossary',
    href: '/glossary#letter-T',
    type: 'glossary'
  },
  {
    id: 'glossary-stewardship',
    title: 'Stewardship',
    content: 'The responsible management of something entrusted to one\'s care. Implies temporary custody rather than ownership, and accountability to future users.',
    section: 'Glossary',
    href: '/glossary#letter-S',
    type: 'glossary'
  },
  {
    id: 'glossary-emergence',
    title: 'Emergence',
    content: 'Properties that arise from complex interactions but cannot be predicted from the properties of individual components. Consciousness emerges from neurons; culture emerges from individuals.',
    section: 'Glossary',
    href: '/glossary#letter-E',
    type: 'glossary'
  },
  {
    id: 'glossary-tacit-knowledge',
    title: 'Tacit Knowledge',
    content: 'Knowledge that cannot be fully articulated or transferred through verbal instruction. The carpenter\'s feel for wood, the farmer\'s reading of weather. Acquired only through practice.',
    section: 'Glossary',
    href: '/glossary#letter-T',
    type: 'glossary'
  },
  {
    id: 'glossary-pattern-language',
    title: 'Pattern Language',
    content: 'A structured method of describing good design practices within a domain. Each pattern describes a problem and a solution that can be used repeatedly.',
    section: 'Glossary',
    href: '/glossary#letter-P',
    type: 'glossary'
  },
  {
    id: 'glossary-seven-generation',
    title: 'Seven-Generation Thinking',
    content: 'Decision-making framework considering impacts across seven generations—three past, the present, and three future. Derived from Haudenosaunee philosophy.',
    section: 'Glossary',
    href: '/glossary#letter-S',
    type: 'glossary'
  },
  {
    id: 'glossary-keyline',
    title: 'Keyline Design',
    content: 'A water harvesting and land development technique that uses natural topography to distribute water evenly across a landscape. Developed by P.A. Yeomans.',
    section: 'Glossary',
    href: '/glossary#letter-K',
    type: 'glossary'
  },
  {
    id: 'glossary-food-forest',
    title: 'Food Forest',
    content: 'A designed agricultural ecosystem modeled on natural forest structure, with multiple layers of perennial plants producing food, medicine, fiber, and fuel.',
    section: 'Glossary',
    href: '/glossary#letter-F',
    type: 'glossary'
  },
  {
    id: 'glossary-bioregion',
    title: 'Bioregion',
    content: 'A geographic area defined by natural boundaries—watersheds, mountain ranges, ecological zones—rather than political borders. The appropriate scale for ecological systems.',
    section: 'Glossary',
    href: '/glossary#letter-B',
    type: 'glossary'
  }
];
