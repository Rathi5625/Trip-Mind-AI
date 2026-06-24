"use client"

import * as React from "react"
import { Clock } from "lucide-react"

interface OtpTimerProps {
  seconds: number
}

export function OtpTimer({ seconds }: OtpTimerProps) {
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = time % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (seconds <= 0) return null

  return (
    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium my-4 select-none">
      <Clock className="size-3.5 text-slate-400" />
      <span>Resend Code In</span>
      <span className="font-bold text-primary-blue dark:text-blue-400">{formatTime(seconds)}</span>
    </div>
  )
}
