import type { MapMarker, MarkerType } from "../types/marker"
import { MARKER_COLORS } from "../constants/mapStyles"

// ── Custom marker element factory ─────────────────────────────────────────

/**
 * Create a custom DOM element for a MapLibre marker.
 * Returns a styled div based on marker type, size, badge, and animation.
 */
export function createMarkerElement(config: MapMarker): HTMLDivElement {
  const el = document.createElement("div")
  el.className = "trip-mind-marker"
  el.setAttribute("data-marker-id", config.id)
  el.setAttribute("role", "button")
  el.setAttribute("aria-label", config.label ?? config.type)
  el.tabIndex = 0

  const markerColor = config.color ?? MARKER_COLORS[config.type] ?? "#2563EB"
  
  const sizeMap: Record<string, number> = { xs: 20, sm: 28, md: 36, lg: 48, xl: 56 }
  const size = sizeMap[config.size ?? "md"]

  el.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    will-change: transform;
    transition: transform 0.2s ease;
  `

  // Pulse ring for animated markers
  if (config.isPulsing) {
    const pulse = document.createElement("div")
    pulse.style.cssText = `
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      background: ${markerColor};
      opacity: 0.25;
      animation: tripMindPulse 2s ease-in-out infinite;
    `
    el.appendChild(pulse)
  }

  // Pin body
  if (config.imageUrl) {
    // Image marker (circular photo)
    const img = document.createElement("img")
    img.src = config.imageUrl
    img.alt = config.label ?? ""
    img.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid white;
      box-shadow: 0 4px 14px rgba(0,0,0,0.25);
    `
    el.appendChild(img)
  } else {
    // Solid color pin
    const pin = document.createElement("div")
    pin.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      background: ${markerColor};
      box-shadow: 0 4px 14px ${markerColor}55;
      border: 3px solid white;
    `
    const inner = document.createElement("div")
    inner.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: rotate(45deg) translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: white;
    `
    pin.appendChild(inner)
    el.appendChild(pin)
  }

  // Badge
  if (config.badge !== undefined) {
    const badge = document.createElement("div")
    badge.textContent = String(config.badge)
    badge.style.cssText = `
      position: absolute;
      top: -4px;
      right: -4px;
      background: #EF4444;
      color: white;
      font-size: 9px;
      font-weight: 900;
      padding: 1px 4px;
      border-radius: 999px;
      border: 2px solid white;
      line-height: 1.4;
      white-space: nowrap;
    `
    el.appendChild(badge)
  }

  // Hover scale
  el.addEventListener("mouseenter", () => {
    el.style.transform = "scale(1.15)"
    el.style.zIndex = "10"
  })
  el.addEventListener("mouseleave", () => {
    el.style.transform = "scale(1)"
    el.style.zIndex = "1"
  })

  // Bounce animation on click
  el.addEventListener("click", () => {
    el.style.transform = "scale(0.88)"
    setTimeout(() => { el.style.transform = "scale(1.1)" }, 100)
    setTimeout(() => { el.style.transform = "scale(1)" }, 220)
  })

  return el
}

/**
 * Inject global CSS for pulse animation (call once at app startup).
 */
export function injectMarkerStyles(): void {
  if (typeof document === "undefined") return
  const id = "trip-mind-marker-styles"
  if (document.getElementById(id)) return

  const style = document.createElement("style")
  style.id = id
  style.textContent = `
    @keyframes tripMindPulse {
      0%, 100% { transform: scale(1); opacity: 0.25; }
      50%       { transform: scale(1.6); opacity: 0; }
    }
    .trip-mind-marker:focus {
      outline: 2px solid #2563EB;
      outline-offset: 3px;
    }
  `
  document.head.appendChild(style)
}

/**
 * Build a MapLibre-compatible popup HTML string for a destination marker.
 */
export function buildPopupHTML(opts: {
  name: string
  country: string
  imageUrl?: string
  matchScore?: number
  avgFlight?: string
  isSaved?: boolean
}): string {
  return `
    <div style="font-family: system-ui, sans-serif; min-width: 180px; overflow: hidden; border-radius: 12px;">
      ${opts.imageUrl ? `<img src="${opts.imageUrl}" alt="${opts.name}" style="width:100%;height:100px;object-fit:cover;display:block;" />` : ""}
      <div style="padding: 10px 12px; space-y: 4px;">
        <div style="font-size:13px;font-weight:900;color:#0f172a;margin-bottom:2px;">${opts.name}</div>
        <div style="font-size:10px;font-weight:700;color:#94a3b8;">${opts.country}</div>
        ${opts.matchScore !== undefined ? `<div style="margin-top:6px;font-size:10px;font-weight:900;color:#2563eb;">${opts.matchScore}% AI Match</div>` : ""}
        ${opts.avgFlight ? `<div style="font-size:11px;font-weight:700;color:#0f172a;margin-top:2px;">${opts.avgFlight} avg flight</div>` : ""}
      </div>
    </div>
  `.trim()
}
