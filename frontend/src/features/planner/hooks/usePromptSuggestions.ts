"use client"

import * as React from "react"
import { usePlannerStore } from "../store/plannerStore"
import { PROMPT_SUGGESTIONS } from "../constants/plannerPrompts"

export function usePromptSuggestions() {
  const { setInputPrompt } = usePlannerStore()

  const selectSuggestion = (promptText: string) => {
    setInputPrompt(promptText)
  }

  return {
    suggestions: PROMPT_SUGGESTIONS,
    selectSuggestion,
  }
}
