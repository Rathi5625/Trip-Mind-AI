"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PromptInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onHeightChange?: (height: number) => void
}

export const PromptInput = React.forwardRef<HTMLTextAreaElement, PromptInputProps>(
  ({ className, onHeightChange, rows = 1, ...props }, ref) => {
    const localRef = React.useRef<HTMLTextAreaElement | null>(null)

    // Combine external ref and local ref
    React.useImperativeHandle(ref, () => localRef.current as HTMLTextAreaElement)

    const adjustHeight = () => {
      const textarea = localRef.current
      if (!textarea) return

      // Reset height to calculate scroll height properly
      textarea.style.height = "auto"
      
      // Set to scroll height
      const newHeight = Math.min(textarea.scrollHeight, 200) // cap max height at 200px
      textarea.style.height = `${newHeight}px`

      if (onHeightChange) {
        onHeightChange(newHeight)
      }
    }

    React.useEffect(() => {
      adjustHeight()
    }, [])

    return (
      <textarea
        ref={localRef}
        rows={rows}
        onChange={(e) => {
          adjustHeight()
          if (props.onChange) {
            props.onChange(e)
          }
        }}
        className={cn(
          "w-full resize-none bg-transparent py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none border-none",
          className
        )}
        {...props}
      />
    )
  }
)

PromptInput.displayName = "PromptInput"
