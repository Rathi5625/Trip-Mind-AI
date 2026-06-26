"use client"

import { create } from "zustand"
import { AIMessageItem, DestinationInfo } from "../types/planner"
import { INITIAL_DESTINATION } from "../constants/plannerPrompts"

interface PlannerState {
  messages: AIMessageItem[]
  currentDestination: DestinationInfo
  inputPrompt: string
  selectedTemplate: string | null
  isGenerating: boolean
  isStreaming: boolean
  
  setInputPrompt: (val: string) => void
  setSelectedTemplate: (id: string | null) => void
  setGenerating: (val: boolean) => void
  setStreaming: (val: boolean) => void
  setCurrentDestination: (dest: DestinationInfo) => void
  addMessage: (msg: AIMessageItem) => void
  updateLastMessageText: (text: string) => void
  clearMessages: () => void
}

export const usePlannerStore = create<PlannerState>((set) => ({
  messages: [],
  currentDestination: INITIAL_DESTINATION,
  inputPrompt: "",
  selectedTemplate: null,
  isGenerating: false,
  isStreaming: false,

  setInputPrompt: (val) => set({ inputPrompt: val }),
  setSelectedTemplate: (id) => set({ selectedTemplate: id }),
  setGenerating: (val) => set({ isGenerating: val }),
  setStreaming: (val) => set({ isStreaming: val }),
  setCurrentDestination: (dest) => set({ currentDestination: dest }),
  
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  
  updateLastMessageText: (text) => set((state) => {
    if (state.messages.length === 0) return {}
    const updated = [...state.messages]
    updated[updated.length - 1] = {
      ...updated[updated.length - 1],
      text,
    }
    return { messages: updated }
  }),

  clearMessages: () => set({ messages: [], currentDestination: INITIAL_DESTINATION }),
}))
