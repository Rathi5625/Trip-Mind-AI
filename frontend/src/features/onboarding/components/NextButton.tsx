"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface NextButtonProps {
  onClick: () => void
  children?: React.ReactNode
}

export function NextButton({ onClick, children = "Get Started" }: NextButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0052cc] hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 cursor-pointer text-center text-sm"
    >
      <span>{children}</span>
      <ArrowRight className="size-4" />
    </motion.button>
  )
}
