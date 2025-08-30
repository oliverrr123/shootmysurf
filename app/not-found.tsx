import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 with surfboard as the middle 0 */}
        <div className="flex items-center justify-center">
          <span className="text-[180px] font-bold text-[#163F69]" style={{ fontFamily: 'var(--font-neulis)' }}>4</span>
          <div className="relative h-[180px] w-[100px]">
            <Image
              src="/images/surfboard.png"
              alt="Surfboard"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[180px] font-bold text-[#163F69]" style={{ fontFamily: 'var(--font-neulis)' }}>4</span>
        </div>

        {/* Error message */}
        <h1 className="text-4xl font-bold text-[#163F69] mb-4">
          Oops... this page got lost!
        </h1>
        
        <p className="text-lg text-[#163F69]/50">
          We couldn't find what you were looking for.
        </p>
        
        <p className="text-lg text-[#163F69]/50 mb-8">
          But don't worry — let's get you back on track.
        </p>

        {/* Back to home button */}
        <Link 
          href="/"
          className="inline-block bg-[#163F69] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#163F69]/90 transition-colors duration-200"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}
