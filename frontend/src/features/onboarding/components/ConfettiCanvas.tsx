"use client"

import * as React from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
  opacity: number
  shape: "rect" | "circle" | "triangle"
}

const COLORS = [
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#f59e0b", // amber
  "#10b981", // emerald
  "#f97316", // orange
  "#06b6d4", // cyan
]

function createParticle(canvasW: number): Particle {
  const angle = Math.random() * Math.PI * 2
  const speed = 2 + Math.random() * 5
  return {
    x: Math.random() * canvasW,
    y: -10,
    vx: Math.cos(angle) * speed * 0.6,
    vy: speed + Math.random() * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 4 + Math.random() * 6,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 8,
    opacity: 1,
    shape: (["rect", "circle", "triangle"] as const)[Math.floor(Math.random() * 3)],
  }
}

interface ConfettiCanvasProps {
  /** Duration in ms before particles start fading — default 2200 */
  duration?: number
}

export function ConfettiCanvas({ duration = 2200 }: ConfettiCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const particlesRef = React.useRef<Particle[]>([])
  const animFrameRef = React.useRef<number>(0)
  const startRef = React.useRef<number>(0)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!mounted) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Resize to full viewport
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Spawn burst of particles
    for (let i = 0; i < 120; i++) {
      particlesRef.current.push(createParticle(canvas.width))
    }

    startRef.current = performance.now()

    const draw = (shape: Particle["shape"], ctx: CanvasRenderingContext2D, size: number) => {
      if (shape === "circle") {
        ctx.beginPath()
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
        ctx.fill()
      } else if (shape === "triangle") {
        ctx.beginPath()
        ctx.moveTo(0, -size / 2)
        ctx.lineTo(size / 2, size / 2)
        ctx.lineTo(-size / 2, size / 2)
        ctx.closePath()
        ctx.fill()
      } else {
        ctx.fillRect(-size / 2, -size / 4, size, size / 2)
      }
    }

    const tick = (now: number) => {
      const elapsed = now - startRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0.02)

      particlesRef.current.forEach((p) => {
        // Gravity + drag
        p.vy += 0.12
        p.vx *= 0.99
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed

        // Fade out after duration
        if (elapsed > duration) {
          p.opacity -= 0.018
        }

        ctx.save()
        ctx.globalAlpha = Math.max(p.opacity, 0)
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        draw(p.shape, ctx, p.size)
        ctx.restore()
      })

      if (particlesRef.current.length > 0) {
        animFrameRef.current = requestAnimationFrame(tick)
      }
    }

    animFrameRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener("resize", resize)
      particlesRef.current = []
    }
  }, [mounted, duration])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60]"
      aria-hidden="true"
    />
  )
}
