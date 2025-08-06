"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  const pathname = usePathname()

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
            <Button className="bg-[#163F69] hover:bg-[#163F69]/90 text-white px-3 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold">
              Create account
            </Button>
            <Button
              variant="secondary"
              className="bg-[#EEEEEE] hover:bg-[#EEEEEE]/90 text-[#163F69] px-3 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}