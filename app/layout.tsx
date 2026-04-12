import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import './globals.css'
import CookieBanner from '@/components/CookieBanner'
import PixelLoader from '@/components/PixelLoader'
import AiWidget from '@/components/AiWidget'

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '700', '800', '900'],
  display: 'swap',
  variable: '--font-heebo',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ilyamaltsev.com'),
  title: {
    default: 'Smart Scale — מערכות חכמות לעסקים',
    template: '%s | Smart Scale',
  },
  description:
    'מערכות שעושות לעסק שלך את העבודה החוזרת — לידים, תזכורות, ניירת — אוטומטית. בונה מערכות לעסקים ישראליים מ-2017.',
  openGraph: {
    locale: 'he_IL',
    type: 'website',
    siteName: 'Smart Scale',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
      </head>
      <body
        className={`${heebo.className} bg-white text-ink antialiased overflow-x-hidden`}
        style={{ lineHeight: 1.7 }}
      >
        {children}
        <PixelLoader />
        <CookieBanner />
        <AiWidget />
      </body>
    </html>
  )
}
