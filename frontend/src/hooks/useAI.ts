import { useMutation, useQuery } from "@tanstack/react-query"
import { aiService } from "../services/ai"

export function useAIOptimize() {
  return useMutation({
    mutationFn: aiService.optimize
  })
}

export function useAIRecommend() {
  return useMutation({
    mutationFn: ({ category, location, tripId }: { category: string; location: string; tripId?: string }) =>
      aiService.recommend(category, location, tripId)
  })
}

export function useAIHiddenGems() {
  return useMutation({
    mutationFn: aiService.hiddenGems
  })
}

export function useAIWeather() {
  return useMutation({
    mutationFn: ({ destination, tripId }: { destination: string; tripId?: string }) =>
      aiService.weather(destination, tripId)
  })
}

export function useAIBudget() {
  return useMutation({
    mutationFn: ({ budgetLimit, tripId }: { budgetLimit: number; tripId?: string }) =>
      aiService.budget(budgetLimit, tripId)
  })
}

export function useAITransport() {
  return useMutation({
    mutationFn: ({ destination, tripId }: { destination: string; tripId?: string }) =>
      aiService.transport(destination, tripId)
  })
}

export function useAIDestination() {
  return useMutation({
    mutationFn: aiService.destination
  })
}

export function useAIActivity() {
  return useMutation({
    mutationFn: aiService.activity
  })
}

export function useAIItinerary() {
  return useMutation({
    mutationFn: ({ command, tripId }: { command: string; tripId?: string }) =>
      aiService.itinerary(command, tripId)
  })
}

export function useAIMap() {
  return useMutation({
    mutationFn: ({ coordinates, tripId }: { coordinates: any; tripId?: string }) =>
      aiService.map(coordinates, tripId)
  })
}

export function useAISearch() {
  return useMutation({
    mutationFn: aiService.search
  })
}
