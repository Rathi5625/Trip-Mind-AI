import { create } from "zustand"
import { ReviewState } from "../types/review"

export const useReviewStore = create<ReviewState>((set) => ({
  isGenerating: false,
  progress: 0,
  error: null,

  setGenerating: (isGenerating) => set({ isGenerating }),
  setProgress: (progress) => set({ progress }),
  setError: (error) => set({ error }),
  resetReviewStore: () => set({
    isGenerating: false,
    progress: 0,
    error: null
  })
}))
