import { useEffect, useState } from 'react';
import { BookOpen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContinueReading } from '@/hooks/useContinueReading';
import { cn } from '@/lib/utils';

const sectionNames: Record<string, string> = {
  codex: 'The Codex',
  pillars: 'Four Pillars',
  habitat: 'Habitat One',
  sanctum: 'Atlas Sanctum',
  practice: 'The Practice',
  writings: 'Field Notes',
  ethos: 'Ethos',
};

const ContinueReadingPrompt = () => {
  const { savedPosition, showPrompt, continueReading, dismissPrompt } = useContinueReading();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showPrompt) {
      // Delay showing to avoid flashing on page load
      const timeout = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timeout);
    } else {
      setIsVisible(false);
    }
  }, [showPrompt]);

  if (!showPrompt || !savedPosition) return null;

  const sectionName = savedPosition.sectionId
    ? sectionNames[savedPosition.sectionId] || savedPosition.sectionId
    : 'where you left off';

  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <div className="flex items-center gap-4 bg-background border divider rounded-lg px-4 py-3 shadow-lg">
        <BookOpen size={20} className="text-primary flex-shrink-0" />
        <div className="text-sm">
          <span className="text-muted-foreground">Continue reading </span>
          <span className="font-medium text-foreground">{sectionName}</span>
          <span className="text-muted-foreground">?</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={continueReading}
            className="h-8"
          >
            Continue
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={dismissPrompt}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss"
          >
            <X size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContinueReadingPrompt;
