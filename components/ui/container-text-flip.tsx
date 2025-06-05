"use client"

import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface ContainerTextFlipProps {
  words?: string[]
  interval?: number
  className?: string
  textClassName?: string
}

export function ContainerTextFlip({
  words = ["FAST.", "EASY.", "SECURE."],
  interval = 2000,
  className,
  textClassName,
}: ContainerTextFlipProps) {
  const [currentWord, setCurrentWord] = useState(words[0])
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0]
    setCurrentWord(word)
    setIsAnimating(true)
  }, [currentWord, words])

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation()
      }, interval)
  }, [isAnimating, interval, startAnimation])

  return (
    <div
      className={cn(
        "relative inline-block text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold",
        className,
      )}
    >
      <AnimatePresence
        onExitComplete={() => {
          setIsAnimating(false)
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          exit={{
            opacity: 0,
            y: -40,
            x: 40,
            filter: "blur(8px)",
            scale: 2,
            position: "absolute",
            width: "100%",
            whiteSpace: "nowrap",
          }}
          className={cn("z-10 inline-block relative text-acqua whitespace-nowrap", textClassName)}
          key={currentWord}
        >
          {currentWord.split("").map((letter, letterIndex) => (
            <motion.span
              key={currentWord + letterIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: letterIndex * 0.05,
                duration: 0.2,
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
