'use client'

import { useEffect } from 'react'
import { getConsent } from '@/components/CookieBanner'

// Meta Pixel — loads only when user has consented to "marketing" category.
// Listens for the `cookie-accepted` event so the pixel loads instantly when
// the user toggles marketing on, without needing a page refresh.

export default function PixelLoader() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const loadPixel = () => {
      if (typeof (window as Window & { fbq?: unknown }).fbq !== 'undefined') return

      const script = document.createElement('script')
      script.async = true
      script.src = 'https://connect.facebook.net/en_US/fbevents.js'
      document.head.appendChild(script)

      script.onload = () => {
        const w = window as Window & { fbq?: (a: string, b: string) => void }
        if (w.fbq) {
          w.fbq('init', '1305380584811353')
          w.fbq('track', 'PageView')
        }
      }
    }

    if (getConsent().marketing) {
      loadPixel()
      return
    }

    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (detail && detail.marketing) loadPixel()
    }

    window.addEventListener('cookie-accepted', onConsent)
    return () => window.removeEventListener('cookie-accepted', onConsent)
  }, [])

  return null
}
