"use client"

import { motion } from "framer-motion"
import { useKrakenCryptoData } from "@/hooks/use-kraken-crypto-data"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { useState, useEffect } from "react"
import { useDeviceDetection } from "@/hooks/use-device-detection"
import { useModal } from "@/components/modal-provider"
import { DownloadButton } from "@/components/download-button"

// Componente per il mini grafico
const MiniChart = ({ trend }: { trend: "up" | "down" | "neutral" }) => {
  // Genera punti casuali per il grafico
  const generatePoints = (trend: "up" | "down" | "neutral", length = 20) => {
    const points: number[] = []
    let value = 50

    for (let i = 0; i < length; i++) {
      // La direzione del trend influenza la generazione casuale
      const change =
        trend === "up"
          ? Math.random() * 5 - 1.5 // Più probabile che salga
          : trend === "down"
            ? Math.random() * 5 - 3.5 // Più probabile che scenda
            : Math.random() * 4 - 2 // Neutrale, probabilità uguale

      value += change
      // Mantieni entro i limiti
      value = Math.max(10, Math.min(90, value))
      points.push(value)
    }

    return points
  }

  const points = generatePoints(trend)
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min

  // Normalizza i punti per adattarli all'area del grafico
  const normalizedPoints = points.map((p) => ((p - min) / (range || 1)) * 100)

  // Crea il percorso SVG
  const pathData = normalizedPoints.reduce((path, point, i) => {
    const x = (i / (normalizedPoints.length - 1)) * 100
    const y = 100 - point
    return path + `${i === 0 ? "M" : "L"} ${x} ${y}`
  }, "")

  return (
    <svg width="120" height="40" viewBox="0 0 100 100" className="overflow-visible">
      <path
        d={pathData}
        fill="none"
        strokeWidth="2"
        stroke={trend === "up" ? "#2AF8CD" : trend === "down" ? "#FF4560" : "#9CA3AF"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const INITIAL_DATA = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: "0",
    changePercent: 0,
    volume: "0",
    trend: "neutral",
    isUpdated: false,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: "0",
    changePercent: 0,
    volume: "0",
    trend: "neutral",
    isUpdated: false,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: "0",
    changePercent: 0,
    volume: "0",
    trend: "neutral",
    isUpdated: false,
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    price: "0",
    changePercent: 0,
    volume: "0",
    trend: "neutral",
    isUpdated: false,
  },
  {
    id: "ripple",
    name: "Ripple",
    symbol: "XRP",
    price: "0",
    changePercent: 0,
    volume: "0",
    trend: "neutral",
    isUpdated: false,
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: "0",
    changePercent: 0,
    volume: "0",
    trend: "neutral",
    isUpdated: false,
  },
]

export default function CryptoPriceTable() {
  const { cryptoPrices, isLoading, error } = useKrakenCryptoData()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [visible, setVisible] = useState(false)
  const { isMobile, getDownloadLink } = useDeviceDetection()
  const { openQRCodeModal } = useModal()

  // Imposta visible a true quando il componente è in vista
  useEffect(() => {
    if (inView) {
      setVisible(true)
    }
  }, [inView])

  // Funzione per gestire il click sui pulsanti Buy
  const handleBuyClick = (crypto: { symbol: string; name: string }) => {
    if (isMobile) {
      window.open(getDownloadLink(), "_blank")
    } else {
      // Apri il modal QR code per desktop
      openQRCodeModal()
    }
  }

  // Assicurati che ci siano sempre dati da mostrare
  const displayData =
    cryptoPrices.length > 0 && cryptoPrices.some((crypto) => Number.parseFloat(crypto.price) > 0)
      ? cryptoPrices
      : INITIAL_DATA

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gray-900/50 rounded-xl overflow-hidden shadow-xl"
      >
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <div className="overflow-hidden">
            <motion.h3
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.3,
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: 0.5,
                  staggerChildren: 0.1,
                }}
                className="bg-gradient-to-r from-white to-acqua bg-clip-text text-transparent"
              >
                Top Cryptocurrencies
              </motion.span>
            </motion.h3>
            {error && (
              <div className="mt-2">
                <p className="text-amber-400 text-sm">{error} Showing last available data.</p>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800/80">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Asset</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Price</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Daily Change</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-300 hidden md:table-cell">
                  24h Trend
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-300 hidden md:table-cell">
                  24h Volume
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-300"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {isLoading
                ? // Stato di caricamento
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={`loading-${index}`} className="animate-pulse">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                          <div className="ml-3">
                            <div className="h-4 w-24 bg-gray-700 rounded"></div>
                            <div className="h-3 w-16 bg-gray-700 rounded mt-2"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="h-4 w-20 bg-gray-700 rounded ml-auto"></div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="h-4 w-16 bg-gray-700 rounded ml-auto"></div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <div className="h-10 w-24 bg-gray-700 rounded mx-auto"></div>
                      </td>
                      <td className="px-4 py-4 text-right hidden md:table-cell">
                        <div className="h-4 w-16 bg-gray-700 rounded ml-auto"></div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="h-8 w-16 bg-gray-700 rounded ml-auto"></div>
                      </td>
                    </tr>
                  ))
                : // Dati effettivi
                  displayData.map((crypto) => (
                    <motion.tr
                      key={crypto.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-800/50"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                            <Image
                              src={`/images/crypto-icons/${crypto.id.toLowerCase()}.svg`}
                              alt={crypto.name}
                              width={24}
                              height={24}
                              className="object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                // Verifica se l'immagine corrente non è già generic-crypto.svg
                                if (!target.src.includes('generic-crypto.svg')) {
                                target.src = "/images/crypto-icons/generic-crypto.svg"
                                }
                              }}
                            />
                          </div>
                          <div className="ml-3">
                            <div className="font-medium text-white">{crypto.name}</div>
                            <div className="text-sm text-gray-400">{crypto.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td
                        className={cn(
                          "px-4 py-4 text-right font-medium text-white transition-colors duration-300",
                          crypto.isUpdated && "bg-acqua/20",
                        )}
                      >
                        €{crypto.price}
                      </td>
                      <td
                        className={cn(
                          "px-4 py-4 text-right font-medium transition-colors duration-300",
                          crypto.isUpdated && "bg-acqua/20",
                          crypto.changePercent > 0
                            ? "text-green-400"
                            : crypto.changePercent < 0
                              ? "text-red-400"
                              : "text-gray-400",
                        )}
                      >
                        {crypto.changePercent > 0 ? "+" : ""}
                        {crypto.changePercent.toFixed(2)}%
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <div className="flex justify-center">
                          <MiniChart trend={crypto.trend as "neutral" | "up" | "down"} />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right text-gray-300 hidden md:table-cell">{crypto.volume}</td>
                      <td className="px-4 py-4 text-right">
                        <button
                          className="px-3 py-1 bg-acqua text-dark-blue rounded-md font-medium hover:bg-acqua/80 transition-colors"
                          onClick={() => handleBuyClick(crypto)}
                        >
                          Buy
                        </button>
                      </td>
                    </motion.tr>
                  ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
