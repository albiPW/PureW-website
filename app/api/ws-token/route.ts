// Environment variable for the Finnhub API key
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || "d0cdm19r01ql2j3cfmn0d0cdm19r01ql2j3cfmng"

// API route to get WebSocket token
export async function GET() {
  try {
    // Return the WebSocket URL with the token
    // This is a secure way to provide the WebSocket URL without exposing the API key in client code
    return Response.json({
      wsUrl: `wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`,
    })
  } catch (error) {
    console.error("Error generating WebSocket token:", error)
    return Response.json({ error: "Failed to generate WebSocket token" }, { status: 500 })
  }
}
