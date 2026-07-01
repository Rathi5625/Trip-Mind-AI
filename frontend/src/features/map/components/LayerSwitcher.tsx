"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Layers, ChevronDown, Check } from "lucide-react"
import { useMapLayers } from "../hooks/useMapLayers"
import { LAYER_CATEGORIES } from "../constants/layers"
import type { LayerId } from "../types/map"

export function LayerSwitcher() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { activeLayers, toggleLayer, getLayersByCategory } = useMapLayers()
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={ref} className="relative z-30 select-none">
      {/* Selector Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-lg text-xs font-black text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-blue-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Layers className="size-4 text-blue-500" />
        <span>Map Layers</span>
        <ChevronDown className="size-3.5 text-slate-400 transition-transform duration-200" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }} />
      </button>

      {/* Layer Options Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="absolute left-0 mt-2 w-[280px] max-h-[380px] overflow-y-auto rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl p-3 space-y-4"
          >
            {LAYER_CATEGORIES.map((category) => {
              const layers = getLayersByCategory(category.id)
              if (layers.length === 0) return null

              return (
                <div key={category.id} className="space-y-1.5">
                  <div className="flex items-center gap-1.5 px-2">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      {category.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {layers.map((layer) => {
                      const isActive = activeLayers[layer.id] ?? false
                      return (
                        <button
                          key={layer.id}
                          onClick={() => toggleLayer(layer.id as LayerId)}
                          className={`flex items-center justify-between w-full px-2.5 py-2 rounded-xl text-left cursor-pointer transition-colors focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800
                            ${isActive 
                              ? "bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold" 
                              : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-medium"
                            }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-sm shrink-0" role="img" aria-label="">
                              {layer.icon}
                            </span>
                            <div className="truncate">
                              <p className="text-xs truncate">{layer.label}</p>
                              {layer.description && (
                                <p className="text-[9px] text-slate-400 truncate font-normal mt-0.5">
                                  {layer.description}
                                </p>
                              )}
                            </div>
                          </div>
                          {isActive && <Check className="size-3.5 shrink-0 ml-1.5" strokeWidth={3} />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
