"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export default function Header() {
  const { cartCount } = useCart()

  return (
    <header className="w-full py-3 bg-[#FAF9F6]/60 border-b border-[#E5E8EB] backdrop-blur-sm fixed top-0 left-0 right-0 z-50" style={{ 
      WebkitBackdropFilter: 'blur(8px)',
      backdropFilter: 'blur(8px)'
    } as React.CSSProperties}>
      <div className="w-full flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="relative">
          <img
            src="/images/logo-blue.svg"
            alt="ShootMySurf"
            className="h-10 md:h-12 w-auto"
          />
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden md:flex items-center gap-6 lg:gap-9">
            <Link 
              href="/#how-it-works" 
              className="text-[#163F69] font-semibold text-sm hover:opacity-80"
            >
              How it works
            </Link>
            <Link 
              href="/contact" 
              className="text-[#163F69] font-semibold text-sm hover:opacity-80"
            >
              Contact us
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-[#163F69] hover:bg-[#163F69]/10 rounded-full transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            <Button className="bg-[#163F69] hover:bg-[#163F69]/90 text-white px-3 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold">
              Create account
            </Button>
            <Button
              variant="wave"
              className="px-3 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}