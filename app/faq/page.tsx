import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"

export const metadata = {
  title: "FAQ | PureWallet",
  description: "Frequently Asked Questions about PureWallet - the all-in-one crypto solution.",
}

export default function FAQPage() {
  return (
    <main className="flex flex-col min-h-screen pt-20">
      <FAQSection />
      <Footer />
    </main>
  )
}
