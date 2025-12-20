import { Link } from 'react-router-dom';
import FadeInSection from './FadeInSection';
import { writings } from '@/data/writings';

const WritingsSection = () => {
  return (
    <section id="writings" className="section-spacing border-t divider">
      <div className="container-reading">
        <FadeInSection>
          <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
            VI
          </p>
          <h2 className="text-3xl md:text-4xl font-light mb-8">
            Writings & Field Notes
          </h2>
          <p className="prose-codex mb-12">
            An evolving archive of essays, observations, diagrams, and working 
            papers. This is not a blog—it is a research notebook, updated as 
            understanding develops.
          </p>
        </FadeInSection>

        <div className="space-y-1">
          {writings.map((entry, index) => (
            <FadeInSection key={entry.slug} delay={index * 50}>
              <Link 
                to={`/writings/${entry.slug}`}
                className="group block py-4 border-b divider last:border-b-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-sans-nav text-xs text-muted-foreground mb-1 tracking-wider">
                      {entry.date} · {entry.type}
                    </p>
                    <h3 className="text-lg text-reading group-hover:text-foreground transition-colors duration-300">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {entry.excerpt}
                    </p>
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 mt-1">
                    →
                  </span>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={300}>
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Archive continues as understanding develops
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default WritingsSection;
