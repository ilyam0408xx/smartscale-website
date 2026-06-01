// Layout for /portfolio — a TECHNICAL showcase for agencies.
// noindex (link-only, like /promo) + its own stylesheet.
// This route intentionally breaks the site's "no technical language" rule —
// see שיווק/אתרים/תיק-עבודות/CLAUDE.md
import './portfolio.css'

const PF_TITLE = 'תיק עבודות · איליה מלצב'
const PF_DESC =
  'תיק עבודות טכני: אוטומציות Make, מערכות SaaS שנבנו מאפס, CRM לקליניקות, וחברה שמנוהלת ע״י צבא סוכני AI.'

export const metadata = {
  title: { absolute: PF_TITLE },
  description: PF_DESC,
  // override root og/twitter so this page's <head> carries no em-dashes
  openGraph: {
    locale: 'he_IL',
    type: 'website',
    siteName: 'Smart Scale',
    title: PF_TITLE,
    description: PF_DESC,
  },
  twitter: {
    card: 'summary_large_image',
    title: PF_TITLE,
    description: PF_DESC,
  },
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
