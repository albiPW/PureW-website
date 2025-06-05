"use client"

import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import { DownloadButton } from "@/components/download-button"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import CryptoPriceTable from "@/components/crypto-price-table"

export default function CryptoPageClient() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-dark-blue py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0 md:order-2">
              <img
                src="/video/crypto-video.gif"
                alt="Animazione Crypto App"
                className="w-[90vw] max-w-[600px] h-auto object-contain"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
            <div className="w-full md:w-1/2 md:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-white">Buy Crypto </span>
                <motion.span
                  className="text-acqua inline-block"
                  initial={{ opacity: 0.7, textShadow: "0 0 0px rgba(42, 248, 205, 0)" }}
                  animate={{
                    opacity: 1,
                    textShadow: "0 0 15px rgba(42, 248, 205, 0.5)",
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  Fast.
                </motion.span>
                <br />
                <motion.span
                  className="text-acqua inline-block"
                  initial={{ opacity: 0.7, textShadow: "0 0 0px rgba(42, 248, 205, 0)" }}
                  animate={{
                    opacity: 1,
                    textShadow: "0 0 15px rgba(42, 248, 205, 0.5)",
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 0.7,
                  }}
                >
                  Easy.
                </motion.span>
                <br />
                <motion.span
                  className="text-acqua inline-block"
                  initial={{ opacity: 0.7, textShadow: "0 0 0px rgba(42, 248, 205, 0)" }}
                  animate={{
                    opacity: 1,
                    textShadow: "0 0 15px rgba(42, 248, 205, 0.5)",
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 1.4,
                  }}
                >
                  Secure.
                </motion.span>
              </h1>
              <p className="text-white/80 text-lg mb-8">Start investing with our safe and secure crypto app.</p>
              <div className="flex flex-wrap gap-4">
                <DownloadButton className="px-6 py-2" showIcon={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crypto Price Table Section */}
      <CryptoPriceTable />

      {/* Invest Spend Repeat Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              {/* Placeholder for phone images */}
              <img
                src="/video/SC-07.gif"
                alt="Phone Animation"
                className="h-[200px] sm:h-[400px] md:h-[500px] object-contain rounded-lg"
              />
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="mb-8 text-[2.5rem] sm:text-[3.5rem] font-extrabold leading-tight"
                  style={{ fontFamily: "'Inter', 'Arial', sans-serif", color: 'rgb(8, 43, 79)' }}>
                Invest
                <motion.span
                  className="text-[rgba(42,248,205,1)]"
                  initial={{ textShadow: "0 0 0px rgba(42,248,205,0.0)" }}
                  animate={{ textShadow: [
                    "0 0 0px rgba(42,248,205,0.0)",
                    "0 0 12px rgba(42,248,205,0.7)",
                    "0 0 0px rgba(42,248,205,0.0)"
                  ]}}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >.</motion.span><br />
                Spend
                <motion.span
                  className="text-[rgba(42,248,205,1)]"
                  initial={{ textShadow: "0 0 0px rgba(42,248,205,0.0)" }}
                  animate={{ textShadow: [
                    "0 0 0px rgba(42,248,205,0.0)",
                    "0 0 12px rgba(42,248,205,0.7)",
                    "0 0 0px rgba(42,248,205,0.0)"
                  ]}}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.3
                  }}
                >.</motion.span><br />
                Repeat
                <motion.span
                  className="text-[rgba(42,248,205,1)]"
                  initial={{ textShadow: "0 0 0px rgba(42,248,205,0.0)" }}
                  animate={{ textShadow: [
                    "0 0 0px rgba(42,248,205,0.0)",
                    "0 0 12px rgba(42,248,205,0.7)",
                    "0 0 0px rgba(42,248,205,0.0)"
                  ]}}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.6
                  }}
                >.</motion.span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-dark-blue mb-3">Safe and secure</h3>
                  <p className="text-gray-700">
                    Buy cryptocurrencies with safety, withdraw crypto to your personal wallet or keep it secured in your
                    pure wallet.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-dark-blue mb-3">10 seconds</h3>
                  <p className="text-gray-700">Buying crypto takes only 10 seconds, no complicated steps.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-dark-blue mb-3">Zero bank fees</h3>
                  <p className="text-gray-700">
                    Deposit money from your bank account with zero fees. Download our official wallet app and start
                    using Pure today.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-dark-blue mb-3">Pure. Crypto Card</h3>
                  <p className="text-gray-700">
                    Spend your cryptocurrencies everywhere Visa is accepted. Convert crypto to fiat and pay like a
                    normal card.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <DownloadButton className="px-6 py-2" showIcon={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get the most out of your money Section */}
      <section className="py-16 md:py-24 bg-dark-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Get the most out of
                <br />
                your money with
                <br />
                pure.
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-acqua flex items-center justify-center mt-1">
                    <span className="text-xs text-white font-bold">1</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">No monthly fee</h3>
                    <p className="text-white/70">No recurring fee, perfect for everyone.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-acqua flex items-center justify-center mt-1">
                    <span className="text-xs text-white font-bold">2</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Exchange</h3>
                    <p className="text-white/70">Buy and sell crypto in a single swipe with your smartphone.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-acqua flex items-center justify-center mt-1">
                    <span className="text-xs text-white font-bold">3</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Card</h3>
                    <p className="text-white/70">Spend your crypto with your crypto card.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src="/images/iphonecryptopage.png"
                alt="Pure Wallet App Interface"
                className="w-[90vw] max-w-[600px] h-auto object-contain scale-150"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pure For Everyone Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 -ml-4 md:ml-0">
              <img
                src="/images/phone-card.png"
                alt="Pure Wallet Card and Phone"
                className="w-full h-auto object-contain scale-150"
                style={{ objectFit: 'contain', objectPosition: 'left' }}
              />
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-8">Pure. For everyone.</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-acqua mr-3 mt-1" />
                  <p className="text-gray-700">Digital and traditional currencies.</p>
                </div>

                <div className="flex items-start">
                  <Check className="h-5 w-5 text-acqua mr-3 mt-1" />
                  <p className="text-gray-700">Spend your crypto assets with Pure.</p>
                </div>

                <div className="flex items-start">
                  <Check className="h-5 w-5 text-acqua mr-3 mt-1" />
                  <p className="text-gray-700">Deposit crypto to your Pure app.</p>
                </div>

                <div className="flex items-start">
                  <Check className="h-5 w-5 text-acqua mr-3 mt-1" />
                  <p className="text-gray-700">Fast and convenient KYC/AML.</p>
                </div>

                <div className="flex items-start">
                  <Check className="h-5 w-5 text-acqua mr-3 mt-1" />
                  <p className="text-gray-700">Access on Smartphone, Tablet or PC.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fees and Limits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-4">Fees and Limits.</h2>
          <p className="text-gray-700 mb-8">Lowest rates on the market.</p>
          <p className="text-gray-600 mb-4 text-sm">
            We strive to maintain the lowest possible fees while providing the most secure service.
            <br />
            The limits shown below are indicative and can be adjusted according to your needs.
          </p>

          <div className="mb-12">
            <h3 className="text-xl font-bold text-dark-blue mb-4">Card Payment Limits</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Type</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Per Transaction</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Daily</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Monthly</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 text-sm text-gray-700">ATM Withdrawals</td>
                    <td className="py-3 px-4 text-sm text-gray-700">€ 350</td>
                    <td className="py-3 px-4 text-sm text-gray-700">€ 350</td>
                    <td className="py-3 px-4 text-sm text-gray-700">€ 3,000</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm text-gray-700">Contactless Payments</td>
                    <td className="py-3 px-4 text-sm text-gray-700">€ 2,000</td>
                    <td className="py-3 px-4 text-sm text-gray-700">€ 4,000</td>
                    <td className="py-3 px-4 text-sm text-gray-700">€ 15,000</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm text-gray-700">Purchase Limits</td>
                    <td className="py-3 px-4 text-sm text-gray-700">€ 10,000</td>
                    <td className="py-3 px-4 text-sm text-gray-700">€ 25,000</td>
                    <td className="py-3 px-4 text-sm text-gray-700">€ 25,000</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm text-gray-700">Total Limits</td>
                    <td className="py-3 px-4 text-sm text-gray-700">–</td>
                    <td className="py-3 px-4 text-sm text-gray-700">€ 25,000</td>
                    <td className="py-3 px-4 text-sm text-gray-700">€ 25,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold text-dark-blue mb-4">ATM Withdrawal Fees</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Location</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 text-sm text-gray-700">Within EEA</td>
                    <td className="py-3 px-4 text-sm text-gray-700">€ 2.00</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm text-gray-700">Outside EEA</td>
                    <td className="py-3 px-4 text-sm text-gray-700">€ 2.00 + 2.6%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-dark-blue mb-4">Withdrawal Fees</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Currency</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Service Fees</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-[#F7931A] flex items-center justify-center mr-2">
                        <span className="text-xs text-white font-bold">₿</span>
                      </div>
                      <span className="text-gray-700">BTC</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">0.0003</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-[#627EEA] flex items-center justify-center mr-2">
                        <span className="text-xs text-white font-bold">Ξ</span>
                      </div>
                      <span className="text-gray-700">ETH</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">0.005</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-[#2775CA] flex items-center justify-center mr-2">
                        <span className="text-xs text-white font-bold">₮</span>
                      </div>
                      <span className="text-gray-700">USDC</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">2</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-[#23292F] flex items-center justify-center mr-2">
                        <span className="text-xs text-white font-bold">X</span>
                      </div>
                      <span className="text-gray-700">XRP</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">0.25</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-[#0033AD] flex items-center justify-center mr-2">
                        <span className="text-xs text-white font-bold">A</span>
                      </div>
                      <span className="text-gray-700">ADA</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">1</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-[#E6007A] flex items-center justify-center mr-2">
                        <span className="text-xs text-white font-bold">D</span>
                      </div>
                      <span className="text-gray-700">DOT</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">0.1</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-[#00FFA3] flex items-center justify-center mr-2">
                        <span className="text-xs text-white font-bold">S</span>
                      </div>
                      <span className="text-gray-700">SOL</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">0.01</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-[#345D9D] flex items-center justify-center mr-2">
                        <span className="text-xs text-white font-bold">L</span>
                      </div>
                      <span className="text-gray-700">LTC</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">0.001</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-[#C2A633] flex items-center justify-center mr-2">
                        <span className="text-xs text-white font-bold">D</span>
                      </div>
                      <span className="text-gray-700">DOGE</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </section>

      {/* Legal Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-8">Legal</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-dark-blue mb-3">Crypto General Risk Disclosure</h3>
              <a href="/purew-documentation/general-risk-disclosure.pdf" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-acqua text-acqua hover:bg-acqua/10">
                  View <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-dark-blue mb-3">Crypto Terms and Conditions</h3>
              <a href="/purew-documentation/crypto-terms-and-conditions.pdf" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-acqua text-acqua hover:bg-acqua/10">
                  View <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-dark-blue mb-3">Crypto Card User Agreement APPENDIX A</h3>
              <a href="/purew-documentation/Card-User-Agreement.pdf" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-acqua text-acqua hover:bg-acqua/10">
                  View <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-dark-blue mb-3">Crypto Card User Agreement APPENDIX B</h3>
              <a href="/purew-documentation/Payment-Card-Terms-and-Conditions-.pdf" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-acqua text-acqua hover:bg-acqua/10">
                  View <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-dark-blue mb-3">Payment Card Terms</h3>
              <a href="/purew-documentation/Payment-Card-Terms-and-Conditions-.pdf" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-acqua text-acqua hover:bg-acqua/10">
                  View <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
