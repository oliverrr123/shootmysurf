'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        {/* 500 with server as the middle 0 */}
        <div className="flex flex-col items-center justify-center">
        <div className="relative h-[100px] w-[200px] -mb-16">
            <Image
              src="/images/server.png"
              alt="Server"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-[180px] font-bold text-[#163F69]" style={{ fontFamily: 'var(--font-neulis)' }}>500</p>
        </div>

        {/* Error message */}
        <h1 className="text-4xl font-bold text-[#163F69] mb-4">
          Something went wrong<br />on our side
        </h1>
        
        <p className="text-lg text-[#163F69]/50">
          Our server had a little hiccup.
        </p>
        
        <p className="text-lg text-[#163F69]/50 mb-8">
          Don't worry — it's not you, it's us.
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
