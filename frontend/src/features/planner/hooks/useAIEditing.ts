"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useItineraryStore } from "../store/itineraryStore"
import { itineraryService } from "../services/itinerary.service"
import { AIMessageItem } from "../types/planner"

export function useAIEditing() {
  const [inputText, setInputText] = useState("")
  
  const {
    itineraryData,
    setItineraryData,
    messages,
    addMessage,
    updateLastMessageText,
    isEditing,
    setEditing,
    isStreaming,
    setStreaming,
  } = useItineraryStore()

  const mutation = useMutation({
    mutationFn: (prompt: string) => {
      if (!itineraryData) throw new Error("No itinerary data to modify")
      return itineraryService.editItinerary(prompt, itineraryData)
    },
    onMutate: () => {
      setEditing(true)
    },
    onSuccess: async (data, prompt) => {
      setEditing(false)
      setStreaming(true)

      // Add empty AI message
      const aiMsgId = `ai-${Date.now()}`
      const aiMessage: AIMessageItem = {
        id: aiMsgId,
        sender: "ai",
        text: "",
        timestamp: new Date(),
        status: "typing",
      }
      addMessage(aiMessage)

      // Choose appropriate explanatory stream text
      const promptLower = prompt.toLowerCase()
      let explanation = ""
      if (promptLower.includes("coffee") || promptLower.includes("cafe")) {
        explanation = "☕ I have successfully updated Day 1! I injected a cozy artisanal coffee stop in Yanaka at 10:30 AM right between Ueno Park and your Ginza Sushi lunch. The timeline, daily costs, and route vectors have been updated."
      } else if (promptLower.includes("hidden gem") || promptLower.includes("gem") || promptLower.includes("local")) {
        explanation = "✨ Hidden gem found! I have added a tiny 4-seat bar in Golden Gai at 08:30 PM on Day 1, following your evening Shibuya crossing nightwalk. It fits perfectly into your local food and drinks theme."
      } else if (promptLower.includes("budget") || promptLower.includes("cheaper") || promptLower.includes("optimize")) {
        explanation = "💸 Optimization complete! I searched for budget deals and saved ₹40,000 on flights and hotel rates. The readiness score is raised to 95%."
      } else if (promptLower.includes("relax") || promptLower.includes("slower")) {
        explanation = "🍃 Pace adjusted! I slowed down Day 1 by removing the heavy Ginza sushi dine-in, giving you more leisure time in Ueno Park. The crowd density forecast is now low."
      } else {
        explanation = "⚙️ I have analyzed your request and recalculated the Tokyo Culinary Journey. The timeline nodes, route vectors, and budget breakdown estimates have been re-calibrated successfully!"
      }

      // Stream the explanation text
      const words = explanation.split(" ")
      let currentText = ""
      
      for (let i = 0; i < words.length; i++) {
        currentText += (i === 0 ? "" : " ") + words[i]
        updateLastMessageText(currentText)
        await new Promise((resolve) => setTimeout(resolve, 80))
      }

      setStreaming(false)
      // Save modified itinerary data to the store
      setItineraryData(data)
    },
    onError: () => {
      setEditing(false)
      const errorMsg: AIMessageItem = {
        id: `err-${Date.now()}`,
        sender: "ai",
        text: "I encountered an issue modifying your itinerary. Let's try adjusting the prompt.",
        timestamp: new Date(),
        status: "done",
      }
      addMessage(errorMsg)
    },
  })

  const submitEdit = (promptText?: string) => {
    const promptToSubmit = promptText || inputText
    if (!promptToSubmit.trim() || isEditing || isStreaming) return

    if (!promptText) {
      setInputText("")
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

    // Trigger edit mutation
    mutation.mutate(promptToSubmit)
  }

  return {
    inputText,
    setInputText,
    messages,
    submitEdit,
    isEditing,
    isStreaming,
  }
}
