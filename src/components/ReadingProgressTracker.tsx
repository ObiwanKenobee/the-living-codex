import { useState } from 'react';
import { CheckCircle2, Circle, RotateCcw, ChevronDown, BookOpen } from 'lucide-react';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from 'sonner';

const ReadingProgressTracker = () => {
  const {
    sections,
    isLoaded,
    toggleRead,
    resetProgress,
    readCount,
    totalCount,
    progressPercent,
  } = useReadingProgress();

  const [open, setOpen] = useState(false);

  const handleToggle = (sectionId: string, title: string, isCurrentlyRead: boolean) => {
    toggleRead(sectionId);
    if (!isCurrentlyRead) {
      toast.success(`"${title}" marked as read`);
    }
  };

  const handleReset = () => {
    resetProgress();
    toast.info('Reading progress reset');
  };

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setOpen(false);
    }
  };

  if (!isLoaded) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline text-xs font-sans-nav tracking-wider">
            {readCount}/{totalCount}
          </span>
          <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden hidden sm:block">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-0">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-sans-nav text-xs tracking-wider text-muted-foreground">
              READING PROGRESS
            </h3>
            <span className="text-sm font-medium">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {readCount} of {totalCount} sections read
          </p>
        </div>

        <div className="p-2 max-h-64 overflow-y-auto">
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex items-center gap-2 p-2 rounded-sm hover:bg-muted/50 group"
            >
              <button
                onClick={() => handleToggle(section.id, section.title, section.read)}
                className="flex-shrink-0"
                aria-label={section.read ? 'Mark as unread' : 'Mark as read'}
              >
                {section.read ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                )}
              </button>
              <button
                onClick={() => handleNavigate(section.id)}
                className={`flex-1 text-left text-sm transition-colors ${
                  section.read
                    ? 'text-muted-foreground line-through'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {section.title}
              </button>
            </div>
          ))}
        </div>

        <div className="p-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="w-full gap-2 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Progress
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ReadingProgressTracker;
