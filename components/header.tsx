"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import CartDropdown from "./cart-dropdown"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { getTotal } = useCart()

  const menuItems = [
    { label: "Home", href: "#" },
    { label: "Beats", href: "#player" },
    { label: "Licenses", href: "#licenses" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "About", href: "#about" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Mobile Menu Button - Only visible on mobile/tablet */}
          <button className="lg:hidden text-gray-300 hover:text-white mr-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo - Different positioning for mobile/tablet and desktop */}
          <Link href="/" className="text-2xl font-bold text-white lg:w-1/4">
            TRAP BEATS
          </Link>

          {/* Desktop Navigation - Hidden on mobile/tablet, centered on desktop */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            {menuItems.map((item) => (
              <Link key={item.label} href={item.href} className="px-4 text-gray-300 hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Cart - Right-aligned */}
          <div className="relative ml-auto lg:w-1/4 lg:flex lg:justify-end">
            <button className="flex items-center text-white" onClick={() => setIsCartOpen(!isCartOpen)}>
              <ShoppingCart className="w-5 h-5 mr-1" />
              <span className="text-primary">${getTotal().toFixed(2)}</span>
            </button>
            {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
          </div>
        </div>

        {/* Mobile Menu - Only visible on mobile/tablet */}
        {isMenuOpen && (
          <nav className="lg:hidden py-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

