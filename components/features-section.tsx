"use client"

import { ThreeDMarquee } from "@/components/ui/3d-marquee"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDeviceDetection } from "@/hooks/use-device-detection"

export default function FeaturesSection() {
  const { getDownloadLink } = useDeviceDetection()
  const router = useRouter()

  // Utilizzo solo le immagini che esistono
  const images = [
    "/images/ethereum-blockchain-network.png",
    "/images/nft-marketplace-concept.jpg",
    "/images/bitcoin-mining-operation.jpg",
    "/images/crypto-security-abstract.png",
    "/images/blockchain-visualization.png",
    "/images/card-payment-pos.jpg",
    "/images/defi-platform-interface.jpg",
    "/images/crypto-stock.jpg",
    "/images/pos2.jpg",
    "/images/app1.jpg",
    "/images/card.jpg",
    "/images/pure1.jpg",
    "/images/exchange.png",
    "/images/cryptowallet.png",
    "/images/mobile-payment.png"
  ]

  const handleLearnMoreClick = () => {
    router.push("/account")
    // The setTimeout ensures the navigation happens first, then the scroll
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, 100)
  }

  return (
    <section id="features" className="w-full relative site-bg py-0 overflow-hidden">
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        {/* Overlay per migliorare la leggibilità del testo */}
        <div className="absolute inset-0 z-10 h-full w-full bg-dark-blue/80" />

        {/* 3D Marquee component - ora occupa l'intera sezione */}
        <div className="absolute inset-0 z-0">
          <ThreeDMarquee className="h-full w-full" images={images} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center mb-8 px-4"
        >
          <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-5xl">
           More Than a <span className="relative z-20 inline-block text-acqua">Wallet</span>
          </h2>
          <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-lg">
          Trade, hold, and use your crypto across multiple assets—digitally or at checkout—with seamless access from mobile to a physical card.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4 px-4"
        >
          {/* Pulsante "Explore Features" che porta alla pagina di download */}
          <Link href={getDownloadLink()} target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-acqua to-acqua/80 hover:from-acqua/80 hover:to-acqua text-white px-6 py-6 rounded-lg">
              Explore Features
            </Button>
          </Link>

          {/* Pulsante "Learn More" che porta alla pagina account e scorre all'inizio */}
          <Button
            variant="outline"
            className="border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-6 py-6 rounded-lg"
            onClick={handleLearnMoreClick}
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
