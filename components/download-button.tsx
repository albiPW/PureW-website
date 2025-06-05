"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useDeviceDetection } from "@/hooks/use-device-detection"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useModal } from "@/components/modal-provider"

interface DownloadButtonProps {
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  showIcon?: boolean
  text?: string
}

export function DownloadButton({
  className,
  variant = "default",
  size = "default",
  showIcon = true,
  text = "Download Purewallet",
}: DownloadButtonProps) {
  const { getDownloadLink, deviceType } = useDeviceDetection()
  const { openQRCodeModal } = useModal()
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

  // Handle desktop users - show QR code modal or redirect to a download page
  const handleClick = (e: React.MouseEvent) => {
    if (deviceType === "desktop") {
      e.preventDefault()
      openQRCodeModal()
    } else {
      window.open(getDownloadLink(), "_blank")
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("bg-gradient-to-r from-acqua to-acqua/80 hover:from-acqua/80 hover:to-acqua text-white", className)}
      onClick={handleClick}
    >
      {showIcon && <Download className="mr-2 h-5 w-5" />}
      {text}
    </Button>
  )
}
