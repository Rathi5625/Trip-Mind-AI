"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"
import { SavingTip } from "../types/destination"

interface MoneySavingTipsProps {
  tips: SavingTip[]
}

export function MoneySavingTips({ tips }: MoneySavingTipsProps) {
  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4 select-none text-left w-full h-full">
      
      {/* Header */}
      <div className="flex items-center gap-1.5 text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
        <span>🐷</span>
        <span>Money Saving Tips</span>
      </div>

      {/* Saving Tips list */}
      <div className="space-y-4">
        {tips.map((t) => (
          <div
            key={t.id}
            className="p-4 rounded-2xl border border-black/5 bg-slate-50/50 dark:border-white/5 dark:bg-slate-950/20 space-y-1"
          >
            <h5 className="text-[10.5px] font-black text-slate-805 dark:text-white leading-none">
              {t.title}
            </h5>
            <p className="text-[9.5px] font-semibold text-slate-550 dark:text-slate-400 leading-relaxed pt-0.5">
              {t.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}
