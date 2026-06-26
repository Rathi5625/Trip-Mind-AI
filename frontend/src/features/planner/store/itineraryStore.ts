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
  
  setItineraryData: (data: ItineraryWorkspaceData) => void
  setActiveDayNumber: (day: number) => void
  addMessage: (msg: AIMessageItem) => void
  setEditing: (val: boolean) => void
  setStreaming: (val: boolean) => void
  updateLastMessageText: (text: string) => void
  resetItineraryStore: () => void
}

export const useItineraryStore = create<ItineraryState>((set) => ({
  itineraryData: null,
  activeDayNumber: 1,
  messages: [],
  isEditing: false,
  isStreaming: false,

  setItineraryData: (data) => set({ itineraryData: data }),
  setActiveDayNumber: (day) => set({ activeDayNumber: day }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setEditing: (val) => set({ isEditing: val }),
  setStreaming: (val) => set({ isStreaming: val }),
  
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
  }),
}))
