"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { PromptCard } from "./PromptCard"
import { usePromptSuggestions } from "../hooks/usePromptSuggestions"
import { usePlanner } from "../hooks/usePlanner"

export function PromptSuggestions() {
  const { suggestions, selectSuggestion } = usePromptSuggestions()
  const { submitPrompt } = usePlanner()

  const handleCardClick = (promptText: string) => {
    selectSuggestion(promptText)
    submitPrompt(promptText)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 400, damping: 25 } },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full select-none"
    >
      {suggestions.map((item) => (
        <motion.div key={item.id} variants={itemVariants}>
          <PromptCard
            suggestion={item}
            onClick={() => handleCardClick(item.promptText)}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
