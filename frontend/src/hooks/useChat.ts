import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { aiService } from "../services/ai"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function useChat(tripId: string = "None") {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I am VoyageAI, your travel concierge. Where are you planning to go, or how can I assist with your itinerary?",
      timestamp: new Date()
    }
  ])

  const chatMutation = useMutation({
    mutationFn: async ({ message, history }: { message: string; history: string }) => {
      return aiService.chat(message, tripId, history)
    },
    onSuccess: (data: any) => {
      const assistantMessage: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: data?.reply || "No response received",
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, assistantMessage])
    }
  })

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: text,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMsg])

    // Build chat history string
    const historyString = messages
      .map((m) => `${m.role === "user" ? "User" : "AI"}: ${m.content}`)
      .join("\n")

    chatMutation.mutate({ message: text, history: historyString })
  }

  return {
    messages,
    sendMessage,
    isPending: chatMutation.isPending,
    error: chatMutation.error
  }
}
