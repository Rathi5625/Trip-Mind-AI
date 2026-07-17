import { useMutation } from "@tanstack/react-query"
import { aiService } from "../services/ai"

export function useAIPlanner() {
  return useMutation({
    mutationFn: aiService.planner
  })
}
