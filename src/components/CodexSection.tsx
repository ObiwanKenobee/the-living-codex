import { Download } from 'lucide-react';
import FadeInSection from './FadeInSection';

const CodexSection = () => {
  const handleDownloadPDF = () => {
    // Create a printable version of the Codex content
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const codexContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>The Atlas Codex of Living Systems</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
          
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body {
            font-family: 'Crimson Pro', Georgia, serif;
            font-size: 12pt;
            line-height: 1.8;
            color: #2c2c2c;
            max-width: 6.5in;
            margin: 0 auto;
            padding: 0.75in;
          }
          
          h1 {
            font-size: 24pt;
            font-weight: 300;
            margin-bottom: 0.5in;
            text-align: center;
            border-bottom: 1px solid #d4d0c8;
            padding-bottom: 0.25in;
          }
          
          h2 {
            font-size: 16pt;
            font-weight: 400;
            margin-top: 0.4in;
            margin-bottom: 0.15in;
            color: #4a4a4a;
          }
          
          h3 {
            font-size: 13pt;
            font-weight: 500;
            margin-top: 0.3in;
            margin-bottom: 0.1in;
          }
          
          p {
            margin-bottom: 0.15in;
            text-align: justify;
          }
          
          .section {
            margin-bottom: 0.4in;
            page-break-inside: avoid;
          }
          
          .pillar {
            margin-bottom: 0.3in;
            padding-left: 0.2in;
            border-left: 2px solid #d4d0c8;
          }
          
          .footer {
            margin-top: 0.5in;
            padding-top: 0.2in;
            border-top: 1px solid #d4d0c8;
            font-size: 10pt;
            color: #6b6b6b;
            text-align: center;
            font-style: italic;
          }
          
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>The Atlas Codex of Living Systems</h1>
        
        <div class="section">
          <h2>Orientation</h2>
          <p>The Atlas Codex is a foundational system of understanding—a scientific and philosophical framework that explains how life, matter, ecosystems, societies, and human meaning organize, sustain, collapse, and regenerate.</p>
          <p>It is not a product, a method, or a movement. It is an attempt to articulate the mathematical and ethical principles by which living systems persist through time.</p>
        </div>

        <div class="section">
          <h2>I. The Codex</h2>
          <p>The Atlas Codex is not an invention in the ordinary sense. It is an attempt to describe what already exists—the underlying patterns by which living systems organize themselves, persist through time, and either flourish or collapse.</p>
          <p>It precedes institutions, technologies, and economies. These are expressions of deeper principles, not their source. The Codex seeks to articulate those principles in mathematical and ethical terms, grounded in observation rather than ideology.</p>
          <p>This is a living reference. It evolves through careful observation, physical experimentation, and the humility to be wrong. What is written here today may be refined tomorrow as our understanding deepens through reality-testing.</p>
        </div>

        <div class="section">
          <h2>II. The Four Pillars</h2>
          
          <div class="pillar">
            <h3>Mathematical Principles of Life</h3>
            <p>All living systems share underlying mathematical patterns—growth curves, feedback loops, thresholds, and phase transitions. Understanding these patterns allows us to recognize when systems are flourishing, stressed, or approaching collapse.</p>
            <p>The mathematics is not abstract. It describes observable reality: how populations grow and stabilize, how resources flow and accumulate, how small changes can trigger large transformations.</p>
          </div>

          <div class="pillar">
            <h3>Material Expressions</h3>
            <p>Theory without physical testing remains speculation. The second pillar grounds the Codex in direct experimentation with soil, water, materials, and living organisms.</p>
            <p>We learn through making. The hands discover what the mind overlooks. Every material has its own logic; our task is to perceive and work within that logic rather than against it.</p>
          </div>

          <div class="pillar">
            <h3>Human Systems</h3>
            <p>Communities, education, work, and meaning-making follow the same patterns as other living systems. They can be organized to flourish or structured in ways that guarantee decline.</p>
            <p>The Codex examines how human systems maintain coherence, how they transmit knowledge across generations, how they balance individual and collective needs, and how they fail.</p>
          </div>

          <div class="pillar">
            <h3>Moral Architecture</h3>
            <p>Understanding without ethics is dangerous. The fourth pillar addresses stewardship, responsibility, limits, and our obligations to those who will inherit what we leave behind.</p>
            <p>This is not moralism but architecture—the structural requirements for systems that can persist across generations without consuming their own foundations.</p>
          </div>
        </div>

        <div class="section">
          <h2>III. Atlas Habitat One</h2>
          <p>Habitat One is a modest physical site where the Codex is tested against reality. It is not a demonstration project or a showcase. It is a place of learning through failure and observation across seasons and years.</p>
          <p>The habitat operates on a long time horizon. We measure success in decades, not quarters. We expect most initial approaches to require revision. The purpose is understanding, not performance.</p>
        </div>

        <div class="section">
          <h2>IV. Atlas Sanctum</h2>
          <p>Atlas Sanctum is the applied arm that may eventually emerge from the Codex—an institution devoted to implementing these principles in the world. It is secondary to the Codex itself.</p>
          <p>The framework comes first; institutions follow. Many efforts fail because they build institutions before understanding the principles those institutions should embody.</p>
        </div>

        <div class="section">
          <h2>Ethos</h2>
          <p><strong>Humility before reality:</strong> What we think we know is always provisional. Reality is the teacher; we are students.</p>
          <p><strong>Learning through making:</strong> Understanding develops through physical engagement, not abstract study alone.</p>
          <p><strong>Respect for limits:</strong> Every system has boundaries. Working within limits is not constraint but wisdom.</p>
          <p><strong>Responsibility to future generations:</strong> We are temporary stewards. Our choices shape what others will inherit.</p>
        </div>

        <div class="footer">
          <p>The Atlas Codex of Living Systems — A living document, updated as understanding develops</p>
          <p>Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(codexContent);
    printWindow.document.close();
  };

  return (
    <section id="codex" className="section-spacing border-t divider">
      <div className="container-reading">
        <FadeInSection>
          <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
            I
          </p>
          <h2 className="text-3xl md:text-4xl font-light mb-12">
            The Codex
          </h2>
        </FadeInSection>
        
        <FadeInSection delay={100}>
          <div className="prose-codex space-y-6">
            <p>
              The Atlas Codex is not an invention in the ordinary sense. It is an 
              attempt to describe what already exists—the underlying patterns by 
              which living systems organize themselves, persist through time, and 
              either flourish or collapse.
            </p>
            
            <p>
              It precedes institutions, technologies, and economies. These are 
              expressions of deeper principles, not their source. The Codex seeks 
              to articulate those principles in mathematical and ethical terms, 
              grounded in observation rather than ideology.
            </p>
            
            <p>
              This is a living reference. It evolves through careful observation, 
              physical experimentation, and the humility to be wrong. What is 
              written here today may be refined tomorrow as our understanding 
              deepens through reality-testing.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="mt-12">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-sans-nav tracking-wider border divider bg-transparent text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Codex (PDF)
            </button>
          </div>
        </FadeInSection>

        <FadeInSection delay={300}>
          <div className="mt-16 pt-8 border-t divider">
            <p className="text-sm text-muted-foreground italic text-center">
              The map is not the territory, but a good map helps us navigate.
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default CodexSection;
