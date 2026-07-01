"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, Send } from "lucide-react"

interface Message {
  sender: "bot" | "user"
  text: string
}

export function FloatingAI() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [inputVal, setInputVal] = React.useState("")
  const [messages, setMessages] = React.useState<Message[]>([
    { sender: "bot", text: "Welcome to Paris! I can help you check visa requirements, weather forecast, safety, daily budget, or nearby attraction routes. What would you like to know?" }
  ])
  const [isTyping, setIsTyping] = React.useState(false)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputVal.trim()) return

    const userMsg = inputVal
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }])
    setInputVal("")
    setIsTyping(true)

    // Mock chatbot latency
    setTimeout(() => {
      setIsTyping(false)
      const lower = userMsg.toLowerCase()
      let reply = "Paris is generally safe in tourist hubs like Le Marais, though please stay alert for pickpockets near the Eiffel Tower or Louvre."
      
      if (lower.includes("weather") || lower.includes("temperature")) {
        reply = "Currently, it is partly cloudy, around 18°C. Perfect stroll weather! Spring remains our top recommendation."
      } else if (lower.includes("visa")) {
        reply = "For US/Canadian and UK travelers, visa is not required for stays up to 90 days. You just need a passport valid for 3 months."
      } else if (lower.includes("budget") || lower.includes("cost")) {
        reply = "An economy daily budget runs around €120/day, while our premium curated path is estimated at €350/day including private transfers."
      } else if (lower.includes("metro") || lower.includes("transport")) {
        reply = "The Navigo weekly pass is highly recommended! It covers all zones including Charles de Gaulle airport and Versailles."
      } else if (lower.includes("attraction") || lower.includes("louvre")) {
        reply = "Make sure to pre-book the Louvre Museum at least 2 weeks in advance. It is closed on Tuesdays!"
      }

      setMessages((prev) => [...prev, { sender: "bot", text: reply }])
    }, 1100)
  }

  return (
    <>
      {/* Floating round button */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex size-14 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 border border-blue-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
          aria-label="Open AI Assistant"
        >
          {isOpen ? <X className="size-5" /> : <Sparkles className="size-5 fill-white/10" />}
        </motion.button>
      </div>

      {/* Chat drawer panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] h-[420px] rounded-3xl border border-black/5 bg-white shadow-2xl dark:border-white/5 dark:bg-slate-900/95 backdrop-blur-xl flex flex-col justify-between overflow-hidden select-none"
          >
            
            {/* Header */}
            <div className="p-4 border-b border-black/5 dark:border-white/5 bg-blue-600 text-white flex items-center gap-2">
              <Sparkles className="size-4 fill-white/10" />
              <div className="text-left">
                <h4 className="text-xs font-black uppercase tracking-wider">Atlas AI Destination Guide</h4>
                <span className="text-[9px] font-semibold text-blue-200">Online • Live Context</span>
              </div>
            </div>

            {/* Chat Messages viewport */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 flex flex-col">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] p-3 rounded-2xl text-[10.5px] font-semibold leading-relaxed text-left
                    ${
                      msg.sender === "bot"
                        ? "bg-slate-100 text-slate-805 dark:bg-slate-800 dark:text-slate-200 self-start rounded-tl-none"
                        : "bg-blue-600 text-white self-end rounded-tr-none"
                    }
                  `}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-550 self-start p-2.5 rounded-2xl rounded-tl-none text-[9px] font-black uppercase tracking-widest animate-pulse">
                  Typing...
                </div>
              )}
            </div>

            {/* Submission Input footer */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-black/5 dark:border-white/5 bg-slate-55/50 dark:bg-slate-950/20 flex gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about weather, safety, budget..."
                className="flex-grow px-3.5 py-2 rounded-full border border-black/5 bg-white text-xs text-slate-800 dark:border-white/5 dark:bg-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="flex size-8 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow shrink-0 cursor-pointer transition-colors"
                aria-label="Send message"
              >
                <Send className="size-3.5" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
