"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  icon: LucideIcon
  title: string
}

export function SectionHeader({ icon: Icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 select-none mb-6">
      {/* Premium icon box mimicking the mockup */}
      <div className="flex size-7 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40 text-primary-blue dark:text-blue-400 shadow-sm shrink-0">
        <Icon className="size-4 stroke-[2.5]" />
      </div>
      <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight">
        {title}
      </h2>
    </div>
  )
}
