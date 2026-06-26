"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Compass,
  Wallet,
  Gem,
  UtensilsCrossed,
  Briefcase,
  CloudSun,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDashboardStore } from "../hooks/useDashboard"

export function AIQuickActions() {
  const { setAIOpen } = useDashboardStore()

  const actions = [
    {
      label: "Plan a Trip",
      description: "Generate AI travel routes",
      icon: Compass,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/20",
      prompt: "I want to plan a new trip to...",
    },
    {
      label: "Optimize Budget",
      description: "Check flight deals & deals",
      icon: Wallet,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20",
      prompt: "Can you help optimize my budget for...",
    },
    {
      label: "Find Hidden Gems",
      description: "Local offbeat lookups",
      icon: Gem,
      color: "text-purple-500 bg-purple-50 dark:bg-purple-950/20",
      prompt: "Show me some hidden gems in...",
    },
    {
      label: "Find Local Food",
      description: "AI restaurant reviews",
      icon: UtensilsCrossed,
      color: "text-rose-500 bg-rose-50 dark:bg-rose-950/20",
      prompt: "What are the best local food spots in...",
    },
    {
      label: "Packing List",
      description: "Smart packing checklist",
      icon: Briefcase,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20",
      prompt: "What should I pack for a trip to...",
    },
    {
      label: "Weather Insights",
      description: "Seasonal optimal times",
      icon: CloudSun,
      color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20",
      prompt: "Check weather forecast and seasonal trends for...",
    },
  ]

  const handleActionClick = (promptText: string) => {
    setAIOpen(true)
    // We could trigger a global chat input filler. Let's alert for UX and open the assistant!
    const assistantPromptField = document.querySelector('input[placeholder="Ask your travel co-pilot..."]') as HTMLInputElement
    if (assistantPromptField) {
      assistantPromptField.value = promptText
      assistantPromptField.focus()
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 400, damping: 25 } },
  }

  return (
    <div className="w-full select-none">
      {/* Header section */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="size-4 text-primary-blue animate-[pulse_2s_infinite]" />
        <h3 className="text-sm font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          What would you like to do?
        </h3>
      </div>

      {/* Grid of actions */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5"
      >
        {actions.map((action) => {
          const ActionIcon = action.icon

          return (
            <motion.button
              key={action.label}
              variants={cardVariants}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleActionClick(action.prompt)}
              className="flex flex-col items-center justify-center text-center p-4 rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-md cursor-pointer transition-all dark:border-white/5 dark:bg-slate-900/60 h-full group"
            >
              {/* Icon Container */}
              <div className={cn("flex size-9.5 items-center justify-center rounded-xl mb-3 shrink-0 transition-transform group-hover:scale-105", action.color)}>
                <ActionIcon className="size-5 stroke-[2]" />
              </div>

              {/* Title & Description */}
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 group-hover:text-primary-blue dark:group-hover:text-blue-400 transition-colors">
                {action.label}
              </span>
              <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">
                {action.description}
              </span>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
