'use client'

import { useEffect } from 'react'

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

    if (localStorage.getItem('cookie_consent') === 'accepted') {
      loadPixel()
      return
    }

    // Load immediately when user clicks "accept" — no page refresh needed.
    window.addEventListener('cookie-accepted', loadPixel)
    return () => window.removeEventListener('cookie-accepted', loadPixel)
  }, [])

  return null
}
