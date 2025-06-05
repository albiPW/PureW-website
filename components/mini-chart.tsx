"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface MiniChartProps {
  trend: "up" | "down" | "neutral"
  className?: string
}

export function MiniChart({ trend, className }: MiniChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={cn("w-[120px] h-[40px]", className)} />
  }

  const generatePath = () => {
    const points = 19
    const path = []
    const amplitude = trend === "neutral" ? 10 : 30
    const baseY = trend === "up" ? 100 : trend === "down" ? 0 : 50

    for (let i = 0; i <= points; i++) {
      const x = (i / points) * 100
      const y = baseY + (trend === "neutral" ? Math.sin(i * 0.5) * amplitude : -Math.sin(i * 0.5) * amplitude)
      path.push(`${x} ${y}`)
    }

    return `M ${path.join(" L ")}`
  }

  return (
    <div className={cn("w-[120px] h-[40px]", className)}>
      <svg width="120" height="40" viewBox="0 0 100 100" className="overflow-visible">
        <path
          d={generatePath()}
          fill="none"
          strokeWidth="2"
          stroke={trend === "up" ? "#2AF8CD" : trend === "down" ? "#FF4560" : "#8884d8"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
} 