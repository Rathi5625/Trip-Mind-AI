"use client"

import * as React from "react"
import { User, Heart, Users, Baby, Briefcase } from "lucide-react"
import { GROUP_TYPES } from "../constants/travelerOptions"
import { useGroupType } from "../hooks/useGroupType"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const iconMap = {
  user: User,
  heart: Heart,
  users: Users,
  baby: Baby,
  briefcase: Briefcase
}

export function GroupCard() {
  const { groupType, setGroupType } = useGroupType()

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 select-none">
      {GROUP_TYPES.map((opt) => {
        const IconComponent = iconMap[opt.iconName]
        const isActive = groupType === opt.id

        return (
          <motion.button
            key={opt.id}
            whileHover={{ y: -3 }}
            onClick={() => setGroupType(opt.id)}
            className={cn(
              "flex flex-col items-center justify-center p-5 rounded-3xl border text-center transition-all cursor-pointer w-full gap-3 group relative overflow-hidden",
              isActive
                ? "border-blue-600 bg-blue-600/5 ring-1 ring-blue-600/10 dark:bg-blue-900/10"
                : "border-black/5 bg-white hover:bg-slate-50 dark:border-white/5 dark:bg-slate-900/60 dark:hover:bg-slate-800"
            )}
          >
            {/* Animated Glow Border background for active state */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-30 blur-sm pointer-events-none" />
            )}

            {/* Icon Box */}
            <div className={cn(
              "flex size-10 items-center justify-center rounded-2xl border transition-colors",
              isActive
                ? "bg-blue-600/15 border-blue-600/20 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                : "bg-slate-50 border-black/5 text-slate-400 dark:bg-slate-850 dark:border-white/5"
            )}>
              <IconComponent className="size-5" />
            </div>

            {/* Labels */}
            <div className="space-y-0.5">
              <h4 className="text-xs font-black text-slate-855 dark:text-slate-105 group-hover:text-blue-600 transition-colors">
                {opt.label}
              </h4>
              <p className="text-[8.5px] font-semibold text-slate-400 dark:text-slate-500">
                {opt.description}
              </p>
            </div>

          </motion.button>
        )
      })}
    </div>
  )
}
