"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Pagination() {
  const [activePage, setActivePage] = React.useState(1)

  return (
    <div className="flex items-center justify-center gap-2 select-none py-6">
      
      {/* Prev */}
      <button
        onClick={() => setActivePage((p) => Math.max(p - 1, 1))}
        disabled={activePage === 1}
        className="p-2 rounded-xl border border-black/5 bg-white hover:bg-slate-50 dark:border-white/5 dark:bg-slate-900 disabled:opacity-40 disabled:hover:bg-white text-slate-500 cursor-pointer shrink-0"
      >
        <ChevronLeft className="size-4" />
      </button>

      {/* Pages */}
      {[1, 2, 3].map((page) => {
        const isActive = activePage === page
        return (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`size-9 rounded-xl border text-xs font-black transition-colors cursor-pointer
              ${
                isActive
                  ? "border-blue-500/20 bg-blue-600/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"
                  : "border-black/5 bg-white text-slate-550 dark:border-white/5 dark:bg-slate-900 dark:text-slate-400"
              }
            `}
          >
            {page}
          </button>
        )
      })}

      {/* Next */}
      <button
        onClick={() => setActivePage((p) => Math.min(p + 1, 3))}
        disabled={activePage === 3}
        className="p-2 rounded-xl border border-black/5 bg-white hover:bg-slate-50 dark:border-white/5 dark:bg-slate-900 disabled:opacity-40 disabled:hover:bg-white text-slate-500 cursor-pointer shrink-0"
      >
        <ChevronRight className="size-4" />
      </button>

    </div>
  )
}
