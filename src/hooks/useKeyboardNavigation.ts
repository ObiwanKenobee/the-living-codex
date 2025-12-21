import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Writing } from '@/data/writings';

interface UseKeyboardNavigationProps {
  prev: Writing | null;
  next: Writing | null;
}

export const useKeyboardNavigation = ({ prev, next }: UseKeyboardNavigationProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === 'ArrowLeft' && prev) {
        e.preventDefault();
        navigate(`/writings/${prev.slug}`);
      } else if (e.key === 'ArrowRight' && next) {
        e.preventDefault();
        navigate(`/writings/${next.slug}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next, navigate]);
};