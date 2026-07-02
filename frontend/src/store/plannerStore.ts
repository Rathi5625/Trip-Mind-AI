import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlannerState {
  destinationId: string | null;
  startDate: string | null;
  endDate: string | null;
  budgetCategory: 'Budget' | 'Mid-range' | 'Luxury' | null;
  travelers: { adults: number; children: number };
  preferences: string[];
  setDestination: (id: string) => void;
  setDates: (start: string, end: string) => void;
  setBudget: (category: 'Budget' | 'Mid-range' | 'Luxury') => void;
  setTravelers: (adults: number, children: number) => void;
  togglePreference: (pref: string) => void;
  resetPlanner: () => void;
}

export const usePlannerStore = create<PlannerState>()(
  persist(
    (set) => ({
      destinationId: null,
      startDate: null,
      endDate: null,
      budgetCategory: null,
      travelers: { adults: 1, children: 0 },
      preferences: [],
      
      setDestination: (id) => set({ destinationId: id }),
      setDates: (start, end) => set({ startDate: start, endDate: end }),
      setBudget: (category) => set({ budgetCategory: category }),
      setTravelers: (adults, children) => set({ travelers: { adults, children } }),
      togglePreference: (pref) => set((state) => ({
        preferences: state.preferences.includes(pref)
          ? state.preferences.filter(p => p !== pref)
          : [...state.preferences, pref]
      })),
      resetPlanner: () => set({
        destinationId: null,
        startDate: null,
        endDate: null,
        budgetCategory: null,
        travelers: { adults: 1, children: 0 },
        preferences: []
      })
    }),
    {
      name: 'planner-storage',
    }
  )
);
