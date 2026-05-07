import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import JsonLd from '@/components/JsonLd'
import { faqSchema, breadcrumbSchema, serviceSchema, WA_LINK } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'גנרציית לידים לעסקים — 100 לידים ב-6 דקות | Smart Scale',
  description:
    'Reacherful — מערכת גנרציית לידים שמוצאת 100+ לקוחות פוטנציאליים מאומתים תוך 6 דקות. מותאמת לנישה שלך. בלי רשימות מיושנות, בלי הגרלות. מ-2,500 ש"ח.',
  alternates: {
    canonical: 'https://ilyamaltsev.com/lead-gen',
    languages: { he: 'https://ilyamaltsev.com/lead-gen' },
  },
  openGraph: {
    title: 'גנרציית לידים לעסקים — 100 לידים ב-6 דקות | Smart Scale',
    description: '100+ לידים מאומתים לעסק שלך תוך 6 דקות. Reacherful — מערכת לידים ישראלית.',
    url: 'https://ilyamaltsev.com/lead-gen',
    locale: 'he_IL',
    type: 'website',
    images: [
      {
        url: 'https://ilyamaltsev.com/og/homepage.webp',
        width: 1200,
        height: 630,
        alt: 'גנרציית לידים לעסקים — Reacherful, Smart Scale',
      },
    ],
  },
}

const faqs = [
  {
    question: 'כמה עולה מערכת גנרציית לידים?',
    answer:
      'מ-2,500 ש"ח להגדרה ראשונה. מחיר סופי תלוי בנישה, בכמות הלידים הנדרשת ובאוטומציית המעקב. נקבע בשיחת ייעוץ.',
  },
  {
    question: 'מה זה "ליד מאומת"?',
    answer:
      'ליד שעבר אימות: מייל פעיל, טלפון תקין, ואיש הקשר באמת עובד בחברה. לא רשימה שנקנתה מלפני שנתיים — פרטים שנאספו ונאומתו בזמן אמת.',
  },
  {
    question: 'לאיזה עסקים מתאים?',
    answer:
      'לסוכנויות שיווק ופרסום, חברות B2B, נדל"ן מסחרי, ספקי שירות לעסקים, וכל עסק שמוכר לחברות אחרות. לא מתאים לעסקי B2C עם לקוחות פרטיים בלבד.',
  },
  {
    question: 'כמה זמן לוקח?',
    answer:
      'ריצה ראשונה — 6 דקות עד 100 לידים. הגדרת המערכת + אוטומציית מעקב — שבוע עד שבועיים. לאחר מכן — מייצרים לידים חדשים בלחיצת כפתור.',
  },
  {
    question: 'האם הלידים רלוונטיים לנישה שלי?',
    answer:
      'כן — המערכת מחפשת לפי קריטריונים שמוגדרים מראש: תחום, גודל חברה, מיקום, תפקיד איש הקשר. מקבלים רק לידים שתואמים את קהל היעד שלך.',
  },
]

