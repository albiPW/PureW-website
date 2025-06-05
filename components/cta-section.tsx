"use client"

import { motion } from "framer-motion"
import SectionWrapper from "@/components/section-wrapper"
// Importa il componente DownloadButton
import { DownloadButton } from "@/components/download-button"
import { SparklesCore } from "@/components/ui/sparkles"

export default function CTASection() {
  return (
    <SectionWrapper className="py-24">
      <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: "600px" }}>
        {/* Sostituiamo il background blu con l'effetto sparkles */}
        <div className="absolute inset-0 bg-black">
          <SparklesCore
            id="tsparticlesfullpage"
            background="black"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#2AF8CD"
            speed={0.8}
          />

          {/* Aggiungiamo un gradiente per migliorare la leggibilità del testo */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 px-6 py-24 sm:px-12 sm:py-32 lg:py-40 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to take control of your investments?
              
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Download Purewallet today and experience the future of asset management.
            </p>

            {/* Sostituisci i Button esistenti con il nuovo DownloadButton */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <DownloadButton className="px-6 py-6 rounded-lg w-full sm:w-auto" showIcon={true} />
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
