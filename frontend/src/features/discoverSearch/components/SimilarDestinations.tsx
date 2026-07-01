"use client"

import * as React from "react"
import { Compass } from "lucide-react"

export function SimilarDestinations() {
  const suggestions = [
    { name: "South Korea", flag: "🇰🇷" },
    { name: "Taiwan", flag: "🇹🇼" },
    { name: "Vietnam", flag: "🇻🇳" },
    { name: "Thailand", flag: "🇹🇭" }
  ]

  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-3.5 select-none text-left w-full">
      
      <h4 className="text-[10px] font-black uppercase text-slate-455 dark:text-slate-400 tracking-wider flex items-center gap-1.5">
        <Compass className="size-4 text-blue-500" />
        <span>People searching for Japan also explored:</span>
      </h4>

      {/* Grid of similarity suggestion chips */}
      <div className="grid grid-cols-2 gap-2">
        {suggestions.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => alert(`Exploring alternative: ${item.name}`)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-black/5 bg-slate-50 hover:bg-slate-100 dark:border-white/5 dark:bg-slate-950/20 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
          >
            <span className="text-sm">{item.flag}</span>
            <span className="text-[10.5px] font-black text-slate-700 dark:text-slate-300">
              {item.name}
            </span>
          </button>
        ))}
      </div>

    </div>
  )
}
