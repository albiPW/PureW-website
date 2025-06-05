"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import SectionWrapper from "@/components/section-wrapper"
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    image: '/images/defi-platform-interface.jpg',
    title: 'DeFi Platform',
    description: 'Modern interface for DeFi trading'
  },
  {
    image: '/images/crypto-stock.jpg',
    title: 'Markets Trend',
    description: 'Monitors market trends and performance'
  },
  {
    image: '/images/blockchain-visualization.png',
    title: 'Blockchain Transactions',
    description: 'Send Crypto to friends and contacts'
  },
  {
    image: '/images/crypto-security-abstract.png',
    title: 'Advanced Security',
    description: 'Protecting your assets with cutting-edge technology'
  }
]

export default function CryptoSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <SectionWrapper id="crypto" className="py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Manage your Funds with Pure.</h2>
          <p className="text-xl text-muted-foreground mb-8">
           Manage all your assets -fiat, crypto, stocks- in one secure and user-friendly platform. Pay, save, invest, and transfer money instantly.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-acqua/20 flex items-center justify-center mt-1">
                <span className="h-3 w-3 rounded-full bg-acqua"></span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Secure Digital Wallet</h3>
                <p className="text-muted-foreground">Store crypto, digital currencies, and fiat securely with cold storage, 2FA, and biometric protection.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-acqua/20 flex items-center justify-center mt-1">
                <span className="h-3 w-3 rounded-full bg-acqua"></span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Instant Peer-to-Peer Transfers</h3>
                <p className="text-muted-foreground">Send and receive money instantly to friends and contacts, even across borders.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-acqua/20 flex items-center justify-center mt-1">
                <span className="h-3 w-3 rounded-full bg-acqua"></span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Multi-Asset Trading</h3>
                <p className="text-muted-foreground">Buy and sell stocks, ETFs, cryptocurrencies, and commodities from a single, intuitive interface.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-acqua/20 flex items-center justify-center mt-1">
                <span className="h-3 w-3 rounded-full bg-acqua"></span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Pay Your Way, Anywhere</h3>
                <p className="text-muted-foreground">Use your brand card for seamless POS payments with a virtual wallet, tap or swipe with a physical card, or shop securely online—wherever and however you choose.</p>
              </div>
            </div>
          </div>

          <Button className="bg-gradient-to-r from-acqua to-acqua/80 hover:from-acqua/80 hover:to-acqua text-white px-6 py-6 rounded-lg">
            Explore Features  
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden border border-white/10 shadow-2xl"
        >
          <div className="relative w-full h-full">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {slides.map((slide, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 relative">
                    <div className="relative w-full h-[400px] sm:h-[500px]">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{slide.title}</h3>
                        <p className="text-white/80">{slide.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
