import { useState, useEffect, useCallback } from 'react';
import { UserPreferences } from '@/lib/types';

const DEFAULT_PREFERENCES: UserPreferences = {
  language: 'en',
  state: 'California',
  notifications: true
};

export function useUserPreferences(userId?: string) {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('rightroute-preferences');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      } catch (err) {
        console.error('Failed to parse stored preferences:', err);
      }
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('rightroute-preferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = useCallback(async (updates: Partial<UserPreferences>) => {
    setLoading(true);
    setError(null);

    try {
      const newPreferences = { ...preferences, ...updates };
      setPreferences(newPreferences);

      // If userId is provided, also sync with server
      if (userId) {
        const response = await fetch('/api/users/preferences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            ...newPreferences
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to sync preferences with server');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update preferences');
      console.error('Error updating preferences:', err);
    } finally {
      setLoading(false);
    }
  }, [preferences, userId]);

  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
    localStorage.removeItem('rightroute-preferences');
  }, []);

  return {
    preferences,
    updatePreferences,
    resetPreferences,
    loading,
    error
  };
}
