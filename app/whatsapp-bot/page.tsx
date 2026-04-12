import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import JsonLd from '@/components/JsonLd'
import { faqSchema, breadcrumbSchema, WA_LINK } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'בוט WhatsApp לעסקים — תגובה תוך 2 דקות',
  description:
    'בוט WhatsApp שעונה ללידים 24/7, מתאם תורים, ושולח תזכורות אוטומטיות. לא מאבדים לידים בשעה 2 לילה. מ-2,500 ש"ח. שיחת ייעוץ חינם.',
  alternates: {
    canonical: 'https://ilyamaltsev.com/whatsapp-bot',
    languages: { he: 'https://ilyamaltsev.com/whatsapp-bot' },
  },
  openGraph: {
    title: 'בוט WhatsApp לעסקים | Smart Scale',
    description: 'תגובה תוך 2 דקות, 24/7 — גם כשאתה ישן.',
    url: 'https://ilyamaltsev.com/whatsapp-bot',
    locale: 'he_IL',
    type: 'website',
  },
}

const faqs = [
  { question: 'האם הלקוחות מרגישים שמדברים עם בוט?', answer: 'בוט שכתוב נכון עם שפה טבעית — רוב הלקוחות לא מרגישים. כשהשיחה מורכבת מדי, הבוט מעביר לאדם אמיתי עם כל הפרטים.' },
  { question: 'כמה עולה בוט WhatsApp?', answer: 'בוט בסיסי — 2,500-3,500 ש"ח. מערכת מלאה עם CRM ותזכורות — 4,000-5,500 ש"ח. עלות תפעול חודשית: 50-200 ש"ח בלבד.' },
  { question: 'צריך WhatsApp Business?', answer: 'כן — WhatsApp Business API. Smart Scale מסדירה את כל ההתחברות. לא צריך לעשות כלום לבד.' },
  { question: 'כמה זמן לוקח להקים?', answer: 'בוט בסיסי — שבוע. מערכת מלאה — שבועיים עד שלושה. כולל הדרכה ו-45 ימי תמיכה.' },
  { question: 'מה קורה אם הבוט לא יודע לענות?', answer: 'הבוט מזהה שאלות מחוץ לתחום שלו ומעביר לאדם אמיתי עם כל הפרטים — שם, שאלה, והיסטוריה.' },
]

export default function WhatsAppBotPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: 'דף הבית', url: '/' }, { name: 'בוט WhatsApp', url: '/whatsapp-bot' }])} />
      <Header />
      <main style={{ paddingTop: 100 }}>

        {/* Hero */}
        <section style={{ padding: '60px 0 80px', background: '#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <p className="section-label">שירות</p>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, color: '#0a0a0a', marginBottom: 16, lineHeight: 1.15 }}>
              תגובה תוך 2 דקות —<br />בוט WhatsApp לעסקים
            </h1>
            <p className="direct-answer" style={{ fontSize: 18, maxWidth: 620, marginBottom: 32 }}>
              ליד שלח הודעה בשעה 23:00 ולא קיבל מענה — 60% ממנו כבר אצל המתחרה בבוקר.
              בוט WhatsApp עונה תוך 2 דקות, שואל שאלות מיון, ומעביר לידים רציניים אליך — 24 שעות ביממה.
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
                <li>עונה ללידים תוך 2 דקות — כולל שבתות, חגים, ו-23:00 בלילה</li>
                <li>מסיר 80% מהעומס: תזכורות, שאלות נפוצות, תיאום תורים</li>
                <li>מחיר: מ-2,500 ש"ח. תפעול: 50-200 ש"ח לחודש.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section style={{ padding: '80px 0', background: '#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 800, marginBottom: 12 }}>מה הבוט עושה בשבילך</h2>
            <p className="direct-answer">
              בוט WhatsApp יכול לטפל ב-80% מהפניות הנכנסות לבד — תיאום תורים, תשובות לשאלות נפוצות, מיון לידים, ותזכורות. ה-20% שנשארים — שאלות מורכבות — מועברים אליך עם כל הפרטים.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 32 }}>
              {[
                { icon: '📅', title: 'תיאום תורים', desc: 'לקוח שואל על תור → הבוט מציע שעות פנויות → מאשר ומרשים' },
                { icon: '⏰', title: 'תזכורות אוטומטיות', desc: '24 שעות לפני — תזכורת + בקשת אישור. no-shows יורדים ב-40-60%' },
                { icon: '❓', title: 'שאלות נפוצות', desc: '"מה המחיר?", "איפה אתם?", "מה שעות פתיחה?" — תשובה אוטומטית' },
                { icon: '🎯', title: 'מיון לידים', desc: 'הבוט שואל שאלות, מפריד לידים רציניים ומעביר אליך רק את המתאימים' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#f9f9f7', borderRadius: 12, padding: '24px', border: '1px solid #e5e5e5' }}>
                  <span style={{ fontSize: 28 }}>{item.icon}</span>
                  <h3 style={{ fontWeight: 700, margin: '12px 0 8px' }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '80px 0', background: '#f9f9f7' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 800, marginBottom: 8 }}>שאלות נפוצות</h2>
            <p className="direct-answer">בוט WhatsApp לעסקים מתחיל מ-2,500 ש"ח להקמה, עם תפעול חודשי של 50-200 ש"ח בלבד. נבנה תוך שבוע, כולל 45 ימי תמיכה.</p>
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
        <section style={{ padding: '60px 0', background: '#fff', textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, marginBottom: 12 }}>מוכן להפסיק לאבד לידים בלילה?</h2>
            <p style={{ color: '#6b6b6b', marginBottom: 24 }}>שיחת ייעוץ חינם. 15 דקות שיבהירו מה מתאים לעסק שלך.</p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: '#25D366', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 17, textDecoration: 'none', marginBottom: 16 }}>
              שיחת ייעוץ חינם
            </a>
            <br />
            <Link href="/blog/bot-whatsapp-letaskim" style={{ fontSize: 14, color: '#0ea5e9' }}>קרא עוד: המדריך המלא לבוט WhatsApp לעסקים ←</Link>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
