import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="bg-[#163F69] text-white relative">
        {/* Splitter overlay */}
        <img 
          src="/images/splitter-footer.svg" 
          alt="Splitter" 
          className="absolute top-0 left-1/2 transform w-screen max-w-none pointer-events-none z-10" 
          style={{ width: '110vw', transform: 'translateY(-99%) translateX(-50%)' }} 
        />
        <div className="max-w-7xl mx-auto">
          <div className="w-full px-4 md:px-8 py-10">
            <div className="w-full">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-11">
                {/* Logo */}
                <div className="relative w-40">
                  <img
                    src="/images/logo-white.svg"
                    alt="ShootMySurf"
                    className="h-12 md:h-16 w-auto"
                  />
                </div>

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                  <a href="/" className="hover:opacity-80">
                    Home
                  </a>
                  <a href="/#how-it-works" className="hover:opacity-80">
                    How it works
                  </a>
                  <a href="/gallery" className="hover:opacity-80">
                    Gallery
                  </a>
                  <a href="/contact" className="hover:opacity-80">
                    Contact
                  </a>
                  <a href="#" className="hover:opacity-80">
                    FAQ
                  </a>
                  <a href="#" className="hover:opacity-80">
                    Privacy
                  </a>
                  <a href="#" className="hover:opacity-80">
                    Terms
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex flex-col items-center gap-1 w-40">
                  <span className="text-sm md:text-base">Follow us:</span>
                  <div className="flex gap-4">
                    <Instagram className="w-5 h-5 md:w-6 md:h-6 hover:opacity-80 cursor-pointer" />
                    <Facebook className="w-5 h-5 md:w-6 md:h-6 hover:opacity-80 cursor-pointer" />
                    <Twitter className="w-5 h-5 md:w-6 md:h-6 hover:opacity-80 cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="text-center text-sm md:text-base flex justify-center items-center gap-2">
                <span>© 2025 ShootMySurf. Created by </span>
                <img src="/images/digitivo-logo.svg" alt="Digitivo" className="w-24 h-24" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}