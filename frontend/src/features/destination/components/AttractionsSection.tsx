"use client"

import * as React from "react"
import { AttractionCard } from "./AttractionCard"
import { Attraction } from "../types/destination"

interface AttractionsSectionProps {
  attractions: Attraction[]
}

export function AttractionsSection({ attractions }: AttractionsSectionProps) {
  return (
    <div className="w-full select-none text-left max-w-6xl mx-auto space-y-4">
      
      {/* Header */}
      <div className="flex items-end justify-between">
        <h3 className="text-sm font-black text-slate-805 dark:text-white uppercase tracking-wider">
          Curated Attractions
        </h3>
        <button
          onClick={() => alert("Exploring all 42 attractions...")}
          className="text-xs font-black uppercase text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer"
        >
          Explore all (42)
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {attractions.map((attr) => (
          <AttractionCard
            key={attr.id}
            id={attr.id}
            name={attr.name}
            category={attr.category}
            duration={attr.duration}
            imageUrl={attr.imageUrl}
            description={attr.description}
            popularityScore={attr.popularityScore}
          />
        ))}
      </div>

    </div>
  )
}
