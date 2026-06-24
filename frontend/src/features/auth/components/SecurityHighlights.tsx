"use client"

import * as React from "react"
import { Lock, Sparkles, Navigation } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"

const highlights = [
  {
    title: "Secure Authentication",
    description: "Bank-level encryption for your travel data.",
    icon: Lock,
    iconBg: "bg-blue-500/20 text-blue-400 dark:bg-blue-600/30 dark:text-blue-300",
  },
  {
    title: "AI-Powered Planning",
    description: "Smart algorithms craft your perfect trip.",
    icon: Sparkles,
    iconBg: "bg-orange-500/20 text-orange-400 dark:bg-orange-650/30 dark:text-orange-300",
  },
  {
    title: "Personal Intelligence",
    description: "Adapts to your unique travel preferences.",
    icon: Navigation,
    iconBg: "bg-emerald-500/20 text-emerald-400 dark:bg-emerald-600/30 dark:text-emerald-300",
  },
]

export function SecurityHighlights() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto md:mx-0">
      {highlights.map((item) => (
        <GlassPanel
          key={item.title}
          hoverEffect={true}
          className="p-5 flex items-start gap-4 bg-white/10 border-white/10 backdrop-blur-md rounded-2xl shadow-lg border text-white dark:bg-slate-900/30 dark:border-white/5"
        >
          <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${item.iconBg} shadow-sm`}>
            <item.icon className="size-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold tracking-tight text-white">
              {item.title}
            </h3>
            <p className="text-xs text-slate-300 dark:text-slate-450 leading-normal">
              {item.description}
            </p>
          </div>
        </GlassPanel>
      ))}
    </div>
  )
}
