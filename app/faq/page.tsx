import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import JsonLd from '@/components/JsonLd'
import { faqSchema, breadcrumbSchema, WA_LINK } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'שאלות ותשובות — Smart Scale | מערכות אוטומציה לעסקים',
  description:
    'כל השאלות על מערכות Smart Scale — CRM, בוט WhatsApp, אוטומציה, גנרציית לידים, תמחור ותמיכה. תשובות ברורות לבעלי עסקים ישראליים.',
  alternates: {
    canonical: 'https://ilyamaltsev.com/faq',
    languages: { he: 'https://ilyamaltsev.com/faq' },
  },
  openGraph: {
    title: 'שאלות ותשובות — Smart Scale',
    description: 'כל השאלות על מערכות אוטומציה לעסקים ישראליים.',
    url: 'https://ilyamaltsev.com/faq',
    locale: 'he_IL',
    type: 'website',
  },
}

const allFaqs = [
  {
    category: 'כללי',
    items: [
      {
        question: 'מה זה Smart Scale?',
        answer:
          'Smart Scale בונה מערכות אוטומטיות לעסקים ישראליים קטנים ובינוניים. המערכות מחליפות עבודה ידנית חוזרת — כל ליד מקבל מענה תוך 2 דקות, תזכורות יוצאות לבד, ומסמכים מסתדרים אוטומטית. 7+ שנות ניסיון.',
      },
      {
        question: 'לאיזה עסקים מתאים?',
        answer:
          'לסוכנויות שיווק ופרסום, קליניקות, נדל"ן, e-commerce, עורכי דין, רואי חשבון, סוכני ביטוח, ועסקי שירות בכלל. בקיצור — כל עסק שמתנהל חלקית דרך WhatsApp ומבזבז שעות על עבודה ידנית חוזרת.',
      },
      {
        question: 'האם אני צריך לדעת טכנולוגיה?',
        answer:
          'לא. המערכות עובדות עם הכלים שכבר יש לך — WhatsApp, Gmail, Google Drive. לא צריך ללמוד שום תוכנה חדשה. איליה מלווה עד שהכל עובד.',
      },
      {
        question: 'מה קורה אחרי ההקמה?',
        answer:
          'כל פרויקט כולל 45 ימי תמיכה ותיקונים ללא עלות נוספת. אם יש בעיה — שולחים הודעה ב-WhatsApp ומקבלים מענה תוך שעות.',
      },
    ],
  },
  {
    category: 'מערכת ניהול לקוחות (CRM)',
    items: [
      {
        question: 'כמה עולה מערכת ניהול לקוחות?',
        answer:
          'מ-2,500 ש"ח למערכת בסיסית. מערכת מלאה עם אוטומציות — 4,000-6,000 ש"ח. ללא תשלום חודשי. מחיר סופי נקבע בשיחת ייעוץ.',
      },
      {
        question: 'כמה זמן לוקח להקים CRM?',
        answer: 'שבוע עד שלושה שבועות, תלוי במורכבות. לאחר מכן — עובדת לבד.',
      },
      {
        question: 'מה עם הנתונים הקיימים שלי?',
        answer:
          'מייבאים את כל הנתונים מ-Excel, WhatsApp, ומגוגל שיטס. לא מתחילים מאפס.',
      },
      {
        question: 'ממה המערכת מרכזת לידים?',
        answer:
          'WhatsApp, אתר, פייסבוק, אינסטגרם, טלפון — הכל נכנס למקום אחד אוטומטית. כל ליד רואים את כל היסטוריית הקשר בלחיצה.',
      },
    ],
  },
  {
    category: 'בוט WhatsApp',
    items: [
      {
        question: 'כמה עולה בוט WhatsApp?',
        answer:
          'בוט בסיסי — 2,500-3,500 ש"ח. מערכת מלאה עם CRM ותזכורות — 4,000-5,500 ש"ח. עלות תפעול חודשית: 50-200 ש"ח בלבד.',
      },
      {
        question: 'האם הלקוחות מרגישים שמדברים עם בוט?',
        answer:
          'בוט שכתוב נכון עם שפה טבעית — רוב הלקוחות לא מרגישים. כשהשיחה מורכבת מדי, הבוט מעביר לאדם אמיתי עם כל הפרטים.',
      },
      {
        question: 'מה הבוט יכול לעשות?',
        answer:
          'לענות לשאלות נפוצות, לתאם תורים, לשלוח תזכורות, למיין לידים ולהעביר לידים רציניים אליך עם כל הפרטים. מטפל ב-80% מהפניות לבד.',
      },
      {
        question: 'צריך WhatsApp Business?',
        answer:
          'כן — WhatsApp Business API. איליה מסדיר את כל ההתחברות. לא צריך לעשות כלום לבד.',
      },
    ],
  },
  {
    category: 'אוטומציה',
    items: [
      {
        question: 'מה ניתן לאוטמט?',
        answer:
          'לידים, תזכורות לתורים, ניהול מסמכים, דוחות שבועיים, תשובות לשאלות נפוצות, פולואפ לאחר פגישה, עדכוני סטטוס ללקוחות. אם זה חוזר על עצמו — אפשר לאוטמט.',
      },
      {
        question: 'כמה שעות אוטומציה חוסכת?',
        answer:
          'עסקים שבניתי להם מערכות חוסכים בממוצע 15 שעות עבודה ידנית בשבוע. חלקם חוסכים יותר.',
      },
      {
        question: 'האם האוטומציה עובדת עם הכלים שכבר יש לי?',
        answer:
          'כן. Google Sheets, Gmail, WhatsApp, Google Drive, Airtable, Notion — אנחנו מתחברים למה שכבר עובד, לא מחליפים הכל.',
      },
    ],
  },
  {
    category: 'גנרציית לידים',
    items: [
      {
        question: 'מה זה Reacherful?',
        answer:
          'Reacherful היא מערכת שמוצאת לקוחות פוטנציאליים — 100+ לידים מאומתים לפי נישה, תחום, גודל חברה — תוך 6 דקות. לא רשימות ישנות, פרטים שנאומתו בזמן אמת.',
      },
      {
        question: 'לאיזה עסקים מתאים Reacherful?',
        answer:
          'לסוכנויות שיווק, חברות B2B, נדל"ן מסחרי, ספקי שירות לעסקים. לא מתאים לעסקי B2C עם לקוחות פרטיים בלבד.',
      },
    ],
  },
  {
    category: 'תמחור ותשלום',
    items: [
      {
        question: 'מה המחיר המינימלי?',
        answer: 'מינימום 2,500 ש"ח לכל פרויקט. אין פרויקטים זולים יותר.',
      },
      {
        question: 'איך משלמים?',
        answer:
          'ברירת מחדל — 100% מראש. בפרויקטים גדולים — 50% בהתחלה ו-50% בסיום. מדברים על זה בשיחת הייעוץ.',
      },
      {
        question: 'יש תשלום חודשי?',
        answer:
          'לא לשירות עצמו. ייתכן עלות תפעול חודשית קטנה לכלים חיצוניים (50-200 ש"ח לחודש), תלוי בשירות.',
      },
    ],
  },
  {
    category: 'תמיכה',
    items: [
      {
        question: 'מה כולל ה-45 ימי תמיכה?',
        answer:
          'כל תיקון, שינוי, ואופטימיזציה שנדרשת כדי שהמערכת תעבוד כמו שהובטח — ללא עלות נוספת. מענה תוך שעות.',
      },
      {
        question: 'מה קורה אחרי 45 הימים?',
        answer:
          'אפשר להמשיך עם תמיכה שוטפת בתשלום חודשי, או לפנות כשצריך עדכון — במחיר לפי שעה.',
      },
    ],
  },
]

