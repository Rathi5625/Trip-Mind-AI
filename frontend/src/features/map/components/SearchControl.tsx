"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, X, Loader2 } from "lucide-react"
import { useSearch } from "../hooks/useSearch"
import { useMapCamera } from "../hooks/useMapCamera"
import { useMapStore } from "../store/mapStore"

export function SearchControl() {
  const { query, setQuery, results, isLoading, clearSearch } = useSearch({ limit: 5 })
  const { flyTo } = useMapCamera()
  const setSelectedDestinationId = useMapStore((s) => s.setSelectedDestinationId)
  const setSelectedMarkerId = useMapStore((s) => s.setSelectedMarkerId)

  const [isFocused, setIsFocused] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (item: any) => {
    setSelectedDestinationId(String(item.placeId))
    setSelectedMarkerId(String(item.placeId))
    flyTo(item.coordinates, 8)
    setIsFocused(false)
    setQuery(item.name)
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-sm z-30 select-none">
      {/* Search Input Bar */}
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-lg transition-all focus-within:ring-2 focus-within:ring-blue-500">
        <Search className="size-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search destinations..."
          className="flex-grow bg-transparent text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none border-0 p-0 focus:ring-0"
        />
        {isLoading ? (
          <Loader2 className="size-3.5 text-slate-400 animate-spin shrink-0" />
        ) : query ? (
          <button
            onClick={clearSearch}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors border-0 outline-none cursor-pointer"
            aria-label="Clear search"
          >
            <X className="size-3.5" />
          </button>
        ) : null}
      </div>

      {/* Suggestion Dropdown */}
      <AnimatePresence>
        {isFocused && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl p-2 max-h-64 overflow-y-auto space-y-0.5"
          >
            {results.map((item) => (
              <button
                key={item.placeId}
                onClick={() => handleSelect(item)}
                className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-left cursor-pointer transition-colors focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800"
              >
                <MapPin className="size-4 text-blue-500 shrink-0" />
                <div className="truncate">
                  <p className="text-xs font-black text-slate-800 dark:text-slate-100 truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold truncate mt-0.5">
                    {item.displayName}
                  </p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
