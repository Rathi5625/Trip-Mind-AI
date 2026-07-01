"use client"

import * as React from "react"
import { Search, Calendar, Wallet, Users, Mic } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (val: string) => void
  onSubmit: (e?: React.FormEvent) => void
}

export function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-3xl mx-auto px-4 select-none"
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 p-2 rounded-3xl border border-black/5 bg-white/70 dark:border-white/5 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg">
        
        {/* Destination input field */}
        <div className="flex items-center gap-2 px-3 py-2 flex-grow min-w-[200px]">
          <Search className="size-4.5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search destination..."
            className="w-full bg-transparent border-none text-slate-805 dark:text-slate-100 placeholder-slate-405 text-sm font-semibold focus:outline-none"
          />
        </div>

        {/* Divider desktop */}
        <div className="hidden md:block w-px h-6 bg-slate-200 dark:bg-slate-800" />

        {/* Date Selector */}
        <button
          type="button"
          onClick={() => alert("Calendar selector toggled")}
          className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase text-slate-455 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl shrink-0 cursor-pointer"
        >
          <Calendar className="size-4 text-slate-400" />
          <span>Dates</span>
        </button>

        {/* Divider desktop */}
        <div className="hidden md:block w-px h-6 bg-slate-200 dark:bg-slate-800" />

        {/* Budget Selector */}
        <button
          type="button"
          onClick={() => alert("Budget filters toggled")}
          className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase text-slate-455 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl shrink-0 cursor-pointer"
        >
          <Wallet className="size-4 text-slate-400" />
          <span>Budget</span>
        </button>

        {/* Divider desktop */}
        <div className="hidden md:block w-px h-6 bg-slate-200 dark:bg-slate-800" />

        {/* Traveler Selector */}
        <button
          type="button"
          onClick={() => alert("Travelers headcounts toggled")}
          className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase text-slate-455 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl shrink-0 cursor-pointer"
        >
          <Users className="size-4 text-slate-400" />
          <span>Travelers</span>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pl-2">
          {/* Voice button */}
          <button
            type="button"
            onClick={() => alert("Voice search is active...")}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            title="Voice Search"
          >
            <Mic className="size-4" />
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="flex px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider shadow cursor-pointer transition-colors"
          >
            Search
          </button>
        </div>

      </div>
    </form>
  )
}
