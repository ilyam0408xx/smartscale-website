import type { Metadata } from 'next'
import Script from 'next/script'
import { Heebo, JetBrains_Mono } from 'next/font/google'
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono',
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
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${jetbrainsMono.variable}`}
    >
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
        className={`${heebo.className} antialiased`}
        style={{ background: 'var(--bg)', color: 'var(--fg)' }}
      >
        {children}
        <PixelLoader />
        <CookieBanner />
        <AiWidget />

        <Script id="smooth-anchor-scroll" strategy="afterInteractive">{`
          (function () {
            const EASE = t => 1 - Math.pow(1 - t, 3);
            const PAD = 88;
            function smoothTo(targetY, duration) {
              const startY = window.scrollY;
              const dist = targetY - startY;
              if (Math.abs(dist) < 2) return;
              const t0 = performance.now();
              function step(now) {
                const p = Math.min(1, (now - t0) / duration);
                window.scrollTo(0, startY + dist * EASE(p));
                if (p < 1) requestAnimationFrame(step);
              }
              requestAnimationFrame(step);
            }
            document.addEventListener('click', (e) => {
              const a = e.target.closest && e.target.closest('a[href^="#"]');
              if (!a) return;
              const id = a.getAttribute('href').slice(1);
              if (!id) return;
              const el = document.getElementById(id);
              if (!el) return;
              e.preventDefault();
              const y = el.getBoundingClientRect().top + window.scrollY - PAD;
              const d = Math.min(1300, Math.max(550, Math.abs(y - window.scrollY) * 0.55));
              smoothTo(y, d);
              history.replaceState(null, '', '#' + id);
            }, { passive: false });
          })();
        `}</Script>
      </body>
    </html>
  )
}
