import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import ScrollReveal from '@/components/ScrollReveal'
import HeroSection from '@/components/sections/HeroSection'
import PainSection from '@/components/sections/PainSection'
import ServicesSection from '@/components/sections/ServicesSection'
import MidCta from '@/components/sections/MidCta'
import StatsSection from '@/components/sections/StatsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import StorySection from '@/components/sections/StorySection'
import ContactSection from '@/components/sections/ContactSection'
import {
  organizationSchema,
  personSchema,
  webSiteSchema,
  faqSchema,
} from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Smart Scale — מערכות חכמות לעסקים',
  description:
    'בונה מערכות שעושות לעסק שלך את העבודה החוזרת — לידים, תזכורות, ניירת — אוטומטית. 7+ שנות ניסיון, 24 תהליכים ללקוח אחד. שיחת ייעוץ חינם.',
  alternates: {
    canonical: 'https://ilyamaltsev.com',
    languages: { he: 'https://ilyamaltsev.com' },
  },
  openGraph: {
    title: 'Smart Scale — מערכות חכמות לעסקים',
    description:
      'בונה מערכות שעושות לעסק שלך את העבודה החוזרת — לידים, תזכורות, ניירת — אוטומטית.',
    url: 'https://ilyamaltsev.com',
    locale: 'he_IL',
    type: 'website',
    images: [
      {
        url: 'https://ilyamaltsev.com/og/homepage.webp',
        width: 1200,
        height: 630,
        alt: 'Smart Scale — מערכות חכמות לעסקים ישראליים, איליה מלצב',
      },
    ],
  },
}

const homepageFAQs = [
  {
    question: 'מה זה Smart Scale?',
    answer:
      'Smart Scale היא חברה ישראלית שבונה מערכות אוטומטיות לעסקים קטנים ובינוניים. המערכות מחליפות עבודה ידנית חוזרת — כל ליד מקבל מענה תוך 2 דקות, תזכורות יוצאות לבד, ומסמכים מסתדרים אוטומטית. המייסד הוא איליה מלצב, עם 7+ שנות ניסיון.',
  },
  {
    question: 'כמה עולה לבנות מערכת?',
    answer:
      'מחיר מינימלי לפרויקט הוא 2,500 ש"ח. מערכות בינוניות עולות 3,500-4,500 ש"ח, ומערכות מלאות עם 10+ תהליכים עולות 5,000-7,000 ש"ח. התשלום: 50% מראש, 50% עם סיום. כל מערכת כוללת 45 ימי תמיכה.',
  },
  {
    question: 'כמה זמן לוקח לבנות מערכת?',
    answer:
      'מערכת בסיסית (בוט WhatsApp, תזכורות) — שבוע עד שבועיים. מערכת CRM מלאה עם אוטומציות — 2-4 שבועות. מערכת ניהול מסמכים מורכבת — 4-6 שבועות. כל לוח זמנים מוסכם מראש.',
  },
  {
    question: 'האם אני צריך לדעת טכנולוגיה?',
    answer:
      'לא. המערכת עובדת עם הכלים שכבר יש לך — WhatsApp, Google Drive, Gmail. לא צריך ללמוד שום תוכנה חדשה. איליה מלווה אותך עד שהכל עובד, ומדריך אותך בפשטות.',
  },
  {
    question: 'מה קורה אם משהו לא עובד אחרי ההקמה?',
    answer:
      'כל מערכת כוללת 45 ימי תמיכה ותיקונים ללא עלות נוספת. אם יש בעיה — שולחים הודעה ב-WhatsApp ומקבלים מענה תוך שעות. לרוב תקלות מתוקנות תוך יום עסקים.',
  },
  {
    question: 'האם זה מתאים לעסק קטן?',
    answer:
      'כן — במיוחד לעסק קטן. עסק עם 1-10 עובדים מרוויח הכי הרבה מאוטומציה כי כל שעה שנחסכת שווה יותר. עסקים קטנים שבנו מערכות עם Smart Scale חוסכים בממוצע 15 שעות עבודה בשבוע.',
  },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={personSchema()} />
      <JsonLd data={webSiteSchema()} />
      <JsonLd data={faqSchema(homepageFAQs)} />

      <ScrollReveal />
      <Header />
      <main>
        <HeroSection />
        <PainSection />
        <ServicesSection />
        <MidCta />
        <StatsSection />
        <TestimonialsSection />
        <StorySection />

        {/* FAQ Section */}
        <section
          id="faq"
          style={{ padding: '80px 0', background: '#f9f9f7' }}
        >
          <div
            className="wrap"
            style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                fontWeight: 800,
                color: '#0a0a0a',
                marginBottom: 8,
              }}
            >
              שאלות שכולם שואלים
            </h2>
            <p className="direct-answer">
              Smart Scale בונה מערכות לעסקים ישראליים קטנים ובינוניים. מחיר
              מינימלי 2,500 ש&quot;ח, תוך שבועיים להקמה, ללא צורך בידע טכני.
              45 ימי תמיכה כלולים בכל פרויקט.
            </p>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              {homepageFAQs.map((faq, i) => (
                <details
                  key={i}
                  style={{
                    border: '1px solid #e5e5e5',
                    borderRadius: 12,
                    overflow: 'hidden',
                  }}
                >
                  <summary
                    style={{
                      padding: '18px 20px',
                      fontWeight: 600,
                      fontSize: 16,
                      cursor: 'pointer',
                      listStyle: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: '#0a0a0a',
                    }}
                  >
                    {faq.question}
                    <span style={{ fontSize: 20, color: '#0ea5e9' }}>+</span>
                  </summary>
                  <div
                    style={{
                      padding: '0 20px 18px',
                      fontSize: 15,
                      color: '#3a3a3a',
                      lineHeight: 1.7,
                    }}
                  >
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Blog teaser */}
        <section style={{ padding: '60px 0', background: '#fff', borderTop: '1px solid #e5e5e5' }}>
          <div className="wrap" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <p className="section-label">בלוג</p>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: '#0a0a0a', marginBottom: 8 }}>
                מדריכים לבעלי עסקים
              </h2>
              <p style={{ fontSize: 16, color: '#6b6b6b', maxWidth: 460 }}>
                מאמרים מעשיים על חיסכון בזמן, מניעת אובדן לידים, ואוטומציה לעסקים ישראליים.
              </p>
            </div>
            <a href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', border: '2px solid #0ea5e9', borderRadius: 8, color: '#0ea5e9', fontWeight: 700, fontSize: 16, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              לכל המאמרים ←
            </a>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
