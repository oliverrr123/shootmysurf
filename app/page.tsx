import { MapPin, Calendar, User, Instagram, Facebook, Twitter, Users, DollarSign, Shield, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] overflow-x-hidden">
      {/* Header */}
      <header className="w-full py-3 bg-[#FAF9F6]/60 border-b border-[#E5E8EB] backdrop-blur-sm sticky top-0 z-50">
        <div className="w-full flex items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <div className="relative">
            <img
              src="/images/logo-blue.svg"
              alt="ShootMySurf"
              className="h-10 md:h-12 w-auto"
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 md:gap-8">
            <nav className="hidden md:flex items-center gap-6 lg:gap-9">
              <a href="#how-it-works" className="text-[#163F69] font-semibold text-sm hover:opacity-80">
                How it works
              </a>
              <a href="#contact" className="text-[#163F69] font-semibold text-sm hover:opacity-80">
                Contact us
              </a>
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

      {/* Hero Section */}
      <section className="py-4">
        <div className="w-full px-4 md:px-8">
          <div className="min-h-96 md:h-96 lg:h-[30rem] rounded-xl overflow-hidden relative py-24 md:py-0">
            {/* Background Image */}
            <img
              src="/images/hero.jpg"
              alt="Surfer riding a wave at sunset"
              className="absolute inset-0 w-full h-full object-cover object-[70%] md:object-[0%]"
            />
            
            {/* Mobile overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20 md:bg-transparent"></div>
            
            <div className="w-full md:w-3/5 lg:w-1/2 h-full bg-transparent md:bg-[#D0E6E7] relative flex flex-col justify-center px-4 md:px-6 lg:px-16 gap-4 md:gap-6 lg:gap-9">
              {/* Decorative element - hidden on mobile for cleaner look */}
              <div className="absolute left-0 top-8 md:top-14 w-32 md:w-60 lg:w-64 h-20 md:h-32 lg:h-40 bg-[#FAF9F6] rounded-r-3xl md:rounded-r-[3rem] lg:rounded-r-[6rem] hidden md:block"></div>

              <div className="relative z-10 text-center md:text-left">
                <div className="space-y-3 md:space-y-4 lg:space-y-2 mb-6 md:mb-9">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white md:text-[#163F69] leading-tight font-neulis px-4 md:px-0">
                    Find and buy your best surf moments
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl font-semibold text-white md:text-[#163F69] leading-relaxed px-2 md:px-0">
                    ShootMySurf connects surf photographers with surfers, allowing photographers to upload surf photos
                    and surfers to easily find and purchase their photos.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 md:gap-4 justify-center md:justify-start items-center px-4 md:px-0">
                  <div className="flex flex-col gap-2 items-center sm:items-start w-full sm:w-auto">
                    <Button className="bg-[#163F69] hover:bg-[#163F69]/90 text-white px-6 py-3 rounded-full font-semibold text-sm md:text-base w-full sm:w-auto">
                      I am surfer
                    </Button>
                    <p className="text-xs text-white md:text-black text-center sm:text-left md:max-w-32">Find your wave and buy it.</p>
                  </div>
                  <div className="flex flex-col gap-2 items-center sm:items-start w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      className="bg-white md:bg-[#EEEEEE] hover:bg-white/90 md:hover:bg-[#EEEEEE]/90 text-[#163F69] px-6 py-3 rounded-full font-semibold text-sm md:text-base w-full sm:w-auto"
                    >
                      I am photographer
                    </Button>
                    <p className="text-xs text-white md:text-black text-center sm:text-left md:max-w-36">Upload your photos, set price, sell it</p>
                  </div>
                </div>
              </div>
              
              {/* Wave splitter - only visible on larger screens */}
              <img
                src="/images/splitter.svg"
                alt="Wave splitter"
                className="absolute right-0 top-0 h-full w-auto object-cover z-10 hidden md:block"
                style={{ transform: 'translateX(99%)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Albums Section */}
      <section className="py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-[#163F69] leading-7 font-neulis">Latest Albums</h2>
        </div>

        <div className="w-full px-4 md:px-8">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white p-3.5 rounded-3xl border-2 border-[#EEEEEE]">
                <div className="h-52 p-2.5 rounded-xl mb-3 relative overflow-hidden">
                  <img
                    src="/images/card.jpg"
                    alt={`Surf session ${item} - action shot of surfer on wave`}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="relative z-10 inline-flex items-center gap-3 px-1.5 py-0.5 bg-[#FAF9F6]/40 rounded-lg border-2 border-gray-300/60 backdrop-blur-sm">
                    <span className="text-[#163F69] font-semibold">10</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Waves className="w-5 h-5 text-[#163F69] flex-shrink-0" />
                    <span className="text-xl font-bold text-[#163F69]">Beach</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-5 h-5 text-[#163F69] flex-shrink-0" />
                    <span className="text-sm text-[#163F69]">Location</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-5 h-5 text-[#163F69] flex-shrink-0" />
                    <span className="text-sm text-[#163F69]">25 Jul 2025 | 10:00 - 12:00</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-5 h-5 text-[#163F69] flex-shrink-0" />
                    <span className="text-sm text-[#163F69]">John Doe</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <Button className="bg-[#163F69] hover:bg-[#163F69]/90 text-white px-5 py-2.5 rounded-full font-semibold">
            View All Albums
          </Button>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-14 bg-[#FAF9F6]">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-4xl font-bold text-[#163F69] leading-7 font-neulis">How it works</h2>
        </div>

        <div className="w-full px-4 md:px-8 py-4">
          <div className="w-full space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
              <div className="flex-1 lg:pl-8 relative order-2 lg:order-1">
                <div className="absolute left-0 h-20 md:h-32 lg:h-40 bg-[#D0E6E7] rounded-r-full md:rounded-r-[3rem] lg:rounded-r-[6rem] hidden lg:block" style={{ left: 'calc(-100vw + 100%)', width: 'calc(100vw - 100% + 16rem)', top: '22%', transform: 'translateY(-50%)' }}></div>
                <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl md:text-4xl font-bold text-[#163F69] leading-5 font-neulis lg:pr-4">1. Register</h3>
                  <p className="text-sm md:text-base text-black leading-5 max-w-full lg:max-w-lg mx-auto lg:mx-0 lg:pr-4">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean vel massa quis mauris vehicula
                    lacinia.
                    <br />
                    <br />
                    Quisque tincidunt scelerisque libero. Aliquam erat volutpat. Quisque porta. Integer imperdiet lectus
                    quis justo. Vivamus ac leo pretium faucibus.
                  </p>
                  <div className="flex justify-center lg:justify-start">
                    <Button className="bg-[#163F69] hover:bg-[#163F69]/90 text-white px-5 py-2.5 rounded-full font-semibold">
                      Create account
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 lg:pr-8 order-1 lg:order-2">
                <img
                  src="/images/section1.jpg"
                  alt="Registration process"
                  className="w-full h-48 md:h-72 lg:h-80 rounded-xl object-cover mx-auto"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
              <div className="w-full lg:w-1/2 lg:pl-8 order-1">
                <img
                  src="/images/section2.jpg"
                  alt="Upload photos process"
                  className="w-full h-48 md:h-72 lg:h-80 rounded-xl object-cover mx-auto"
                />
              </div>
              <div className="flex-1 lg:pr-8 relative order-2">
                <div className="absolute right-0 h-20 md:h-32 lg:h-40 bg-[#D0E6E7] rounded-l-full md:rounded-l-[3rem] lg:rounded-l-[6rem] hidden lg:block" style={{ right: 'calc(-100vw + 100%)', width: 'calc(100vw - 100% + 16rem)', top: '22%', transform: 'translateY(-50%)' }}></div>
                <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl md:text-4xl font-bold text-[#163F69] leading-5 font-neulis text-left lg:text-right lg:pl-4">2. Find or upload your photos</h3>
                  <p className="text-sm md:text-base text-black leading-5 max-w-full lg:max-w-lg mx-auto lg:ml-auto lg:mr-0 text-left lg:text-right lg:pl-4">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean vel massa quis mauris vehicula
                    lacinia.
                    <br />
                    <br />
                    Quisque tincidunt scelerisque libero. Aliquam erat volutpat. Quisque porta. Integer imperdiet lectus
                    quis justo. Vivamus ac leo pretium faucibus.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                    <Button className="bg-[#163F69] hover:bg-[#163F69]/90 text-white px-5 py-2.5 rounded-full font-semibold">
                      Find my photos
                    </Button>
                    <Button className="bg-[#163F69] hover:bg-[#163F69]/90 text-white px-5 py-2.5 rounded-full font-semibold">
                      Upload your photos
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
              <div className="flex-1 lg:pl-8 relative order-2 lg:order-1">
                <div className="absolute left-0 h-20 md:h-32 lg:h-40 bg-[#D0E6E7] rounded-r-full md:rounded-r-[3rem] lg:rounded-r-[6rem] hidden lg:block" style={{ left: 'calc(-100vw + 100%)', width: 'calc(100vw - 100% + 16rem)', top: '22%', transform: 'translateY(-50%)' }}></div>
                <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl md:text-4xl font-bold text-[#163F69] leading-5 font-neulis lg:pr-4">3. Purchase or sell your photos</h3>
                  <p className="text-sm md:text-base text-black leading-5 max-w-full lg:max-w-lg mx-auto lg:mx-0 lg:pr-4">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean vel massa quis mauris vehicula
                    lacinia. Quisque tincidunt scelerisque libero.
                    <br />
                    <br />
                    Aliquam erat volutpat. Quisque porta. Integer imperdiet lectus quis justo. Vivamus ac leo pretium
                    faucibus.
                  </p>
                  <div className="flex justify-center lg:justify-start">
                    <Button className="bg-[#163F69] hover:bg-[#163F69]/90 text-white px-5 py-2.5 rounded-full font-semibold">
                      Buy photos
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 lg:pr-8 order-1 lg:order-2">
                <img
                  src="/images/section3.jpg"
                  alt="Purchase process"
                  className="w-full h-48 md:h-72 lg:h-80 rounded-xl object-cover mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-14">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-4xl font-bold text-[#163F69] leading-7 font-neulis">What people say</h2>
        </div>

        <div className="w-full px-4 md:px-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Lucas", quote: "As a photographer, ShootMySurf has been a game-changer for my business." },
              { name: "Chloe", quote: "I love the quality of the photos and the convenience of the platform." },
              { name: "Noah", quote: "ShootMySurf made it so easy to find and buy photos from my surf trip!" },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-3.5 rounded-xl border-2 border-[#EEEEEE]">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-[#163F69] font-neulis">{testimonial.name}</h4>
                  <p className="text-sm text-[#6B7582] leading-5">"{testimonial.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 pb-20 bg-[#D0E6E7]">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-4xl font-bold text-[#163F69] leading-7 font-neulis">Benefits</h2>
        </div>

        <div className="w-full px-4 md:px-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white p-3.5 rounded-xl border-2 border-[#EEEEEE] flex items-center gap-3">
              <Users className="w-6 h-6 text-[#163F69] flex-shrink-0" />
              <span className="text-base font-bold text-[#163F69] font-neulis">For Surfers</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border-2 border-[#EEEEEE] flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-[#163F69] flex-shrink-0" />
              <span className="text-base font-bold text-[#163F69] font-neulis">For Photographers</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border-2 border-[#EEEEEE] flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#163F69] flex-shrink-0" />
              <span className="text-base font-bold text-[#163F69] font-neulis">Secure Platform</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <img src="/images/splitter-footer.svg" alt="Splitter" className="w-screen max-w-none bg-[#D0E6E7] block" style={{ width: '110vw', transform: 'translateX(-5%)' }} />
      <footer className="bg-[#163F69] text-white">
        {/* <div className="h-14 bg-[#D0E6E7]"></div> */}
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
                <a href="#" className="hover:opacity-80">
                  About
                </a>
                <a href="#" className="hover:opacity-80">
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
      </footer>
    </div>
  )
}
