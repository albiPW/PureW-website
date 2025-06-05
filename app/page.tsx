import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import CryptoSection from "@/components/crypto-section"
import MarketDataSection from "@/components/market-data-section"
import AssetsSection from "@/components/assets-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-blue">
      <main>
        <HeroSection id="hero" />
        <CryptoSection />
        <MarketDataSection />
        <FeaturesSection />
        <AssetsSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  )
}
