import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import JsonLd from '@/components/JsonLd'
import FaqAccordion from '@/components/FaqAccordion'
import { faqSchema, breadcrumbSchema, serviceSchema, WA_LINK } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'מערכת ניהול לקוחות לעסקים — לא תאבד לקוח אחד',
  description:
    'מערכת CRM מותאמת אישית לעסקים ישראליים. כל הלקוחות במקום אחד, תזכורות אוטומטיות, ופולואפ שקורה לבד. שיחת ייעוץ חינם.',
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
    images: [
      {
        url: 'https://ilyamaltsev.com/og/homepage.webp',
        width: 1200,
        height: 630,
        alt: 'מערכת ניהול לקוחות לעסקים — Smart Scale',
      },
    ],
  },
}

const faqs = [
  { q: 'כמה זמן לוקח להקים?', a: 'שבוע עד שלושה שבועות, תלוי במורכבות. לאחר מכן — עובדת לבד.' },
  { q: 'האם אני צריך לדעת טכנולוגיה?', a: 'לא. המערכת עובדת עם WhatsApp, Gmail, וגוגל שיטס שכבר יש לך. לא צריך ללמוד שום תוכנה חדשה.' },
  { q: 'מה עם הנתונים הקיימים שלי?', a: 'מייבאים את כל הנתונים מ-Excel, WhatsApp, ומגוגל שיטס. לא מתחילים מאפס.' },
  { q: 'ממה המערכת מרכזת לידים?', a: 'WhatsApp, אתר, פייסבוק, אינסטגרם, טלפון — הכל נכנס למקום אחד אוטומטית.' },
]

const PROBLEMS = [
  { icon: '📱', text: 'לידים שנכנסים ב-WhatsApp ולא מקבלים מענה מהיר' },
  { icon: '📋', text: 'פולואפים שנשכחים כי אין מי שיזכיר' },
  { icon: '🔍', text: 'חיפוש היסטוריה של לקוח ב-5 מקומות שונים' },
  { icon: '⏰', text: 'שעות על עדכונים ידניים שמחשב יכול לעשות' },
]

const STEPS = [
  { num: '01', title: 'ריכוז כל הלידים', desc: 'WhatsApp, אתר, פייסבוק — הכל נכנס למקום אחד אוטומטית' },
  { num: '02', title: 'מעקב שלבים', desc: 'כל ליד עובר שלבים: חדש → בשיחה → הצעה → סגירה. רואים הכל בלחיצה' },
  { num: '03', title: 'תזכורות אוטומטיות', desc: 'המערכת מזכירה מתי לפנות — לא אתה. לעולם לא שוכחים ליד' },
  { num: '04', title: 'היסטוריה מלאה', desc: 'כל שיחה, כל הצעה, כל החלטה — מתועדת ונגישה בשניות' },
]

export default function CRMPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: 'מערכת ניהול לקוחות לעסקים', description: 'מערכת CRM מותאמת אישית לעסקים ישראליים — ריכוז לידים, פולואפ אוטומטי, ותזכורות. עסקים חוסכים 15 שעות בשבוע.', url: '/crm' })} />
      <JsonLd data={faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={breadcrumbSchema([{ name: 'דף הבית', url: '/' }, { name: 'מערכת ניהול לקוחות', url: '/crm' }])} />
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="page-eyebrow mono">שירות</div>
            <h1 className="page-hero-title">
              לא תאבד לקוח אחד —<br />מערכת ניהול לקוחות לעסקים
            </h1>
            <p className="page-hero-lead">
              מערכת CRM מותאמת אישית שמרכזת את כל הלקוחות, עוקבת אחרי כל שלב, ושולחת תזכורות פולואפ לבד.
              עסקים שמשתמשים בה <strong>מפסיקים לאבד לידים</strong> ומצליחים לנהל 50% יותר לקוחות באותו זמן.
            </p>
            <div className="page-hero-ctas">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                <span>שיחת ייעוץ חינם ב-WhatsApp</span>
                <span className="btn-arrow" aria-hidden="true">←</span>
              </a>
            </div>

            <div className="page-tldr-wrap">
              <div className="page-tldr">
                <span className="page-tldr-eyebrow">בקצרה</span>
                <ul>
                  <li>כל ליד נכנס למערכת ומקבל מענה תוך 2 דקות — גם בלילה</li>
                  <li>עסק שבניתי לו CRM חוסך בממוצע 15 שעות עבודה ידנית בשבוע</li>
                  <li>מוכן תוך שבועיים. עובד עם הכלים שכבר יש לך.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="container">
            <h2 className="page-section-title">מה קורה בלי מערכת</h2>
            <p className="page-section-lead">
              עסק שמנהל לקוחות ב-Excel או בראש <strong>מאבד בממוצע 3-5 לידים בחודש</strong> לא כי המוצר גרוע — אלא כי
              לא עשה פולואפ בזמן. ליד שלא ענו לו תוך שעה — 60% ממנו פנה כבר למתחרה. פולואפ שנשכח — עסקה שהתקררה.
            </p>
            <div className="feature-grid">
              {PROBLEMS.map((p, i) => (
                <div key={i} className="feature-card">
                  <div className="feature-card-icon">{p.icon}</div>
                  <p className="feature-card-body">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section page-section--alt">
          <div className="container">
            <h2 className="page-section-title">מה המערכת עושה</h2>
            <p className="page-section-lead">
              מערכת ה-CRM שאני בונה מרכזת את כל הלידים ממקורות שונים — WhatsApp, אתר, פייסבוק — למקום אחד.
              כל ליד עובר שלבים מוגדרים עם תזכורות אוטומטיות. <strong>אף ליד לא נשכח, אף פולואפ לא מפוספס.</strong>
            </p>
            <div className="step-list">
              {STEPS.map((s, i) => (
                <div key={i} className="step-card">
                  <span className="step-num">{s.num}</span>
                  <div className="step-content">
                    <div className="step-head">
                      <h3 className="step-title">{s.title}</h3>
                    </div>
                    <p className="step-body">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="case-study">
          <div className="container">
            <span className="case-study-eyebrow mono">דוגמה אמיתית</span>
            <h2 className="case-study-title">אריק — 24 תהליכים אוטומטיים, עסק שעובד לבד</h2>
            <p className="case-study-body">
              אריק ניהל עסק עם תורים דרך WhatsApp וגיליון. לידים נשכחו, פולואפים לא קרו.
              אחרי שבניתי לו מערכת — 24 תהליכים רצים לבד. מהרגע שנכנס ליד חדש ועד פולואפ אחרי טיפול,
              הכל קורה אוטומטי. הוא חוסך 3 שעות ביום ומנהל פי 2 יותר לקוחות.
            </p>
          </div>
        </section>

        <section className="page-faq">
          <div className="container">
            <h2 className="page-section-title">שאלות נפוצות</h2>
            <p className="page-section-lead">
              המערכת נבנית תוך שבועיים, ועובדת עם הכלים שכבר יש לך — WhatsApp, Gmail, גוגל שיטס.
              ללא צורך ללמוד תוכנה חדשה.
            </p>
            <FaqAccordion items={faqs} />
          </div>
        </section>

        <section className="page-cta">
          <div className="container">
            <h2 className="page-cta-title">מוכן להפסיק לאבד לידים?</h2>
            <p className="page-cta-sub">שיחת ייעוץ חינם. 15 דקות שיבהירו מה מתאים לעסק שלך.</p>
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
