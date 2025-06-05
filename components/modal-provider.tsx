"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { QRCodeModal } from "@/components/qr-code-modal"

// Definizione del contesto
type ModalContextType = {
  openQRCodeModal: () => void
  closeQRCodeModal: () => void
  isQRCodeModalOpen: boolean
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

// Provider del contesto
export function ModalProvider({ children }: { children: ReactNode }) {
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false)

  const openQRCodeModal = () => setIsQRCodeModalOpen(true)
  const closeQRCodeModal = () => setIsQRCodeModalOpen(false)

  return (
    <ModalContext.Provider
      value={{
        openQRCodeModal,
        closeQRCodeModal,
        isQRCodeModalOpen,
      }}
    >
      {children}
      <QRCodeModal isOpen={isQRCodeModalOpen} onClose={closeQRCodeModal} />
    </ModalContext.Provider>
  )
}

// Hook personalizzato per utilizzare il contesto
export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}
