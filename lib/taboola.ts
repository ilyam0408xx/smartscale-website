// Taboola Pixel client-side helpers.
//
// The pixel script is loaded by components/TaboolaPixel.tsx into <head>,
// site-wide (per Taboola docs — required for retargeting and conversion tracking).
// These helpers fire conversion events from React event handlers.
//
// All events are queued on window._tfa, which the pixel script flushes once loaded.

export interface TfaEvent {
  notify: 'event'
  name: string
  id: string | number
  [key: string]: unknown
}

declare global {
  interface Window {
    _tfa?: TfaEvent[]
  }
}

export const TABOOLA_PIXEL_ID = process.env.NEXT_PUBLIC_TABOOLA_PIXEL_ID || ''

// Fire a custom Taboola conversion event. No-op if pixel id missing.
export function tfaTrack(name: string, extra?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !TABOOLA_PIXEL_ID) return
  window._tfa = window._tfa || []
  window._tfa.push({ notify: 'event', name, id: TABOOLA_PIXEL_ID, ...(extra || {}) })
}

export function trackLead(source: 'above-fold' | 'mid' | 'end' | 'sticky'): void {
  tfaTrack('lead', { source })
}
