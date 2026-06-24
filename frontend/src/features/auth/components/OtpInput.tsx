"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface OtpInputProps {
  value: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
}

export function OtpInput({ value, onChange, disabled = false }: OtpInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  // Auto-focus the first input on mount
  React.useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value
    // Only accept numeric inputs
    if (!/^[0-9]?$/.test(val)) return

    const newValue = [...value]
    newValue[index] = val
    onChange(newValue)

    // Move to next input if filled and not the last box
    if (val !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newValue = [...value]
      
      // If current input is empty, focus previous and clear it
      if (value[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus()
        newValue[index - 1] = ""
        onChange(newValue)
      } else {
        // Clear current input
        newValue[index] = ""
        onChange(newValue)
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (disabled) return

    const pasteData = e.clipboardData.getData("text").trim()
    if (!/^\d{1,6}$/.test(pasteData)) return // Must contain digits only, max 6

    const digits = pasteData.split("").slice(0, 6)
    const newValue = [...value]
    
    // Fill values
    digits.forEach((digit, idx) => {
      newValue[idx] = digit
    })
    
    onChange(newValue)

    // Focus last filled or index 5
    const focusIndex = Math.min(digits.length, 5)
    inputRefs.current[focusIndex]?.focus()
  }

  return (
    <div className="flex items-center justify-between gap-2.5 sm:gap-3 w-full my-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            "size-11 sm:size-12 text-center text-lg font-bold rounded-xl border bg-slate-50/50 dark:bg-slate-900/40 text-slate-800 dark:text-slate-100 placeholder:text-slate-350 focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all disabled:opacity-50",
            value[index] ? "border-primary-blue ring-2 ring-primary-blue/15" : "border-slate-200 dark:border-slate-800"
          )}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  )
}
