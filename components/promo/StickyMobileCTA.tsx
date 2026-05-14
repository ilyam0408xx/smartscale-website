'use client'

// Sticky bottom CTA for /promo/ pages, mobile only.
// Appears after the user has scrolled past 25% to avoid covering the H1.
// Also fires Outbrain 'engaged' event at 75% scroll.

import { useEffect, useState } from 'react'
import { WA_LINK } from '@/lib/schema'
import { trackEngaged, trackLead } from '@/lib/outbrain'

// The Window.obApi type is declared in lib/outbrain.ts (single source of truth)

interface StickyMobileCTAProps {
  label: string
  slug: string
}

export default function StickyMobileCTA({ label, slug }: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false)
  const [engaged, setEngaged] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total <= 0) return
      const ratio = window.scrollY / total
      if (ratio > 0.25 && !visible) setVisible(true)
      if (ratio > 0.75 && !engaged) {
        setEngaged(true)
        trackEngaged(slug)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [visible, engaged, slug])

  const handleClick = () => {
    trackLead('sticky')
    const fbq = (window as Window & { fbq?: (a: string, b: string) => void }).fbq
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead')
    }
  }

  if (!visible) return null

  return (
    <div className="promo-sticky-cta">
      <a
        href={WA_LINK}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        data-promo-cta="sticky"
        className="promo-sticky-cta__btn"
      >
        <span>{label}</span>
        <span aria-hidden="true">←</span>
      </a>
    </div>
  )
}
