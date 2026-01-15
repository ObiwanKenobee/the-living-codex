import { useState } from 'react';
import { Bookmark, ChevronDown, ChevronUp, Trash2, X } from 'lucide-react';
import { useSectionBookmarks, SectionBookmark } from '@/hooks/useSectionBookmarks';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { toast } from 'sonner';

const BookmarksPanel = () => {
  const { bookmarks, removeBookmark, clearAllBookmarks } = useSectionBookmarks();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (bookmark: SectionBookmark) => {
    const element = document.getElementById(bookmark.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    } else {
      // If section not found on current page, might be anchor-based
      window.location.hash = bookmark.id;
      setIsOpen(false);
    }
  };

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeBookmark(id);
    toast.info('Bookmark removed');
  };

  const handleClearAll = () => {
    clearAllBookmarks();
    toast.info('All bookmarks cleared');
  };

  const sortedBookmarks = [...bookmarks].sort((a, b) => b.timestamp - a.timestamp);

  const groupedBookmarks = sortedBookmarks.reduce((acc, bookmark) => {
    if (!acc[bookmark.section]) {
      acc[bookmark.section] = [];
    }
    acc[bookmark.section].push(bookmark);
    return acc;
  }, {} as Record<string, SectionBookmark[]>);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 px-2 gap-1.5 bookmarks-panel"
        >
          <Bookmark className="h-4 w-4" />
          {bookmarks.length > 0 && (
            <span className="text-xs font-sans-nav bg-primary/10 text-primary px-1.5 py-0.5 rounded">
              {bookmarks.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80 bg-background">
        <SheetHeader className="pb-4 border-b divider">
          <SheetTitle className="flex items-center justify-between">
            <span>Saved Sections</span>
            {bookmarks.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="h-8 text-xs text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="py-4 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
          {bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="h-8 w-8 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">No saved sections yet</p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Click the bookmark icon on any section to save it
              </p>
            </div>
          ) : (
            Object.entries(groupedBookmarks).map(([section, items]) => (
              <div key={section}>
                <h4 className="font-sans-nav text-xs tracking-widest text-muted-foreground mb-2">
                  {section}
                </h4>
                <div className="space-y-1">
                  {items.map(bookmark => (
                    <button
                      key={bookmark.id}
                      onClick={() => handleNavigate(bookmark)}
                      className="w-full text-left p-3 rounded-sm hover:bg-muted transition-colors group flex items-start justify-between gap-2"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{bookmark.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(bookmark.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleRemove(bookmark.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted-foreground/10 rounded transition-all"
                        aria-label="Remove bookmark"
                      >
                        <X className="h-3 w-3 text-muted-foreground" />
                      </button>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookmarksPanel;
