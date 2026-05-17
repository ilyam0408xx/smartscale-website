// Sponsored-content disclosure banner.
// Required by Outbrain Advertising Guidelines + Israeli Consumer Protection Law.
// Renders above the H1 in /promo/[slug] pages.

interface SponsoredBannerProps {
  label: string
}

export default function SponsoredBanner({ label }: SponsoredBannerProps) {
  return (
    <div
      role="note"
      aria-label="גילוי תוכן ממומן"
      style={{
        background: '#f5f5f5',
        color: '#888',
        fontSize: '12px',
        fontWeight: 400,
        textAlign: 'center',
        padding: '6px 16px',
        letterSpacing: '0.02em',
      }}
    >
      {label}
    </div>
  )
}
