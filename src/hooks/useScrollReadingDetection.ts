import { useEffect, useRef, useCallback } from 'react';
import { useReadingProgress } from './useReadingProgress';

const READING_THRESHOLD = 0.6; // Mark as read when 60% of section is visible
const TIME_THRESHOLD = 2000; // Must be visible for 2 seconds

export const useScrollReadingDetection = () => {
  const { markAsRead, isRead } = useReadingProgress();
  const sectionTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const sectionId = entry.target.id;
      
      if (!sectionId) return;

      // Skip if already read
      if (isRead(sectionId)) {
        return;
      }

      if (entry.isIntersecting && entry.intersectionRatio >= READING_THRESHOLD) {
        // Start timer if not already running
        if (!sectionTimers.current.has(sectionId)) {
          const timer = setTimeout(() => {
            markAsRead(sectionId);
            sectionTimers.current.delete(sectionId);
          }, TIME_THRESHOLD);
          sectionTimers.current.set(sectionId, timer);
        }
      } else {
        // Cancel timer if section is no longer visible enough
        const timer = sectionTimers.current.get(sectionId);
        if (timer) {
          clearTimeout(timer);
          sectionTimers.current.delete(sectionId);
        }
      }
    });
  }, [markAsRead, isRead]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.25, 0.5, 0.6, 0.75, 1.0],
    });

    // Observe all main sections
    const sectionIds = ['codex', 'pillars', 'habitat', 'sanctum', 'practice', 'writings', 'ethos'];
    
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      // Cleanup
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      sectionTimers.current.forEach((timer) => clearTimeout(timer));
      sectionTimers.current.clear();
    };
  }, [handleIntersection]);

  return null;
};

export default useScrollReadingDetection;
