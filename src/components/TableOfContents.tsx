import { useMemo, useState, useEffect } from 'react';
import { List } from 'lucide-react';

interface TableOfContentsProps {
  content: string[];
}

interface Heading {
  id: string;
  text: string;
  index: number;
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Generate pseudo-headings from first sentence of each paragraph (for longer writings)
  const headings: Heading[] = useMemo(() => {
    // Only show TOC for writings with 4+ paragraphs
    if (content.length < 4) return [];

    return content
      .map((paragraph, index) => {
        // Get first sentence or first 50 characters
        const firstSentence = paragraph.split(/[.!?]/)[0];
        const text = firstSentence.length > 60 
          ? firstSentence.substring(0, 57) + '...'
          : firstSentence;
        
        return {
          id: `paragraph-${index}`,
          text,
          index
        };
      })
      .filter((_, index) => index % 2 === 0); // Show every other paragraph as a section
  }, [content]);

  // Track scroll position to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const paragraphs = document.querySelectorAll('[data-paragraph-index]');
      let currentIndex = 0;

      paragraphs.forEach((paragraph) => {
        const rect = paragraph.getBoundingClientRect();
        if (rect.top < window.innerHeight / 3) {
          currentIndex = parseInt(paragraph.getAttribute('data-paragraph-index') || '0');
        }
      });

      setActiveIndex(currentIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const element = document.querySelector(`[data-paragraph-index="${index}"]`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  if (headings.length === 0) return null;

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 font-sans-nav text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider"
      >
        <List size={14} />
        {isOpen ? 'Hide contents' : 'Show contents'}
      </button>

      {isOpen && (
        <nav className="mt-4 pl-4 border-l divider">
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => scrollToSection(heading.index)}
                  className={`text-left text-sm transition-colors duration-200 ${
                    activeIndex === heading.index || 
                    (activeIndex > heading.index && headings.find(h => h.index > heading.index)?.index !== undefined && activeIndex < (headings.find(h => h.index > heading.index)?.index ?? Infinity))
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TableOfContents;