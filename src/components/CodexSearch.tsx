import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, BookOpen, Compass, Building2, Heart } from 'lucide-react';
import { codexSearchContent, SearchableItem } from '@/data/codexSearchContent';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

const typeIcons: Record<SearchableItem['type'], React.ReactNode> = {
  section: <FileText className="h-4 w-4" />,
  glossary: <BookOpen className="h-4 w-4" />,
  pillar: <Compass className="h-4 w-4" />,
  ethos: <Heart className="h-4 w-4" />,
  habitat: <Building2 className="h-4 w-4" />,
  sanctum: <Building2 className="h-4 w-4" />,
};

const typeLabels: Record<SearchableItem['type'], string> = {
  section: 'Section',
  glossary: 'Glossary',
  pillar: 'Pillar',
  ethos: 'Ethos',
  habitat: 'Habitat',
  sanctum: 'Sanctum',
};

interface CodexSearchProps {
  variant?: 'icon' | 'button' | 'input';
}

const CodexSearch = ({ variant = 'icon' }: CodexSearchProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerms = query.toLowerCase().split(' ').filter(Boolean);

    return codexSearchContent
      .map(item => {
        const titleLower = item.title.toLowerCase();
        const contentLower = item.content.toLowerCase();

        // Calculate relevance score
        let score = 0;
        for (const term of searchTerms) {
          if (titleLower.includes(term)) score += 10;
          if (titleLower.startsWith(term)) score += 5;
          if (contentLower.includes(term)) score += 1;
        }

        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [query]);

  const groupedResults = useMemo(() => {
    const groups: Record<string, typeof results> = {};
    for (const result of results) {
      const key = result.section;
      if (!groups[key]) groups[key] = [];
      groups[key].push(result);
    }
    return groups;
  }, [results]);

  const handleSelect = (item: SearchableItem) => {
    setOpen(false);
    setQuery('');

    if (item.href.startsWith('/')) {
      // Navigate to page route
      if (item.href.includes('#')) {
        const [path, hash] = item.href.split('#');
        navigate(path);
        setTimeout(() => {
          const element = document.getElementById(hash.replace('letter-', ''));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        navigate(item.href);
      }
    } else {
      // Hash navigation on same page
      const hash = item.href.replace('/#', '');
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const highlightMatch = (text: string, maxLength = 100) => {
    if (!query.trim()) return text.slice(0, maxLength);

    const terms = query.toLowerCase().split(' ').filter(Boolean);
    let result = text;

    // Find first match position
    let firstMatchIndex = text.length;
    for (const term of terms) {
      const index = text.toLowerCase().indexOf(term);
      if (index !== -1 && index < firstMatchIndex) {
        firstMatchIndex = index;
      }
    }

    // Extract context around first match
    const start = Math.max(0, firstMatchIndex - 30);
    const end = Math.min(text.length, start + maxLength);
    result = (start > 0 ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : '');

    return result;
  };

  return (
    <>
      {variant === 'icon' && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          className="h-9 w-9"
          aria-label="Search Codex"
        >
          <Search className="h-4 w-4" />
        </Button>
      )}

      {variant === 'button' && (
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="gap-2 text-muted-foreground"
        >
          <Search className="h-4 w-4" />
          Search Codex
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-2">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      )}

      {variant === 'input' && (
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center gap-2 px-3 py-2 border rounded-md text-sm text-muted-foreground hover:border-foreground/50 transition-colors"
        >
          <Search className="h-4 w-4" />
          <span>Search the Codex...</span>
          <kbd className="hidden sm:inline-flex ml-auto h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      )}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search sections, glossary, and concepts..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.trim() && results.length === 0 && (
            <CommandEmpty>No results found for "{query}"</CommandEmpty>
          )}

          {!query.trim() && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              <p>Start typing to search across the Codex</p>
              <p className="text-xs mt-2">Try: "carrying capacity", "regenerative", "habitat"</p>
            </div>
          )}

          {Object.entries(groupedResults).map(([section, items]) => (
            <CommandGroup key={section} heading={section}>
              {items.map(item => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => handleSelect(item)}
                  className="flex items-start gap-3 py-3"
                >
                  <span className="mt-0.5 text-muted-foreground">
                    {typeIcons[item.type]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{item.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded">
                        {typeLabels[item.type]}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                      {highlightMatch(item.content)}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CodexSearch;
