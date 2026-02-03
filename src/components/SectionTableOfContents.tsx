import { useState } from 'react';
import { ChevronDown, ChevronRight, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  title: string;
}

interface SectionTableOfContentsProps {
  items: TocItem[];
  className?: string;
}

const SectionTableOfContents = ({ items, className }: SectionTableOfContentsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (items.length < 3) return null;

  const scrollToItem = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={cn('border divider rounded-lg p-4 bg-muted/30', className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <List size={16} />
        <span>In this section</span>
        {isExpanded ? (
          <ChevronDown size={16} className="ml-auto" />
        ) : (
          <ChevronRight size={16} className="ml-auto" />
        )}
      </button>

      {isExpanded && (
        <nav className="mt-4 space-y-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToItem(item.id)}
              className="flex items-start gap-3 w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              <span className="text-xs font-sans-nav text-primary/50 mt-0.5">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{item.title}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default SectionTableOfContents;
