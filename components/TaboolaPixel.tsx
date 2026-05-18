'use client'

// Taboola Pixel loader.
// Site-wide install per Taboola Help Center (required for retargeting and
// conversion tracking from Taboola Sponsored Content campaigns).
//
// Loads only after user consents to "marketing" category in CookieBanner.
// Listens for cookie-accepted event so the pixel loads instantly on consent
// without needing a page refresh.
// Implementation mirrors the official snippet from Taboola Backstage
// (id: 2040984), guarded against double-injection via the tb_tfa_script id.

import { useEffect } from 'react'
import { TABOOLA_PIXEL_ID } from '@/lib/taboola'
import { getConsent } from '@/components/CookieBanner'

const SCRIPT_ID = 'tb_tfa_script'

export default function TaboolaPixel() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!TABOOLA_PIXEL_ID) return

    const loadPixel = () => {
      if (document.getElementById(SCRIPT_ID)) return

      // 1. Build the queue exactly like the official snippet — events pushed
      //    before the script loads are flushed once tfa.js initializes.
      window._tfa = window._tfa || []
      window._tfa.push({ notify: 'event', name: 'page_view', id: TABOOLA_PIXEL_ID })

      // 2. Inject the script tag (matches the official insertBefore pattern).
      const tag = document.createElement('script')
      tag.async = true
      tag.src = `//cdn.taboola.com/libtrc/unip/${TABOOLA_PIXEL_ID}/tfa.js`
      tag.id = SCRIPT_ID
      const firstScript = document.getElementsByTagName('script')[0]
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(tag, firstScript)
      } else {
        document.head.appendChild(tag)
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
