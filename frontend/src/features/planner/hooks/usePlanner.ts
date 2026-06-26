"use client"

import { useMutation } from "@tanstack/react-query"
import { usePlannerStore } from "../store/plannerStore"
import { useAIStream } from "./useAIStream"
import { plannerService } from "../services/planner.service"
import { AIMessageItem } from "../types/planner"

export function usePlanner() {
  const {
    messages,
    inputPrompt,
    currentDestination,
    isGenerating,
    isStreaming,
    setInputPrompt,
    setSelectedTemplate,
    setGenerating,
    setCurrentDestination,
    addMessage,
    clearMessages,
  } = usePlannerStore()

  const { streamText } = useAIStream()

  const mutation = useMutation({
    mutationFn: plannerService.generateTripPlan,
    onMutate: () => {
      setGenerating(true)
    },
    onSuccess: async (data) => {
      setGenerating(false)
      
      // Update destination in right panel
      setCurrentDestination(data.destination)

      // Add empty AI message to be streamed into
      const aiMessage: AIMessageItem = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "",
        timestamp: new Date(),
        status: "typing",
      }
      addMessage(aiMessage)

      // Stream the itinerary text
      await streamText(data.itinerary)
    },
    onError: () => {
      setGenerating(false)
      const errorMessage: AIMessageItem = {
        id: `error-${Date.now()}`,
        sender: "ai",
        text: "Sorry, I encountered an error while planning your trip. Let's try again.",
        timestamp: new Date(),
        status: "done",
      }
      addMessage(errorMessage)
    },
  })

  const submitPrompt = (promptText?: string) => {
    const promptToSubmit = promptText || inputPrompt
    if (!promptToSubmit.trim() || isGenerating || isStreaming) return

    // Clear input if submitting from the main text field
    if (!promptText) {
      setInputPrompt("")
    }

    // Add User Message
    const userMessage: AIMessageItem = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: promptToSubmit,
      timestamp: new Date(),
      status: "done",
    }
    addMessage(userMessage)

    // Trigger AI generation mutation
    mutation.mutate(promptToSubmit)
  }

  const startNewSession = () => {
    clearMessages()
    setSelectedTemplate(null)
    setInputPrompt("")
  }

  return {
    messages,
    inputPrompt,
    currentDestination,
    isGenerating,
    isStreaming,
    setInputPrompt,
    submitPrompt,
    startNewSession,
    clearMessages,
  }
}
