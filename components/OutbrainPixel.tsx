'use client'

// Outbrain Amplify pixel loader.
// Site-wide install per Outbrain Help Center (required for retargeting,
// lookalike audiences, and cross-page conversion tracking).
//
// Loads immediately on every page, regardless of cookie consent.
// Implementation mirrors the official snippet at:
//   https://www.outbrain.com/help/advertisers/install-outbrain-pixel/

import { useEffect } from 'react'
import { OUTBRAIN_PIXEL_ID, type ObApi } from '@/lib/outbrain'

export default function OutbrainPixel() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!OUTBRAIN_PIXEL_ID) return
    if (typeof window.obApi !== 'undefined') return

    // 1. Build the stub function exactly like the official snippet:
    //    calls before the script loads are queued; after load, dispatch fires.
    const api: ObApi = function (...args: unknown[]) {
      if (api.dispatch) {
        api.dispatch.apply(api, args)
      } else {
        api.queue!.push(args)
      }
    }
    api.version = '1.1'
    api.loaded = true
    api.marketerId = OUTBRAIN_PIXEL_ID
    api.queue = []
    window.obApi = api

    // 2. Inject the script tag (matches the official `tag.src` pattern).
    const tag = document.createElement('script')
    tag.async = true
    tag.src = '//amplify.outbrain.com/cp/obtp.js'
    tag.type = 'text/javascript'
    const firstScript = document.getElementsByTagName('script')[0]
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(tag, firstScript)
    } else {
      document.head.appendChild(tag)
    }

    // 3. Queue PAGE_VIEW immediately. Will fire once the script loads.
    api('track', 'PAGE_VIEW')
  }, [])

  return null
}
