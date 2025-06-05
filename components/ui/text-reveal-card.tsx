"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TextRevealCardProps {
  text: string
  revealText: string
  className?: string
}

export const TextRevealCard = ({ text, revealText, className }: TextRevealCardProps) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 z-10 h-full w-full bg-[radial-gradient(circle_at_50%_120%,rgba(96,165,250,0.3),transparent)]" />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 pb-4"
      >
        {text}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base sm:text-xl md:text-2xl text-center bg-gradient-to-r from-acqua to-acqua/70 bg-clip-text text-transparent font-medium"
      >
        {revealText}
      </motion.p>
    </div>
  )
}
