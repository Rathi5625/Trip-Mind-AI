"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, DollarSign, Mic, Send, Image, Loader2 } from "lucide-react"
import { useAIEditing } from "../hooks/useAIEditing"

export function AIEditBox() {
  const { inputText, setInputText, submitEdit, isEditing, isStreaming } = useAIEditing()
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSend = () => {
    if (!inputText.trim() || isEditing || isStreaming) return
    submitEdit()
  }

  const handleToolClick = (toolName: string) => {
    alert(`Tool '${toolName}' activated! This adds smart travel context to the prompt.`)
  }

  return (
    <div className="w-full select-none">
      <div className="relative rounded-3xl border border-black/5 bg-white/70 shadow-lg dark:border-white/5 dark:bg-slate-900/60 backdrop-blur-xl p-4 flex flex-col gap-3">
        {/* Text Input area */}
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask AI to adjust the itinerary, add more dining options, change the pace, or include hidden gems..."
          disabled={isEditing || isStreaming}
          rows={3}
          className="w-full resize-none bg-transparent border-0 outline-none text-xs font-semibold text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-0 focus:ring-offset-0 px-1 py-1 no-scrollbar leading-relaxed"
        />

        {/* Toolbar Controls */}
        <div className="flex items-center justify-between border-t border-slate-50 dark:border-white/5 pt-3">
          {/* Assistive Tags / Tools */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleToolClick("Location")}
              className="p-2 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
              title="Add Location Parameter"
              aria-label="Add Location"
            >
              <MapPin className="size-4" />
            </button>
            
            <button
              onClick={() => handleToolClick("Calendar")}
              className="p-2 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
              title="Add Calendar Dates"
              aria-label="Add Dates"
            >
              <Calendar className="size-4" />
            </button>

            <button
              onClick={() => handleToolClick("Budget")}
              className="p-2 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
              title="Set Budget Threshold"
              aria-label="Add Budget Limit"
            >
              <DollarSign className="size-4" />
            </button>

            <button
              onClick={() => handleToolClick("Voice")}
              className="p-2 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
              title="Voice Input Command"
              aria-label="Voice Command"
            >
              <Mic className="size-4" />
            </button>
          </div>

          {/* Send Action */}
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isEditing || isStreaming}
            className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-slate-900 text-white font-extrabold text-[10px] hover:bg-slate-850 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shrink-0 cursor-pointer"
          >
            {isEditing ? (
              <>
                <Loader2 className="size-3 animate-spin" />
                <span>Adjusting...</span>
              </>
            ) : (
              <>
                <span>Send</span>
                <Send className="size-3 shrink-0" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
