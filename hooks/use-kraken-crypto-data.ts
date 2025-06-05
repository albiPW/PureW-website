"use client"

import { useState, useEffect, useRef, useCallback } from "react"

export interface CryptoPrice {
  id: string
  name: string
  symbol: string
  price: string
  change24h: string
  changePercent: number
  trend: "up" | "down" | "neutral"
  volume: string
  isUpdated?: boolean
}

// Definizione delle principali criptovalute da monitorare
const TOP_CRYPTOS = [
  { symbol: "XBT/EUR", name: "Bitcoin", id: "bitcoin" },
  { symbol: "ETH/EUR", name: "Ethereum", id: "ethereum" },
  { symbol: "SOL/EUR", name: "Solana", id: "solana" },
  { symbol: "USDC/EUR", name: "USD Coin", id: "usdc" },
  { symbol: "XRP/EUR", name: "Ripple", id: "ripple" },
  { symbol: "ADA/EUR", name: "Cardano", id: "cardano" },
  { symbol: "DOT/EUR", name: "Polkadot", id: "polkadot" },
  { symbol: "XDG/EUR", name: "Dogecoin", id: "dogecoin" },
  // { symbol: "LINK/EUR", name: "Chainlink", id: "chainlink" },
]

// Dati iniziali placeholder
const INITIAL_DATA: CryptoPrice[] = TOP_CRYPTOS.map((crypto) => ({
  id: crypto.id,
  name: crypto.name,
  symbol: crypto.symbol,
  price: "0.00",
  change24h: "0.00",
  changePercent: 0,
  trend: "neutral" as const,
  volume: "0",
}))

// Costanti per la gestione degli errori e riconnessioni
const MAX_ERROR_ATTEMPTS = 5
const INITIAL_RECONNECT_DELAY = 1000
const MAX_RECONNECT_DELAY = 60000
const HEARTBEAT_INTERVAL = 30000
const UPDATE_ANIMATION_DURATION = 1000

// Cache per i prezzi formattati
const priceFormatCache = new Map<number, string>()
const volumeFormatCache = new Map<number, string>()

