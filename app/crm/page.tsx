import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import JsonLd from '@/components/JsonLd'
import Accordion from '@/components/Accordion'
import { faqSchema, breadcrumbSchema, WA_LINK } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'מערכת ניהול לקוחות לעסקים — לא תאבד לקוח אחד',
  description:
    'מערכת CRM מותאמת אישית לעסקים ישראליים. כל הלקוחות במקום אחד, תזכורות אוטומטיות, ופולואפ שקורה לבד. מ-2,500 ש"ח. שיחת ייעוץ חינם.',
  alternates: {
    canonical: 'https://ilyamaltsev.com/crm',
    languages: { he: 'https://ilyamaltsev.com/crm' },
  },
  openGraph: {
    title: 'מערכת ניהול לקוחות לעסקים | Smart Scale',
    description: 'לא תאבד לקוח אחד. CRM מותאם אישית לעסק שלך.',
    url: 'https://ilyamaltsev.com/crm',
    locale: 'he_IL',
    type: 'website',
  },
}

const faqs = [
  { question: 'כמה עולה מערכת ניהול לקוחות?', answer: 'מ-2,500 ש"ח למערכת בסיסית. מערכת מלאה עם אוטומציות — 4,000-6,000 ש"ח. ללא תשלום חודשי. מחיר סופי נקבע בשיחת ייעוץ.' },
  { question: 'כמה זמן לוקח להקים?', answer: 'שבוע עד שלושה שבועות, תלוי במורכבות. לאחר מכן — עובדת לבד.' },
  { question: 'האם אני צריך לדעת טכנולוגיה?', answer: 'לא. המערכת עובדת עם WhatsApp, Gmail, וגוגל שיטס שכבר יש לך. לא צריך ללמוד שום תוכנה חדשה.' },
  { question: 'מה עם הנתונים הקיימים שלי?', answer: 'מייבאים את כל הנתונים מ-Excel, WhatsApp, ומגוגל שיטס. לא מתחילים מאפס.' },
  { question: 'מה קורה אם משהו לא עובד?', answer: 'כל מערכת כוללת 45 ימי תמיכה ותיקונים. אם יש בעיה — שולח הודעה ב-WhatsApp ומקבל מענה תוך שעות.' },
]

