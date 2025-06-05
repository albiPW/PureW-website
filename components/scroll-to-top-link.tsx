"use client"

import Link from "next/link"
import type { ReactNode } from "react"

interface ScrollToTopLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export function ScrollToTopLink({ href, children, className }: ScrollToTopLinkProps) {
  // Utilizziamo il componente Link di Next.js con un approccio più semplice
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        // Forziamo lo scroll all'inizio immediatamente
        window.scrollTo(0, 0)
      }}
    >
      {children}
    </Link>
  )
}
