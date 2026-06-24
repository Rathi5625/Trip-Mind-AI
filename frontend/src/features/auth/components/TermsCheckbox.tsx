"use client"

import * as React from "react"
import Link from "next/link"

interface TermsCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function TermsCheckbox({ checked, onChange, disabled = false }: TermsCheckboxProps) {
  return (
    <div className="flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400 font-sans">
      <input
        type="checkbox"
        id="terms"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="size-4 mt-0.5 rounded border-slate-350 dark:border-slate-800 text-primary-blue focus:ring-primary-blue/30 cursor-pointer disabled:opacity-50"
      />
      <label htmlFor="terms" className="leading-normal select-none cursor-pointer">
        I agree to the{" "}
        <Link href="#" className="font-semibold text-primary-blue dark:text-blue-400 hover:underline">
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link href="#" className="font-semibold text-primary-blue dark:text-blue-400 hover:underline">
          Privacy Policy
        </Link>
      </label>
    </div>
  )
}
