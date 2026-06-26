"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  icon: LucideIcon
  title: string
  action?: React.ReactNode
}

export function SectionHeader({ icon: Icon, title, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between select-none mb-6">
      <div className="flex items-center gap-3">
        {/* Premium icon box */}
        <div className="flex size-8 items-center justify-center rounded-xl bg-primary-blue/10 dark:bg-primary-blue/20 text-primary-blue dark:text-blue-400 shadow-inner shrink-0">
          <Icon className="size-4.5 stroke-[2.5]" />
        </div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          {title}
        </h2>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
