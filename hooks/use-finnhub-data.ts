"use client"

import { useState, useEffect, useRef } from "react"

// Define types for our market data
export type MarketCategory = "forex" | "shares" | "indices" | "etfs" | "cryptocurrencies" | "commodities" | "futures"
export type TrendDirection = "up" | "down" | "neutral"

export interface MarketInstrument {
  id: string
  name: string
  symbol: string
  buy: string
  sell: string
  change: string
  changePercent: number
  trend: TrendDirection
  category: MarketCategory
  flagCode?: string
  isUpdated?: boolean
}

// Define symbols for each category
const CATEGORY_SYMBOLS: Record<MarketCategory, string[]> = {
  shares: ["AAPL", "MSFT", "AMZN", "GOOGL", "META"],
  forex: ["EUR/USD", "GBP/EUR", "EUR/JPY", "EUR/CHF", "EUR/GBP"],
  indices: ["^STOXX50E", "^GDAXI", "^FCHI", "^IBEX", "^FTSE"],
  etfs: ["EXS1.DE", "CNDX.DE", "VUSA.DE", "EUNL.DE", "DBXD.DE"],
  cryptocurrencies: ["BTCEUR", "ETHEUR", "BNBEUR", "ADAEUR", "SOLEUR"],
  commodities: ["GC=F", "SI=F", "CL=F", "NG=F", "HG=F"],
  futures: ["ES=F", "NQ=F", "YM=F", "RTY=F", "ZB=F"],
}

// Initial placeholder data (will be replaced with API data)
const INITIAL_DATA: Record<MarketCategory, MarketInstrument[]> = {
  shares: CATEGORY_SYMBOLS.shares.map((symbol) => ({
    id: symbol.toLowerCase(),
    name: symbol,
    symbol,
    buy: "0.00",
    sell: "0.00",
    change: "0.00%",
    changePercent: 0,
    trend: "neutral",
    category: "shares",
  })),
  forex: CATEGORY_SYMBOLS.forex.map((symbol) => ({
    id: symbol.toLowerCase().replace("/", ""),
    name: symbol,
    symbol,
    buy: "0.00",
    sell: "0.00",
    change: "0.00%",
    changePercent: 0,
    trend: "neutral",
    category: "forex",
    flagCode: symbol.toLowerCase().replace("/", "-"),
  })),
  indices: CATEGORY_SYMBOLS.indices.map((symbol) => ({
    id: symbol.toLowerCase().replace("^", ""),
    name: getIndexName(symbol),
    symbol,
    buy: "0.00",
    sell: "0.00",
    change: "0.00%",
    changePercent: 0,
    trend: "neutral",
    category: "indices",
  })),
  etfs: CATEGORY_SYMBOLS.etfs.map((symbol) => ({
    id: symbol.toLowerCase(),
    name: getETFName(symbol),
    symbol,
    buy: "0.00",
    sell: "0.00",
    change: "0.00%",
    changePercent: 0,
    trend: "neutral",
    category: "etfs",
  })),
  cryptocurrencies: CATEGORY_SYMBOLS.cryptocurrencies.map((symbol) => ({
    id: symbol.toLowerCase(),
    name: getCryptoName(symbol),
    symbol,
    buy: "0.00",
    sell: "0.00",
    change: "0.00%",
    changePercent: 0,
    trend: "neutral",
    category: "cryptocurrencies",
  })),
  commodities: CATEGORY_SYMBOLS.commodities.map((symbol) => ({
    id: symbol.toLowerCase().replace("=f", ""),
    name: getCommodityName(symbol),
    symbol,
    buy: "0.00",
    sell: "0.00",
    change: "0.00%",
    changePercent: 0,
    trend: "neutral",
    category: "commodities",
  })),
  futures: CATEGORY_SYMBOLS.futures.map((symbol) => ({
    id: symbol.toLowerCase().replace("=f", ""),
    name: getFutureName(symbol),
    symbol,
    buy: "0.00",
    sell: "0.00",
    change: "0.00%",
    changePercent: 0,
    trend: "neutral",
    category: "futures",
  })),
}

