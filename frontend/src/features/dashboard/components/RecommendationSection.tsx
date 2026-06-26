"use client"

import * as React from "react"
import { Compass } from "lucide-react"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { RecommendationCard } from "./RecommendationCard"
import { Recommendation } from "../types/dashboard"

interface RecommendationSectionProps {
  recommendations: Recommendation[]
}

export function RecommendationSection({ recommendations }: RecommendationSectionProps) {
  return (
    <div className="w-full select-none">
      <SectionHeader icon={Compass} title="Discover Recommendations" />

      {/* Grid of recommendation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5">
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>
    </div>
  )
}
