"use client"

import * as React from "react"
import { motion } from "framer-motion"

export function TravelQuote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="space-y-3 max-w-md bg-black/10 dark:bg-black/20 backdrop-blur-[2px] p-6 rounded-2xl border border-white/5"
    >
      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight font-serif italic">
        &ldquo;Your journey begins the moment you feel secure.&rdquo;
      </h3>
      <p className="text-sm text-slate-200 font-medium leading-relaxed">
        The world is waiting. Let&apos;s get you back out there.
      </p>
    </motion.div>
  )
}