export function useKrakenCryptoData() {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>(INITIAL_DATA)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastPricesRef = useRef<Record<string, number>>({})
  const errorCountRef = useRef(0)
  const reconnectCountRef = useRef(0)
  const isConnectedRef = useRef(false)
  const [lastValidData, setLastValidData] = useState<CryptoPrice[]>(INITIAL_DATA)
  const updateTimeoutsRef = useRef<Record<string, NodeJS.Timeout>>({})

  // Funzione per formattare il prezzo in base alla grandezza (con cache)
  const formatPrice = (price: number): string => {
    if (priceFormatCache.has(price)) {
      return priceFormatCache.get(price)!
    }

    let formatted: string
    if (price >= 1000) {
      formatted = price.toFixed(2)
    } else if (price >= 1) {
      formatted = price.toFixed(4)
    } else {
      formatted = price.toFixed(6)
    }

    priceFormatCache.set(price, formatted)
    return formatted
  }

  // Funzione per formattare il volume (con cache)
  const formatVolume = (volume: number): string => {
    if (volumeFormatCache.has(volume)) {
      return volumeFormatCache.get(volume)!
    }

    let formatted: string
    if (volume >= 1_000_000_000) {
      formatted = `${(volume / 1_000_000_000).toFixed(2)}B`
    } else if (volume >= 1_000_000) {
      formatted = `${(volume / 1_000_000).toFixed(2)}M`
    } else if (volume >= 1_000) {
      formatted = `${(volume / 1_000).toFixed(2)}K`
    } else {
      formatted = volume.toFixed(2)
    }

    volumeFormatCache.set(volume, formatted)
    return formatted
  }

  // Funzione per inviare heartbeat
  const sendHeartbeat = useCallback((ws: WebSocket) => {
    if (ws.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify({ event: "ping" }))
        } catch (err) {
        console.error("Error sending heartbeat:", err)
      }
    }
  }, [])

  // Funzione per configurare la connessione WebSocket
  const setupWebSocket = useCallback(() => {
    if (wsRef.current) {
      console.log("Closing existing WebSocket connection...")
      wsRef.current.close()
      wsRef.current = null
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    try {
      console.log("Connecting to Kraken WebSocket...")
      const ws = new WebSocket("wss://ws.kraken.com")
      wsRef.current = ws

      // Configura heartbeat
      const heartbeatInterval = setInterval(() => {
        sendHeartbeat(ws)
      }, HEARTBEAT_INTERVAL)

      ws.onopen = () => {
        console.log("Kraken WebSocket connected successfully")
        isConnectedRef.current = true
        errorCountRef.current = 0
        reconnectCountRef.current = 0
        setIsLoading(false)
        setError(null)

        try {
          const pairs = TOP_CRYPTOS.map((crypto) => crypto.symbol)
          const subscriptionMessage = JSON.stringify({
            event: "subscribe",
            pair: pairs,
            subscription: {
              name: "ticker",
            },
          })

          console.log("Sending WebSocket subscription:", subscriptionMessage)
          ws.send(subscriptionMessage)
        } catch (err) {
          console.error("Error sending WebSocket subscription:", err)
          attemptReconnect()
        }
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)

          // Gestisci heartbeat
          if (data.event === "pong") {
            console.log("Received pong from server")
            return
          }

          // Log solo per i messaggi non di sistema
          if (!data.event) {
            console.log("Received WebSocket message:", data)
          }

          if (data.event === "heartbeat" || data.event === "systemStatus" || data.event === "subscriptionStatus") {
            return
          }

          if (Array.isArray(data) && data.length >= 4) {
            const pairName = data[3]
            const tickerData = data[1]

            if (tickerData && typeof tickerData === "object") {
              updatePrice(pairName, tickerData)
            }
          }
        } catch (err) {
          console.error("Error processing WebSocket message:", err)
        }
      }

      ws.onerror = (error) => {
        // Log dettagliato dell'errore
        console.error("Kraken WebSocket error:", {
          message: error instanceof Error ? error.message : "Unknown error",
          type: error instanceof Error ? error.name : typeof error,
          timestamp: new Date().toISOString()
        })

        // Log dello stato della connessione
        console.log("WebSocket connection details:", {
          readyState: ws.readyState,
          url: ws.url,
          timestamp: new Date().toISOString()
        })

        // Incrementa il contatore degli errori
        errorCountRef.current += 1
        console.log(`WebSocket error count: ${errorCountRef.current}/${MAX_ERROR_ATTEMPTS}`)

        // Se abbiamo raggiunto il numero massimo di tentativi, disconnetti
        if (errorCountRef.current >= MAX_ERROR_ATTEMPTS) {
          console.log("Max error attempts reached, disconnecting WebSocket")
          ws.close()
          return
        }

        // Prova a riconnettersi con un delay esponenziale
        const delay = Math.min(INITIAL_RECONNECT_DELAY * Math.pow(2, errorCountRef.current), MAX_RECONNECT_DELAY)
        console.log(`Attempting to reconnect in ${delay}ms...`)
        setTimeout(() => {
          if (ws.readyState === WebSocket.CLOSED) {
            console.log("Reconnecting WebSocket...")
            setupWebSocket()
          }
        }, delay)
      }

      ws.onclose = (event) => {
        console.log("WebSocket connection closed:", {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
          timestamp: new Date().toISOString()
        })
        
        // Pulisci l'intervallo di heartbeat
        clearInterval(heartbeatInterval)
        
        isConnectedRef.current = false
        setError("Connection closed. Attempting to reconnect...")

        // Se la chiusura non è pulita o è un errore 1006, riprova a connettere
        if (!event.wasClean || event.code === 1006) {
          console.log("Connection closed unexpectedly, attempting to reconnect...")
          attemptReconnect()
        }
      }
    } catch (err) {
      console.error("Error setting up WebSocket:", err)
      setError("Failed to establish connection. Retrying...")
      attemptReconnect()
    }
  }, [sendHeartbeat])

  // Funzione per tentare la riconnessione
  const attemptReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }

    reconnectCountRef.current += 1

    // Exponential backoff for reconnection attempts with max delay of 1 minute
    const delay = Math.min(60000, 1000 * Math.pow(2, reconnectCountRef.current))

    console.log(`Scheduling reconnect attempt ${reconnectCountRef.current} in ${delay}ms`)

    reconnectTimeoutRef.current = setTimeout(() => {
      console.log(`Attempting to reconnect Kraken WebSocket (attempt ${reconnectCountRef.current})...`)
      setupWebSocket()
    }, delay)
  }, [setupWebSocket])

  // Funzione per aggiornare i prezzi in base ai dati WebSocket
  const updatePrice = useCallback((pairName: string, tickerData: any) => {
    try {
      setCryptoPrices((prev) => {
        const updatedPrices = [...prev]
        const index = updatedPrices.findIndex((crypto) => crypto.symbol === pairName)

        if (index !== -1) {
          // Kraken ticker format:
          // c[0] = last trade price
          // p[1] = 24h volume weighted average price
          // v[1] = 24h volume
          // l[1] = 24h low
          // h[1] = 24h high
          // o[1] = 24h opening price
          if (tickerData.c && Array.isArray(tickerData.c) && tickerData.c.length > 0) {
            const currentPrice = Number.parseFloat(tickerData.c[0])
            if (isNaN(currentPrice)) {
              console.warn(`Invalid price for ${pairName}:`, tickerData.c[0])
              return prev
            }

            // Calcola la variazione percentuale usando il prezzo di apertura delle 24h
            let changePercent = 0
            if (tickerData.o && Array.isArray(tickerData.o) && tickerData.o.length > 1) {
              const openPrice = Number.parseFloat(tickerData.o[1])
              if (!isNaN(openPrice) && openPrice > 0) {
                changePercent = ((currentPrice - openPrice) / openPrice) * 100
              }
            }

            // Volume nelle ultime 24 ore è in v[1]
            let volume = "0"
            if (tickerData.v && Array.isArray(tickerData.v) && tickerData.v.length > 1) {
              const volumeValue = Number.parseFloat(tickerData.v[1])
              if (!isNaN(volumeValue)) {
                volume = formatVolume(volumeValue)
              }
            }

            // Cancella il timeout precedente se esiste
            if (updateTimeoutsRef.current[pairName]) {
              clearTimeout(updateTimeoutsRef.current[pairName])
            }

            // Aggiorna i dati della criptovaluta
            updatedPrices[index] = {
              ...updatedPrices[index],
              price: formatPrice(currentPrice),
              change24h: (currentPrice - Number.parseFloat(tickerData.o[1])).toFixed(2),
              changePercent: changePercent,
              trend: (changePercent > 0 ? "up" : changePercent < 0 ? "down" : "neutral") as "up" | "down" | "neutral",
              volume: volume,
              isUpdated: true,
            }

            // Imposta il nuovo timeout
            updateTimeoutsRef.current[pairName] = setTimeout(() => {
              setCryptoPrices((current) => {
                const newPrices = [...current]
                if (newPrices[index]) {
                  newPrices[index] = {
                    ...newPrices[index],
                    isUpdated: false,
                  }
                }
                return newPrices
              })
            }, UPDATE_ANIMATION_DURATION)

            // Salva i dati validi per uso futuro
            if (updatedPrices.some((crypto) => Number.parseFloat(crypto.price) > 0)) {
              setLastValidData(updatedPrices)
            }

            return updatedPrices
          }
        }

        return prev
      })
    } catch (err) {
      console.error("Error updating price:", err)
    }
  }, [formatPrice, formatVolume])

  // Carica dati iniziali e configura WebSocket all'avvio
  useEffect(() => {
    // Set up WebSocket connection
    setupWebSocket()

    // Cleanup on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
        reconnectTimeoutRef.current = null
      }

      // Pulisci tutti i timeout di aggiornamento
      Object.values(updateTimeoutsRef.current).forEach(clearTimeout)
    }
  }, [setupWebSocket])

  return {
    cryptoPrices: cryptoPrices.some((crypto) => Number.parseFloat(crypto.price) > 0) ? cryptoPrices : lastValidData,
    isLoading,
    error,
    isSimulated: false,
  }
}
