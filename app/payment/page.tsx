"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CheckCircle2 } from "lucide-react"

const ENABLE_ONLINE_PAYMENT = true

const WHATSAPP_NUMBER = "917304217506"
const SUPPORT_EMAIL = "growessence09@gmail.com"

// Cosmofeed / SuperProfile payment links for different quantities
const COSMOFEED_LINKS_BY_QUANTITY: Record<number, string> = {
  1: "https://superprofile.bio/vp/grow-essence--100--guaranteed-hair-transformation",
  2: "https://superprofile.bio/vp/grow-essence--100--guaranteed-hair-transformation-161",
  3: "https://superprofile.bio/vp/grow-essence--100--guaranteed-hair-transformation-744",
  4: "https://superprofile.bio/vp/grow-essence--100--guaranteed-hair-transformation-340",
}

function PaymentContent() {
  const searchParams = useSearchParams()
  const total = searchParams.get("total") || "0"
  const method = searchParams.get("method") || "online"
  const quantity = searchParams.get("quantity") || "1"

  const [showSuccess, setShowSuccess] = useState(false)
  const totalNumber = Number(total) || 0
  const quantityNumber = Number(quantity) || 1
  const cosmofeedLink =
    ENABLE_ONLINE_PAYMENT && COSMOFEED_LINKS_BY_QUANTITY[quantityNumber]
      ? COSMOFEED_LINKS_BY_QUANTITY[quantityNumber]
      : undefined
  const onlineTemporarilyDisabled = !ENABLE_ONLINE_PAYMENT && method === "online"

  const openWhatsApp = () => {
    const message = `Hi, I need help with my Grow Essence order (₹${total})`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank")
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
            <p className="text-muted-foreground mb-4">
              Thank you for choosing Grow Essence. Our care team will reach out shortly with your order details and tracking.
            </p>
            <p className="text-2xl font-bold text-primary mb-4">₹{total}</p>
            <p className="text-sm text-muted-foreground mb-8">Quantity: {quantity}</p>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6 text-sm text-green-900">
              <p className="font-semibold mb-2">Order Confirmation:</p>
              <p>Check your email for receipt and shipping details.</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={openWhatsApp}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Image src="/wp.png" alt="WhatsApp" width={20} height={20} />
                Chat on WhatsApp
              </button>
              <Link
                href="/"
                className="px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </section>
        <Footer />
        <WhatsAppButton />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 premium-text">Payment Method</h1>
          <p className="text-muted-foreground mb-12">Choose your preferred payment method to complete your order</p>

          {/* Order Details Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="p-4 bg-card border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Amount</p>
              <p className="text-2xl font-bold">₹{total}</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Quantity</p>
              <p className="text-2xl font-bold">{quantity}</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Delivery</p>
              <p className="text-2xl font-bold">4-5 Days</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Payment Type</p>
              <p className="text-lg font-bold capitalize">
                {onlineTemporarilyDisabled ? "online (unavailable)" : method}
              </p>
            </div>
          </div>

          {/* Online Payment via Cosmofeed */}
          {ENABLE_ONLINE_PAYMENT && method === "online" && (
            <div className="p-6 md:p-8 border-2 border-primary/30 rounded-xl bg-primary/5 mb-12">
              <h3 className="text-2xl font-bold mb-3">Pay Securely with Cosmofeed</h3>
              <p className="text-muted-foreground mb-6">
                Complete your UPI or card payment instantly through our Cosmofeed payment page. The payment link opens in a
                new tab.
              </p>

              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <div className="p-4 bg-background border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Amount Payable</p>
                  <p className="text-2xl font-bold text-primary">₹{total}</p>
                </div>
                <div className="p-4 bg-background border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                  <p className="text-2xl font-bold">{quantity}</p>
                </div>
              </div>

              {cosmofeedLink ? (
                <div className="space-y-4">
                  <a
                    href={cosmofeedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Pay ₹{total} via Cosmofeed
                  </a>
                  <button
                    onClick={() => {
                      setTimeout(() => setShowSuccess(true), 1500)
                    }}
                    className="w-full px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                  >
                    I've completed the payment
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-900">
                  <p className="font-semibold mb-2">Payment link unavailable for this amount.</p>
                  <p>
                    Please reach out to us on WhatsApp so we can share the correct Cosmofeed payment link for ₹{total}.
                  </p>
                </div>
              )}

              <p className="text-xs text-muted-foreground mt-4">
                Tip: Save your Cosmofeed receipt or screenshot for quick confirmation with our team.
              </p>
            </div>
          )}

          {onlineTemporarilyDisabled && (
            <div className="p-6 md:p-8 border-2 border-yellow-300 rounded-xl bg-yellow-50 mb-12 text-center text-yellow-900 space-y-3">
              <h3 className="text-2xl font-bold">Online payments are temporarily unavailable</h3>
              <p>
                We are currently accepting orders via Cash on Delivery only. Set <code>ENABLE_ONLINE_PAYMENT</code> to <code>true</code> in
                <code> app/payment/page.tsx</code> and <code>app/checkout/page.tsx</code> whenever you want to reopen Razorpay checkout.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/checkout?quantity=${quantity}`}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Switch to Cash on Delivery
                </Link>
                <button
                  onClick={openWhatsApp}
                  className="px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                >
                  Chat with Support
                </button>
              </div>
            </div>
          )}

          {method === "cod" && (
            <div className="p-8 bg-green-50 border-2 border-green-200 rounded-lg mb-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3 text-green-900">Cash on Delivery Selected</h2>
              <p className="text-green-900 mb-6 max-w-2xl mx-auto">
                You will pay ₹{total} when you receive your order. Our delivery partner will collect the payment at your
                doorstep.
              </p>

              <button
                onClick={() => {
                  setTimeout(() => setShowSuccess(true), 1500)
                }}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Confirm COD Order
              </button>
            </div>
          )}

          {/* Help & Support Section */}
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-lg font-bold mb-4">Need Help?</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={openWhatsApp}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <Image src="/wp.png" alt="WhatsApp" width={20} height={20} />
                Chat on WhatsApp
              </button>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  )
}
