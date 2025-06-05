// Environment variable for the Finnhub API key
// In production, this should be set in your hosting environment (Vercel, etc.)
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || "d0cdm19r01ql2j3cfmn0d0cdm19r01ql2j3cfmng"

// API route to get market data
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get("symbol")
  const category = searchParams.get("category")

  if (!symbol) {
    return Response.json({ error: "Symbol parameter is required" }, { status: 400 })
  }

  try {
    // Fetch data from Finnhub
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`)

    if (!response.ok) {
      throw new Error(`Finnhub API error: ${response.status}`)
    }

    const data = await response.json()

    // Check if we have valid data
    const currentPrice = typeof data.c === "number" ? data.c : 0
    const priceChange = typeof data.dp === "number" ? data.dp : 0

    // Determine currency symbol based on the symbol format
    // This is a simplified approach - in a real app, you would have more robust logic
    let currencySymbol = "$" // Default to USD

    // Check if the symbol contains EUR (e.g., "BTCEUR")
    if (symbol.includes("EUR") || symbol.includes("/EUR")) {
      currencySymbol = "€"
    }

    // Transform the data with null checks
    const result = {
      symbol,
      buy: currentPrice.toFixed(2),
      sell: (currentPrice - currentPrice * 0.0005).toFixed(2), // Simplified spread
      change: `${priceChange.toFixed(2)}%`,
      changePercent: priceChange,
      trend: priceChange > 0 ? "up" : priceChange < 0 ? "down" : "neutral",
      category,
      currencySymbol,
    }

    return Response.json(result)
  } catch (error) {
    console.error("Error fetching market data:", error)

    // Return a fallback response with default values
    return Response.json(
      {
        symbol,
        buy: "0.00",
        sell: "0.00",
        change: "0.00%",
        changePercent: 0,
        trend: "neutral",
        category,
        currencySymbol: symbol.includes("EUR") ? "€" : "$",
        error: "Failed to fetch live data",
      },
      { status: 200 },
    ) // Return 200 with fallback data instead of 500
  }
}
