import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"

export const metadata = {
  title: "Coming Soon | PureWallet",
  description: "This section of PureWallet is coming soon.",
}

export default function ComingSoonPage() {
  return (
    <main className="flex flex-col min-h-screen pt-20">
      <section className="w-full relative site-bg flex-1 flex items-center justify-center py-16 md:py-24">
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Coming <span className="text-acqua">Soon</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              We're working hard to bring you this exciting new feature. Please check back later!
            </p>
          </div>

          <div className="relative w-full h-64 sm:h-80 md:h-96 mb-12">
            <div className="absolute inset-0 bg-acqua/5 rounded-xl border border-acqua/20 flex items-center justify-center">
              <div className="text-acqua animate-pulse">
                <svg className="w-24 h-24 sm:w-32 sm:h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
          </div>

          <Link href="/">
            <Button className="bg-acqua hover:bg-acqua/90 text-dark-blue">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
