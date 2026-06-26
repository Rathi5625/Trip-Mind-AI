"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { Sparkles, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface GenerateButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  isGenerating: boolean
  isStreaming: boolean
}

export function GenerateButton({
  isGenerating,
  isStreaming,
  className,
  ...props
}: GenerateButtonProps) {
  const isLoading = isGenerating || isStreaming

  return (
    <motion.button
      whileHover={!isLoading ? { scale: 1.02 } : {}}
      whileTap={!isLoading ? { scale: 0.98 } : {}}
      disabled={isLoading}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs cursor-pointer select-none",
        "bg-primary-blue text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-300",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {/* Background glowing shimmers */}
      {!isLoading && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 before:to-transparent -translate-x-full hover:before:animate-[shimmer_1.5s_infinite]" />
      )}

      {isLoading ? (
        <>
          <Loader2 className="size-3.5 animate-spin" />
          <span>{isGenerating ? "Planning..." : "Streaming..."}</span>
        </>
      ) : (
        <>
          <span>Generate</span>
          <Sparkles className="size-3.5 fill-white/15 animate-[pulse_1.5s_infinite]" />
        </>
      )}
    </motion.button>
  )
}
