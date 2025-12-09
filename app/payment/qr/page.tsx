"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ArrowLeft } from "lucide-react"
import { getCheckoutUrl } from "@/lib/referral-utils"

const ENABLE_ONLINE_PAYMENT = false

const WHATSAPP_NUMBER = "918989252740"
const SUPPORT_EMAIL = "care@growessence.in"
const RAZORPAY_LINKS: Record<number, string> = {
  799: "https://rzp.io/l/growessence-799",
  1598: "https://rzp.io/l/growessence-1598",
  2397: "https://rzp.io/l/growessence-2397",
  3196: "https://rzp.io/l/growessence-3196",
}

function QRPaymentContent() {
  const searchParams = useSearchParams()
  const total = searchParams.get("total") || "0"
  const quantity = searchParams.get("quantity") || "1"

  if (!ENABLE_ONLINE_PAYMENT) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h1 className="text-4xl font-bold premium-text">Online Payments Disabled</h1>
            <p className="text-muted-foreground">
              Razorpay QR checkout is currently turned off. Update <code>ENABLE_ONLINE_PAYMENT</code> to <code>true</code> in
              <code> app/payment/qr/page.tsx</code> and <code>app/checkout/page.tsx</code> to enable this page again.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={getCheckoutUrl(Number.parseInt(quantity))}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Return to Checkout
              </Link>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </section>
        <Footer />
        <WhatsAppButton />
      </div>
    )
  }

  const totalNumber = Number(total) || 0
  const razorpayLink = RAZORPAY_LINKS[totalNumber]

  const openWhatsApp = () => {
    const message = `I have completed the payment for my Grow Essence order. Amount: ₹${total}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <Link href="/payment" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={20} />
            Back to Payment
          </Link>

          <div>
            <h1 className="text-4xl font-bold mb-2 premium-text">Razorpay Payment Link</h1>
            <p className="text-muted-foreground">
              We process Grow Essence payments exclusively through Razorpay for secure UPI, card, and wallet checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-card border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Amount</p>
              <p className="text-3xl font-bold text-primary">₹{total}</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Quantity</p>
              <p className="text-3xl font-bold">{quantity}</p>
            </div>
          </div>

          {razorpayLink ? (
            <div className="space-y-4">
              <a
                href={razorpayLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Pay ₹{total} via Razorpay
              </a>
              <p className="text-sm text-muted-foreground">
                After completing payment, share the Razorpay receipt with our support team for instant confirmation.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-900">
              <p className="font-semibold mb-2">Need a custom link?</p>
              <p>
                Drop us a message on WhatsApp and we&apos;ll send you a Razorpay link for ₹{total} straight away.
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <button
              onClick={openWhatsApp}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <Image src="/wp.png" alt="WhatsApp" width={20} height={20} />
              Chat on WhatsApp
            </button>
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Grow Essence Payment Confirmation (₹${total})&body=Please find my payment confirmation attached. Order Amount: ₹${total}`}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default function QRPaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QRPaymentContent />
    </Suspense>
  )
}
