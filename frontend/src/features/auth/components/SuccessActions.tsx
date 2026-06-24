"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function SuccessActions() {
  return (
    <div className="w-full flex flex-col gap-3 font-sans text-sm mt-8">
      {/* Continue to Login Button */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Link
          href="/login"
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#0052cc] hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 transition-all text-center"
        >
          <span>Continue to Login</span>
          <ArrowRight className="size-4" />
        </Link>
      </motion.div>

      {/* Go to Dashboard Button */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Link
          href="/dashboard"
          className="w-full flex items-center justify-center py-3.5 px-6 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 dark:border-slate-800 text-primary-blue hover:text-blue-700 font-semibold transition-all text-center dark:bg-slate-900/50 dark:hover:bg-slate-900 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <span>Go to Dashboard</span>
        </Link>
      </motion.div>
    </div>
  )
}
