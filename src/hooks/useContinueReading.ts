import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'atlas-continue-reading';
const SCROLL_DEBOUNCE = 1000; // Save position every second while scrolling

interface ContinueReadingData {
  scrollPosition: number;
  sectionId: string | null;
  timestamp: number;
  path: string;
}

export const useContinueReading = () => {
  const [savedPosition, setSavedPosition] = useState<ContinueReadingData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  // Load saved position on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: ContinueReadingData = JSON.parse(stored);
        // Only show prompt if saved within last 7 days and on the same path
        const isRecent = Date.now() - data.timestamp < 7 * 24 * 60 * 60 * 1000;
        const isSamePath = data.path === window.location.pathname;
        const hasScrollPosition = data.scrollPosition > 200; // Only if scrolled past hero

        if (isRecent && isSamePath && hasScrollPosition) {
          setSavedPosition(data);
          setShowPrompt(true);
        }
      }
      setIsLoaded(true);
    } catch (error) {
      console.error('Failed to load continue reading data:', error);
      setIsLoaded(true);
    }
  }, []);

  // Save scroll position periodically
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollPosition = window.scrollY;
        
        // Find current section
        const sections = ['codex', 'pillars', 'habitat', 'sanctum', 'practice', 'writings', 'ethos'];
        let currentSection: string | null = null;
        
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom > 200) {
              currentSection = sectionId;
              break;
            }
          }
        }

        const data: ContinueReadingData = {
          scrollPosition,
          sectionId: currentSection,
          timestamp: Date.now(),
          path: window.location.pathname,
        };

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
          console.error('Failed to save continue reading data:', error);
        }
      }, SCROLL_DEBOUNCE);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const continueReading = useCallback(() => {
    if (savedPosition) {
      window.scrollTo({
        top: savedPosition.scrollPosition,
        behavior: 'smooth',
      });
      setShowPrompt(false);
    }
  }, [savedPosition]);

  const dismissPrompt = useCallback(() => {
    setShowPrompt(false);
  }, []);

  const clearSavedPosition = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSavedPosition(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Failed to clear continue reading data:', error);
    }
  }, []);

  return {
    savedPosition,
    showPrompt,
    isLoaded,
    continueReading,
    dismissPrompt,
    clearSavedPosition,
  };
};
