import type { Variants, Transition } from "framer-motion"

// ─────────────────────────────────────────────────────────────────────────────
// Shared easing curves
// ─────────────────────────────────────────────────────────────────────────────

export const EASE_SPRING: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 28
}

export const EASE_OUT: Transition = {
  type: "tween",
  ease: [0.16, 1, 0.3, 1],
  duration: 0.4
}

export const EASE_FAST: Transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2
}

// ─────────────────────────────────────────────────────────────────────────────
// Marker animations
// ─────────────────────────────────────────────────────────────────────────────

export const markerDropVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.5 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...EASE_SPRING, delay: 0 }
  },
  exit: {
    opacity: 0,
    scale: 0.4,
    transition: EASE_FAST
  }
}

export const markerHoverVariants: Variants = {
  rest: { scale: 1, zIndex: 1 },
  hover: { scale: 1.18, zIndex: 10, transition: EASE_FAST },
  selected: { scale: 1.22, zIndex: 20, transition: EASE_SPRING }
}

export const markerPulseVariants: Variants = {
  pulse: {
    scale: [1, 1.5, 1],
    opacity: [0.6, 0, 0.6],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const clusterVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: EASE_SPRING
  },
  hover: { scale: 1.12, transition: EASE_FAST }
}

// ─────────────────────────────────────────────────────────────────────────────
// Popup animations
// ─────────────────────────────────────────────────────────────────────────────

export const popupVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.93 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: EASE_OUT
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.93,
    transition: EASE_FAST
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Panel / sidebar animations
// ─────────────────────────────────────────────────────────────────────────────

export const sidebarVariants: Variants = {
  hidden: { x: -280, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: EASE_SPRING
  },
  exit: {
    x: -280,
    opacity: 0,
    transition: { ...EASE_FAST, duration: 0.25 }
  }
}

export const panelSlideUpVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: EASE_SPRING
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: EASE_FAST
  }
}

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
}

export const layerFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

// ─────────────────────────────────────────────────────────────────────────────
// Loading shimmer (used with CSS background-size animation)
// ─────────────────────────────────────────────────────────────────────────────

export const shimmerVariants: Variants = {
  shimmer: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Stagger children helper
// ─────────────────────────────────────────────────────────────────────────────

export function staggerContainer(staggerChildren = 0.08, delayChildren = 0.1): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren }
    }
  }
}

export function staggerItem(index: number, baseDelay = 0): Variants {
  return {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...EASE_OUT, delay: baseDelay + index * 0.06 }
    }
  }
}
