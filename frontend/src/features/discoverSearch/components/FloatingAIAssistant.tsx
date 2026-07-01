"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, Send } from "lucide-react"

interface Message {
  sender: "bot" | "user"
  text: string
}

export function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [inputVal, setInputVal] = React.useState("")
  const [messages, setMessages] = React.useState<Message[]>([
    { sender: "bot", text: "I see you're looking at Japan travel. Would you like to compare Kyoto with Osaka or get some hotel suggestions?" }
  ])
  const [isTyping, setIsTyping] = React.useState(false)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputVal.trim()) return

    const userMsg = inputVal
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }])
    setInputVal("")
    setIsTyping(true)

    // Simulate chatbot typing latency
    setTimeout(() => {
      setIsTyping(false)
      const lower = userMsg.toLowerCase()
      let reply = "Kyoto generally offers more traditional temples and quieter gardens, whereas Osaka has vibrant food markets and nightlife."
      if (lower.includes("hotel") || lower.includes("stay")) {
        reply = "I'd suggest staying in Gion (Kyoto) for classical ryokans, or Dotonbori (Osaka) if you want to walk straight into food stalls."
      } else if (lower.includes("shirakawa") || lower.includes("kanazawa")) {
        reply = "Kanazawa is exceptionally well preserved! You can catch a train from Kyoto in under 2 hours."
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

      {/* Chat panel drawer */}
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
                <h4 className="text-xs font-black uppercase tracking-wider">Atlas AI Search Intelligence</h4>
                <span className="text-[9px] font-semibold text-blue-200">Online • Active Context</span>
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
                <div className="bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 self-start p-2.5 rounded-2xl rounded-tl-none text-[9px] font-black uppercase tracking-widest animate-pulse">
                  Typing...
                </div>
              )}
            </div>

            {/* Submission Input footer */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/20 flex gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask your concierge..."
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
