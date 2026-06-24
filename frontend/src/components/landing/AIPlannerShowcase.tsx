"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Send, Share2, MoreHorizontal, Bot, Check, MapPin, DollarSign, Calendar, Users } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Container } from "@/components/layout/Container"

export function AIPlannerShowcase() {
  return (
    <section id="ai-planner" className="relative py-20 md:py-28 overflow-hidden bg-slate-50/50 dark:bg-slate-900/10">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full bg-blue-500/5 blur-[160px] -z-10 dark:bg-blue-500/5" />

      <Container>
        <SectionHeading
          badge="Intelligent Planning Interface"
          title="Chat with your AI concierge and watch your itinerary build in real-time."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left Panel: Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <GlassPanel className="flex flex-col h-[520px] p-0 overflow-hidden border-black/5 dark:border-white/5 bg-white/60 dark:bg-slate-950/40">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/5 bg-white/40 dark:bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="relative flex size-10 items-center justify-center rounded-full bg-primary-blue text-white shadow-sm shadow-blue-500/20">
                    <Bot className="size-5" />
                    <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Trip Mind AI</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Online • Ready to plan</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-sm">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary-blue px-4 py-3 text-white shadow-md shadow-blue-500/10">
                    Plan a 7-day Japan trip under ¥150,000 for a couple, focusing on food and culture.
                  </div>
                </div>

                {/* AI Response Message */}
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#E9E2D0]/60 dark:bg-slate-800/50 border border-black/5 dark:border-white/5 p-4 text-slate-800 dark:text-slate-200 space-y-2 shadow-sm">
                    <p className="font-medium">
                      I've crafted a 7-day culinary and cultural journey through Tokyo and Kyoto that fits perfectly within your budget. Here's a high-level overview:
                    </p>
                    <ul className="space-y-1.5 pl-2 list-none">
                      <li className="flex items-start gap-2">
                        <span className="text-primary-blue mt-0.5">•</span>
                        <span><strong>Days 1-3:</strong> Tokyo (Food, Akihabara, Shibuya)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-blue mt-0.5">•</span>
                        <span><strong>Days 4-6:</strong> Kyoto (Zen, Fushimi Inari, Arashiyama)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-blue mt-0.5">•</span>
                        <span><strong>Day 7:</strong> Osaka street food tour before departure.</span>
                      </li>
                    </ul>
                    <p className="pt-1 text-slate-500 dark:text-slate-400 text-xs italic">
                      I've also optimized the JR Pass usage to save you approximately ¥12,000. Generating...
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-black/5 dark:border-white/5 bg-white/40 dark:bg-white/5">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    readOnly
                    placeholder="Refine itinerary, ask for hotel options..."
                    className="w-full bg-white/80 dark:bg-slate-900/60 border border-black/5 dark:border-white/5 rounded-full py-3 pl-5 pr-12 text-xs focus:outline-none focus:ring-1 focus:ring-primary-blue/30 text-slate-600 dark:text-slate-300"
                  />
                  <button className="absolute right-2 p-1.5 rounded-full bg-primary-blue text-white shadow-sm shadow-blue-500/20 hover:scale-105 transition-transform">
                    <Send className="size-3.5" />
                  </button>
                </div>
              </div>
            </GlassPanel>
          </motion.div>

          {/* Right Panel: Itinerary Build */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <GlassPanel className="flex flex-col h-[520px] p-0 overflow-hidden border-black/5 dark:border-white/5 bg-white/60 dark:bg-slate-950/40">
              {/* Itinerary Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/5 bg-white/40 dark:bg-white/5">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5">
                    Japan: Culture & Cuisine
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-500/5 text-slate-600 dark:bg-white/5 dark:text-slate-300 text-xs font-medium">
                      <Calendar className="size-3 text-slate-400" /> 7 Days
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-500/5 text-slate-600 dark:bg-white/5 dark:text-slate-300 text-xs font-medium">
                      <Users className="size-3 text-slate-400" /> 2 Travelers
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs font-semibold">
                      <DollarSign className="size-3" /> ¥142,400 Est.
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <button className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <Share2 className="size-4" />
                  </button>
                  <button className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <MoreHorizontal className="size-4" />
                  </button>
                </div>
              </div>

              {/* Itinerary Timeline */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Day 1 */}
                <div className="relative pl-8 border-l border-slate-200 dark:border-slate-800">
                  {/* Day Indicator */}
                  <span className="absolute left-0 top-0.5 -translate-x-1/2 flex size-6 items-center justify-center rounded-full bg-primary-blue text-white text-xs font-bold shadow-md shadow-blue-500/20">
                    1
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-4">Arrival & Shinjuku Neon</h4>

                  {/* Day 1 Checkpoints */}
                  <div className="space-y-4">
                    {/* CP 1 */}
                    <div className="relative pl-4">
                      <span className="absolute left-0 top-1.5 size-2 rounded-full bg-primary-blue" />
                      <div className="text-xs font-semibold text-primary-blue">14:00</div>
                      <div className="font-semibold text-xs text-slate-800 dark:text-slate-200 mt-0.5">Arrival at Narita (NRT)</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Activate JR Pass, take Narita Express</div>
                    </div>
                    {/* CP 2 */}
                    <div className="relative pl-4">
                      <span className="absolute left-0 top-1.5 size-2 rounded-full bg-primary-blue" />
                      <div className="text-xs font-semibold text-primary-blue">16:30</div>
                      <div className="font-semibold text-xs text-slate-800 dark:text-slate-200 mt-0.5">Check-in: Shinjuku Prince Hotel</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">¥18,000/night. Excellent location.</div>
                    </div>
                    {/* CP 3 */}
                    <div className="relative pl-4">
                      <span className="absolute left-0 top-1.5 size-2 rounded-full bg-primary-blue" />
                      <div className="text-xs font-semibold text-primary-blue">19:00</div>
                      <div className="font-semibold text-xs text-slate-800 dark:text-slate-200 mt-0.5">Dinner: Omoide Yokocho</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Yakitori and local beers. ~¥4,000/person.</div>
                    </div>
                  </div>
                </div>

                {/* Day 2 */}
                <div className="relative pl-8 border-l border-transparent">
                  {/* Day Indicator */}
                  <span className="absolute left-0 top-0.5 -translate-x-1/2 flex size-6 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold">
                    2
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Traditional Tokyo</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Asakusa Senso-ji, Ueno Park, Akihabara...
                  </p>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
