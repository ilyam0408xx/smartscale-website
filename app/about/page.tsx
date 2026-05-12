import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import JsonLd from '@/components/JsonLd'
import { personSchema, breadcrumbSchema, WA_LINK } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'איליה מלצב — בונה מערכות לעסקים ישראליים | Smart Scale',
  description:
    'איליה מלצב, מייסד Smart Scale. 7+ שנות ניסיון בבניית מערכות אוטומציה לעסקים ישראליים. בנה את Reacherful, הקים 24 תהליכים אוטומטיים ללקוח אחד, מגיל 14 בונה מערכות.',
  alternates: {
    canonical: 'https://ilyamaltsev.com/about',
    languages: { he: 'https://ilyamaltsev.com/about' },
  },
  openGraph: {
    title: 'איליה מלצב — בונה מערכות לעסקים ישראליים',
    description: 'מייסד Smart Scale. 7+ שנות ניסיון. 24 תהליכים אוטומטיים ללקוח אחד.',
    url: 'https://ilyamaltsev.com/about',
    locale: 'he_IL',
    type: 'profile',
    images: [
      {
        url: 'https://ilyamaltsev.com/og/homepage.webp',
        width: 1200,
        height: 630,
        alt: 'איליה מלצב — מייסד Smart Scale',
      },
    ],
  },
}

const milestones = [
  { year: 'גיל 14', title: 'הכל התחיל מסקרנות', desc: 'התחיל לבנות מערכות ולאוטמט תהליכים — לא כי מישהו ביקש, אלא כי ראה שאפשר לעשות דברים יותר חכם.' },
  { year: '7+ שנים', title: 'ניסיון עם עסקים ישראליים', desc: 'בנה מערכות לסוכנויות שיווק, קליניקות, נדל"ן, e-commerce וחברות שירות. כל מערכת — בעיה אמיתית שנפתרה.' },
  { year: 'Reacherful', title: 'פלטפורמת לידים SaaS מאפס', desc: 'בנה פלטפורמת SaaS שמייצרת 100+ לידים מאומתים ב-6 דקות — ארכיטקטורה, קוד, ממשק, הכל.' },
  { year: 'Smart Scale', title: 'בניית מערכות לעסקים ישראליים', desc: 'הקים את Smart Scale כדי לתת לבעלי עסקים גישה למערכות שרק חברות גדולות יכלו להרשות לעצמן.' },
]

const stats = [
  { num: '7+', label: 'שנות ניסיון' },
  { num: '24', label: 'תהליכים אוטומטיים ללקוח אחד' },
  { num: '100+', label: 'לידים מאומתים ב-6 דקות' },
  { num: '14', label: 'גיל שבו התחלתי' },
]

const clients = [
  { name: 'אלון לוי', role: 'מנכ"ל קולמקס, לשעבר סמנכ"ל כספים בנק לאומי', quote: 'המערכת שאיליה בנה חוסכת לנו שעות של עבודה ידנית כל יום.' },
  { name: 'אור חכים', role: 'מנכ"ל Videocast', quote: 'הפתרון שאיליה הקים העביר אותנו מניהול ידני לאוטומציה מלאה — בלי לשנות את מה שעובד.' },
  { name: 'טום לידר', role: 'מנכ"ל growgen.ai', quote: 'איליה מבין עסקים, לא רק טכנולוגיה. זה ההבדל.' },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: 'דף הבית', url: '/' }, { name: 'אודות', url: '/about' }])} />
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="page-hero-row">
              <div className="page-hero-text">
                <div className="page-eyebrow mono">אודות</div>
                <h1 className="page-hero-title">
                  איליה מלצב —<br />בונה מערכות שעובדות בשביל העסק שלך
                </h1>
                <p className="page-hero-lead">
                  אני בונה מערכות אוטומטיות לעסקים ישראליים — כך שהעסק שלך ממשיך לעבוד גם כשאתה לא.
                  <strong>7+ שנות ניסיון, מגיל 14</strong>. שוק ישראלי בלבד.
                </p>
                <div className="page-hero-ctas">
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                    <span>דבר איתי ב-WhatsApp</span>
                    <span className="btn-arrow" aria-hidden="true">←</span>
                  </a>
                </div>
              </div>
              <div className="page-hero-art">
                <Image
                  src="/images/ilya.jpg"
                  alt="איליה מלצב — מייסד Smart Scale"
                  width={240}
                  height={240}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="page-section page-section--alt">
          <div className="container">
            <div className="about-stats">
              {stats.map((s, i) => (
                <div key={i} className="about-stat">
                  <p className="about-stat-num">{s.num}</p>
                  <p className="about-stat-label">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="container">
            <h2 className="page-section-title">הדרך עד כאן</h2>
            <p className="page-section-lead">
              לא התחלתי מקורסים ותעודות — התחלתי מבעיה. ראיתי שעסקים מבזבזים שעות על דברים שמחשב יכול לעשות בשניות.
              <strong> מאז גיל 14, אני פותר את זה.</strong>
            </p>
            <div className="timeline-list">
              {milestones.map((m, i) => (
                <div key={i} className="timeline-card">
                  <span className="timeline-year mono">{m.year}</span>
                  <div>
                    <h3 className="timeline-title">{m.title}</h3>
                    <p className="timeline-body">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="case-study">
          <div className="container">
            <span className="case-study-eyebrow mono">לקוחות שסומכים</span>
            <h2 className="case-study-title">מה אומרים עליי</h2>
            <div className="testi-grid">
              {clients.map((c, i) => (
                <div key={i} className="testi-card-dark">
                  <p className="testi-card-dark-quote">&ldquo;{c.quote}&rdquo;</p>
                  <p className="testi-card-dark-name">{c.name}</p>
                  <p className="testi-card-dark-role">{c.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-cta">
          <div className="container">
            <h2 className="page-cta-title">רוצה לדעת אם אני יכול לעזור לעסק שלך?</h2>
            <p className="page-cta-sub">שיחת ייעוץ חינם. 15 דקות שיבהירו בדיוק מה אפשר לאוטמט בעסק שלך ומה זה שווה.</p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              <span>שיחת ייעוץ חינם</span>
              <span className="btn-arrow" aria-hidden="true">←</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
