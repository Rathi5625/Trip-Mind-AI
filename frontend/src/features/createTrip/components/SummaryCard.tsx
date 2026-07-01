"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Pencil } from "lucide-react"
import * as Icons from "lucide-react"
import { useRouter } from "next/navigation"

interface SummaryCardProps {
  iconName: string
  title: string
  value: string
  description: string
  editUrl: string
}

export function SummaryCard({ iconName, title, value, description, editUrl }: SummaryCardProps) {
  const router = useRouter()

  // Dynamically resolve icon from Lucide library
  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle

  const handleEdit = () => {
    router.push(editUrl)
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="relative p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between min-h-[120px] select-none"
    >
      
      {/* Edit pencil button top right */}
      <button
        onClick={handleEdit}
        className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 text-blue-600 transition-colors cursor-pointer"
        aria-label={`Edit ${title}`}
      >
        <Pencil className="size-3.5" />
      </button>

      {/* Icon top left */}
      <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:bg-blue-900/30 dark:border-blue-800/30 dark:text-blue-400 shrink-0 self-start">
        <IconComponent className="size-4.5" />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-0.5">
        <span className="block text-[8px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
          {title}
        </span>
        <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 truncate">
          {value}
        </h4>
        <p className="text-[10px] font-semibold text-slate-450 dark:text-slate-400 leading-none">
          {description}
        </p>
      </div>

    </motion.div>
  )
}
