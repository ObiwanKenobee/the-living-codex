import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'atlas-section-bookmarks';

export interface SectionBookmark {
  id: string;
  title: string;
  section: string;
  timestamp: number;
}

export const useSectionBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<SectionBookmark[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load section bookmarks:', error);
    }
  }, []);

  const saveBookmarks = useCallback((newBookmarks: SectionBookmark[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
      setBookmarks(newBookmarks);
    } catch (error) {
      console.error('Failed to save section bookmarks:', error);
    }
  }, []);

  const addBookmark = useCallback((id: string, title: string, section: string) => {
    const existing = bookmarks.find(b => b.id === id);
    if (!existing) {
      const newBookmark: SectionBookmark = {
        id,
        title,
        section,
        timestamp: Date.now()
      };
      saveBookmarks([...bookmarks, newBookmark]);
    }
  }, [bookmarks, saveBookmarks]);

  const removeBookmark = useCallback((id: string) => {
    saveBookmarks(bookmarks.filter(b => b.id !== id));
  }, [bookmarks, saveBookmarks]);

  const toggleBookmark = useCallback((id: string, title: string, section: string) => {
    const existing = bookmarks.find(b => b.id === id);
    if (existing) {
      removeBookmark(id);
    } else {
      addBookmark(id, title, section);
    }
  }, [bookmarks, addBookmark, removeBookmark]);

  const isBookmarked = useCallback((id: string) => {
    return bookmarks.some(b => b.id === id);
  }, [bookmarks]);

  const clearAllBookmarks = useCallback(() => {
    saveBookmarks([]);
  }, [saveBookmarks]);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
    clearAllBookmarks,
  };
};
