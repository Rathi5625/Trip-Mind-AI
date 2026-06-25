"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { TRAVELER_TYPES } from "../constants/travelerTypes"
import { TravelerCard } from "./TravelerCard"

interface TravelerGridProps {
  selectedTypes: string[]
  onToggleType: (id: string) => void
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const cardItemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
}

export function TravelerGrid({ selectedTypes, onToggleType }: TravelerGridProps) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl mx-auto"
    >
      {TRAVELER_TYPES.map((type) => (
        <motion.div key={type.id} variants={cardItemVariants}>
          <TravelerCard
            type={type}
            selected={selectedTypes.includes(type.id)}
            onClick={() => onToggleType(type.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
