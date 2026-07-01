"use client"

import * as React from "react"
import { Check } from "lucide-react"

interface FilterSidebarProps {
  budgetRange: [number, number]
  setBudgetRange: (range: [number, number]) => void
  duration: string
  setDuration: (dur: string) => void
  travelStyles: string[]
  toggleTravelStyle: (style: string) => void
  minMatchScore: number
  setMinMatchScore: (score: number) => void
  resetFilters: () => void
  durationOptions: string[]
  travelStyleOptions: string[]
}

export function FilterSidebar({
  budgetRange,
  setBudgetRange,
  duration,
  setDuration,
  travelStyles,
  toggleTravelStyle,
  minMatchScore,
  setMinMatchScore,
  resetFilters,
  durationOptions,
  travelStyleOptions
}: FilterSidebarProps) {
  
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = parseInt(e.target.value)
    const newRange = [...budgetRange] as [number, number]
    newRange[index] = val
    if (newRange[0] <= newRange[1]) {
      setBudgetRange(newRange)
    }
  }

  return (
    <div className="w-full lg:w-[260px] p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-6 text-left select-none shrink-0">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
        <h3 className="text-sm font-black text-slate-805 dark:text-white uppercase tracking-wider">
          Filters
        </h3>
        <button
          onClick={resetFilters}
          className="text-[10px] font-black uppercase text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>

      {/* Budget Range */}
      <div className="space-y-3">
        <h4 className="text-[10.5px] font-black uppercase text-slate-455 dark:text-slate-400 tracking-wider">
          Budget Range
        </h4>
        <div className="flex items-center justify-between text-[10px] font-black text-slate-400 dark:text-slate-500">
          <span>₹20k</span>
          <span>₹250k+</span>
        </div>

        {/* Dual sliders representation or single slider range indicator */}
        <div className="space-y-2">
          <input
            type="range"
            min={20000}
            max={250000}
            step={5000}
            value={budgetRange[1]}
            onChange={(e) => handleBudgetChange(e, 1)}
            className="w-full h-1 bg-blue-600 rounded-lg appearance-none cursor-pointer dark:bg-blue-500"
          />
          <div className="flex items-center justify-between text-[10px] font-black text-slate-655 dark:text-slate-355">
            <span>Range:</span>
            <span>₹{(budgetRange[0] / 1000).toFixed(0)}k - ₹{(budgetRange[1] / 1000).toFixed(0)}k+</span>
          </div>
        </div>
      </div>

      {/* Duration Options */}
      <div className="space-y-3">
        <h4 className="text-[10.5px] font-black uppercase text-slate-455 dark:text-slate-400 tracking-wider">
          Duration
        </h4>
        <div className="flex flex-wrap gap-2">
          {durationOptions.map((opt) => {
            const isActive = duration === opt
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setDuration(opt)}
                className={`px-3.5 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wide cursor-pointer transition-colors
                  ${
                    isActive
                      ? "border-blue-500/20 bg-blue-600/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"
                      : "border-black/5 bg-white text-slate-550 dark:border-white/5 dark:bg-slate-900/60 dark:text-slate-400"
                  }
                `}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      {/* Travel Style Checkboxes */}
      <div className="space-y-3">
        <h4 className="text-[10.5px] font-black uppercase text-slate-455 dark:text-slate-400 tracking-wider">
          Travel Style
        </h4>
        <div className="space-y-2.5">
          {travelStyleOptions.map((style) => {
            const isChecked = travelStyles.includes(style)
            return (
              <label
                key={style}
                className="flex items-center gap-3 cursor-pointer group text-xs text-slate-700 dark:text-slate-300 font-semibold"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleTravelStyle(style)}
                  className="sr-only"
                />
                
                {/* Custom Checkbox */}
                <div
                  className={`size-4.5 rounded border flex items-center justify-center transition-colors shrink-0
                    ${
                      isChecked
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "border-slate-300 bg-white group-hover:border-slate-450 dark:border-slate-700 dark:bg-slate-900"
                    }
                  `}
                >
                  {isChecked && <Check className="size-3 stroke-[3]" />}
                </div>

                <span>{style}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* AI Match Score Slider */}
      <div className="space-y-3 pt-2">
        <h4 className="text-[10.5px] font-black uppercase text-slate-455 dark:text-slate-400 tracking-wider">
          AI Match Score
        </h4>
        <div className="flex items-center justify-between text-[10px] font-black text-slate-400 dark:text-slate-500">
          <span>80%</span>
          <span>100%</span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min={80}
            max={100}
            step={1}
            value={minMatchScore}
            onChange={(e) => setMinMatchScore(parseInt(e.target.value))}
            className="w-full h-1 bg-blue-600 rounded-lg appearance-none cursor-pointer dark:bg-blue-500"
          />
          <div className="flex justify-between text-[10px] font-black text-slate-655 dark:text-slate-355 leading-none">
            <span>Min Score:</span>
            <span>{minMatchScore}% Match</span>
          </div>
        </div>
      </div>

    </div>
  )
}
