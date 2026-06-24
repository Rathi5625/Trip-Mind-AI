"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface ResendCodeProps {
  disabled: boolean
  onResend: () => void
}

export function ResendCode({ disabled, onResend }: ResendCodeProps) {
  return (
    <div className="text-center text-xs text-slate-500 dark:text-slate-400">
      Didn&apos;t receive the code?{" "}
      {disabled ? (
        <span className="font-bold text-slate-350 dark:text-slate-600 cursor-not-allowed select-none">
          Resend Code
        </span>
      ) : (
        <button
          type="button"
          onClick={onResend}
          className="font-bold text-primary-blue hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline cursor-pointer focus:outline-none"
        >
          Resend Code
        </button>
      )}
    </div>
  )
}
