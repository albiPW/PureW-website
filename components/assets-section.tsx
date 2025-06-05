"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import SectionWrapper from "@/components/section-wrapper"
import Image from "next/image"
import Link from "next/link"

export default function AssetsSection() {
  return (
    <SectionWrapper id="assets" className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-acqua">Diversify your holdings</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Search, receive, and swap assets across blockchain networks
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden border border-white/10 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/40 z-10" />
          <Image
            src="/images/app1.jpg"
            alt="Crypto assets dashboard"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-6">
            <div className="border border-white/10 rounded-lg p-6 gradient-card">
              <h3 className="text-xl font-bold mb-2">Multi-Chain Support</h3>
              <p className="text-muted-foreground mb-4">
                Access assets across Bitcoin, Ethereum, Solana and others through one seamless interface.
              </p>
            </div>

            <div className="border border-white/10 rounded-lg p-6 gradient-card">
              <h3 className="text-xl font-bold mb-2">Built-in DEX</h3>
              <p className="text-muted-foreground mb-4">
                Swap tokens directly within the app with competitive rates and minimal fees.
              </p>
            </div>

            <div className="border border-white/10 rounded-lg p-6 gradient-card">
              <h3 className="text-xl font-bold mb-2">Real-Time Market Data</h3>
              <p className="text-muted-foreground mb-4">
                Stay informed with live price updates, charts, and market trends for all your assets.
              </p>
            </div>

            <Link href="/crypto">
              <Button className="bg-gradient-to-r from-acqua to-acqua/80 hover:from-acqua/80 hover:to-acqua text-white px-6 py-6 rounded-lg mt-4">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
