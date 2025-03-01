import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { PlayerProvider } from "@/lib/player-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trap Beats Store",
  description: "Premium trap beats for artists and producers",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white`}>
        <PlayerProvider>
          <CartProvider>{children}</CartProvider>
        </PlayerProvider>
      </body>
    </html>
  )
}

