"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Bot, User, Compass } from "lucide-react"
import { cn } from "@/lib/utils"
import { AIMessageItem } from "../types/planner"
import { LoadingDots } from "@/components/ui/LoadingDots"

interface AIMessageProps {
  message: AIMessageItem
}

// Simple parser to format markdown-like itinerary styles cleanly
function ItineraryRenderer({ text }: { text: string }) {
  if (!text) return null

  const lines = text.split("\n")

  return (
    <div className="space-y-2 select-text text-slate-700 dark:text-slate-200">
      {lines.map((line, index) => {
        // Headers Level 2
        if (line.startsWith("## ")) {
          return (
            <h3 key={index} className="text-sm font-black text-slate-900 dark:text-slate-100 mt-3 mb-2 flex items-center gap-1.5 border-b border-black/5 dark:border-white/5 pb-1">
              <Compass className="size-4 text-primary-blue shrink-0" />
              {line.replace("## ", "")}
            </h3>
          )
        }
        // Headers Level 3
        if (line.startsWith("### ")) {
          return (
            <h4 key={index} className="text-xs font-black text-slate-800 dark:text-slate-100 mt-2 mb-1">
              {line.replace("### ", "")}
            </h4>
          )
        }
        // Bullet list items
        if (line.startsWith("- ")) {
          return (
            <div key={index} className="flex items-start gap-2 text-xs font-medium pl-2">
              <span className="text-primary-blue leading-tight shrink-0">•</span>
              <span>{line.replace("- ", "")}</span>
            </div>
          )
        }
        // Empty lines
        if (!line.trim()) {
          return <div key={index} className="h-2" />
        }
        // Regular text
        return (
          <p key={index} className="text-xs font-medium leading-relaxed">
            {line}
          </p>
        )
      })}
    </div>
  )
}

export function AIMessage({ message }: AIMessageProps) {
  const isAI = message.sender === "ai"

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className={cn("flex w-full gap-3.5 mb-6", isAI ? "justify-start" : "justify-end")}
    >
      {/* AI Avatar */}
      {isAI && (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-blue to-violet-600 text-white shadow-md shadow-blue-500/10">
          <Bot className="size-4.5 stroke-[2]" />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={cn(
          "max-w-[85%] rounded-3xl p-4.5 text-xs font-semibold shadow-sm leading-relaxed select-none",
          isAI
            ? "bg-white border border-black/5 dark:bg-slate-900/60 dark:border-white/5 rounded-tl-none"
            : "bg-primary-blue text-white rounded-tr-none shadow-md shadow-blue-500/10"
        )}
      >
        {isAI ? (
          <>
            {message.text ? (
              <ItineraryRenderer text={message.text} />
            ) : (
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 italic">
                  Trip Mind AI is designing your routes...
                </span>
                <LoadingDots />
              </div>
            )}
          </>
        ) : (
          <p className="select-text">{message.text}</p>
        )}
      </div>

      {/* User Avatar */}
      {!isAI && (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-350 border border-black/5 dark:border-white/5 shadow-sm">
          <User className="size-4.5 stroke-[2]" />
        </div>
      )}
    </motion.div>
  )
}
