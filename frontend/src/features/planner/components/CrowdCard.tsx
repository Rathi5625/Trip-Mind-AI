"use client"

import * as React from "react"
import { Users } from "lucide-react"

interface CrowdCardProps {
  level: string
  status: string
}

export function CrowdCard({ level, status }: CrowdCardProps) {
  return (
    <div className="flex flex-col justify-between p-4.5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/60 h-28 select-none">
      <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
        <Users className="size-4.5 text-blue-500 shrink-0" />
        <span className="text-[10px] font-black uppercase tracking-wider">Crowds</span>
      </div>
      
      <div className="space-y-0.5 mt-2">
        <span className="block text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none truncate">
          {level}
        </span>
        <span className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 truncate">
          {status}
        </span>
      </div>
    </div>
  )
}