// Helper functions to get display names
function getIndexName(symbol: string): string {
  const names: Record<string, string> = {
    "^STOXX50E": "EURO STOXX 50",
    "^GDAXI": "DAX",
    "^FCHI": "CAC 40",
    "^IBEX": "IBEX 35",
    "^FTSE": "FTSE 100",
  }
  return names[symbol] || symbol
}

function getCryptoName(symbol: string): string {
  const names: Record<string, string> = {
    BTCEUR: "Bitcoin",
    ETHEUR: "Ethereum",
    BNBEUR: "Binance Coin",
    ADAEUR: "Cardano",
    SOLEUR: "Solana",
  }
  return names[symbol] || symbol
}

function getCommodityName(symbol: string): string {
  const names: Record<string, string> = {
    "GC=F": "Gold",
    "SI=F": "Silver",
    "CL=F": "Crude Oil",
    "NG=F": "Natural Gas",
    "HG=F": "Copper",
  }
  return names[symbol] || symbol
}

function getFutureName(symbol: string): string {
  const names: Record<string, string> = {
    "ES=F": "E-mini S&P 500",
    "NQ=F": "E-mini NASDAQ-100",
    "YM=F": "E-mini Dow",
    "RTY=F": "E-mini Russell 2000",
    "ZB=F": "U.S. Treasury Bond",
  }
  return names[symbol] || symbol
}

function getETFName(symbol: string): string {
  const names: Record<string, string> = {
    "EXS1.DE": "iShares Core DAX",
    "CNDX.DE": "iShares NASDAQ 100",
    "VUSA.DE": "Vanguard S&P 500",
    "EUNL.DE": "iShares Core MSCI World",
    "DBXD.DE": "Xtrackers DAX",
  }
  return names[symbol] || symbol
}

