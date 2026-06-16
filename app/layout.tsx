import './global.css'
import type { Metadata } from 'next'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { FULL_NAME } from './data';
import { GeistPixelSquare } from 'geist/font/pixel';
// Tutorial for black lace border: https://solaria.neocities.org/guides/borderimage/

export const metadata: Metadata = {
  title: {
    default: FULL_NAME,
    template: '%s | ' + FULL_NAME,
  },
  description: 'This is my portfolio.',
  openGraph: {
    title: 'My Portfolio',
    description: 'This is my portfolio.',
    siteName: 'My Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes: any[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={GeistPixelSquare.className}
      style={{
        color: '#331B1C',
        border: '20px solid transparent',
        borderImage: `url("/blacklacelarge.png") 30 round`,
        backgroundColor: '#FFE9E9',
      }}
    >
      <body style={{
        boxSizing: "border-box",
        minHeight: "100vh",
      }} className="antialiased  max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
