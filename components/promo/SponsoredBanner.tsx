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
        color: '#666',
        fontSize: '13px',
        fontWeight: 400,
        textAlign: 'center',
        padding: '8px 16px',
        borderBottom: '1px solid #e5e5e5',
        letterSpacing: '0.02em',
      }}
    >
      {label}
    </div>
  )
}
