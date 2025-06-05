import SectionWrapper from "@/components/section-wrapper"
import Footer from "@/components/footer"

export const metadata = {
  title: "Trade | PureWallet",
  description: "Scambia criptovalute in modo semplice e sicuro con PureWallet.",
}

export default function TradePage() {
  return (
    <main className="flex flex-col min-h-screen pt-20">
      <SectionWrapper className="flex-1">
        <div className="container py-12 md:py-24 lg:py-32">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">Trade</h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mb-12">
            Trade in modo semplice, veloce e sicuro con commissioni competitive.
          </p>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <Footer />
    </main>
  )
}
