import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useSectionBookmarks } from '@/hooks/useSectionBookmarks';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SectionBookmarkButtonProps {
  sectionId: string;
  sectionTitle: string;
  parentSection: string;
  variant?: 'icon' | 'text';
}

const SectionBookmarkButton = ({ 
  sectionId, 
  sectionTitle, 
  parentSection,
  variant = 'icon' 
}: SectionBookmarkButtonProps) => {
  const { isBookmarked, toggleBookmark } = useSectionBookmarks();
  const bookmarked = isBookmarked(sectionId);

  const handleClick = () => {
    toggleBookmark(sectionId, sectionTitle, parentSection);
    if (bookmarked) {
      toast.info('Bookmark removed');
    } else {
      toast.success('Section bookmarked');
    }
  };

  if (variant === 'text') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClick}
        className="bookmark-button gap-2 text-muted-foreground hover:text-foreground"
      >
        {bookmarked ? (
          <BookmarkCheck className="h-4 w-4 text-primary" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
        <span className="text-xs">{bookmarked ? 'Saved' : 'Save'}</span>
      </Button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="bookmark-button p-1.5 rounded-sm hover:bg-muted transition-colors"
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {bookmarked ? (
        <BookmarkCheck className="h-4 w-4 text-primary" />
      ) : (
        <Bookmark className="h-4 w-4 text-muted-foreground hover:text-foreground" />
      )}
    </button>
  );
};

export default SectionBookmarkButton;
