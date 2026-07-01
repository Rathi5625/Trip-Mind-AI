"use client"

import * as React from "react"
import { SearchBar } from "./SearchBar"

interface SearchHeroProps {
  value: string
  onChange: (val: string) => void
  onSubmit: (e?: React.FormEvent) => void
}

export function SearchHero({ value, onChange, onSubmit }: SearchHeroProps) {
  return (
    <div className="relative py-14 bg-slate-100/50 dark:bg-slate-900/10 border-b border-black/5 dark:border-white/5 select-none w-full text-center space-y-6">
      
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-black text-slate-850 dark:text-white tracking-tight leading-none">
        Search Results Intelligence
      </h1>

      {/* Embedded SearchBar */}
      <SearchBar value={value} onChange={onChange} onSubmit={onSubmit} />

    </div>
  )
}
