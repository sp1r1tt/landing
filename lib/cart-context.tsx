"use client"

import type { Track } from "@/lib/data"
import { createContext, useContext, useState, type ReactNode } from "react"

type CartContextType = {
  cart: Track[]
  addToCart: (track: Track) => void
  removeFromCart: (trackId: string) => void
  clearCart: () => void
  getTotal: () => number
  isInCart: (trackId: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Track[]>([])

  const addToCart = (track: Track) => {
    if (!isInCart(track.id)) {
      setCart((prev) => [...prev, track])
    }
  }

  const removeFromCart = (trackId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== trackId))
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

  const isInCart = (trackId: string) => {
    return cart.some((item) => item.id === trackId)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