export default function LeadGenPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: 'גנרציית לידים לעסקים — Reacherful',
          description:
            'מערכת גנרציית לידים שמוצאת 100+ לידים מאומתים לעסקים ישראליים תוך 6 דקות. מותאמת לנישה, תחום וגודל החברה.',
          url: '/lead-gen',
          price: '2500',
        })}
      />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'דף הבית', url: '/' },
          { name: 'גנרציית לידים', url: '/lead-gen' },
        ])}
      />
      <Header />
      <main style={{ paddingTop: 100 }}>

        {/* Hero */}
        <section style={{ padding: '60px 0 80px', background: '#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <p className="section-label">שירות</p>
            <h1
              style={{
                fontSize: 'clamp(2rem,5vw,3rem)',
                fontWeight: 900,
                color: '#0a0a0a',
                marginBottom: 16,
                lineHeight: 1.15,
              }}
            >
              100 לידים מוכנים ב-6 דקות —<br />גנרציית לידים לעסקים
            </h1>
            <p className="direct-answer" style={{ fontSize: 18, maxWidth: 620, marginBottom: 32 }}>
              Reacherful היא מערכת שמוצאת לך לקוחות פוטנציאליים — מאומתים, רלוונטיים לנישה שלך — תוך 6 דקות.
              לא רשימות ישנות, לא הגרלות. 100+ פרטים של אנשים שיכולים לקנות ממך, מוכנים לפנייה.
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
                <li>100+ לידים מאומתים — מייל פעיל, טלפון תקין, איש קשר רלוונטי</li>
                <li>מותאם לנישה שלך: תחום, גודל חברה, תפקיד, מיקום</li>
                <li>ריצה ראשונה — 6 דקות. כל ריצה נוספת — בלחיצת כפתור</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section style={{ padding: '80px 0', background: '#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 800, marginBottom: 12 }}>
              הבעיה עם לידים קנויים וחיפוש ידני
            </h2>
            <p className="direct-answer">
              רשימות לידים שנקנות מספקים חיצוניים כוללות בממוצע 40-60% מיילים לא פעילים ואנשי קשר שעזבו את החברה.
              חיפוש ידני לוקח שעות ומייצר 10-15 לידים ביום בעבודת כפיים. אף אחת מהשיטות לא מדרגית.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
                gap: 16,
                marginTop: 32,
              }}
            >
              {[
                { icon: '🗑️', text: 'רשימות קנויות עם 40-60% מיילים שחוזרים' },
                { icon: '⏰', text: 'חיפוש ידני שלוקח 3-4 שעות ל-20 לידים' },
                { icon: '🎯', text: 'לידים לא ממוקדים לנישה — אחוז סגירה נמוך' },
                { icon: '📉', text: 'אין אפשרות לדרג — קצב הלידים תמיד מוגבל' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: '#f9f9f7',
                    borderRadius: 12,
                    padding: '20px',
                    border: '1px solid #e5e5e5',
                  }}
                >
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
            <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 800, marginBottom: 12 }}>
              איך Reacherful עובד
            </h2>
            <p className="direct-answer">
              Reacherful מאתרת לקוחות פוטנציאליים לפי קריטריונים שמוגדרים מראש, מאמתת את הפרטים בזמן אמת,
              ומייצרת רשימה מוכנה לפנייה — כל זה תוך 6 דקות לכל 100 לידים.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 32 }}>
              {[
                {
                  num: '01',
                  title: 'הגדרת קהל יעד',
                  desc: 'מגדירים ביחד: תחום, גודל חברה, מיקום, תפקיד איש הקשר. המערכת יודעת בדיוק מי אתה מחפש.',
                },
                {
                  num: '02',
                  title: 'איסוף אוטומטי',
                  desc: 'המערכת סורקת מקורות פומביים ואוספת פרטים של עסקים תואמים — שם, אתר, מייל, טלפון.',
                },
                {
                  num: '03',
                  title: 'אימות בזמן אמת',
                  desc: 'כל מייל וטלפון עוברים אימות. מסנן פרטים לא תקינים ואנשי קשר שלא עובדים יותר בחברה.',
                },
                {
                  num: '04',
                  title: 'רשימה מוכנה + מעקב',
                  desc: '100+ לידים מוכנים לייצוא לתוך 6 דקות. אפשר לחבר לאוטומציית פנייה ישירה — כל ליד מקבל מסר מותאם.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 20,
                    alignItems: 'flex-start',
                    background: '#fff',
                    borderRadius: 12,
                    padding: '24px',
                    border: '1px solid #e5e5e5',
                  }}
                >
                  <span style={{ fontSize: 22, fontWeight: 900, color: '#0ea5e9', flexShrink: 0 }}>
                    {item.num}
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

        {/* Case study */}
        <section style={{ padding: '60px 0', background: '#0a0a0a' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <p className="section-label" style={{ color: '#aaaaaa' }}>
              דוגמה אמיתית
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.4rem,3vw,2rem)',
                fontWeight: 800,
                color: '#fff',
                marginBottom: 16,
              }}
            >
              100 לידים מאומתים — 6 דקות, לא 6 שעות
            </h2>
            <p style={{ color: '#e5e5e5', fontSize: 17, lineHeight: 1.8, maxWidth: 680 }}>
              סוכנות שיווק ביקשה לידים של מנהלי שיווק בחברות עם 10-50 עובדים באזור המרכז.
              Reacherful ייצרה 100 לידים מאומתים — שם, מייל, טלפון, קישור לחברה — תוך 6 דקות.
              עלות כוח אדם שנחסכה: 4 שעות עבודה שבועיות של עובד שכיר.
              אחוז תגובה לפנייה הראשונה: 18% — פי 3 מרשימות שנקנו.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '80px 0', background: '#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 800, marginBottom: 8 }}>
              שאלות נפוצות
            </h2>
            <p className="direct-answer">
              Reacherful מתחיל מ-2,500 ש"ח, מייצר 100+ לידים מאומתים תוך 6 דקות, ומותאם לנישה ולקהל היעד שלך.
              מתאים לסוכנויות ועסקי B2B.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  style={{ border: '1px solid #e5e5e5', borderRadius: 12, overflow: 'hidden' }}
                >
                  <summary
                    style={{
                      padding: '16px 20px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      listStyle: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    {faq.question} <span style={{ color: '#0ea5e9' }}>+</span>
                  </summary>
                  <div style={{ padding: '0 20px 16px', color: '#3a3a3a', lineHeight: 1.7 }}>
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '60px 0', background: '#f9f9f7', textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, marginBottom: 12 }}>
              מוכן לקבל 100 לידים ב-6 דקות?
            </h2>
            <p style={{ color: '#6b6b6b', marginBottom: 24 }}>
              שיחת ייעוץ חינם. 15 דקות שיבהירו אם Reacherful מתאים לנישה שלך.
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
                marginBottom: 16,
              }}
            >
              שיחת ייעוץ חינם
            </a>
            <br />
            <Link href="/blog/reacherful-100-lids" style={{ fontSize: 14, color: '#0ea5e9' }}>
              קרא עוד: איך Reacherful מייצרת 100 לידים ב-6 דקות ←
            </Link>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
