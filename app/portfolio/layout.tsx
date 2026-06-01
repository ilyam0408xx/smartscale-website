// Layout for /portfolio — a TECHNICAL showcase for agencies.
// noindex (link-only, like /promo) + its own stylesheet.
// This route intentionally breaks the site's "no technical language" rule —
// see שיווק/אתרים/תיק-עבודות/CLAUDE.md
import './portfolio.css'

export const metadata = {
  title: { absolute: 'תיק עבודות — איליה מלצב' },
  description:
    'תיק עבודות טכני: אוטומציות Make, מערכות SaaS שנבנו מאפס, CRM לקליניקות, וחברה שמנוהלת ע״י צבא סוכני AI.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="pf-page">{children}</div>
}
