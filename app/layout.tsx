import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'ShootMySurf - Find and buy your best surf moments',
  description: 'ShootMySurf connects surf photographers with surfers, allowing photographers to upload surf photos and surfers to easily find and purchase their photos.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/frt0ojl.css" />
        <style>{`
          :root {
            --font-neulis: "neulis-neue", serif;
            --font-inter: ${inter.style.fontFamily};
          }
          html {
            font-family: var(--font-inter);
          }
          h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-neulis);
          }
        `}</style>
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-[#FAF9F6] overflow-x-hidden flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
