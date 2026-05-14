// Outbrain Amplify Pixel client-side helpers.
//
// The pixel script is loaded by components/OutbrainPixel.tsx into <head>,
// site-wide (per Outbrain docs — required for retargeting, lookalike, view-through).
// These helpers fire conversion events from React event handlers.
//
// All events go through window.obApi, which is exposed by the pixel script.

export interface ObApi {
  (...args: unknown[]): void
  version?: string
  loaded?: boolean
  marketerId?: string | string[]
  queue?: unknown[]
  dispatch?: (...args: unknown[]) => void
}

declare global {
  interface Window {
    obApi?: ObApi
  }
}

export const OUTBRAIN_PIXEL_ID = process.env.NEXT_PUBLIC_OUTBRAIN_PIXEL_ID || ''

// Fire a custom Outbrain conversion event. No-op if pixel/consent not loaded.
export function obTrack(event: string, payload?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !window.obApi) return
  if (payload) {
    window.obApi('track', event, payload)
  } else {
    window.obApi('track', event)
  }
}

export function trackLead(source: 'above-fold' | 'mid' | 'end' | 'sticky'): void {
  obTrack('lead', { source })
}

export function trackEngaged(slug: string): void {
  obTrack('engaged', { slug })
}
