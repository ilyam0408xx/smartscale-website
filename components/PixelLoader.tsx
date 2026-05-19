'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    fbq?: (a: string, b: string) => void
  }
}

export default function PixelLoader() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (typeof window.fbq !== 'undefined') return

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)

    script.onload = () => {
      if (window.fbq) {
        window.fbq('init', '1305380584811353')
        window.fbq('track', 'PageView')
      }
    }
  }, [])

  return null
}
