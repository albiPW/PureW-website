import SectionWrapper from "@/components/section-wrapper"
import Footer from "@/components/footer"

export const metadata = {
  title: "Invest | PureWallet",
  description: "Investi e fai crescere i tuoi asset crypto con PureWallet.",
}

export default function InvestPage() {
  return (
    <main className="flex flex-col min-h-screen pt-20">
      <SectionWrapper className="flex-1">
        <div className="container py-12 md:py-24 lg:py-32">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">Invest</h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mb-12">
            Cresci con le nostre soluzioni di investimento sicure e ad alto rendimento.
          </p>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <Footer />
    </main>
  )
}
