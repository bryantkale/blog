import './global.css'
import type { Metadata } from 'next'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import ThemeToggle from '@/app/components/ThemeToggle'
import { FIRST_NAME } from './data'
// Tutorial for black lace border: https://solaria.neocities.org/guides/borderimage/

export const metadata: Metadata = {
  title: {
    default: FIRST_NAME,
    template: '%s | ' + FIRST_NAME,
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
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/blp1rox.css" />
      </head>
      <body style={{
        boxSizing: "border-box",
        minHeight: "100vh",
      }} className="antialiased">
        <div className="max-w-5xl mx-4 lg:mx-auto py-8 pt-24 px-2 md:px-0">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            <aside className="md:w-40 md:shrink-0">
              <div className="space-y-4 md:sticky md:top-8">
                <div className="site-brand">
                  <span style={{ letterSpacing: '0.16em' }}>Caelin</span>
                  <span>Bryant</span>
                </div>
                <Navbar />
                <ThemeToggle />
              </div>
            </aside>
            <section className="min-w-0 flex-1">
              {children}
            </section>
          </div>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
