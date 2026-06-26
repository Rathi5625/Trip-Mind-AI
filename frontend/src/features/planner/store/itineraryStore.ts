"use client"

import { create } from "zustand"
import { ItineraryWorkspaceData } from "../services/itinerary.service"
import { AIMessageItem } from "../types/planner"

interface ItineraryState {
  itineraryData: ItineraryWorkspaceData | null
  activeDayNumber: number
  messages: AIMessageItem[]
  isEditing: boolean
  isStreaming: boolean
  highlightedActivityId: string | null
  budgetImpact: { before: number; after: number; savings: number } | null
  
  setItineraryData: (data: ItineraryWorkspaceData) => void
  setActiveDayNumber: (day: number) => void
  addMessage: (msg: AIMessageItem) => void
  setEditing: (val: boolean) => void
  setStreaming: (val: boolean) => void
  setHighlightedActivityId: (id: string | null) => void
  setBudgetImpact: (impact: { before: number; after: number; savings: number } | null) => void
  updateActivityNotes: (activityId: string, notes: string) => void
  updateLastMessageText: (text: string) => void
  resetItineraryStore: () => void
}

export const useItineraryStore = create<ItineraryState>((set) => ({
  itineraryData: null,
  activeDayNumber: 1,
  messages: [],
  isEditing: false,
  isStreaming: false,
  highlightedActivityId: null,
  budgetImpact: null,

  setItineraryData: (data) => set({ itineraryData: data }),
  setActiveDayNumber: (day) => set({ activeDayNumber: day }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setEditing: (val) => set({ isEditing: val }),
  setStreaming: (val) => set({ isStreaming: val }),
  setHighlightedActivityId: (id) => set({ highlightedActivityId: id }),
  setBudgetImpact: (impact) => set({ budgetImpact: impact }),
  
  updateActivityNotes: (activityId, notes) => set((state) => {
    if (!state.itineraryData) return {}
    const updated = JSON.parse(JSON.stringify(state.itineraryData)) as ItineraryWorkspaceData
    
    // Find and update activity notes
    for (const day of updated.itinerary.days) {
      const act = day.activities.find((a) => a.id === activityId)
      if (act) {
        act.notes = notes
        break
      }
    }
    return { itineraryData: updated }
  }),
  
  updateLastMessageText: (text) => set((state) => {
    if (state.messages.length === 0) return {}
    const updated = [...state.messages]
    updated[updated.length - 1] = {
      ...updated[updated.length - 1],
      text,
    }
    return { messages: updated }
  }),

  resetItineraryStore: () => set({
    itineraryData: null,
    activeDayNumber: 1,
    messages: [],
    isEditing: false,
    isStreaming: false,
    highlightedActivityId: null,
    budgetImpact: null,
  }),
}))
