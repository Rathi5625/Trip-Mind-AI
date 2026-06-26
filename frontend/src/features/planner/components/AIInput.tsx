"use client"

import * as React from "react"
import { MapPin, Calendar, Wallet, Mic, Image, Sparkles } from "lucide-react"
import { usePlannerStore } from "../store/plannerStore"
import { usePlanner } from "../hooks/usePlanner"
import { PromptInput } from "@/components/ui/PromptInput"
import { GenerateButton } from "./GenerateButton"

export function AIInput() {
  const { inputPrompt, setInputPrompt } = usePlannerStore()
  const { submitPrompt, isGenerating, isStreaming } = usePlanner()
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      submitPrompt()
    }
  }

  const handleIconClick = (actionName: string) => {
    alert(`${actionName} filter overlay activated! Context injected.`)
  }

  const isSubmitDisabled = !inputPrompt.trim() || isGenerating || isStreaming

  return (
    <div className="relative w-full rounded-3xl border border-black/5 bg-white shadow-lg backdrop-blur-md dark:border-white/5 dark:bg-slate-900/60 transition-all select-none">
      {/* Textarea Row */}
      <div className="w-full">
        <PromptInput
          ref={textareaRef}
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Planning a 5-day foodie trip to Tokyo for 2 people in October. We love sushi and want to visit a tea ceremony..."
          className="min-h-[64px]"
        />
      </div>

      {/* Toolbar Footer Row */}
      <div className="flex items-center justify-between px-4 pb-3 pt-1 border-t border-slate-50 dark:border-white/5">
        {/* Left tools group */}
        <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
          <button
            onClick={() => handleIconClick("Location")}
            className="p-1.5 rounded-lg hover:bg-slate-50 hover:text-slate-650 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            aria-label="Add location filter"
            title="Location"
          >
            <MapPin className="size-4" />
          </button>
          <button
            onClick={() => handleIconClick("Calendar")}
            className="p-1.5 rounded-lg hover:bg-slate-50 hover:text-slate-650 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            aria-label="Add date range"
            title="Dates"
          >
            <Calendar className="size-4" />
          </button>
          <button
            onClick={() => handleIconClick("Budget")}
            className="p-1.5 rounded-lg hover:bg-slate-50 hover:text-slate-650 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            aria-label="Add budget limits"
            title="Budget"
          >
            <Wallet className="size-4" />
          </button>
          
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

          <button
            onClick={() => handleIconClick("Voice")}
            className="p-1.5 rounded-lg hover:bg-slate-50 hover:text-slate-650 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            aria-label="Voice input"
            title="Voice input"
          >
            <Mic className="size-4" />
          </button>
          <button
            onClick={() => handleIconClick("Image")}
            className="p-1.5 rounded-lg hover:bg-slate-50 hover:text-slate-650 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            aria-label="Upload image"
            title="Upload image references"
          >
            <Image className="size-4" />
          </button>
        </div>

        {/* Right submit group */}
        <GenerateButton
          isGenerating={isGenerating}
          isStreaming={isStreaming}
          onClick={() => submitPrompt()}
          disabled={isSubmitDisabled}
        />
      </div>
    </div>
  )
}
