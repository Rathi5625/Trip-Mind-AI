import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PreferencesState {
  theme: 'light' | 'dark' | 'system';
  currency: string;
  language: string;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setCurrency: (currency: string) => void;
  setLanguage: (language: string) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: 'system',
      currency: 'USD',
      language: 'en-US',
      setTheme: (theme) => {
        set({ theme });
        // Handle actual DOM class updates here if needed, or in a provider wrapper
      },
      setCurrency: (currency) => set({ currency }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'preferences-storage',
    }
  )
);
