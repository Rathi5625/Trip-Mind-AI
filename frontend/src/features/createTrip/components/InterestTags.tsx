"use client"

import * as React from "react"
import { Pencil } from "lucide-react"
import * as Icons from "lucide-react"
import { useRouter } from "next/navigation"
import { INTEREST_ICON_MAP } from "../constants/reviewConstants"

interface InterestTagsProps {
  interests: string[]
}

export function InterestTags({ interests }: InterestTagsProps) {
  const router = useRouter()

  const handleEdit = () => {
    router.push("/planner/create-trip/preferences")
  }

  // Format label text
  const getLabel = (id: string) => {
    if (id === "culinary") return "Culinary"
    return id.charAt(0).toUpperCase() + id.slice(1)
  }

  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl relative space-y-4 select-none min-h-[140px]">
      
      {/* Edit pencil button top right */}
      <button
        onClick={handleEdit}
        className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 text-blue-600 transition-colors cursor-pointer"
        aria-label="Edit Interests"
      >
        <Pencil className="size-3.5" />
      </button>

      {/* Header */}
      <div>
        <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 tracking-wide">
          Key Interests
        </h3>
      </div>

      {/* Chips list */}
      <div className="flex flex-wrap gap-2">
        {interests.map((interestId) => {
          const resolvedIcon = INTEREST_ICON_MAP[interestId] || "Sparkles"
          const IconComponent = (Icons as any)[resolvedIcon] || Icons.Sparkles

          return (
            <div
              key={interestId}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 text-blue-600 dark:text-blue-400 hover:scale-[1.02] transition-transform select-none"
            >
              <IconComponent className="size-3.5" />
              <span>{getLabel(interestId)}</span>
            </div>
          )
        })}
      </div>

    </div>
  )
}
