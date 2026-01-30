import { FileDown } from 'lucide-react';
import { useSectionBookmarks, SectionBookmark } from '@/hooks/useSectionBookmarks';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Content data for generating full PDF content
const sectionContent: Record<string, { title: string; content: string }> = {
  codex: {
    title: 'The Codex',
    content: `The Atlas Codex is not an invention in the ordinary sense. It is an attempt to describe what already exists—the underlying patterns by which living systems organize themselves, persist through time, and either flourish or collapse.

It precedes institutions, technologies, and economies. These are expressions of deeper principles, not their source. The Codex seeks to articulate those principles in mathematical and ethical terms, grounded in observation rather than ideology.

This is a living reference. It evolves through careful observation, physical experimentation, and the humility to be wrong. What is written here today may be refined tomorrow as our understanding deepens through reality-testing.`
  },
  pillars: {
    title: 'The Four Pillars',
    content: `Mathematical Principles of Life: All living systems share underlying mathematical patterns—growth curves, feedback loops, thresholds, and phase transitions. Understanding these patterns allows us to recognize when systems are flourishing, stressed, or approaching collapse.

Material Expressions: Theory without physical testing remains speculation. This pillar grounds the Codex in direct experimentation with soil, water, materials, and living organisms. We learn through making.

Human Systems: Communities, education, work, and meaning-making follow the same patterns as other living systems. They can be organized to flourish or structured in ways that guarantee decline.

Moral Architecture: Understanding without ethics is dangerous. This pillar addresses stewardship, responsibility, limits, and our obligations to those who will inherit what we leave behind.`
  },
  habitat: {
    title: 'Atlas Habitat One',
    content: `Habitat One is a modest physical site where the Codex is tested against reality. It is not a demonstration project or a showcase. It is a place of learning through failure and observation across seasons and years.

The habitat operates on a long time horizon. We measure success in decades, not quarters. We expect most initial approaches to require revision. The purpose is understanding, not performance.

Focus Areas: Land & Ecology (regenerative agriculture, permaculture design), Materials & Making (traditional crafts, natural building), Community Patterns (governance, decision-making), Education & Knowledge (apprenticeship, documentation).`
  },
  sanctum: {
    title: 'Atlas Sanctum',
    content: `Atlas Sanctum is the applied arm that may eventually emerge from the Codex—an institution devoted to implementing these principles in the world. It is secondary to the Codex itself.

The framework comes first; institutions follow. Many efforts fail because they build institutions before understanding the principles those institutions should embody.

Core Functions: Research (long-term observation, documentation), Education (apprenticeship, knowledge transmission), Network (connecting practitioners, building alliances), Archive (preserving knowledge, maintaining institutional memory).`
  },
  practice: {
    title: 'The Practice',
    content: `The Practice section describes how the principles of the Codex are applied in daily life and work. It bridges theory and action, providing guidance for those who wish to embody these principles.

Key elements include: observation before intervention, working with natural patterns, respecting limits, learning through making, and maintaining long-term perspective in all decisions.`
  },
  writings: {
    title: 'Field Notes',
    content: `The Field Notes section contains ongoing observations, reflections, and learnings from the application of Codex principles. These writings document the journey of understanding and the evolution of practice over time.

Topics include reflections on land stewardship, community building, craft practice, and the challenges of living according to these principles in the modern world.`
  },
  ethos: {
    title: 'Ethos',
    content: `Humility Before Reality: What we think we know is always provisional. Reality is the teacher; we are students.

Respect for Limits: Every system has boundaries. Working within limits is not constraint but wisdom.

Learning Through Making: Understanding develops through physical engagement, not abstract study alone.

Responsibility to Future Generations: We are temporary stewards. Our choices shape what others will inherit.

Observation Before Intervention: Understanding precedes action. Patient observation reveals patterns that hasty intervention obscures.

Coherence Over Consistency: Living systems require adaptation, not rigid rule-following.`
  }
};

interface BookmarkExportProps {
  bookmarks: SectionBookmark[];
}

const BookmarkExport = ({ bookmarks }: BookmarkExportProps) => {
  const generatePDF = () => {
    if (bookmarks.length === 0) {
      toast.error('No bookmarks to export');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow pop-ups to export PDF');
      return;
    }

    // Group bookmarks by section
    const groupedBookmarks = bookmarks.reduce((acc, bookmark) => {
      const key = bookmark.section;
      if (!acc[key]) acc[key] = [];
      acc[key].push(bookmark);
      return acc;
    }, {} as Record<string, SectionBookmark[]>);

    const sectionsHTML = Object.entries(groupedBookmarks)
      .map(([section, items]) => {
        const itemsHTML = items
          .map(item => {
            const content = sectionContent[item.id];
            return `
              <div class="bookmark-item">
                <h3>${item.title}</h3>
                ${content ? `<div class="content">${content.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}</div>` : '<p class="no-content"><em>Content available in the full Codex</em></p>'}
              </div>
            `;
          })
          .join('');

        return `
          <div class="section">
            <h2>${section}</h2>
            ${itemsHTML}
          </div>
        `;
      })
      .join('');

    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>My Atlas Codex Bookmarks</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
          
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body {
            font-family: 'Crimson Pro', Georgia, serif;
            font-size: 11pt;
            line-height: 1.7;
            color: #2c2c2c;
            max-width: 6.5in;
            margin: 0 auto;
            padding: 0.75in;
          }
          
          .header {
            text-align: center;
            margin-bottom: 0.5in;
            padding-bottom: 0.25in;
            border-bottom: 1px solid #d4d0c8;
          }
          
          h1 {
            font-size: 22pt;
            font-weight: 300;
            margin-bottom: 0.1in;
          }
          
          .subtitle {
            font-size: 11pt;
            color: #6b6b6b;
            font-style: italic;
          }
          
          .section {
            margin-bottom: 0.4in;
            page-break-inside: avoid;
          }
          
          h2 {
            font-size: 14pt;
            font-weight: 400;
            margin-bottom: 0.15in;
            color: #4a4a4a;
            padding-bottom: 0.08in;
            border-bottom: 1px solid #e8e4dc;
          }
          
          .bookmark-item {
            margin-bottom: 0.25in;
            padding-left: 0.15in;
            border-left: 2px solid #d4d0c8;
          }
          
          h3 {
            font-size: 12pt;
            font-weight: 500;
            margin-bottom: 0.08in;
          }
          
          .content p {
            margin-bottom: 0.1in;
            text-align: justify;
          }
          
          .no-content {
            color: #888;
            font-size: 10pt;
          }
          
          .footer {
            margin-top: 0.5in;
            padding-top: 0.2in;
            border-top: 1px solid #d4d0c8;
            font-size: 9pt;
            color: #6b6b6b;
            text-align: center;
            font-style: italic;
          }
          
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>My Atlas Codex Bookmarks</h1>
          <p class="subtitle">${bookmarks.length} saved section${bookmarks.length !== 1 ? 's' : ''}</p>
        </div>
        
        ${sectionsHTML}
        
        <div class="footer">
          <p>Personalized collection from The Atlas Codex of Living Systems</p>
          <p>Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(pdfContent);
    printWindow.document.close();
    toast.success('PDF export ready');
  };

  if (bookmarks.length === 0) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={generatePDF}
      className="gap-2 w-full"
    >
      <FileDown className="h-4 w-4" />
      Export as PDF
    </Button>
  );
};

export default BookmarkExport;
