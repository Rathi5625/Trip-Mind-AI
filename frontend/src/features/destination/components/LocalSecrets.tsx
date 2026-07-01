"use client"

import * as React from "react"
import { MapPin } from "lucide-react"
import { SecretItem } from "../types/destination"

interface LocalSecretsProps {
  secrets: SecretItem[]
}

export function LocalSecrets({ secrets }: LocalSecretsProps) {
  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4 select-none text-left w-full h-full">
      
      {/* Header */}
      <div className="flex items-center gap-1.5 text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
        <MapPin className="size-4 text-blue-500 fill-blue-500/10" />
        <span>Local Secrets</span>
      </div>

      {/* Secret Cards list */}
      <div className="space-y-4">
        {secrets.map((s) => (
          <div
            key={s.id}
            className="p-4 rounded-2xl border border-black/5 bg-slate-50/50 dark:border-white/5 dark:bg-slate-950/20 space-y-1"
          >
            <h5 className="text-[10.5px] font-black text-slate-805 dark:text-white leading-none">
              {s.title}
            </h5>
            <p className="text-[9.5px] font-semibold text-slate-500 dark:text-slate-400 leading-relaxed pt-0.5">
              {s.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}
