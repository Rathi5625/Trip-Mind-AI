"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { AlertOctagon, RotateCcw, Home } from "lucide-react"
import Link from "next/link"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global boundary caught error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FB] dark:bg-[#0B0F19] px-4 text-center font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8 text-rose-500"
      >
        <div className="relative inline-flex size-20 items-center justify-center rounded-2xl bg-rose-500/10 dark:bg-rose-500/5">
          <AlertOctagon className="size-10" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-3 max-w-md"
      >
        <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Something Went Wrong</h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
          An unexpected error occurred while rendering this page. Our intelligent travel algorithms are checking the coordinates.
        </p>
        {error.digest && (
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-905 p-2 rounded-lg">
            Error digest ID: {error.digest}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-xs justify-center"
      >
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-blue text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <RotateCcw className="size-4" />
          Try Again
        </button>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-white dark:hover:bg-slate-800 transition-colors backdrop-blur-md"
        >
          <Home className="size-4" />
          Home
        </Link>
      </motion.div>
    </div>
  )
}
