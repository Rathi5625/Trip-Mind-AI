"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Globe2, Home, Compass, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FB] dark:bg-[#0B0F19] px-4 text-center font-sans">
      {/* Animated globe */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="relative inline-flex size-28 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary-blue/10 animate-ping opacity-30" />
          <div className="size-24 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/20 flex items-center justify-center">
            <Globe2 className="size-12 text-primary-blue dark:text-blue-400" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 max-w-md"
      >
        <h1 className="text-6xl font-black text-slate-800 dark:text-white tracking-tight">404</h1>
        <h2 className="text-2xl font-black text-slate-700 dark:text-slate-200">Destination Not Found</h2>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
          Looks like our AI couldn&apos;t find this destination. The page may have moved, or you may have taken a wrong turn somewhere.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex flex-col sm:flex-row gap-3 mt-8"
      >
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-blue text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors"
        >
          <Home className="size-4" />
          Back to Dashboard
        </Link>
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-white dark:hover:bg-slate-800 transition-colors backdrop-blur-md"
        >
          <Compass className="size-4" />
          Explore Destinations
        </Link>
      </motion.div>
    </div>
  )
}
