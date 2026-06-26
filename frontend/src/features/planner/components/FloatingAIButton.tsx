"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface FloatingAIButtonProps {
  onClick: () => void
}

export function FloatingAIButton({ onClick }: FloatingAIButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex md:hidden size-12 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-violet-600 text-white shadow-xl shadow-blue-500/20 border border-white/10 hover:shadow-blue-500/30 transition-shadow cursor-pointer"
      aria-label="Ask AI to edit itinerary"
    >
      <Sparkles className="size-5 fill-white/10 animate-[pulse_2.5s_infinite]" />
    </motion.button>
  )
}
