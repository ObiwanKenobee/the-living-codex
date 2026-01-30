import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'atlas-reading-progress';

export interface ReadingSection {
  id: string;
  title: string;
  read: boolean;
  readAt?: number;
}

const DEFAULT_SECTIONS: ReadingSection[] = [
  { id: 'codex', title: 'The Codex', read: false },
  { id: 'pillars', title: 'Four Pillars', read: false },
  { id: 'habitat', title: 'Habitat One', read: false },
  { id: 'sanctum', title: 'Atlas Sanctum', read: false },
  { id: 'practice', title: 'The Practice', read: false },
  { id: 'writings', title: 'Field Notes', read: false },
  { id: 'ethos', title: 'Ethos', read: false },
];

export const useReadingProgress = () => {
  const [sections, setSections] = useState<ReadingSection[]>(DEFAULT_SECTIONS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to handle new sections
        const merged = DEFAULT_SECTIONS.map(defaultSection => {
          const existing = parsed.find((s: ReadingSection) => s.id === defaultSection.id);
          return existing || defaultSection;
        });
        setSections(merged);
      }
      setIsLoaded(true);
    } catch (error) {
      console.error('Failed to load reading progress:', error);
      setIsLoaded(true);
    }
  }, []);

  const saveSections = useCallback((newSections: ReadingSection[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSections));
      setSections(newSections);
    } catch (error) {
      console.error('Failed to save reading progress:', error);
    }
  }, []);

  const markAsRead = useCallback((sectionId: string) => {
    const newSections = sections.map(section =>
      section.id === sectionId
        ? { ...section, read: true, readAt: Date.now() }
        : section
    );
    saveSections(newSections);
  }, [sections, saveSections]);

  const markAsUnread = useCallback((sectionId: string) => {
    const newSections = sections.map(section =>
      section.id === sectionId
        ? { ...section, read: false, readAt: undefined }
        : section
    );
    saveSections(newSections);
  }, [sections, saveSections]);

  const toggleRead = useCallback((sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section?.read) {
      markAsUnread(sectionId);
    } else {
      markAsRead(sectionId);
    }
  }, [sections, markAsRead, markAsUnread]);

  const isRead = useCallback((sectionId: string) => {
    return sections.find(s => s.id === sectionId)?.read ?? false;
  }, [sections]);

  const resetProgress = useCallback(() => {
    saveSections(DEFAULT_SECTIONS);
  }, [saveSections]);

  const readCount = sections.filter(s => s.read).length;
  const totalCount = sections.length;
  const progressPercent = Math.round((readCount / totalCount) * 100);

  return {
    sections,
    isLoaded,
    markAsRead,
    markAsUnread,
    toggleRead,
    isRead,
    resetProgress,
    readCount,
    totalCount,
    progressPercent,
  };
};
