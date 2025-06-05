"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import SectionWrapper from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Search, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDeviceDetection } from "@/hooks/use-device-detection"

// Component for the mini chart
const MiniChart = ({ trend }: { trend: "up" | "down" | "neutral" }) => {
  // Generate random points for the chart
  const generatePoints = (trend: "up" | "down" | "neutral", length = 20) => {
    const points: number[] = []
    let value = 50

    for (let i = 0; i < length; i++) {
      // Trend direction influences the random generation
      const change =
        trend === "up"
          ? Math.random() * 5 - 1.5 // More likely to go up
          : trend === "down"
            ? Math.random() * 5 - 3.5 // More likely to go down
            : Math.random() * 4 - 2 // Neutral, equal chance

      value += change
      // Keep within bounds
      value = Math.max(10, Math.min(90, value))
      points.push(value)
    }

    return points
  }

  const points = generatePoints(trend)
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min

  // Normalize points to fit in the chart area
  const normalizedPoints = points.map((p) => ((p - min) / (range || 1)) * 100)

  // Create SVG path
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

// Rimuoviamo futures e cryptocurrencies dalle categorie disponibili
export type ReducedMarketCategory = "forex" | "stock" | "indices" | "etfs" | "commodities"

// Definizione dell'interfaccia per gli strumenti
interface MarketInstrument {
  symbol: string
  name: string
  buy: number
  sell: number
  change: number
  trend: "up" | "down" | "neutral"
}

// Dati di esempio per il mercato, dati mock aggiornati
const MOCK_MARKET_DATA: Record<ReducedMarketCategory, MarketInstrument[]> = {
  forex: [
    { symbol: "EUR/USD", name: "Euro / US Dollar", buy: 1.0850, sell: 1.0848, change: 0.12, trend: "up" },
    { symbol: "GBP/USD", name: "British Pound / US Dollar", buy: 1.2650, sell: 1.2648, change: -0.05, trend: "down" },
    { symbol: "USD/JPY", name: "US Dollar / Japanese Yen", buy: 148.50, sell: 148.48, change: 0.25, trend: "up" },
    { symbol: "EUR/GBP", name: "Euro / British Pound", buy: 0.8580, sell: 0.8578, change: -0.15, trend: "down" },
  ],
  stock: [
    { symbol: "AAPL_US", name: "Apple Inc.", buy: 185.50, sell: 185.48, change: 1.2, trend: "up" },
    { symbol: "MBG_DE", name: "Mercedes Benz Group", buy: 65.25, sell: 65.23, change: 0.8, trend: "up" },
    { symbol: "TSLA_US", name: "Tesla Inc.", buy: 175.50, sell: 175.48, change: -0.5, trend: "down" },
    { symbol: "UCG_IT", name: "UniCredit S.p.A.", buy: 28.75, sell: 28.73, change: 0.3, trend: "up" },
  ],
  indices: [
    { symbol: "US500cash", name: "US 500 Cash", buy: 4950.50, sell: 4950.48, change: 0.3, trend: "up" },
    { symbol: "UK100cash", name: "UK 100 Cash", buy: 7650.25, sell: 7650.23, change: 0.2, trend: "up" },
    { symbol: "EU50cash", name: "EU 50 Cash", buy: 4250.75, sell: 4250.73, change: -0.1, trend: "neutral" },
    { symbol: "FRA40cash", name: "France 40 Cash", buy: 7850.50, sell: 7850.48, change: 0.4, trend: "up" },
  ],
  etfs: [
    { symbol: "SXXPIE.DE", name: "iShares STOXX Europe 600", buy: 45.50, sell: 45.48, change: 0.3, trend: "up" },
    { symbol: "ARKF.US", name: "ARK Fintech Innovation", buy: 35.25, sell: 35.23, change: 0.4, trend: "up" },
    { symbol: "QQQ", name: "Invesco QQQ Trust", buy: 425.50, sell: 425.48, change: 0.4, trend: "up" },
    { symbol: "DIA", name: "SPDR Dow Jones ETF", buy: 385.25, sell: 385.23, change: 0.1, trend: "neutral" },
  ],
  commodities: [
    { symbol: "XAU/USD", name: "Gold / US Dollar", buy: 2020.50, sell: 2020.48, change: 0.5, trend: "up" },
    { symbol: "XAG/USD", name: "Silver / US Dollar", buy: 22.50, sell: 22.48, change: 0.3, trend: "up" },
    { symbol: "WTI/USD", name: "Crude Oil / US Dollar", buy: 75.50, sell: 75.48, change: -0.8, trend: "down" },
    { symbol: "NAT/USD", name: "Natural Gas / US Dollar", buy: 2.85, sell: 2.83, change: -1.2, trend: "down" },
  ],
}

export default function MarketDataSection() {
  const [activeCategory, setActiveCategory] = useState<ReducedMarketCategory>("forex")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isMobile, getDownloadLink } = useDeviceDetection()

  // Funzione per simulare il refresh dei dati
  const refreshData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Simuliamo un delay di rete
      await new Promise(resolve => setTimeout(resolve, 1000))
      // In un'app reale, qui faremmo una chiamata API
    } catch (err) {
      setError("Failed to refresh market data")
    } finally {
      setIsLoading(false)
    }
  }

  // Filter instruments based on search query
  const filteredInstruments = searchQuery
    ? MOCK_MARKET_DATA[activeCategory].filter(
          (instrument) =>
            instrument.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            instrument.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
        )
    : MOCK_MARKET_DATA[activeCategory]

  // Categorie disponibili (senza futures e cryptocurrencies)
  const availableCategories: ReducedMarketCategory[] = ["forex", "stock", "indices", "etfs", "commodities"]

  // Funzione per gestire il click sui pulsanti Trade
  const handleTradeClick = () => {
    if (isMobile) {
      window.open(getDownloadLink(), "_blank")
    }
    // Su desktop non fa nulla
  }

  // Funzione per determinare il simbolo della valuta
  const getCurrencySymbol = (symbol: string) => {
    // Semplice logica per determinare il simbolo della valuta
    if (symbol.includes("EUR") || symbol.includes("/EUR")) {
      return "€"
    }
    return "$"
  }

  return (
    <SectionWrapper id="market-data" className="py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Live Market Data</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Track real-time prices across multiple asset classes
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        {/* Categories sidebar */}
        <div className="lg:w-1/4 bg-gray-900/50 rounded-xl p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-800 border-none rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-acqua/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category)
                  setSearchQuery("")
                }}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg transition-colors",
                  activeCategory === category ? "bg-acqua text-white" : "text-white/70 hover:bg-gray-800",
                )}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Market data table */}
        <div className="lg:w-3/4 bg-gray-900/50 rounded-xl overflow-hidden">
          <div className="p-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">
              {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshData}
              disabled={isLoading}
              className="text-acqua border-acqua hover:bg-acqua/10"
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
              Refresh
            </Button>
          </div>

          {error && (
            <div className="p-8 text-center">
              <p className="text-red-400 mb-4">{error}</p>
              <Button onClick={refreshData} className="bg-acqua hover:bg-acqua/90">
                Try Again
              </Button>
            </div>
          )}

          {!error && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800/80">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Instrument</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Buy</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Sell</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Daily Change</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">30D Trend</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-300"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {isLoading ? (
                    // Loading state
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={`loading-${index}`} className="animate-pulse">
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                            <div className="ml-3">
                              <div className="h-4 w-24 bg-gray-700 rounded"></div>
                              <div className="h-3 w-16 bg-gray-700 rounded mt-2"></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="h-4 w-16 bg-gray-700 rounded ml-auto"></div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="h-4 w-16 bg-gray-700 rounded ml-auto"></div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="h-4 w-16 bg-gray-700 rounded ml-auto"></div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="h-10 w-24 bg-gray-700 rounded mx-auto"></div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="h-8 w-16 bg-gray-700 rounded ml-auto"></div>
                        </td>
                      </tr>
                    ))
                  ) : filteredInstruments.length === 0 ? (
                    // No results
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                        No instruments found matching your search.
                      </td>
                    </tr>
                  ) : (
                    // Actual data
                    filteredInstruments.map((instrument) => (
                      <motion.tr
                        key={instrument.symbol}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-800/50"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="ml-3">
                              <div className="font-medium text-white">{instrument.name}</div>
                              <div className="text-sm text-gray-400">{instrument.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td
                          className={cn(
                            "px-4 py-4 text-right font-medium text-white transition-colors duration-300",
                            instrument.change > 0 && "bg-green-500/20",
                          )}
                        >
                          {getCurrencySymbol(instrument.symbol)}
                          {instrument.buy}
                        </td>
                        <td
                          className={cn(
                            "px-4 py-4 text-right font-medium text-white transition-colors duration-300",
                            instrument.change > 0 && "bg-green-500/20",
                          )}
                        >
                          {getCurrencySymbol(instrument.symbol)}
                          {instrument.sell}
                        </td>
                        <td
                          className={cn(
                            "px-4 py-4 text-right font-medium transition-colors duration-300",
                            instrument.change > 0 && "bg-green-500/20",
                            instrument.change > 0 ? "text-green-400" : "text-gray-400",
                          )}
                        >
                          {instrument.change}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-center">
                            <MiniChart trend={instrument.trend} />
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleTradeClick}>
                            Trade
                          </Button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Trade now button */}
          <div className="p-6 flex justify-center">
            <Button
              className="bg-gradient-to-r from-acqua to-acqua/80 hover:from-acqua/80 hover:to-acqua text-white px-8 py-6 text-lg"
              onClick={handleTradeClick}
            >
              Trade now
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
