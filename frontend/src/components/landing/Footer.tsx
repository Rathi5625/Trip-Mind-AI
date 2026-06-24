import * as React from "react"
import Link from "next/link"
import { Compass } from "lucide-react"
import { Container } from "@/components/layout/Container"

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Resources", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/20 pt-16 pb-12">
      <Container className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 mb-12">
          {/* Logo and Tagline */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary-blue text-white">
                <Compass className="size-4" />
              </div>
              <span className="tracking-tight">Trip Mind AI</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              Your intelligent travel concierge, designing perfect journeys with precision and care.
            </p>
          </div>

          {/* Sitemaps */}
          <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-950 dark:text-white uppercase tracking-wider">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-500 hover:text-primary-blue dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-black/5 dark:border-white/5 pt-8 text-center sm:flex sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © 2026 Trip Mind AI. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
