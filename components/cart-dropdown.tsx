"use client"

import { useCart } from "@/lib/cart-context"
import { X } from "lucide-react"
import Image from 'next/image'

interface CartDropdownProps {
  onClose: () => void
}

export default function CartDropdown({ onClose }: CartDropdownProps) {
  const { cart, removeFromCart, getTotal } = useCart()

  return (
    <div className="absolute right-0 z-50 w-80 mt-2 bg-secondary border border-gray-800 rounded-md shadow-lg">
      <div className="flex items-center justify-between p-3 border-b border-gray-800">
        <h3 className="font-medium">Cart ({cart.length} items)</h3>
        <button onClick={onClose}>
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {cart.length === 0 ? (
          <div className="p-4 text-center text-gray-400">Your cart is empty</div>
        ) : (
          <ul>
            {cart.map((track) => (
              <li key={track.id} className="flex items-center justify-between p-3 border-b border-gray-800">
                <div className="flex items-center">
                  <Image 
                    src={track.image || "/placeholder.svg"} 
                    alt={track.title} 
                    width={40} 
                    height={40} 
                    className="w-10 h-10 mr-3 rounded" 
                  />
                  <div>
                    <p className="text-sm font-medium">{track.title}</p>
                    <p className="text-xs text-gray-400">${track.price.toFixed(2)}</p>
                  </div>
                </div>
                <button onClick={() => removeFromCart(track.id)} className="text-gray-400 hover:text-primary">
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-3 border-t border-gray-800">
        <div className="flex justify-between mb-3">
          <span>Total:</span>
          <span className="font-medium">${getTotal().toFixed(2)}</span>
        </div>
        <button className="w-full py-2 text-white bg-primary rounded-md hover:bg-red-700" disabled={cart.length === 0}>
          Checkout
        </button>
      </div>
    </div>
  )
}

