"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, Send, Bot, Compass, Heart, ArrowRight } from "lucide-react"
import { useDashboardStore } from "../hooks/useDashboard"

export function FloatingAIAssistant() {
  const { isAIOpen, setAIOpen } = useDashboardStore()
  const [messages, setMessages] = React.useState([
    {
      sender: "ai",
      text: "Hey! I'm your Trip Mind AI assistant. Where should we fly to next?",
    },
  ])
  const [inputVal, setInputVal] = React.useState("")
  const chatEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (isAIOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isAIOpen])

  const handleSendMessage = () => {
    if (!inputVal.trim()) return

    const userMsg = { sender: "user", text: inputVal }
    setMessages((prev) => [...prev, userMsg])
    setInputVal("")

    // Simulated AI response
    setTimeout(() => {
      let reply = "That sounds amazing! Let me analyze seasonal travel deals and build a custom itinerary preview for you."
      if (inputVal.toLowerCase().includes("bali")) {
        reply = "Bali is a tropical paradise! I see flights are 18% cheaper this week. Would you like me to book your hotel near Uluwatu?"
      } else if (inputVal.toLowerCase().includes("switzerland")) {
        reply = "Switzerland is pristine! The optimal season starts next month. I can plan a scenic train route across Lucerne and Zermatt."
      } else if (inputVal.toLowerCase().includes("tokyo")) {
        reply = "Tokyo is ready! You have 12 days to go. Should we add a ramen exploration food crawl in Shinjuku to your itinerary?"
      }
      setMessages((prev) => [...prev, { sender: "ai", text: reply }])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const quickPrompts = [
    "Find hidden beaches in Bali",
    "Show Swiss Alps hiking paths",
    "Customize Tokyo itinerary",
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      <AnimatePresence>
        {isAIOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="mb-4 w-80 sm:w-96 rounded-3xl border border-black/5 bg-white/95 p-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5 mb-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-xl bg-primary-blue text-white shadow-md shadow-blue-500/10">
                  <Bot className="size-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-800 dark:text-slate-200">
                    Trip Mind AI Copilot
                  </h3>
                  <span className="text-[9px] font-bold text-emerald-500">
                    ● Always active
                  </span>
                </div>
              </div>

              <button
                onClick={() => setAIOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-500 transition-colors cursor-pointer"
                aria-label="Close assistant"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-60 overflow-y-auto space-y-2.5 pr-1 no-scrollbar mb-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed font-semibold ${
                      msg.sender === "user"
                        ? "bg-primary-blue text-white rounded-br-none"
                        : "bg-slate-50 text-slate-700 border border-black/5 dark:bg-slate-800/50 dark:text-slate-200 dark:border-white/5 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="space-y-1.5 mb-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Quick Prompts
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setInputVal(prompt)}
                      className="text-[10px] font-semibold text-slate-600 border border-black/5 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg transition-colors dark:text-slate-300 dark:bg-slate-800/40 dark:border-white/5 dark:hover:bg-slate-800/80 cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Row */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask your travel co-pilot..."
                className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-black/5 dark:border-white/5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none focus:ring-1 focus:ring-primary-blue"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputVal.trim()}
                className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary-blue text-white hover:bg-blue-600 disabled:opacity-50 transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="size-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Toggle */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setAIOpen(!isAIOpen)}
        className="flex size-14 items-center justify-center rounded-full bg-gradient-to-tr from-primary-blue to-violet-600 text-white shadow-xl shadow-blue-500/20 hover:shadow-blue-500/45 dark:shadow-blue-500/10 cursor-pointer border border-white/10"
        aria-label="Ask AI Assistant"
      >
        <motion.div
          animate={{ rotate: isAIOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
        >
          {isAIOpen ? (
            <X className="size-6 stroke-[2]" />
          ) : (
            <Sparkles className="size-6 stroke-[2] fill-white/10" />
          )}
        </motion.div>
      </motion.button>
    </div>
  )
}
