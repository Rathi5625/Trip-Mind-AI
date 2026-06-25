"use client"

import * as React from "react"
import { BUDGET_OPTIONS } from "../constants/preferenceOptions"
import { BudgetCard } from "./BudgetCard"
import { BudgetType } from "../types/preferences"

interface BudgetSelectorProps {
  value: BudgetType | null
  onChange: (value: BudgetType) => void
}

export function BudgetSelector({ value, onChange }: BudgetSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {BUDGET_OPTIONS.map((option) => (
        <BudgetCard
          key={option.id}
          option={option}
          selected={value === option.id}
          onClick={() => onChange(option.id)}
        />
      ))}
    </div>
  )
}
