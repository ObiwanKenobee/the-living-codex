import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'atlas-event-favorites';

export const useEventFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  const saveFavorites = useCallback((newFavorites: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, []);

  const addFavorite = useCallback((eventId: string) => {
    if (!favorites.includes(eventId)) {
      saveFavorites([...favorites, eventId]);
    }
  }, [favorites, saveFavorites]);

  const removeFavorite = useCallback((eventId: string) => {
    saveFavorites(favorites.filter(id => id !== eventId));
  }, [favorites, saveFavorites]);

  const toggleFavorite = useCallback((eventId: string) => {
    if (favorites.includes(eventId)) {
      removeFavorite(eventId);
    } else {
      addFavorite(eventId);
    }
  }, [favorites, addFavorite, removeFavorite]);

  const isFavorite = useCallback((eventId: string) => {
    return favorites.includes(eventId);
  }, [favorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
};
