'use client'

import { useEffect } from 'react'

export default function PixelLoader() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem('cookie_consent') !== 'accepted') return
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
  }, [])

  return null
}
