import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Rss, Bookmark } from 'lucide-react';
import FadeInSection from './FadeInSection';
import { writings } from '@/data/writings';
import { calculateReadingTime, formatReadingTime } from '@/lib/readingTime';
import { useBookmarks } from '@/hooks/useBookmarks';

const WritingsSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();

  // Get unique types for filter buttons
  const types = useMemo(() => {
    const uniqueTypes = [...new Set(writings.map(w => w.type))];
    return uniqueTypes.sort();
  }, []);

  // Filter writings based on search, type filter, and bookmarks
  const filteredWritings = useMemo(() => {
    return writings.filter(entry => {
      const matchesSearch = searchQuery === '' || 
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilter === null || entry.type === activeFilter;
      const matchesBookmark = !showBookmarksOnly || bookmarks.includes(entry.slug);
      
      return matchesSearch && matchesFilter && matchesBookmark;
    });
  }, [searchQuery, activeFilter, showBookmarksOnly, bookmarks]);

  return (
    <section id="writings" className="section-spacing border-t divider">
      <div className="container-reading">
        <FadeInSection>
          <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
            VI
          </p>
          <div className="flex items-start justify-between gap-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-light">
              Writings & Field Notes
            </h2>
            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-sans-nav text-muted-foreground hover:text-foreground transition-colors mt-2"
              title="Subscribe via RSS"
            >
              <Rss size={14} />
              <span className="hidden sm:inline">RSS</span>
            </a>
          </div>
          <p className="prose-codex mb-8">
            An evolving archive of essays, observations, diagrams, and working 
            papers. This is not a blog—it is a research notebook, updated as 
            understanding develops.
          </p>
        </FadeInSection>

        <FadeInSection delay={100}>
          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search writings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-muted/30 border divider rounded-none text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
              />
            </div>

            {/* Type Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter(null)}
                className={`px-3 py-1.5 text-xs font-sans-nav tracking-wider border transition-colors ${
                  activeFilter === null && !showBookmarksOnly
                    ? 'bg-foreground text-background border-foreground' 
                    : 'bg-transparent text-muted-foreground border-border hover:border-foreground/50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                className={`px-3 py-1.5 text-xs font-sans-nav tracking-wider border transition-colors flex items-center gap-1.5 ${
                  showBookmarksOnly 
                    ? 'bg-foreground text-background border-foreground' 
                    : 'bg-transparent text-muted-foreground border-border hover:border-foreground/50'
                }`}
              >
                <Bookmark size={12} />
                Saved ({bookmarks.length})
              </button>
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(activeFilter === type ? null : type)}
                  className={`px-3 py-1.5 text-xs font-sans-nav tracking-wider border transition-colors ${
                    activeFilter === type 
                      ? 'bg-foreground text-background border-foreground' 
                      : 'bg-transparent text-muted-foreground border-border hover:border-foreground/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </FadeInSection>

        <div className="space-y-1">
          {filteredWritings.length === 0 ? (
            <FadeInSection>
              <p className="text-muted-foreground text-center py-8">
                No writings match your search.
              </p>
            </FadeInSection>
          ) : (
            filteredWritings.map((entry, index) => {
              const readingTime = calculateReadingTime(entry.content);
              return (
                <FadeInSection key={entry.slug} delay={index * 50}>
                  <div className="flex items-start gap-4 py-4 border-b divider last:border-b-0">
                    <Link 
                      to={`/writings/${entry.slug}`}
                      className="group flex-1"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-sans-nav text-xs text-muted-foreground mb-1 tracking-wider">
                            {entry.date} · {entry.type} · {formatReadingTime(readingTime)}
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
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleBookmark(entry.slug);
                      }}
                      className={`mt-1 p-1.5 transition-colors ${
                        isBookmarked(entry.slug)
                          ? 'text-accent'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      title={isBookmarked(entry.slug) ? 'Remove bookmark' : 'Save for later'}
                    >
                      <Bookmark 
                        size={16} 
                        fill={isBookmarked(entry.slug) ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>
                </FadeInSection>
              );
            })
          )}
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
