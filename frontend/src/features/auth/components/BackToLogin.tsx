import * as React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function BackToLogin() {
  return (
    <div className="flex items-center justify-center mt-6">
      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary-blue dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        <span>Back to Sign In</span>
      </Link>
    </div>
  )
}
