"use client"

import * as React from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { DestinationCard } from "./DestinationCard"
import { Destination } from "../types/destination"

interface DestinationGridProps {
  destinations: Destination[]
  selectedDestinations: string[]
  onToggleDestination: (id: string) => void
}

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
}

const cardItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
}

export function DestinationGrid({
  destinations,
  selectedDestinations,
  onToggleDestination,
}: DestinationGridProps) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl mx-auto"
    >
      <AnimatePresence mode="popLayout">
        {destinations.map((destination) => (
          <motion.div
            key={destination.id}
            variants={cardItemVariants}
            layout
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <DestinationCard
              destination={destination}
              selected={selectedDestinations.includes(destination.id)}
              onClick={() => onToggleDestination(destination.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
