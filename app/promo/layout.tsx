// Minimal layout for /promo/ advertorials.
// No Header / Footer / WhatsAppFloat — those distract from the single CTA goal.
// The SponsoredBanner is rendered per-page so it can use the page's label.

export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
}

export default function PromoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="promo-shell">
      {children}
    </div>
  )
}
