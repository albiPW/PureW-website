"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// FAQ data
const faqItems = [
  {
    question: "How can I create a crypto wallet?",
    answer: (
      <>
        Click on <i>Crypto</i> section, select <i>Create Wallet</i> and then choose the cryptocurrency that you would
        like to add to your list (i.e. Bitcoin, Ethereum, USDC etc.)
        <br />
        <br />
        You can create one wallet for each cryptocurrency.
      </>
    ),
  },
  {
    question: "How can I make a crypto transfer?",
    answer: (
      <>
        Click on <i>Crypto</i> section, select <i>Send</i> and choose <i>Send to User</i> when the user has an account
        with us (as internal transfer). Otherwise, select the cryptocurrency you would like to send, choose the wallet,
        insert the address and the amount you want to send.
        <br />
        <br />
        Before clicking on <i>Send</i>, please double check that the address you have inserted is correct.
      </>
    ),
  },
  {
    question: "Where can I find my wallet address?",
    answer: (
      <>
        Click on <i>Crypto</i> section, select the <i>Cryptocurrency</i> of your interest and click on <i>Receive</i> or
        alternatively, go to <i>Crypto</i> → <i>Receive</i> → choose the cryptocurrency.
        <br />
        <br />
        Besides your wallet address, you can also check the network enabled for the specific cryptocurrency.
      </>
    ),
  },
  {
    question: "How to sign up for Pure.?",
    answer: (
      <>
        1. Download the Pure. App from Google Play Store or Apple Store.
        <br />
        2. Upload a proof of address not older than 3 months. We accept PDF or a picture showing your name, address, and
        issue date.
        <br />
        3. Complete the questionnaire.
        <br />
        4. Upload a live picture of your ID (Passport or Identity Card). It must be valid for at least one month.
        <br />
        5. Proceed with the selfie identification (remove eyeglasses, face must be clearly visible and alone).
      </>
    ),
  },
  {
    question: "How long does it take for my account to get approved?",
    answer:
      "Within 24 hours (working days only). Once your account is approved, you will be notified via email. If we need further documents, we will contact you.",
  },
  {
    question: "How can I change my phone number and/or email?",
    answer:
      "You can change your phone number or email by sending an email to support@purewallet.app from your registered email. Please attach your National ID or Passport (front and back).",
  },
  {
    question: "When will the Pure. Crypto Card be available?",
    answer:
      "The Pure. Crypto Card will officially be available starting from the beginning of November. Stay tuned for more updates as we approach the launch!",
  },
  {
    question: "How can I exchange currencies?",
    answer: (
      <>
        Click on <i>Crypto</i> section, select <i>Exchange</i> and choose the currency you want to <i>exchange from</i>{" "}
        and the one to <i>exchange to</i>.
      </>
    ),
  },
  {
    question: "How can I top up my EUR account?",
    answer: (
      <>
        Click on <i>Crypto</i> section, select <i>Receive</i>, then <i>Bank Deposit</i> to see our bank details. Enter
        the amount you want to deposit and submit your request.
      </>
    ),
  },
  {
    question: "Are there fees for bank deposits and withdrawals?",
    answer: "We do not charge any fees for bank transfers.",
  },
  {
    question: "Can I receive third-party SEPA transfers to my EUR account?",
    answer: "Third-party deposits via bank transfer are not accepted.",
  },
  {
    question: "How long do SEPA withdrawals take?",
    answer: "Once you withdraw your funds to your bank account, it might take 1–3 business/working days.",
  },
  {
    question: "How can I submit a SEPA withdrawal request?",
    answer: (
      <>
        Click on <i>our logo P.</i> and under the <i>FIAT Account</i> section select <i>Accounts</i>, click on{" "}
        <i>Send</i> and choose <i>Wire Transfer</i>. Fill in your bank details (EUR currency) and click on{" "}
        <i>Request Withdrawal</i>.<br />
        <br />
        Make sure all details are correct and avoid using punctuation.
      </>
    ),
  },
  {
    question: "How can I make an internal transfer to another user?",
    answer: (
      <>
        Click on <i>Crypto</i> section, select <i>Send</i> and then <i>User</i>. Insert the recipient username and click{" "}
        <i>Find</i>. Choose the recipient's account, insert the amount and click <i>Send</i>.<br />
        <br />
        Make sure the username is correct before proceeding.
        <br />
        Internal transfers are immediate and free of charge.
      </>
    ),
  },
]

// FAQ Item component
const FAQItem = ({ question, answer, index, isOpen, toggleAccordion }: any) => {
  return (
    <div className="border-b border-gray-700">
      <button
        className={cn(
          "flex w-full items-center justify-between py-4 px-6 text-left text-acqua hover:bg-dark-blue/80 transition-colors",
          isOpen && "bg-dark-blue/50",
        )}
        onClick={() => toggleAccordion(index)}
        aria-expanded={isOpen}
      >
        <span className="font-medium">
          {index + 1}. {question}
        </span>
        <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", isOpen ? "rotate-180" : "rotate-0")} />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="bg-gray-800/50 p-6 text-white/90">{answer}</div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full relative site-bg py-16 md:py-24">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Frequently Asked Questions<span className="text-acqua">.</span>
          </h1>
          <p className="mt-4 text-xl text-white/70">
            Find answers to common questions about PureWallet and our services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900/30 rounded-xl overflow-hidden shadow-lg border border-gray-800"
        >
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              index={index}
              isOpen={openIndex === index}
              toggleAccordion={toggleAccordion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
