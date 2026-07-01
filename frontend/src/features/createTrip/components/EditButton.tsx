"use client"

import * as React from "react"
import { Pencil } from "lucide-react"

interface EditButtonProps {
  onClick: () => void
  label: string
}

export function EditButton({ onClick, label }: EditButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-1.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 text-blue-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`Edit ${label}`}
    >
      <Pencil className="size-3.5" />
    </button>
  )
}
