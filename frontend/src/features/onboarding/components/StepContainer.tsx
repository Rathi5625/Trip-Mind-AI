"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface StepContainerProps {
  children: React.ReactNode
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export function StepContainer({ children }: StepContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col gap-6"
    >
      {children}
    </motion.div>
  )
}
