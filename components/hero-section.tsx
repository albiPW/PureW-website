import { Download, Shield, Zap } from "lucide-react"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"
import { ContainerTextFlip } from "@/components/ui/container-text-flip"
import { DownloadButton } from "@/components/download-button"

export default function HeroSection({ id }: { id?: string }) {
  return (
    <AuroraBackground
      id="hero"
      className="h-screen w-full dark relative"
      backgroundOpacity={0.15}
      backgroundSize="contain"
      backgroundPosition="center top"
      backgroundScale={110}
      showRadialGradient={true}
    >
      {/* GIF animata sopra l'aurora */}
      <img
        src="/video/phone_2.gif"
        alt="Animazione Phone"
        className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none
          sm:scale-100 scale-[2.8] sm:translate-y-0 translate-y-8"
        style={{ objectFit: "contain", objectPosition: "center", opacity: 0.7 }}
      />

      {/* Contenuto Hero */}
      <div className="z-20 relative container mx-auto text-center px-4 sm:px-6 lg:px-8 max-w-5xl flex flex-col h-full">
        {/* Titolo e testo animato */}
        <div className="w-full mb-4 sm:mb-6 flex items-center justify-center mt-40 sm:mt-56">
          <TextHoverEffect text="THE ALL-IN-ONE WALLET" className="max-w-full" />
        </div>
        <div className="flex justify-center mb-8 sm:mb-12 h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px] overflow-visible">
          <ContainerTextFlip
            words={["FAST.", "EASY.", "SECURE."]}
            interval={2000}
            className="mx-auto min-w-[200px] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[350px]"
          />
        </div>
        {/* Spacer solo su mobile */}
        <div className="flex-grow sm:hidden"></div>
        {/* Features */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="flex items-center text-sm sm:text-base text-white/80">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-acqua" />
            <span>Keep crypto across networks</span>
          </div>
          <div className="flex items-center text-sm sm:text-base text-white/80">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-acqua" />
            <span>Multi-Currency Accounts</span>
          </div>
          <div className="flex items-center text-sm sm:text-base text-white/80">
            <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-acqua" />
            <span>Modern and Intuitive Interface</span>
          </div>
        </div>
        {/* CTA Button */}
        <div className="mb-12 sm:mb-0">
          <DownloadButton
            className="px-6 sm:px-8 py-6 text-base sm:text-lg font-medium rounded-full shadow-[0_0_15px_rgba(42,248,205,0.3)] hover:shadow-[0_0_20px_rgba(42,248,205,0.5)] transition-all duration-300 hover:-translate-y-1"
            showIcon={true}
          />
        </div>
      </div>
    </AuroraBackground>
  )
}