export function useFinnhubData(activeCategory: MarketCategory) {
  const [instruments, setInstruments] = useState<Record<MarketCategory, MarketInstrument[]>>(INITIAL_DATA)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastPricesRef = useRef<Record<string, number>>({})
  const [wsUrl, setWsUrl] = useState<string | null>(null)

  // Function to get WebSocket URL securely
  const getWebSocketUrl = async () => {
    try {
      const response = await fetch("/api/ws-token")
      if (!response.ok) {
        throw new Error("Failed to get WebSocket token")
      }
      const data = await response.json()
      setWsUrl(data.wsUrl)
    } catch (err) {
      console.error("Error getting WebSocket URL:", err)
      setError("Failed to connect to market data. Please try again later.")
    }
  }

  // Get WebSocket URL on initial load
  useEffect(() => {
    getWebSocketUrl()
  }, [])

  // Function to fetch initial data for a category
  const fetchInitialData = async (category: MarketCategory) => {
    setIsLoading(true)
    setError(null)

    try {
      const symbols = CATEGORY_SYMBOLS[category]
      const results: MarketInstrument[] = []

      // Fetch data for each symbol using our secure API route
      for (const symbol of symbols) {
        try {
          const response = await fetch(`/api/market-data?symbol=${encodeURIComponent(symbol)}&category=${category}`)

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`)
          }

          const data = await response.json()

          // Check if the response contains an error
          if (data.error) {
            console.warn(`Warning for ${symbol}: ${data.error}`)
          }

          // Store the current price for future reference (with fallback to 0)
          const buyPrice = Number.parseFloat(data.buy) || 0
          lastPricesRef.current[symbol] = buyPrice

          // Format the instrument data
          const instrument =
            instruments[category].find((i) => i.symbol === symbol) ||
            INITIAL_DATA[category].find((i) => i.symbol === symbol)

          if (instrument) {
            results.push({
              ...instrument,
              buy: data.buy || "0.00",
              sell: data.sell || "0.00",
              change: data.change || "0.00%",
              changePercent: data.changePercent || 0,
              trend: data.trend || "neutral",
            })
          }
        } catch (err) {
          console.error(`Error fetching data for ${symbol}:`, err)
          // Use placeholder data if API call fails
          const placeholder = INITIAL_DATA[category].find((i) => i.symbol === symbol)
          if (placeholder) {
            results.push(placeholder)
          }
        }
      }

      // Update the instruments state
      setInstruments((prev) => ({
        ...prev,
        [category]: results,
      }))
    } catch (err) {
      console.error("Failed to fetch market data:", err)
      setError("Failed to load market data. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Set up WebSocket connection
  const setupWebSocket = () => {
    if (!wsUrl) return

    // Close existing connection if any
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }

    // Clear any pending reconnection
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    // Create new WebSocket connection using the secure URL
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => {
      console.log("WebSocket connected")

      // Subscribe to symbols for the active category
      const symbols = CATEGORY_SYMBOLS[activeCategory]
      symbols.forEach((symbol) => {
        ws.send(JSON.stringify({ type: "subscribe", symbol }))
      })
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      // Handle trade data
      if (data.type === "trade" && data.data && data.data.length > 0) {
        updatePrices(data.data)
      }
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
      attemptReconnect()
    }

    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason)

      // Attempt to reconnect unless this was a clean close
      if (!event.wasClean) {
        attemptReconnect()
      }
    }
  }

  // Attempt to reconnect WebSocket
  const attemptReconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    reconnectTimeoutRef.current = setTimeout(() => {
      console.log("Attempting to reconnect WebSocket...")
      setupWebSocket()
    }, 5000) // Try to reconnect after 5 seconds
  }

  // Update prices based on WebSocket data
  const updatePrices = (tradeData: any[]) => {
    // Group trades by symbol and use the latest price
    const latestTrades: Record<string, number> = {}

    tradeData.forEach((trade) => {
      latestTrades[trade.s] = trade.p // Symbol and price
    })

    // Update instruments with new prices
    setInstruments((prev) => {
      const updatedData = { ...prev }
      let hasUpdates = false

      // Find instruments that need updating
      Object.keys(latestTrades).forEach((symbol) => {
        const price = latestTrades[symbol]
        const previousPrice = lastPricesRef.current[symbol] || price

        // Update last price reference
        lastPricesRef.current[symbol] = price

        // Find which category this instrument belongs to
        for (const category in updatedData) {
          const categoryData = updatedData[category as MarketCategory]
          const index = categoryData.findIndex((i) => i.symbol === symbol)

          if (index !== -1) {
            // Calculate change percentage based on previous price
            const changePercent = ((price - previousPrice) / previousPrice) * 100

            // Update the instrument
            updatedData[category as MarketCategory][index] = {
              ...categoryData[index],
              buy: price.toFixed(2),
              sell: (price - price * 0.0005).toFixed(2), // Simplified spread
              change: `${changePercent.toFixed(2)}%`,
              changePercent: changePercent,
              trend: changePercent > 0 ? "up" : changePercent < 0 ? "down" : "neutral",
              isUpdated: true,
            }

            hasUpdates = true

            // Schedule removal of update indicator
            setTimeout(() => {
              setInstruments((current) => {
                const category = current[categoryData[index].category]
                const instrumentIndex = category.findIndex((i) => i.symbol === symbol)

                if (instrumentIndex !== -1) {
                  const updatedCategory = [...category]
                  updatedCategory[instrumentIndex] = {
                    ...updatedCategory[instrumentIndex],
                    isUpdated: false,
                  }

                  return {
                    ...current,
                    [categoryData[index].category]: updatedCategory,
                  }
                }

                return current
              })
            }, 1000) // Flash for 1 second
          }
        }
      })

      return hasUpdates ? updatedData : prev
    })
  }

  // Fetch initial data when category changes
  useEffect(() => {
    fetchInitialData(activeCategory)

    // Clean up WebSocket subscriptions
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        CATEGORY_SYMBOLS[activeCategory].forEach((symbol) => {
          wsRef.current?.send(JSON.stringify({ type: "unsubscribe", symbol }))
        })
      }
    }
  }, [activeCategory])

  // Set up WebSocket connection when URL is available
  useEffect(() => {
    if (wsUrl) {
      setupWebSocket()
    }

    return () => {
      // Clean up WebSocket connection
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }

      // Clear any pending reconnection
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
        reconnectTimeoutRef.current = null
      }
    }
  }, [activeCategory, wsUrl])

  // Refresh data periodically (as a fallback)
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchInitialData(activeCategory)
    }, 60000) // Refresh every minute as a fallback

    return () => clearInterval(intervalId)
  }, [activeCategory])

  return {
    instruments,
    isLoading,
    error,
    refreshData: () => fetchInitialData(activeCategory),
  }
}
