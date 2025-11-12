"use client"

import Image from "next/image"

const WHATSAPP_NUMBER = "7304217506"

export function WhatsAppButton() {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi, I need help with Grow Essence")
    window.open(`https://wa.me/91${WHATSAPP_NUMBER}?text=${message}`, "_blank")
  }

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 md:w-20 md:h-20 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 active:scale-95 group flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <Image 
        src="/wp.png" 
        alt="WhatsApp" 
        width={32} 
        height={32} 
        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover animate-pulse group-hover:animate-none"
      />
    </button>
  )
}

