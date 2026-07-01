"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Search, Mic, ArrowRight } from "lucide-react"
import { SearchSuggestions } from "./SearchSuggestions"

interface HeroSearchProps {
  searchQuery: string
  setSearchQuery: (q: string) => void
  suggestionChips: string[]
  onSelectChip: (chip: string) => void
  onSubmit: (e?: React.FormEvent) => void
  onVoice: () => void
}

export function HeroSearch({
  searchQuery,
  setSearchQuery,
  suggestionChips,
  onSelectChip,
  onSubmit,
  onVoice
}: HeroSearchProps) {
  const [isFocused, setIsFocused] = React.useState(false)

  return (
    <div className="py-12 md:py-20 flex flex-col items-center justify-center text-center space-y-8 select-none">
      
      {/* Title & Subtitle */}
      <div className="space-y-3.5 max-w-xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Discover Your Next Adventure
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-400 leading-relaxed">
          Explore personalized destinations and AI-curated experiences tailored to your unique travel DNA.
        </p>
      </div>

      {/* Big Search Bar Container */}
      <form
        onSubmit={onSubmit}
        className="w-full max-w-2xl px-4 relative"
      >
        <div
          className={`flex items-center gap-3 w-full px-5 py-3.5 rounded-full border bg-[#1E293B]/40 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg transition-all duration-300
            ${
              isFocused
                ? "border-blue-500/40 ring-4 ring-blue-500/10 shadow-blue-500/5"
                : "border-white/10"
            }
          `}
        >
          {/* Left search icon */}
          <Search className="size-4.5 text-slate-400 shrink-0" />

          {/* Text Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Take me to a hidden beach in Bali..."
            className="flex-grow bg-transparent border-none text-slate-100 placeholder-slate-400 text-xs sm:text-sm focus:outline-none"
          />

          {/* Right Voice button */}
          <button
            type="button"
            onClick={onVoice}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title="Voice Search"
          >
            <Mic className="size-4" />
          </button>

          {/* Arrow submission circular button */}
          <button
            type="submit"
            className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-900 hover:bg-white transition-colors cursor-pointer shrink-0 shadow"
            aria-label="Search"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </form>

      {/* Suggestion Chips */}
      <SearchSuggestions chips={suggestionChips} onSelect={onSelectChip} />

    </div>
  )
}
