"use client"
import type { ReactNode } from "react"

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  variant?: string
}

export default function SectionWrapper({ children, className = "", id, variant }: SectionWrapperProps) {
  return (
    <section id={id} className={`w-full relative site-bg ${className}`}>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">{children}</div>
    </section>
  )
}
