"use client"

import * as React from "react"

interface PersonalizedMessageProps {
  message: string
}

export function PersonalizedMessage({ message }: PersonalizedMessageProps) {
  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4 select-none text-left">
      
      {/* Header */}
      <div className="flex items-center gap-1.5 text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
        <span>🤖</span>
        <span>Atlas AI</span>
      </div>

      {/* Message Balloon */}
      <div className="relative p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-2">
        {/* Chat pointer */}
        <div className="absolute top-4 -left-1.5 size-3 bg-blue-500/5 border-l border-b border-blue-500/10 rotate-45 dark:bg-slate-900/50" />
        
        {/* Render line breaks correctly */}
        <div className="text-[10.5px] font-semibold text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {message}
        </div>
      </div>

    </div>
  )
}
