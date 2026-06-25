"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface PageHeaderProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
}

export function PageHeader({
  title = (
    <>
      What type of traveler are <br /> you?
    </>
  ),
  subtitle = "Choose all that match your travel personality.",
}: PageHeaderProps) {
  return (
    <div className="text-center space-y-3 max-w-xl mx-auto font-sans select-none mb-10">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="text-sm text-slate-500 dark:text-slate-450 font-medium"
      >
        {subtitle}
      </motion.p>
    </div>
  )
}
