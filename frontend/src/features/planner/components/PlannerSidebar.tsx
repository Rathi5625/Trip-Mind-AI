"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Globe2, Plus } from "lucide-react"
import { usePlanner } from "../hooks/usePlanner"
import { SavedTrips } from "./SavedTrips"
import { TemplateSection } from "./TemplateSection"
import { useDashboardStore } from "@/features/dashboard/hooks/useDashboard"
import { cn } from "@/lib/utils"

interface PlannerSidebarProps {
  className?: string
  isMobile?: boolean
}

export function PlannerSidebar({ className, isMobile = false }: PlannerSidebarProps) {
  const { startNewSession } = usePlanner()
  const { setSidebarOpen } = useDashboardStore()
  const router = useRouter()

  const handleNewSession = () => {
    startNewSession()
    if (isMobile) {
      setSidebarOpen(false)
    }
    router.push("/planner/create-trip")
  }

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r border-black/5 bg-white/40 dark:border-white/5 dark:bg-slate-950/40 p-4 transition-all duration-300 backdrop-blur-xl shrink-0 select-none w-64",
        className
      )}
    >
      {/* Header Logo */}
      <div className="flex items-center gap-2 px-2.5 py-3 mb-6">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-blue text-white shadow-lg shadow-blue-500/20">
          <Globe2 className="size-5" />
        </div>
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-base font-extrabold tracking-tight text-slate-800 dark:text-slate-100"
        >
          Trip Mind AI
        </motion.h1>
      </div>

      {/* New Session Button */}
      <div className="px-1.5 mb-6">
        <button
          onClick={handleNewSession}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-500/10 bg-blue-500/5 py-2.5 text-xs font-bold text-primary-blue hover:bg-blue-500/10 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 transition-all cursor-pointer shadow-sm select-none"
        >
          <Plus className="size-4 stroke-[2.5]" />
          New Planning Session
        </button>
      </div>

      {/* Scroller Sections */}
      <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar pr-1 w-full">
        {/* Saved Trips */}
        <SavedTrips />

        {/* Templates */}
        <TemplateSection />
      </div>
    </aside>
  )
}