export default function CRMPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: 'דף הבית', url: '/' }, { name: 'מערכת ניהול לקוחות', url: '/crm' }])} />
      <Header />
      <main style={{ paddingTop: 100 }}>

        {/* Hero */}
        <section style={{ padding: '60px 0 80px', background: '#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <p className="section-label">שירות</p>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, color: '#0a0a0a', marginBottom: 16, lineHeight: 1.15 }}>
              לא תאבד לקוח אחד —<br />מערכת ניהול לקוחות לעסקים
            </h1>
            <p className="direct-answer" style={{ fontSize: 18, maxWidth: 620, marginBottom: 32 }}>
              מערכת CRM מותאמת אישית שמרכזת את כל הלקוחות, עוקבת אחרי כל שלב, ושולחת תזכורות פולואפ לבד.
              עסקים שמשתמשים בה מפסיקים לאבד לידים ומצליחים לנהל 50% יותר לקוחות באותו זמן.
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
                <li>כל ליד נכנס למערכת ומקבל מענה תוך 2 דקות — גם בלילה</li>
                <li>עסק שבניתי לו CRM חוסך בממוצע 15 שעות עבודה ידנית בשבוע</li>
                <li>מחיר: מ-2,500 ש"ח. ללא תשלום חודשי. מוכן תוך שבועיים.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section style={{ padding: '80px 0', background: '#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 800, marginBottom: 12 }}>מה קורה בלי מערכת</h2>
            <p className="direct-answer">
              עסק שמנהל לקוחות ב-Excel או בראש מאבד בממוצע 3-5 לידים בחודש לא כי המוצר גרוע — אלא כי לא עשה פולואפ בזמן. ליד שלא ענו לו תוך שעה — 60% ממנו פנה כבר למתחרה. פולואפ שנשכח — עסקה שהתקררה.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginTop: 32 }}>
              {[
                { icon: '📱', text: 'לידים שנכנסים ב-WhatsApp ולא מקבלים מענה מהיר' },
                { icon: '📋', text: 'פולואפים שנשכחים כי אין מי שיזכיר' },
                { icon: '🔍', text: 'חיפוש היסטוריה של לקוח ב-5 מקומות שונים' },
                { icon: '⏰', text: 'שעות על עדכונים ידניים שמחשב יכול לעשות' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#f9f9f7', borderRadius: 12, padding: '20px', border: '1px solid #e5e5e5' }}>
                  <span style={{ fontSize: 24 }}>{item.icon}</span>
                  <p style={{ marginTop: 8, fontSize: 15, color: '#3a3a3a', lineHeight: 1.6 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section style={{ padding: '80px 0', background: '#f9f9f7' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 800, marginBottom: 12 }}>מה המערכת עושה</h2>
            <p className="direct-answer">
              מערכת ה-CRM שאני בונה מרכזת את כל הלידים ממקורות שונים — WhatsApp, אתר, פייסבוק — למקום אחד. כל ליד עובר שלבים מוגדרים עם תזכורות אוטומטיות. אף ליד לא נשכח, אף פולואפ לא מפוספס.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 32 }}>
              {[
                { num: '01', title: 'ריכוז כל הלידים', desc: 'WhatsApp, אתר, פייסבוק — הכל נכנס למקום אחד אוטומטית' },
                { num: '02', title: 'מעקב שלבים', desc: 'כל ליד עובר שלבים: חדש → בשיחה → הצעה → סגירה. רואים הכל בלחיצה' },
                { num: '03', title: 'תזכורות אוטומטיות', desc: 'המערכת מזכירה מתי לפנות — לא אתה. לעולם לא שוכחים ליד' },
                { num: '04', title: 'היסטוריה מלאה', desc: 'כל שיחה, כל הצעה, כל החלטה — מתועדת ונגישה בשניות' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', background: '#fff', borderRadius: 12, padding: '24px', border: '1px solid #e5e5e5' }}>
                  <span style={{ fontSize: 22, fontWeight: 900, color: '#0ea5e9', flexShrink: 0 }}>{item.num}</span>
                  <div>
                    <h3 style={{ fontWeight: 700, marginBottom: 4, color: '#0a0a0a' }}>{item.title}</h3>
                    <p style={{ color: '#6b6b6b', fontSize: 15 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case study */}
        <section style={{ padding: '60px 0', background: '#0a0a0a' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <p className="section-label" style={{ color: '#aaaaaa' }}>דוגמה אמיתית</p>
            <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
              אריק — 24 תהליכים אוטומטיים, עסק שעובד לבד
            </h2>
            <p style={{ color: '#e5e5e5', fontSize: 17, lineHeight: 1.8, maxWidth: 680 }}>
              אריק ניהל עסק עם תורים דרך WhatsApp וגיליון. לידים נשכחו, פולואפים לא קרו.
              אחרי שבניתי לו מערכת — 24 תהליכים רצים לבד. מהרגע שנכנס ליד חדש ועד פולואפ אחרי טיפול,
              הכל קורה אוטומטי. הוא חוסך 3 שעות ביום ומנהל פי 2 יותר לקוחות.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '80px 0', background: '#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 800, marginBottom: 8 }}>שאלות נפוצות</h2>
            <p className="direct-answer">מערכת CRM שאני בונה מתחילה מ-2,500 ש"ח, נבנית תוך שבועיים, ועובדת עם הכלים שכבר יש לך — WhatsApp, Gmail, גוגל שיטס. ללא תשלום חודשי.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
              {faqs.map((faq, i) => (
                <details key={i} style={{ border: '1px solid #e5e5e5', borderRadius: 12, overflow: 'hidden' }}>
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
        <section style={{ padding: '60px 0', background: '#f9f9f7', textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, marginBottom: 12 }}>מוכן להפסיק לאבד לידים?</h2>
            <p style={{ color: '#6b6b6b', marginBottom: 24 }}>שיחת ייעוץ חינם. 15 דקות שיבהירו מה מתאים לעסק שלך.</p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: '#25D366', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 17, textDecoration: 'none', marginBottom: 16 }}>
              שיחת ייעוץ חינם
            </a>
            <br />
            <Link href="/blog/crm-letaskim-ktanim" style={{ fontSize: 14, color: '#0ea5e9' }}>קרא עוד: מה זה CRM ולמה כל עסק קטן צריך אחד ←</Link>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
