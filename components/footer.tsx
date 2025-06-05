import { ScrollToTopLink } from "@/components/scroll-to-top-link"
import Link from "next/link"
import { Linkedin, Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t border-border/40 site-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Column */}
          <div>
            <h3 className="text-acqua font-semibold text-xl mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <ScrollToTopLink href="/account" className="text-white/80 hover:text-acqua transition-colors">
                  Pure Account
                </ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink href="/crypto" className="text-white/80 hover:text-acqua transition-colors">
                  Pure.Crypto
                </ScrollToTopLink>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-acqua transition-colors">
                  Pure.News
                </Link>
              </li>
            </ul>

            <h3 className="text-acqua font-semibold text-xl mt-10 mb-6">Contact Us</h3>
            <p className="text-white/80 mb-2">support@purewallet.app</p>
          </div>

          {/* Documentation Column */}
          <div>
            <h3 className="text-acqua font-semibold text-xl mb-6">Pure Crypto Documentation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/purew-documentation/General-risk-disclosure.pdf" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-acqua transition-colors">
                  Crypto. General Risk Disclosure
                </Link>
              </li>
              <li>
                <Link href="/purew-documentation/Crypto-terms-and-Conditions.pdf" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-acqua transition-colors">
                  Crypto. Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/purew-documentation/Card-User-Agreement.pdf" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-acqua transition-colors">
                  Crypto. Pure Card User Terms
                </Link>
              </li>
              <li>
                <Link href="/purew-documentation/Payment-Card-Terms-and-Conditions-.pdf" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-acqua transition-colors">
                  Crypto. Payment Card Terms
                </Link>
              </li>
              <li>
                <Link href="/purew-documentation/Cookie-Policy.pdf" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-acqua transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/purew-documentation/Customer-Privacy-Notice.pdf" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-acqua transition-colors">
                  Privacy Notice
                </Link>
              </li>
              <li>
                <Link href="/purew-documentation/crypto-complaint-form.pdf" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-acqua transition-colors">
                  Crypto. Complaint Form
                </Link>
              </li>
            </ul>
          </div>

          {/* App Download and Logo Column */}
          <div className="flex flex-col items-end">
            <div className="flex flex-col space-y-4 mb-8">
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
                href="https://play.google.com/store/apps/details?id=io.pure.crypto.android.app"
                target="_blank"
                rel="noopener noreferrer"
                className="store-badge"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/googlestore.png" alt="Get it on Google Play" className="store-badge-img" />
              </Link>
            </div>

            {/* Pure Logo */}
            <div className="mb-8">
              <ScrollToTopLink href="/" className="inline-block">
                <Image
                  src="/images/logopure-white-2.png"
                  alt="Pure Logo"
                  width={180}
                  height={60}
                  className="object-contain"
                />
              </ScrollToTopLink>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
            <Link
                href="https://www.instagram.com/purewalletapp/"
                className="text-white/80 hover:text-acqua transition-colors w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.facebook.com/purefintech"
                className="text-white/80 hover:text-acqua transition-colors w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/purewalletapp/"
                className="text-white/80 hover:text-acqua transition-colors w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://x.com/pure_fintech/"
                className="text-white/80 hover:text-acqua transition-colors w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer and Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-white/60 mb-2">
            The purpose of this website is solely to display information regarding the products and services available
            on the Pure Wallet App. For obtaining any of such services, please access via Pure Wallet App.
          </p>
          <p className="text-sm text-white/60 text-center">
            © {new Date().getFullYear()} Pure Wallet App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
