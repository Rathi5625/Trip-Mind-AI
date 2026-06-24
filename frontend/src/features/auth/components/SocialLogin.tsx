"use client"

import * as React from "react"
import { motion } from "framer-motion"

export function SocialLogin() {
  return (
    <div className="w-full flex flex-col gap-3 font-sans">
      {/* Google Sign In Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full flex items-center justify-center gap-3 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer"
      >
        <svg className="size-4" viewBox="0 0 24 24" width="24" height="24">
          <g transform="matrix(1, 0, 0, 1, 0, 0)">
            <path
              fill="#EA4335"
              d="M20.64 12.25c0-.76-.07-1.5-.19-2.21H12v4.18h4.86c-.21 1.1-.83 2.03-1.76 2.65v2.21h2.84c1.66-1.53 2.62-3.79 2.62-6.83z"
            />
            <path
              fill="#FBBC05"
              d="M12 21c2.43 0 4.47-.8 5.96-2.18l-2.84-2.21c-.79.53-1.8.85-3.12.85-2.4 0-4.44-1.62-5.17-3.8H3.99v2.28C5.48 18.91 8.49 21 12 21z"
            />
            <path
              fill="#34A853"
              d="M6.83 13.66c-.19-.53-.29-1.1-.29-1.66s.1-1.13.29-1.66V8.06H3.99C3.36 9.3 3 10.7 3 12s.36 2.7 1.01 3.94l2.82-2.28z"
            />
            <path
              fill="#4285F4"
              d="M12 7.34c1.32 0 2.51.45 3.44 1.34l3.12-3.12C16.63 3.86 14.49 3 12 3 8.49 3 5.48 5.09 3.99 8.06l2.84 2.28c.73-2.18 2.77-3.8 5.17-3.8z"
            />
          </g>
        </svg>
        <span>Continue with Google</span>
      </motion.button>

      {/* Apple Sign In Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full flex items-center justify-center gap-3 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer"
      >
        <svg className="size-4 fill-current text-slate-900 dark:text-white" viewBox="0 0 24 24" width="24" height="24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.51-.62.73-1.16 1.87-1.01 2.98 1.1.09 2.23-.58 2.94-1.43z" />
        </svg>
        <span>Continue with Apple</span>
      </motion.button>
    </div>
  )
}
