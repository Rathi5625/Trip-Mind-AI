"use client"

import * as React from "react"
import { ArrowDownAZ } from "lucide-react"

interface SortDropdownProps {
  value: string
  onChange: (val: string) => void
  options: string[]
}

export function SortDropdown({ value, onChange, options }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2 select-none text-xs">
      <ArrowDownAZ className="size-4 text-slate-400 shrink-0" />
      <span className="font-semibold text-slate-400">Sort by:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-2.5 py-1.5 rounded-lg border border-black/5 bg-white text-xs font-black uppercase text-slate-655 dark:border-white/5 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}
