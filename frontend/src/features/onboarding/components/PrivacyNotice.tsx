"use client"

import * as React from "react"
import { Lock } from "lucide-react"

export function PrivacyNotice() {
  return (
    <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs text-slate-450 dark:text-slate-500 font-medium py-4 select-none">
      <Lock className="size-3.5 text-slate-400" />
      <span>Your data is secure and used only to improve your trips.</span>
    </div>
  )
}
