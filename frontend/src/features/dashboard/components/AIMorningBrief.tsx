"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Sun,
  Flame,
  CloudRain,
  ShieldAlert,
  Hotel,
  Utensils,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { MorningBrief } from "../types/dashboard"

interface AIMorningBriefProps {
  brief: MorningBrief
}

export function AIMorningBrief({ brief }: AIMorningBriefProps) {
  // Mapping bullet item types to custom icons and colors
  const getBulletConfig = (type: string) => {
    switch (type) {
      case "price":
        return {
          icon: TrendingDown,
          color: "text-blue-500",
          bgColor: "bg-blue-50 dark:bg-blue-950/20",
        }
      case "weather":
        return {
          icon: CloudRain,
          color: "text-indigo-500",
          bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
        }
      case "visa":
        return {
          icon: ShieldAlert,
          color: "text-rose-500",
          bgColor: "bg-rose-50 dark:bg-rose-950/20",
        }
      case "hotel":
        return {
          icon: Hotel,
          color: "text-amber-500",
          bgColor: "bg-amber-50 dark:bg-amber-950/20",
        }
      case "restaurant":
        return {
          icon: Utensils,
          color: "text-emerald-500",
          bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
        }
      default:
        return {
          icon: Sun,
          color: "text-primary-blue",
          bgColor: "bg-blue-50 dark:bg-blue-950/20",
        }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 350, damping: 26 } },
  }

  return (
    <GlassPanel
      glowColor="pink"
      className="p-6 bg-white/70 dark:bg-slate-900/50 border-slate-100 dark:border-white/5 shadow-lg rounded-3xl w-full select-none"
    >
      {/* Title greeting */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-500 animate-[spin_10s_linear_infinite] shadow-sm">
          <Sun className="size-5 fill-amber-500/10" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            {brief.greeting}
          </h2>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            Here&apos;s your travel briefing for today
          </p>
        </div>
      </div>

      {/* Bullet update list */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-2"
      >
        {brief.bullets.map((bullet) => {
          const config = getBulletConfig(bullet.type)
          const BulletIcon = config.icon

          return (
            <motion.div
              key={bullet.id}
              variants={itemVariants}
              whileHover={{ x: 2 }}
              className="flex items-center gap-3 p-3 rounded-2xl border border-black/5 bg-white/55 dark:border-white/5 dark:bg-slate-950/20 shadow-sm"
            >
              <div className={`flex size-8.5 shrink-0 items-center justify-center rounded-xl ${config.bgColor} ${config.color}`}>
                <BulletIcon className="size-4.5 stroke-[2.5]" />
              </div>
              <span className="text-xs font-semibold text-slate-650 dark:text-slate-350 leading-tight">
                {bullet.text}
              </span>
            </motion.div>
          )
        })}
      </motion.div>
    </GlassPanel>
  )
}
