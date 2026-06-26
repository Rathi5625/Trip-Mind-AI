"use client"

import * as React from "react"
import { motion } from "framer-motion"

export function LoadingDots() {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -5 },
  }

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-55 border border-black/5 dark:bg-slate-800/40 dark:border-white/5 w-fit"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.span
          key={i}
          variants={dotVariants}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="size-2 rounded-full bg-slate-400 dark:bg-slate-500"
        />
      ))}
    </motion.div>
  )
}
