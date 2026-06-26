"use client"

import * as React from "react"
import { usePlannerStore } from "../store/plannerStore"

export function useAIStream() {
  const { updateLastMessageText, setStreaming } = usePlannerStore()

  const streamText = React.useCallback(
    async (fullText: string) => {
      setStreaming(true)
      const words = fullText.split(" ")
      let currentText = ""
      let index = 0

      return new Promise<void>((resolve) => {
        const intervalId = setInterval(() => {
          if (index < words.length) {
            currentText += (index === 0 ? "" : " ") + words[index]
            updateLastMessageText(currentText)
            index++
          } else {
            clearInterval(intervalId)
            setStreaming(false)
            resolve()
          }
        }, 35) // ~35ms per word streaming speed (very organic)
      })
    },
    [updateLastMessageText, setStreaming]
  )

  return { streamText }
}
