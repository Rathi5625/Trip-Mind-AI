"use client"

import * as React from "react"
import { Languages, Coins, Clock, ShieldCheck } from "lucide-react"

interface QuickInfoCardsProps {
  language: string
  currency: string
  timezone: string
  visaStatus: string
}

export function QuickInfoCards({
  language,
  currency,
  timezone,
  visaStatus
}: QuickInfoCardsProps) {
  const cards = [
    { label: "Language", value: language, icon: Languages, color: "text-blue-500 bg-blue-500/10" },
    { label: "Currency", value: currency, icon: Coins, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Time Zone", value: timezone, icon: Clock, color: "text-indigo-500 bg-indigo-500/10" },
    { label: "Visa Status", value: visaStatus, icon: ShieldCheck, color: "text-purple-500 bg-purple-500/10" }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left select-none max-w-6xl mx-auto">
      {cards.map((c) => {
        const Icon = c.icon
        return (
          <div
            key={c.label}
            className="p-4 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            {/* Rounded icon box */}
            <div className={`flex size-10 items-center justify-center rounded-2xl shrink-0 ${c.color}`}>
              <Icon className="size-5" />
            </div>

            <div className="space-y-0.5">
              <span className="block text-[9px] font-black uppercase text-slate-400 tracking-wider">
                {c.label}
              </span>
              <span className="block text-xs font-black text-slate-700 dark:text-slate-205 leading-none">
                {c.value}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
