'use client'

// CTA button used 3x per advertorial (above-fold, mid, end).
// Fires Outbrain 'lead' conversion event on click before navigating to WhatsApp.

import { WA_LINK } from '@/lib/schema'
import { trackLead } from '@/lib/outbrain'

interface WhatsAppCTAProps {
  position: 'above-fold' | 'mid' | 'end'
  label: string
  primary?: boolean
}

export default function WhatsAppCTA({ position, label, primary = false }: WhatsAppCTAProps) {
  // Allow optional CTA: render nothing if no label provided.
  if (!label || !label.trim()) return null

  const handleClick = () => {
    trackLead(position)
  }

  return (
    <div
      style={{
        margin: '32px 0',
        textAlign: 'center',
      }}
    >
      <a
        href={WA_LINK}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        data-promo-cta={position}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: primary ? '18px 32px' : '14px 24px',
          background: 'var(--wa, #25D366)',
          color: '#fff',
          fontSize: primary ? '18px' : '16px',
          fontWeight: 700,
          borderRadius: '999px',
          textDecoration: 'none',
          boxShadow: primary
            ? '0 6px 18px rgba(37, 211, 102, 0.45)'
            : '0 3px 10px rgba(37, 211, 102, 0.3)',
        }}
      >
        <span>{label}</span>
        <span aria-hidden="true">←</span>
      </a>
    </div>
  )
}
