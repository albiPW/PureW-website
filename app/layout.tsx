import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { ModalProvider } from "@/components/modal-provider"
import TawkToChat from "@/components/tawk-to-chat"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Purewallet | All-in-One Crypto Asset Manager",
  description:
    "Manage, trade, and grow your crypto portfolio with Purewallet - the secure all-in-one crypto asset manager.",
    generator: 'albyleo-dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <ModalProvider>
            <Navbar />
            {children}
            <TawkToChat />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
