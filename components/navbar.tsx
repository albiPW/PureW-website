"use client"

import type React from "react"

import { Button } from "@/components/ui/button"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
// Importa il componente DownloadButton
import { DownloadButton } from "@/components/download-button"
// Importa il componente ScrollToTopLink
import { ScrollToTopLink } from "@/components/scroll-to-top-link"
// per config link navbar
import { siteConfig } from "@/config/site-config"

const allNavLinks = [
  { name: "Account", href: "/account", key: "account" },
  { name: "Crypto", href: "/crypto", key: "crypto" },
  { name: "Trade", href: "/trade", key: "trade" },
  { name: "Invest", href: "/invest", key: "invest" },
  { name: "FAQ", href: "/faq", key: "faq" },
]
// Filter to only show published sections
const navLinks = allNavLinks.filter(
  (link) => siteConfig.publishedSections[link.key as keyof typeof siteConfig.publishedSections],
)

interface NavbarProps {
  className?: string
}

export default function Navbar({ className }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const router = useRouter()
  const pathname = usePathname()
  const menuButtonRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

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

  useEffect(() => {
    const handleScroll = () => {
      // Calcola la percentuale di scroll per una transizione fluida
      const scrollThreshold = 50 // Pixel dopo i quali la transizione è completa
      const scrollValue = Math.min(window.scrollY, scrollThreshold)
      const progress = scrollValue / scrollThreshold
      setScrollProgress(progress)

      // Imposta isScrolled per mostrare/nascondere elementi
      const scrolled = window.scrollY > 10
      setIsScrolled(scrolled)

      // Chiudi il menu mobile quando si fa scroll
      if (mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mobileMenuOpen])

  // Chiudi il menu quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuButtonRef.current && !menuButtonRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Funzione per gestire il click sul logo
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (pathname === "/") {
      // Se siamo già nella homepage, scorriamo all'inizio della pagina
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    } else {
      // Se siamo in un'altra pagina, navighiamo alla homepage
      router.push("/")

      // Aggiungiamo un piccolo timeout per assicurarci che lo scroll avvenga dopo la navigazione
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className={cn("w-full z-50 fixed top-0 left-0 right-0 transition-all duration-300", className)}>
      <nav className={cn("flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4")}>
        <div className="flex items-center">
          <button
            onClick={handleLogoClick}
            className="flex items-center focus:outline-none relative"
            aria-label="Go to homepage hero"
          >
            {/* Logo container con entrambi i loghi */}
            <div className="relative h-14 w-56 sm:h-16 sm:w-64">
              {/* Logo completo - si dissolve quando si scrolla */}
              <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: 1 - scrollProgress }}>
                <Image
                  src="/images/logopure-white-2.png"
                  alt="Purewallet Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>

              {/* Logo P - appare quando si scrolla */}
              <div
                className="absolute transition-opacity duration-300"
                style={{
                  opacity: scrollProgress,
                  height: "40px",
                  width: "40px",
                  top: "9.0px",
                  left: "1.8px",
                }}
              >
                <div className="relative h-10 w-10 sm:h-12 sm:w-12">
                  <Image
                    src="/images/p-logobianco.png"
                    alt="Purewallet P Logo"
                    fill
                    className="object-contain object-center"
                  />
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Navigation Links e Menu Button */}
        {isMobile ? (
          // Su mobile, mostra il menu hamburger
          <div className="relative" ref={menuButtonRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className="mobile-menu-button hover:bg-transparent focus:bg-transparent active:bg-transparent hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-acqua" />}
            </Button>

            {/* Menu mobile */}
            {mobileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-dark-blue/95 backdrop-blur-md border border-white/10 rounded-lg shadow-lg overflow-hidden z-50">
                <div className="py-1">
                  {navLinks.map((link) => (
                    <ScrollToTopLink
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "block px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors",
                        pathname === link.href && "text-white bg-white/5",
                      )}
                    >
                      <span onClick={() => setMobileMenuOpen(false)}>{link.name}</span>
                    </ScrollToTopLink>
                  ))}
                  <div className="border-t border-white/10 my-1 px-4 py-2">
                    <DownloadButton
                      className="w-full justify-center text-sm py-1.5"
                      text="Download"
                      showIcon={true}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : // Su desktop, mostra i link orizzontalmente quando non scrollato
        !isScrolled ? (
          <div className="hidden md:flex items-center space-x-6 lg:space-x-12">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={cn(
                    "text-base lg:text-lg font-medium text-white/80 group-hover:text-white transition-colors duration-200 whitespace-nowrap",
                    pathname === link.href && "text-white",
                  )}
                  onMouseEnter={() => setActiveLink(link.name)}
                  onMouseLeave={() => setActiveLink("")}
                >
                  {link.name}
                </Link>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-acqua transition-all duration-300 ${
                    activeLink === link.name || pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </div>
            ))}
          </div>
        ) : (
          // Su desktop, quando scrollato, mostra il menu hamburger
          <div className="relative" ref={menuButtonRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className="mobile-menu-button hover:bg-transparent focus:bg-transparent active:bg-transparent hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-acqua" />}
            </Button>

            {/* Menu quando scrollato */}
            {mobileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-dark-blue/95 backdrop-blur-md border border-white/10 rounded-lg shadow-lg overflow-hidden z-50">
                <div className="py-1">
                  {navLinks.map((link) => (
                    <ScrollToTopLink
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "block px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors",
                        pathname === link.href && "text-white bg-white/5",
                      )}
                    >
                      <span onClick={() => setMobileMenuOpen(false)}>{link.name}</span>
                    </ScrollToTopLink>
                  ))}
                  <div className="border-t border-white/10 my-1 px-4 py-2">
                    <DownloadButton
                      className="w-full justify-center text-sm py-1.5"
                      text="Download"
                      showIcon={true}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!isScrolled && !isMobile && (
          <div className="hidden md:flex items-center">
            <DownloadButton className="px-4 py-2 ml-4" text="Download" showIcon={true} size="default" />
          </div>
        )}
      </nav>
    </header>
  )
}
