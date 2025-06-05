import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, MessageCircle } from "lucide-react"
import Footer from "@/components/footer"

export const metadata = {
  title: "Account | PureWallet",
  description: "Open your SEPA account online with PureWallet and manage your finances securely.",
}

export default function AccountPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="account-top" className="w-full relative site-bg pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                Your Current <br />
                Account. <span className="text-acqua">Elevated.</span>
              </h1>
              <p className="text-xl text-acqua mb-8">Open SEPA Account Online</p>

              <div className="flex flex-row items-center gap-4">
                <Link
                  href="https://apps.apple.com/cy/app/purewallet/id1607431631"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="store-badge"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/applestore.png" alt="Download on App Store" className="store-badge-img" />
                </Link>

                <Link
                  href="https://play.google.com/store/apps/details?id=i o.pure.crypto.android.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="store-badge"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/googlestore.png" alt="Get it on Google Play" className="store-badge-img" />
                </Link>
              </div>
            </div>

            <div className="mt-8 md:mt-0">
              <Image src="/images/qrcodepure.png" alt="QR Code" width={150} height={150} className="rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Personal Account Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src="/video/03_Scene.gif"
                alt="Animazione Personal Account"
                className="w-[90vw] max-w-[600px] h-auto object-contain scale-150"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-bold text-dark-blue mb-6">
                Personal Account<span className="text-acqua">.</span>
              </h2>
              <h3 className="text-xl font-semibold text-dark-blue mb-4">Manage your funds with pure</h3>
              <p className="text-gray-600 mb-6">
                Experience what your financial world will be like. View your transactions, check balances, and make
                payments with ease. Pure combines the convenience of digital banking with the ease of managing your
                daily expenses and payments directly through the app. Opening an account is now faster than ever. As our
                banking license process takes place, we are already offering you a complete solution that will accompany
                you in all of your financial journey with confidence.
              </p>

              {/*<Button className="bg-acqua hover:bg-acqua/90 text-white">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>*/}
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-[400px] h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                <video
                  src="/video/community-pure.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-bold text-dark-blue mb-6">
                Pure <span className="text-acqua">COMMUNITY</span>
              </h2>
              <h3 className="text-xl font-semibold text-dark-blue mb-4">Instant and free: the way it should be</h3>
              <p className="text-gray-600 mb-6">Send and receive money with no fees or account limits.</p>

            </div>
          </div>
        </div>
      </section>

      {/* Personal Online Account Features */}
      <section className="py-20 site-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Personal Online Account<span className="text-acqua">.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img src="/images/central_bank-main-pure.webp" alt="Central Bank" className="w-32 h-32 mx-auto mb-6 object-contain" />
              <h3 className="text-xl font-bold mb-4">We keep your money safe, it is always at your disposal</h3>
              <p className="text-white/70">
                We protect your money with modern security and fraud tools. With our security staff on duty non-stop and
                integrated card protection, you stay in control and you retain complete control over your own unique
                IBAN.
              </p>
            </div>

            <div className="text-center">
              <img src="/images/fiat_money-min.png" alt="Fiat Money" className="w-32 h-32 mx-auto mb-6 object-contain" />
              <h3 className="text-xl font-bold mb-4">Fast, safe, and reliable SEPA payments</h3>
              <p className="text-white/70">
                Experience the power of lightning-fast, safe and reliability with our Euro account, specifically
                designed to cater to your everyday banking needs. Send money to friends, family, hotels, transfer, book
                transfer, and pay online, enabling you to manage your finances with ease from anywhere, on your terms.
                Make bank account work, with confidence and peace of mind.
              </p>
            </div>

            <div className="text-center">
              <img src="/images/safety.png" alt="Safety" className="w-32 h-32 mx-auto mb-6 object-contain" />
              <h3 className="text-xl font-bold mb-4">Live chat support</h3>
              <p className="text-white/70">
                Help is available! In times of customer support, the absence of a solution is a failure itself. We're
                here to help you with any issue you might encounter. If you can't find a solution in our help center,
                our support team is ready to assist you. The response will not take more than 2 minutes!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Account Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src="/images/signin.png"
                alt="Schermata Registrazione PureWallet"
                className="w-[90vw] max-w-[400px] h-auto object-contain scale-125"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-bold text-dark-blue mb-8">
                Open An Account In <br />3 Easy Steps<span className="text-acqua">.</span>
              </h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-acqua flex items-center justify-center text-white font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark-blue mb-2">
                      Fill out the registration form and questionnaire in less than 3 minutes.
                    </h3>
                    <p className="text-gray-600">You're asked to provide basic registration process.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-acqua flex items-center justify-center text-white font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark-blue mb-2">
                      Complete a simple KYC in less than 7 minutes.
                    </h3>
                    <p className="text-gray-600">
                      Take a picture of you ID, take a selfie and go through a video call to verify your identity. This
                      is to ensure the security of your personal information.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-acqua flex items-center justify-center text-white font-bold mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark-blue mb-2">Your Account is active!</h3>
                    <p className="text-gray-600">
                      Receive payments, send funds all over Europe and use your pure Card.
                    </p>
                  </div>
                </div>
              </div>

             {/* <Button className="bg-acqua hover:bg-acqua/90 text-white mt-8">
                Open Account Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
