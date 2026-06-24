"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export function SuccessIllustration() {
  return (
    <div className="flex justify-center items-center mb-6">
      {/* Outer Pulse/Glow Circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-20 h-20 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center relative"
      >
        {/* Ripple effect */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full border-2 border-emerald-500/20 pointer-events-none"
        />

        {/* Inner Success Circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 18,
            delay: 0.15,
          }}
          className="w-12 h-12 rounded-full bg-emerald-500 dark:bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/20 dark:shadow-none"
        >
          {/* Checkmark Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.35, ease: "easeOut" }}
          >
            <Check className="w-6 h-6 text-white stroke-[3.5]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
