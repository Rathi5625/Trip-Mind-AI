"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, RotateCcw } from "lucide-react"
import { fadeVariants } from "../utils/animation"
import { useMapStore } from "../store/mapStore"

interface ErrorOverlayProps {
  error: string | null
}

export function ErrorOverlay({ error }: ErrorOverlayProps) {
  const setMapError = useMapStore((s) => s.setMapError)
  const setIsLoading = useMapStore((s) => s.setIsLoading)

  const handleRetry = () => {
    setMapError(null)
    setIsLoading(true)
    // Reload state triggers a re-render/re-fetch in Map parent
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md flex items-center justify-center z-50 p-6 pointer-events-auto"
        >
          <div className="max-w-sm w-full bg-white dark:bg-slate-900 border border-red-500/20 shadow-2xl rounded-3xl p-6 flex flex-col items-center text-center">
            <div className="size-12 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center text-red-500 mb-4">
              <AlertCircle className="size-6" />
            </div>
            
            <h3 className="text-base font-black text-slate-800 dark:text-slate-100">
              Map Load Issue
            </h3>
            
            <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
              {error}
            </p>
            
            <button
              onClick={handleRetry}
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-lg shadow-blue-500/20 cursor-pointer transition-colors"
            >
              <RotateCcw className="size-3.5" />
              <span>Retry Load</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
