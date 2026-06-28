"use client"

import * as React from "react"
import { Search, Mic, MicOff, Loader2 } from "lucide-react"
import { useTripWizardStore } from "../store/tripWizardStore"
import { motion, AnimatePresence } from "framer-motion"

export function DestinationSearch() {
  const { searchQuery, setSearchQuery, voiceActive, setVoiceActive, isSearching } = useTripWizardStore()
  const [typedPlaceholder, setTypedPlaceholder] = React.useState("")
  const fullPlaceholder = "A luxury weekend getaway in the Swiss Alps..."
  
  // Typing placeholder effect
  React.useEffect(() => {
    let index = 0
    let intervalId = setInterval(() => {
      setTypedPlaceholder(fullPlaceholder.substring(0, index))
      index++
      if (index > fullPlaceholder.length) {
        clearInterval(intervalId)
      }
    }, 80)
    return () => clearInterval(intervalId)
  }, [])

  const handleVoiceToggle = () => {
    if (voiceActive) {
      setVoiceActive(false)
    } else {
      setVoiceActive(true)
      // Simulate capturing speech
      setTimeout(() => {
        setSearchQuery("Swiss Alps Ski Chalets")
        setVoiceActive(false)
      }, 3000)
    }
  }

  const handleClear = () => {
    setSearchQuery("")
  }

  return (
    <div className="w-full select-none">
      <div className="relative flex items-center w-full p-1.5 rounded-full border border-black/5 bg-white/50 backdrop-blur-xl shadow-md dark:border-white/5 dark:bg-slate-900/50">
        
        {/* Search Icon */}
        <div className="pl-4 pr-2 text-slate-400">
          {isSearching ? (
            <Loader2 className="size-4 animate-spin text-blue-500" />
          ) : (
            <Search className="size-4.5" />
          )}
        </div>

        {/* Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={typedPlaceholder || "Where would you like to escape?"}
          className="flex-1 bg-transparent py-3 text-[11.5px] font-semibold text-slate-800 dark:text-slate-100 outline-none placeholder-slate-400 focus:ring-0"
        />

        {/* Clear Button */}
        {searchQuery && (
          <button
            onClick={handleClear}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold mr-2 cursor-pointer"
          >
            ✕
          </button>
        )}

        {/* Microphone Voice Button */}
        <button
          onClick={handleVoiceToggle}
          className={`flex size-10 items-center justify-center rounded-full transition-all cursor-pointer ${
            voiceActive
              ? "bg-red-500 text-white shadow-lg animate-pulse"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          }`}
          aria-label="Voice Search"
        >
          {voiceActive ? <MicOff className="size-4" /> : <Mic className="size-4.5" />}
        </button>

        {/* Voice Wave Overlay Simulation */}
        <AnimatePresence>
          {voiceActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute left-1/2 -top-16 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-900 border border-white/10 shadow-xl text-white text-[9.5px] font-black z-30"
            >
              <div className="flex gap-0.5 items-end h-3">
                <span className="w-0.5 bg-red-400 rounded-full animate-bounce h-2" style={{ animationDelay: "0ms" }} />
                <span className="w-0.5 bg-red-400 rounded-full animate-bounce h-3" style={{ animationDelay: "150ms" }} />
                <span className="w-0.5 bg-red-400 rounded-full animate-bounce h-1.5" style={{ animationDelay: "300ms" }} />
                <span className="w-0.5 bg-red-400 rounded-full animate-bounce h-2.5" style={{ animationDelay: "450ms" }} />
              </div>
              <span>Atlas Listening...</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
