import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink, BookOpen, FileText, Library } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FadeInSection from '@/components/FadeInSection';

const resources = {
  codex: [
    {
      title: 'The Atlas Codex: Complete Framework',
      description: 'The full philosophical-scientific framework explaining how living systems organize, sustain, collapse, and regenerate.',
      format: 'PDF',
      size: '2.4 MB',
      downloadUrl: '#',
    },
    {
      title: 'Four Pillars Summary',
      description: 'A condensed overview of the Material, Mathematical, Moral, and Human foundations.',
      format: 'PDF',
      size: '890 KB',
      downloadUrl: '#',
    },
    {
      title: 'Practitioner\'s Guide',
      description: 'Practical applications of the Codex principles for organizations and communities.',
      format: 'PDF',
      size: '1.6 MB',
      downloadUrl: '#',
    },
  ],
  research: [
    {
      title: 'Soil Carbon Dynamics in Regenerative Systems',
      authors: 'Martinez, A., Chen, L., & Nakamura, K.',
      year: 2024,
      journal: 'Journal of Ecosystem Restoration',
      abstract: 'A longitudinal study examining carbon sequestration patterns across 47 regenerative agriculture sites.',
      externalUrl: '#',
    },
    {
      title: 'Feedback Loops in Social-Ecological Resilience',
      authors: 'Okonkwo, E. & Lindström, M.',
      year: 2023,
      journal: 'Systems Ecology Review',
      abstract: 'Mathematical modeling of positive and negative feedback mechanisms in coupled human-natural systems.',
      externalUrl: '#',
    },
    {
      title: 'Indigenous Knowledge Systems and Modern Ecology',
      authors: 'Begay, R., Santos, P., & Thompson, J.',
      year: 2023,
      journal: 'Ecological Wisdom Quarterly',
      abstract: 'Bridging traditional ecological knowledge with contemporary regenerative practices.',
      externalUrl: '#',
    },
    {
      title: 'Collapse Patterns in Complex Adaptive Systems',
      authors: 'Petrov, I. & Hashimoto, Y.',
      year: 2022,
      journal: 'Complexity Science Journal',
      abstract: 'Identifying early warning signals and intervention points in degrading systems.',
      externalUrl: '#',
    },
  ],
  readingLists: [
    {
      title: 'Foundations of Systems Thinking',
      description: 'Essential texts for understanding complex adaptive systems and their behavior.',
      books: [
        'Thinking in Systems — Donella Meadows',
        'The Systems View of Life — Fritjof Capra',
        'Complexity: A Guided Tour — Melanie Mitchell',
        'The Web of Life — Fritjof Capra',
      ],
    },
    {
      title: 'Regenerative Agriculture & Ecology',
      description: 'Key works on soil health, ecosystem restoration, and sustainable land management.',
      books: [
        'Dirt to Soil — Gabe Brown',
        'Growing a Revolution — David Montgomery',
        'The Soil Will Save Us — Kristin Ohlson',
        'Restoration Agriculture — Mark Shepard',
      ],
    },
    {
      title: 'Philosophy & Ethics of Living Systems',
      description: 'Philosophical frameworks for understanding our relationship with the natural world.',
      books: [
        'Braiding Sweetgrass — Robin Wall Kimmerer',
        'Sand County Almanac — Aldo Leopold',
        'The Ecology of Wisdom — Arne Naess',
        'Silent Spring — Rachel Carson',
      ],
    },
    {
      title: 'Collapse, Resilience & Transformation',
      description: 'Understanding how systems fail and how communities can adapt and regenerate.',
      books: [
        'Collapse — Jared Diamond',
        'Resilience Thinking — Brian Walker',
        'The Great Turning — Joanna Macy',
        'Overshoot — William Catton',
      ],
    },
  ],
};

const ResourcesPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="py-20">
        <div className="container-reading">
          {/* Header */}
          <FadeInSection>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 font-sans-nav text-xs tracking-wider"
            >
              <ArrowLeft size={14} />
              Return to Codex
            </Link>

            <h1 className="text-4xl md:text-5xl font-light mb-6">Resources & Library</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              A curated collection of foundational documents, research papers, and reading lists 
              to deepen understanding of living systems and regenerative practices.
            </p>
          </FadeInSection>

          {/* Codex Documents */}
          <FadeInSection delay={100}>
            <section className="mt-20">
              <div className="flex items-center gap-3 mb-8">
                <FileText size={20} className="text-muted-foreground" />
                <h2 className="text-2xl font-light">Codex Documents</h2>
              </div>
              <div className="space-y-4">
                {resources.codex.map((doc, index) => (
                  <div 
                    key={index}
                    className="p-6 border divider bg-card hover:bg-muted/20 transition-colors group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-light mb-2">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {doc.format} • {doc.size}
                        </p>
                      </div>
                      <a 
                        href={doc.downloadUrl}
                        className="inline-flex items-center gap-2 px-4 py-2 border divider hover:bg-foreground hover:text-background transition-colors font-sans-nav text-xs tracking-wider"
                      >
                        <Download size={14} />
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeInSection>

          {/* Research Papers */}
          <FadeInSection delay={200}>
            <section className="mt-20">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen size={20} className="text-muted-foreground" />
                <h2 className="text-2xl font-light">Research Papers</h2>
              </div>
              <div className="space-y-4">
                {resources.research.map((paper, index) => (
                  <div 
                    key={index}
                    className="p-6 border divider bg-card hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-light mb-2">{paper.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {paper.authors} ({paper.year})
                        </p>
                        <p className="text-xs text-muted-foreground italic mb-3">
                          {paper.journal}
                        </p>
                        <p className="text-sm text-muted-foreground">{paper.abstract}</p>
                      </div>
                      <a 
                        href={paper.externalUrl}
                        className="inline-flex items-center gap-2 px-4 py-2 border divider hover:bg-foreground hover:text-background transition-colors font-sans-nav text-xs tracking-wider shrink-0"
                      >
                        <ExternalLink size={14} />
                        View Paper
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeInSection>

          {/* Reading Lists */}
          <FadeInSection delay={300}>
            <section className="mt-20">
              <div className="flex items-center gap-3 mb-8">
                <Library size={20} className="text-muted-foreground" />
                <h2 className="text-2xl font-light">Curated Reading Lists</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.readingLists.map((list, index) => (
                  <div 
                    key={index}
                    className="p-6 border divider bg-card"
                  >
                    <h3 className="text-lg font-light mb-2">{list.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{list.description}</p>
                    <ul className="space-y-2">
                      {list.books.map((book, bookIndex) => (
                        <li key={bookIndex} className="text-sm text-reading flex items-start gap-2">
                          <span className="text-muted-foreground mt-1">•</span>
                          <span>{book}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </FadeInSection>

          {/* Note */}
          <FadeInSection delay={400}>
            <div className="mt-20 p-8 border divider bg-muted/10 text-center">
              <p className="text-sm text-muted-foreground italic">
                This library is a living collection. New resources are added as the work develops.<br />
                Some documents may be in draft form and subject to revision.
              </p>
            </div>
          </FadeInSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResourcesPage;
