"use client"

import * as React from "react"
import { Check, Circle } from "lucide-react"

interface PasswordStrengthProps {
  password?: string
}

export function PasswordStrength({ password = "" }: PasswordStrengthProps) {
  // 1. Length >= 8
  const hasMinLength = password.length >= 8
  // 2. Contains uppercase
  const hasUppercase = /[A-Z]/.test(password)
  // 3. Contains lowercase
  const hasLowercase = /[a-z]/.test(password)
  // 4. Contains number
  const hasNumber = /[0-9]/.test(password)
  // 5. Contains special symbol
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  const checks = [
    { label: "At least 8 characters long", met: hasMinLength },
    { label: "Contains an uppercase letter", met: hasUppercase },
    { label: "Contains a lowercase letter", met: hasLowercase },
    { label: "Contains a number", met: hasNumber },
    { label: "Contains a special character", met: hasSpecial },
  ]

  const score = checks.filter((c) => c.met).length

  const getStrengthLabel = () => {
    if (password.length === 0) return "Not set"
    if (score <= 1) return "Weak"
    if (score === 2) return "Fair"
    if (score === 3) return "Good"
    if (score === 4) return "Strong"
    return "Excellent"
  }

  const getBarColor = () => {
    if (score <= 1) return "#EF4444" // Red (red-500)
    if (score === 2) return "#F97316" // Orange (orange-500)
    if (score === 3) return "#EAB308" // Yellow (yellow-500)
    if (score === 4) return "#22C55E" // Green (green-500)
    return "#10B981" // Emerald (emerald-500)
  }

  return (
    <div className="w-full space-y-4 font-sans text-xs">
      {/* Strength Bar */}
      <div className="space-y-1.5">
        <div className="relative w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full transition-all duration-500 ease-out"
            style={{ 
              width: `${(score / 5) * 100}%`,
              backgroundColor: getBarColor()
            }}
          />
        </div>
        <div className="flex justify-end text-slate-500 dark:text-slate-400 font-medium">
          Password strength: <span className="font-bold ml-1 text-slate-800 dark:text-white transition-colors duration-300" style={{ color: password.length > 0 ? getBarColor() : undefined }}>{getStrengthLabel()}</span>
        </div>
      </div>

      {/* Checklist Card */}
      <div className="rounded-2xl bg-[#F0F4FF]/50 border border-blue-500/5 dark:bg-slate-900/30 dark:border-white/5 p-4 space-y-2.5">
        {checks.map((check) => (
          <div key={check.label} className="flex items-center gap-2.5">
            {check.met ? (
              <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                <Check className="size-3 stroke-[3]" />
              </div>
            ) : (
              <Circle className="size-4 shrink-0 text-slate-350 dark:text-slate-600 stroke-[1.5]" />
            )}
            <span
              className={`leading-normal transition-colors ${
                check.met ? "text-slate-800 dark:text-slate-200 font-medium" : "text-slate-450 dark:text-slate-500"
              }`}
            >
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
