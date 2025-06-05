"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function QRCodeModal({ isOpen, onClose }: QRCodeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const scrollPositionRef = useRef(0)

  // Chiudi il modal quando si preme ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => document.removeEventListener("keydown", handleEscKey)
  }, [isOpen, onClose])

  // Chiudi il modal quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        overlayRef.current &&
        modalRef.current &&
        event.target instanceof Node &&
        overlayRef.current.contains(event.target) &&
        !modalRef.current.contains(event.target)
      ) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])

  // Gestione dello scroll - approccio migliorato
  useEffect(() => {
    if (!isOpen) return

    // Salva la posizione di scroll corrente
    scrollPositionRef.current = window.scrollY

    // Blocca lo scroll senza modificare il layout
    document.body.style.overflow = "hidden"
    document.body.style.paddingRight = "0px" // Previene lo spostamento del layout

    return () => {
      // Ripristina lo scroll
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""

      // Ripristina la posizione di scroll
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: "auto",
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[2px]"
      style={{ overflow: "auto" }}
    >
      <div
        ref={modalRef}
        className={cn(
          "relative w-full max-w-md rounded-xl shadow-2xl p-8 transform transition-all duration-300 overflow-hidden m-4",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
        )}
      >
        {/* Background con sfumature */}
        <div className="absolute inset-0 bg-dark-blue">
          {/* Sfumature azzurre */}
          <div className="absolute inset-0 opacity-70">
            {/* Sfumatura principale */}
            <div className="absolute inset-0 bg-gradient-to-br from-dark-blue via-blue-900 to-dark-blue"></div>

            {/* Sfumature azzurre a tratti */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-acqua/10 via-transparent to-acqua/5 blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-2/3 h-1/2 bg-gradient-to-tl from-acqua/15 via-transparent to-transparent blur-xl"></div>
            <div className="absolute top-1/4 right-0 w-1/2 h-1/3 bg-gradient-to-l from-acqua/10 via-transparent to-transparent blur-lg"></div>

            {/* Punti luminosi */}
            <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-acqua/20 blur-xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full bg-acqua/15 blur-xl"></div>
            <div className="absolute top-2/3 left-1/3 w-8 h-8 rounded-full bg-acqua/10 blur-lg"></div>
          </div>
        </div>

        {/* Pulsante di chiusura */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Contenuto del modal */}
        <div className="flex flex-col items-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-8">Download the app</h2>

          <div className="relative h-64 w-64 mb-6">
            <div className="absolute -inset-4 bg-white/5 rounded-full blur-md"></div>
            <div className="relative">
              <Image
                src="/images/qrcodepure.png"
                alt="QR Code per scaricare Purewallet"
                width={256}
                height={256}
                className="object-contain rounded-lg"
                priority
              />
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-white/90 text-lg mb-2">Scan the QR code to download Purewallet.</p>
            <p className="text-acqua text-lg font-medium">The smartest way to manage your crypto assets.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-acqua fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>  
          </div>
        </div>
      </div>
    </div>
  )
}
