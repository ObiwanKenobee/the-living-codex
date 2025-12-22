import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'atlas-codex-bookmarks';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  const saveBookmarks = useCallback((newBookmarks: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
      setBookmarks(newBookmarks);
    } catch (error) {
      console.error('Failed to save bookmarks:', error);
    }
  }, []);

  const addBookmark = useCallback((slug: string) => {
    if (!bookmarks.includes(slug)) {
      saveBookmarks([...bookmarks, slug]);
    }
  }, [bookmarks, saveBookmarks]);

  const removeBookmark = useCallback((slug: string) => {
    saveBookmarks(bookmarks.filter(b => b !== slug));
  }, [bookmarks, saveBookmarks]);

  const toggleBookmark = useCallback((slug: string) => {
    if (bookmarks.includes(slug)) {
      removeBookmark(slug);
    } else {
      addBookmark(slug);
    }
  }, [bookmarks, addBookmark, removeBookmark]);

  const isBookmarked = useCallback((slug: string) => {
    return bookmarks.includes(slug);
  }, [bookmarks]);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
  };
};
