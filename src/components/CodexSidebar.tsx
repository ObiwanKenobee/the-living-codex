import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check, Circle, BookOpen, RotateCcw } from 'lucide-react';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SidebarSection {
  id: string;
  title: string;
  shortcut: string;
}

const sections: SidebarSection[] = [
  { id: 'codex', title: 'The Codex', shortcut: '1' },
  { id: 'pillars', title: 'Four Pillars', shortcut: '2' },
  { id: 'habitat', title: 'Habitat One', shortcut: '3' },
  { id: 'sanctum', title: 'Atlas Sanctum', shortcut: '4' },
  { id: 'practice', title: 'The Practice', shortcut: '5' },
  { id: 'writings', title: 'Field Notes', shortcut: '6' },
  { id: 'ethos', title: 'Ethos', shortcut: '7' },
];

const CodexSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const { sections: readingSections, progressPercent, isRead, resetProgress } = useReadingProgress();

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      let currentSection = '';
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const { id, element } of sectionElements) {
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcuts for section navigation (1-7)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key;
      if (key >= '1' && key <= '7') {
        const index = parseInt(key) - 1;
        if (sections[index]) {
          scrollToSection(sections[index].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollToSection]);

  const handleResetProgress = () => {
    resetProgress();
    toast.success('Reading progress has been reset');
  };

  // Only show on homepage
  const isHomePage = window.location.pathname === '/';
  if (!isHomePage) return null;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed left-0 top-1/2 -translate-y-1/2 z-40 p-2 bg-background border border-border rounded-r-lg shadow-lg transition-all duration-300 hover:bg-muted',
          isOpen && 'translate-x-[200px]'
        )}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full w-[200px] bg-background/95 backdrop-blur-sm border-r border-border z-30 transform transition-transform duration-300 pt-20 pb-6',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="px-4 space-y-6">
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <BookOpen size={16} className="text-primary" />
              <span>Reading Progress</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {readingSections.filter((s) => s.read).length} of {readingSections.length} sections complete
            </p>
          </div>

          {/* Sections List */}
          <nav className="space-y-1">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Sections
            </h3>
            {sections.map((section) => {
              const sectionRead = isRead(section.id);
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left group',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {sectionRead ? (
                    <Check size={14} className="text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle size={14} className="flex-shrink-0 opacity-40" />
                  )}
                  <span className={cn('flex-1', sectionRead && 'line-through opacity-70')}>
                    {section.title}
                  </span>
                  <kbd className="hidden group-hover:inline-flex h-5 w-5 items-center justify-center rounded border bg-muted text-[10px] font-mono text-muted-foreground">
                    {section.shortcut}
                  </kbd>
                </button>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-border space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetProgress}
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw size={14} />
              Reset Progress
            </Button>
            <a
              href="/glossary"
              className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen size={14} />
              View Glossary
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CodexSidebar;
