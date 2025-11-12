"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">G</span>
            </div>
            <span className="font-bold text-lg hidden sm:block text-foreground">Grow Essence</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/product" className="text-sm text-foreground hover:text-primary transition-colors">
              Product
            </Link>
            <a href="#benefits" className="text-sm text-foreground hover:text-primary transition-colors">
              Benefits
            </a>
            <a href="#testimonials" className="text-sm text-foreground hover:text-primary transition-colors">
              Testimonials
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link
              href="/product"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Buy Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="/" className="block text-sm text-foreground hover:text-primary">
              Home
            </Link>
            <Link href="/product" className="block text-sm text-foreground hover:text-primary">
              Product
            </Link>
            <a href="#benefits" className="block text-sm text-foreground hover:text-primary">
              Benefits
            </a>
            <a href="#testimonials" className="block text-sm text-foreground hover:text-primary">
              Testimonials
            </a>
            <Link
              href="/product"
              className="block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium text-center"
            >
              Buy Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
