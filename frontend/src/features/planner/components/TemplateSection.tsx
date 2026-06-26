"use client"

import * as React from "react"
import { Palmtree, Mountain, Utensils, Crown, Compass, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePlannerStore } from "../store/plannerStore"
import { TRIP_TEMPLATES } from "../constants/plannerPrompts"

interface TemplateSectionProps {
  onSelectTemplate?: (promptText: string) => void
}

export function TemplateSection({ onSelectTemplate }: TemplateSectionProps) {
  const { selectedTemplate, setSelectedTemplate, setInputPrompt } = usePlannerStore()

  // Map icon strings to components
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Palmtree: Palmtree,
    Mountain: Mountain,
    Utensils: Utensils,
    Crown: Crown,
    Compass: Compass,
    Heart: Heart,
  }

  const handleTemplateClick = (id: string, label: string) => {
    setSelectedTemplate(id)
    const promptText = `Plan a ${label.toLowerCase()} getaway trip. We want local travel paths, top attraction reviews, and food insights...`
    setInputPrompt(promptText)

    if (onSelectTemplate) {
      onSelectTemplate(promptText)
    }
  }

  return (
    <div className="space-y-2 w-full select-none">
      <p className="px-3 text-[10px] font-bold tracking-wider text-slate-450 dark:text-slate-500 uppercase">
        Templates
      </p>

      {/* Grid of templates */}
      <div className="grid grid-cols-2 gap-2 px-1">
        {TRIP_TEMPLATES.map((tpl) => {
          const IconComponent = iconMap[tpl.icon] || Compass
          const isSelected = selectedTemplate === tpl.id

          return (
            <button
              key={tpl.id}
              onClick={() => handleTemplateClick(tpl.id, tpl.label)}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-xl border text-[11px] font-bold transition-all duration-200 cursor-pointer h-16",
                isSelected
                  ? "bg-primary-blue border-transparent text-white shadow-md shadow-blue-500/10"
                  : "bg-white border-black/5 hover:bg-slate-50 hover:border-black/10 text-slate-650 dark:bg-slate-900/40 dark:border-white/5 dark:text-slate-300 dark:hover:bg-slate-800/40"
              )}
            >
              <IconComponent className={cn("size-4 mb-1.5", isSelected ? "text-white" : "text-amber-500 dark:text-amber-400")} />
              <span>{tpl.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
