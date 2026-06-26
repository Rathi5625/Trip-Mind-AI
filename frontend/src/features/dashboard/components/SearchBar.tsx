"use client"

import * as React from "react"
import { Search, Sparkles } from "lucide-react"
import { useDashboardStore } from "../hooks/useDashboard"

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useDashboardStore()
  const [isFocused, setIsFocused] = React.useState(false)

  return (
    <div
      className={`relative flex items-center w-full max-w-xl rounded-full border border-black/5 bg-white/40 shadow-sm backdrop-blur-md transition-all duration-300 dark:border-white/5 dark:bg-slate-900/40 ${
        isFocused
          ? "ring-2 ring-primary-blue/35 border-transparent bg-white/80 dark:bg-slate-900/70"
          : "hover:bg-white/60 dark:hover:bg-slate-900/50"
      }`}
    >
      <div className="absolute left-4 text-slate-400 dark:text-slate-500 flex items-center justify-center pointer-events-none">
        <Search className="size-4 stroke-[2]" />
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Ask AI: Take me to a hidden beach in Bali..."
        className="w-full bg-transparent pl-11 pr-12 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 placeholder-slate-400/80 dark:placeholder-slate-500/80 outline-none border-none select-none"
        aria-label="Ask AI travel search"
      />

      <div className="absolute right-3 flex items-center justify-center text-primary-blue/80 dark:text-blue-400/80 pointer-events-none">
        <Sparkles className="size-3.5 animate-[pulse_2s_infinite]" />
      </div>
    </div>
  )
}
