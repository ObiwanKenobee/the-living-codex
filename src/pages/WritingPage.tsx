import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getWritingBySlug, getAdjacentWritings } from '@/data/writings';
import FadeInSection from '@/components/FadeInSection';

const WritingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const writing = slug ? getWritingBySlug(slug) : undefined;
  const { prev, next } = slug ? getAdjacentWritings(slug) : { prev: null, next: null };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!writing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Writing not found</h1>
          <Link to="/#writings" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Return to archive
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-24 pb-16">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container-wide">
          <div className="flex items-center justify-between h-14">
            <Link 
              to="/#writings" 
              className="font-sans-nav text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2"
            >
              <ArrowLeft size={14} />
              Archive
            </Link>
            <span className="font-sans-nav text-foreground tracking-widest">
              Atlas Codex
            </span>
            <div className="w-16" />
          </div>
        </div>
      </nav>

      <div className="container-reading">
        {/* Header */}
        <FadeInSection>
          <header className="mb-16">
            <p className="font-sans-nav text-xs text-muted-foreground mb-4 tracking-wider">
              {writing.date} · {writing.type}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8 text-balance">
              {writing.title}
            </h1>
            <div className="decorative-line !mx-0" />
          </header>
        </FadeInSection>

        {/* Content */}
        <FadeInSection delay={200}>
          <div className="prose-codex space-y-6">
            {writing.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </FadeInSection>

        {/* Footer navigation */}
        <FadeInSection delay={300}>
          <footer className="mt-24 pt-12 border-t divider">
            <div className="flex items-center justify-between gap-8">
              {prev ? (
                <Link 
                  to={`/writings/${prev.slug}`}
                  className="group flex-1"
                >
                  <p className="font-sans-nav text-xs text-muted-foreground mb-2 tracking-wider flex items-center gap-2">
                    <ArrowLeft size={12} />
                    Previous
                  </p>
                  <p className="text-reading group-hover:text-foreground transition-colors duration-300 line-clamp-1">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {next ? (
                <Link 
                  to={`/writings/${next.slug}`}
                  className="group flex-1 text-right"
                >
                  <p className="font-sans-nav text-xs text-muted-foreground mb-2 tracking-wider flex items-center justify-end gap-2">
                    Next
                    <ArrowRight size={12} />
                  </p>
                  <p className="text-reading group-hover:text-foreground transition-colors duration-300 line-clamp-1">
                    {next.title}
                  </p>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>

            <div className="mt-12 text-center">
              <Link 
                to="/#writings"
                className="font-sans-nav text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Return to Archive
              </Link>
            </div>
          </footer>
        </FadeInSection>
      </div>
    </article>
  );
};

export default WritingPage;