const flatFaqs = allFaqs.flatMap((cat) => cat.items)

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema(flatFaqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'דף הבית', url: '/' },
          { name: 'שאלות ותשובות', url: '/faq' },
        ])}
      />
      <Header />
      <main style={{ paddingTop: 100 }}>

        {/* Hero */}
        <section style={{ padding: '60px 0 40px', background: '#fff' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
            <p className="section-label">עזרה</p>
            <h1
              style={{
                fontSize: 'clamp(2rem,5vw,3rem)',
                fontWeight: 900,
                color: '#0a0a0a',
                marginBottom: 16,
                lineHeight: 1.15,
              }}
            >
              שאלות שכל בעל עסק שואל
            </h1>
            <p className="direct-answer" style={{ fontSize: 18, maxWidth: 620 }}>
              כאן מרוכזות כל השאלות על מערכות Smart Scale — תמחור, זמני הקמה, התאמה לעסק, ותמיכה.
              לא מצאת תשובה? שלח הודעה ב-WhatsApp ותקבל מענה תוך שעות.
            </p>
          </div>
        </section>

        {/* FAQ Categories */}
        {allFaqs.map((cat) => (
          <section
            key={cat.category}
            style={{
              padding: '40px 0',
              background: allFaqs.indexOf(cat) % 2 === 0 ? '#fff' : '#f9f9f7',
              borderTop: '1px solid #e5e5e5',
            }}
          >
            <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.3rem,2.5vw,1.7rem)',
                  fontWeight: 800,
                  color: '#0a0a0a',
                  marginBottom: 20,
                }}
              >
                {cat.category}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {cat.items.map((faq, i) => (
                  <details
                    key={i}
                    style={{
                      border: '1px solid #e5e5e5',
                      borderRadius: 12,
                      overflow: 'hidden',
                      background: '#fff',
                    }}
                  >
                    <summary
                      style={{
                        padding: '16px 20px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        listStyle: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 15,
                      }}
                    >
                      {faq.question} <span style={{ color: '#0ea5e9', flexShrink: 0 }}>+</span>
                    </summary>
                    <div style={{ padding: '0 20px 16px', color: '#3a3a3a', lineHeight: 1.7, fontSize: 15 }}>
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section style={{ padding: '60px 0', background: '#0a0a0a', textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
              עדיין יש שאלה?
            </h2>
            <p style={{ color: '#aaaaaa', marginBottom: 24 }}>
              שלח הודעה ב-WhatsApp — מענה תוך שעות, ללא עלות.
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
              שאל ב-WhatsApp
            </a>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
