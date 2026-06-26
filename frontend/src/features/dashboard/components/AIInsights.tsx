"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { InsightCard } from "./InsightCard"
import { AIInsight } from "../types/dashboard"

interface AIInsightsProps {
  insights: AIInsight[]
}

export function AIInsights({ insights }: AIInsightsProps) {
  return (
    <GlassPanel
      glowColor="blue"
      className="p-6 bg-white/70 dark:bg-slate-900/50 border-slate-100 dark:border-white/5 shadow-lg rounded-3xl h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5 select-none">
        <div className="flex size-7.5 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40 text-primary-blue dark:text-blue-400 shadow-inner">
          <Sparkles className="size-4 stroke-[2.5]" />
        </div>
        <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200">
          AI Travel Insights
        </h3>
      </div>

      {/* Grid containing the insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <InsightCard
            key={insight.id}
            type={insight.type}
            badgeText={insight.badgeText}
            badgeType={insight.badgeType}
            content={insight.content}
            actionText={insight.actionText}
            actionLink={insight.actionLink}
            iconName={insight.icon}
          />
        ))}
      </div>
    </GlassPanel>
  )
}
