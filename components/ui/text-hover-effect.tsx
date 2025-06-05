"use client"
import { useState } from "react"
import { motion } from "framer-motion"

export const TextHoverEffect = ({
  text,
  className,
}: {
  text: string
  className?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  // Split text into individual characters for animation
  const characters = text.split("")

  return (
    <div
      className={`relative flex items-center justify-center w-full ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center text-white/90 whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            className="inline-block"
            initial={{ opacity: 1 }}
            animate={{
              y: isHovered ? [0, -10, 0] : 0,
              color: isHovered
                ? ["rgba(255,255,255,0.9)", "rgba(42,248,205,0.8)", "rgba(42,248,205,0.8)", "rgba(255,255,255,0.9)"]
                : "rgba(255,255,255,0.9)",
              textShadow: isHovered ? "0 0 10px rgba(42, 248, 205, 0.5)" : "none",
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.05,
              ease: "easeInOut",
            }}
            style={{
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  )
}
