import type { Metadata } from 'next'
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
  {
    year: 'גיל 14',
    title: 'הכל התחיל מסקרנות',
    desc: 'התחיל לבנות מערכות ולאוטמט תהליכים — לא כי מישהו ביקש, אלא כי ראה שאפשר לעשות דברים יותר חכם.',
  },
  {
    year: '7+ שנים',
    title: 'ניסיון עם עסקים ישראליים',
    desc: 'בנה מערכות לסוכנויות שיווק, קליניקות, נדל"ן, e-commerce וחברות שירות. כל מערכת — בעיה אמיתית שנפתרה.',
  },
  {
    year: 'Reacherful',
    title: 'פלטפורמת לידים SaaS מאפס',
    desc: 'בנה פלטפורמת SaaS שמייצרת 100+ לידים מאומתים ב-6 דקות — ארכיטקטורה, קוד, ממשק, הכל.',
  },
  {
    year: 'Smart Scale',
    title: 'בניית מערכות לעסקים ישראליים',
    desc: 'הקים את Smart Scale כדי לתת לבעלי עסקים גישה למערכות שרק חברות גדולות יכלו להרשות לעצמן.',
  },
]

const clients = [
  {
    name: 'אלון לוי',
    role: 'מנכ"ל קולמקס, לשעבר סמנכ"ל כספים בנק לאומי',
    quote: 'המערכת שאיליה בנה חוסכת לנו שעות של עבודה ידנית כל יום.',
  },
  {
    name: 'אור חכים',
    role: 'מנכ"ל Videocast',
    quote: 'הפתרון שאיליה הקים העביר אותנו מניהול ידני לאוטומציה מלאה — בלי לשנות את מה שעובד.',
  },
  {
    name: 'טום לידר',
    role: 'מנכ"ל growgen.ai',
    quote: 'איליה מבין עסקים, לא רק טכנולוגיה. זה ההבדל.',
  },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'דף הבית', url: '/' },
          { name: 'אודות', url: '/about' },
        ])}
      />
      <Header />
      <main style={{ paddingTop: 100 }}>

        {/* Hero */}
        <section style={{ padding: '60px 0 80px', background: '#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <div
              style={{
                display: 'flex',
                gap: 48,
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ flex: '1 1 300px' }}>
                <p className="section-label">אודות</p>
                <h1
                  style={{
                    fontSize: 'clamp(2rem,5vw,3rem)',
                    fontWeight: 900,
                    color: '#0a0a0a',
                    marginBottom: 16,
                    lineHeight: 1.15,
                  }}
                >
                  איליה מלצב —<br />בונה מערכות שעובדות בשביל העסק שלך
                </h1>
                <p className="direct-answer" style={{ fontSize: 18, maxWidth: 560, marginBottom: 32 }}>
                  אני בונה מערכות אוטומטיות לעסקים ישראליים — כך שהעסק שלך ממשיך לעבוד גם כשאתה לא.
                  7+ שנות ניסיון, מגיל 14. שוק ישראלי בלבד.
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '14px 32px',
                    background: '#25D366',
                    color: '#fff',
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 17,
                    textDecoration: 'none',
                  }}
                >
                  דבר איתי ב-WhatsApp
                </a>
              </div>
              <div style={{ flex: '0 0 auto' }}>
                <img
                  src="/images/ilya.jpg"
                  alt="איליה מלצב — מייסד Smart Scale"
                  width={240}
                  height={240}
                  style={{ borderRadius: 16, objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: '60px 0', background: '#f9f9f7' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
                gap: 24,
              }}
            >
              {[
                { num: '7+', label: 'שנות ניסיון' },
                { num: '24', label: 'תהליכים אוטומטיים ללקוח אחד' },
                { num: '100+', label: 'לידים מאומתים ב-6 דקות' },
                { num: '14', label: 'גיל שבו התחלתי' },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      fontSize: 'clamp(2.2rem,4vw,3rem)',
                      fontWeight: 900,
                      color: '#0ea5e9',
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    {stat.num}
                  </p>
                  <p style={{ fontSize: 15, color: '#6b6b6b' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section style={{ padding: '80px 0', background: '#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 800, marginBottom: 12 }}>
              הדרך עד כאן
            </h2>
            <p className="direct-answer">
              לא התחלתי מקורסים ותעודות — התחלתי מבעיה. ראיתי שעסקים מבזבזים שעות על דברים שמחשב יכול לעשות בשניות. מאז גיל 14, אני פותר את זה.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 32 }}>
              {milestones.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 20,
                    alignItems: 'flex-start',
                    background: '#f9f9f7',
                    borderRadius: 12,
                    padding: '24px',
                    border: '1px solid #e5e5e5',
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#0ea5e9',
                      flexShrink: 0,
                      background: '#e0f2fe',
                      padding: '4px 12px',
                      borderRadius: 20,
                      whiteSpace: 'nowrap',
                      marginTop: 2,
                    }}
                  >
                    {item.year}
                  </span>
                  <div>
                    <h3 style={{ fontWeight: 700, marginBottom: 4, color: '#0a0a0a' }}>{item.title}</h3>
                    <p style={{ color: '#6b6b6b', fontSize: 15 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients */}
        <section style={{ padding: '80px 0', background: '#0a0a0a' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <p className="section-label" style={{ color: '#aaaaaa' }}>
              לקוחות שסומכים
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.6rem,3.5vw,2.2rem)',
                fontWeight: 800,
                color: '#fff',
                marginBottom: 32,
              }}
            >
              מה אומרים עליי
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
              {clients.map((client, i) => (
                <div
                  key={i}
                  style={{
                    background: '#1a1a1a',
                    borderRadius: 12,
                    padding: '28px',
                    border: '1px solid #333',
                  }}
                >
                  <p
                    style={{
                      color: '#e5e5e5',
                      fontSize: 15,
                      lineHeight: 1.7,
                      marginBottom: 16,
                      fontStyle: 'italic',
                    }}
                  >
                    &ldquo;{client.quote}&rdquo;
                  </p>
                  <p style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{client.name}</p>
                  <p style={{ color: '#888', fontSize: 13 }}>{client.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '60px 0', background: '#f9f9f7', textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, marginBottom: 12 }}>
              רוצה לדעת אם אני יכול לעזור לעסק שלך?
            </h2>
            <p style={{ color: '#6b6b6b', marginBottom: 24 }}>
              שיחת ייעוץ חינם. 15 דקות שיבהירו בדיוק מה אפשר לאוטמט בעסק שלך ומה זה שווה.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 32px',
                background: '#25D366',
                color: '#fff',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 17,
                textDecoration: 'none',
              }}
            >
              שיחת ייעוץ חינם
            </a>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
