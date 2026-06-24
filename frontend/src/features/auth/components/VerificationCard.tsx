"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { OtpForm } from "./OtpForm"

export function VerificationCard() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "example@email.com"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white dark:bg-slate-900/60 border border-black/5 dark:border-white/5 rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] backdrop-blur-xl font-sans"
    >
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
          Verification Required
        </h1>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          We&apos;ve sent a 6-digit verification code to{" "}
          <span className="font-bold text-primary-blue dark:text-blue-400 break-all">{email}</span>
        </p>
      </div>

      {/* Form with inputs and timer */}
      <OtpForm />
    </motion.div>
  )
}
