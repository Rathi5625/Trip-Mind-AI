import * as React from "react"
import { Lock, ShieldCheck } from "lucide-react"

export function SecurityFooter() {
  return (
    <div className="w-full pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-center gap-6 text-slate-400 dark:text-slate-500 font-sans text-xs">
      <div className="flex items-center gap-1.5 select-none cursor-default">
        <Lock className="size-3.5" />
        <span>Secure Auth</span>
      </div>
      <div className="flex items-center gap-1.5 select-none cursor-default">
        <ShieldCheck className="size-3.5" />
        <span>Data Protection</span>
      </div>
    </div>
  )
}
