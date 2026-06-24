"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SuccessIllustration } from "./SuccessIllustration"
import { SuccessActions } from "./SuccessActions"

export function SuccessCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white dark:bg-slate-900/60 border border-black/5 dark:border-white/5 rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] backdrop-blur-xl flex flex-col items-center text-center font-sans"
    >
      {/* Icon Illustration */}
      <SuccessIllustration />

      {/* Headings */}
      <div className="space-y-3">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Password Updated Successfully
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
          Your account is secure and ready to go. You can now use your new password to access all your travel plans.
        </p>
      </div>

      {/* Actions */}
      <SuccessActions />
    </motion.div>
  )
}
