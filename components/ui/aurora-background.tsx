"use client"
import { cn } from "@/lib/utils"
import type React from "react"
import type { ReactNode } from "react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
  showRadialGradient?: boolean
  backgroundImage?: string
  backgroundVideo?: string
  backgroundOpacity?: number
  backgroundSize?: string
  backgroundPosition?: string
  backgroundScale?: number
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  backgroundImage,
  backgroundVideo,
  backgroundOpacity = 0.7,
  backgroundSize = "contain",
  backgroundPosition = "center",
  backgroundScale = 100,
  ...props
}: AuroraBackgroundProps) => {
  const [isMobile, setIsMobile] = useState(false)

  // Rileva se il dispositivo è mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Controlla all'inizio
    checkIfMobile()

    // Aggiungi event listener per il resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Adatta le proprietà di sfondo in base al dispositivo
  const mobileBackgroundPosition = isMobile ? "center 15%" : backgroundPosition
  const mobileBackgroundSize = isMobile ? "contain" : backgroundSize
  const mobileBackgroundScale = isMobile ? 105 : backgroundScale // Aumentato a 105% per mobile

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center text-slate-950 w-full overflow-hidden",
        className,
      )}
      {...props}
    >
      {/* Background Image or Video */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden flex items-center justify-center">
          <div
            className="relative"
            style={{
              width: `${isMobile ? mobileBackgroundScale : backgroundScale}%`,
              height: `${isMobile ? mobileBackgroundScale : backgroundScale}%`,
              maxWidth: "none",
              maxHeight: "none",
            }}
          >
            <Image
              src={backgroundImage || "/placeholder.svg"}
              alt="Background"
              fill
              sizes={`${isMobile ? mobileBackgroundScale : backgroundScale}vw`}
              className={`object-${isMobile ? mobileBackgroundSize : backgroundSize}`}
              style={{
                opacity: backgroundOpacity,
                objectPosition: isMobile ? mobileBackgroundPosition : backgroundPosition,
              }}
              priority
            />
          </div>
        </div>
      )}

      {backgroundVideo && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`object-${isMobile ? mobileBackgroundSize : backgroundSize}`}
            style={{
              opacity: backgroundOpacity,
              objectPosition: isMobile ? mobileBackgroundPosition : backgroundPosition,
              width: `${isMobile ? mobileBackgroundScale : backgroundScale}%`,
              height: `${isMobile ? mobileBackgroundScale : backgroundScale}%`,
              maxWidth: "none",
              maxHeight: "none",
            }}
          >
            <source src={backgroundVideo} type="video/webp" />
          </video>
        </div>
      )}

      {/* Aurora Effect Overlay */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--dark-blue)_0%,var(--dark-blue)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--dark-blue)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--acqua-300)_10%,var(--acqua-200)_15%,var(--acqua-100)_20%,var(--acqua-400)_25%,var(--acqua-300)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-plus-lighter
            pointer-events-none
            absolute -inset-[10px] opacity-50 animate-aurora will-change-transform`,
            showRadialGradient && `[mask-image:radial-gradient(ellipse_at_100%_0%,black_20%,var(--transparent)_80%)]`,
          )}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-20 w-full h-full">{children}</div>
    </div>
  )
}
