import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import JsonLd from '@/components/JsonLd'
import Accordion from '@/components/Accordion'
import { faqSchema, breadcrumbSchema, WA_LINK } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'אוטומציה לעסקים — 15 שעות בשבוע שחוזרות אליך',
  description:
    'אוטומציה עסקית לעסקים ישראליים. לידים, תזכורות, מסמכים, דוחות — הכל קורה לבד. מ-2,500 ש"ח. שיחת ייעוץ חינם.',
  alternates: {
    canonical: 'https://ilyamaltsev.com/automation',
    languages: { he: 'https://ilyamaltsev.com/automation' },
  },
  openGraph: {
    title: 'אוטומציה לעסקים | Smart Scale',
    description: '15 שעות בשבוע שחוזרות אליך. המחשב עושה את העבודה.',
    url: 'https://ilyamaltsev.com/automation',
    locale: 'he_IL',
    type: 'website',
  },
}

const faqs = [
  { question: 'מאיפה מתחילים?', answer: 'מהתהליך שמבזבז לך הכי הרבה זמן. לרוב — מענה ללידים או תזכורות. בשיחת ייעוץ מזהים ביחד מה הכי כדאי לאוטמט קודם.' },
  { question: 'האם זה עובד עם הכלים שכבר יש לי?', answer: 'כן. כל האוטומציות עובדות עם WhatsApp, Gmail, גוגל שיטס, ו-Drive. לא צריך לשנות כלים.' },
  { question: 'כמה עולה?', answer: 'אוטומציה בודדת — 2,500-3,500 ש"ח. מספר אוטומציות יחד — 4,000-7,000 ש"ח. ללא תשלום חודשי קבוע.' },
  { question: 'כמה זמן לוקח?', answer: 'שבוע עד שלושה שבועות, תלוי במורכבות. לאחר ההקמה — עובדת לבד ללא תחזוקה שוטפת.' },
  { question: 'מה קורה אם משהו מפסיק לעבוד?', answer: '45 ימי תמיכה כלולים בכל פרויקט. לאחר מכן — תמיכה שנתית זמינה.' },
]

export default function AutomationPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: 'דף הבית', url: '/' }, { name: 'אוטומציה לעסקים', url: '/automation' }])} />
      <Header />
      <main style={{ paddingTop: 100 }}>

        {/* Hero */}
        <section style={{ padding: '60px 0 80px', background: '#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <p className="section-label">שירות</p>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, color: '#0a0a0a', marginBottom: 16, lineHeight: 1.15 }}>
              15 שעות בשבוע<br />שחוזרות אליך
            </h1>
            <p className="direct-answer" style={{ fontSize: 18, maxWidth: 620, marginBottom: 32 }}>
              רוב בעלי העסקים מבזבזים 3-4 שעות ביום על עבודה שמחשב יכול לעשות ב-3 שניות.
              אוטומציה עסקית שמה את הדברים החוזרים על טייס אוטומטי — לידים, תזכורות, מסמכים, דוחות — ומחזירה לך זמן.
            </p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', background: '#25D366', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 17, textDecoration: 'none' }}>
              שיחת ייעוץ חינם ב-WhatsApp
            </a>
          </div>
        </section>

        {/* TL;DR */}
        <section style={{ background: '#f9f9f7', padding: '40px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <div className="tldr" role="note">
              <strong>בקצרה:</strong>
              <ul>
                <li>עסקים שבונים 5 אוטומציות בסיסיות חוסכים 12-18 שעות שבועיות</li>
                <li>עובד עם WhatsApp, Gmail, גוגל שיטס — ללא שינוי כלים</li>
                <li>מחיר: מ-2,500 ש"ח. תוצאות — תוך שבוע ראשון.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* The 5 automations */}
        <section style={{ padding: '80px 0', background: '#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 800, marginBottom: 12 }}>5 האוטומציות שכל עסק צריך</h2>
            <p className="direct-answer">
              אוטומציה עסקית לא אומרת לבנות רובוט — אומרת להגדיר כללים: "כשקורה X, תעשה Y". כל אחת מהאוטומציות האלה לוקחת שבוע להקים ועובדת לבד אחרי כן.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 32 }}>
              {[
                { num: '1', title: 'מענה אוטומטי ללידים', time: 'חוסך 1-2 שעות/יום', desc: 'ליד נכנס → מענה תוך 2 דקות → שאלות מיון → כרטיס לקוח נפתח' },
                { num: '2', title: 'תזכורות לתורים', time: 'חוסך 45 דקות/יום', desc: '24 שעות לפני כל תור → תזכורת → אישור → no-shows יורדים 40-60%' },
                { num: '3', title: 'פולואפ אחרי שירות', time: 'חוסך שעה/שבוע', desc: '3 ימים אחרי → "הכל בסדר?" → בקשת ביקורת → לקוח חוזר' },
                { num: '4', title: 'ניהול מסמכים', time: 'חוסך 2-3 שעות/יום', desc: 'מסמך ב-WhatsApp → קריאה אוטומטית → שמירה בDrive → עדכון גיליון' },
                { num: '5', title: 'דוחות שבועיים', time: 'חוסך 3-5 שעות/שבוע', desc: 'כל שני בבוקר → דוח מוכן → נשלח ללקוחות → לא נגעת בו' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', border: '1px solid #e5e5e5', borderRadius: 12, padding: '20px 24px', background: '#fff' }}>
                  <span style={{ fontSize: 24, fontWeight: 900, color: '#0ea5e9', flexShrink: 0, minWidth: 28 }}>{item.num}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 4 }}>
                      <h3 style={{ fontWeight: 700, color: '#0a0a0a', margin: 0 }}>{item.title}</h3>
                      <span style={{ fontSize: 13, color: '#22c55e', fontWeight: 600, background: '#f0fdf4', padding: '2px 10px', borderRadius: 20 }}>{item.time}</span>
                    </div>
                    <p style={{ color: '#6b6b6b', fontSize: 14, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '80px 0', background: '#f9f9f7' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 800, marginBottom: 8 }}>שאלות נפוצות</h2>
            <p className="direct-answer">האוטומציה שאני בונה עובדת עם הכלים שכבר יש לך, מתחילה מ-2,500 ש"ח, ועובדת לבד תוך שבוע מההקמה.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
              {faqs.map((faq, i) => (
                <details key={i} style={{ border: '1px solid #e5e5e5', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
                  <summary style={{ padding: '16px 20px', fontWeight: 600, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                    {faq.question} <span style={{ color: '#0ea5e9' }}>+</span>
                  </summary>
                  <div style={{ padding: '0 20px 16px', color: '#3a3a3a', lineHeight: 1.7 }}>{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '60px 0', background: '#0a0a0a', textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>מוכן שהמחשב יעשה את העבודה?</h2>
            <p style={{ color: '#aaaaaa', marginBottom: 28 }}>שיחת ייעוץ חינם. מזהים ביחד מה הכי כדאי לאוטמט קודם.</p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: '#25D366', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 17, textDecoration: 'none', marginBottom: 20 }}>
              שיחת ייעוץ חינם
            </a>
            <br />
            <Link href="/blog/5-thalichim-leautmet" style={{ fontSize: 14, color: '#0ea5e9' }}>קרא עוד: 5 תהליכים לאוטמט עכשיו ←</Link>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
