import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import JsonLd from '@/components/JsonLd'
import FaqAccordion from '@/components/FaqAccordion'
import { faqSchema, breadcrumbSchema, serviceSchema, WA_LINK } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'גנרציית לידים לעסקים — 100 לידים ב-6 דקות | Smart Scale',
  description:
    'Reacherful — מערכת גנרציית לידים שמוצאת 100+ לקוחות פוטנציאליים מאומתים תוך 6 דקות. מותאמת לנישה שלך. בלי רשימות מיושנות, בלי הגרלות.',
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
  { q: 'מה זה "ליד מאומת"?', a: 'ליד שעבר אימות: מייל פעיל, טלפון תקין, ואיש הקשר באמת עובד בחברה. לא רשימה שנקנתה מלפני שנתיים — פרטים שנאספו ונאומתו בזמן אמת.' },
  { q: 'לאיזה עסקים מתאים?', a: 'לסוכנויות שיווק ופרסום, חברות B2B, נדל"ן מסחרי, ספקי שירות לעסקים, וכל עסק שמוכר לחברות אחרות. לא מתאים לעסקי B2C עם לקוחות פרטיים בלבד.' },
  { q: 'כמה זמן לוקח?', a: 'ריצה ראשונה — 6 דקות עד 100 לידים. הגדרת המערכת + אוטומציית מעקב — שבוע עד שבועיים. לאחר מכן — מייצרים לידים חדשים בלחיצת כפתור.' },
  { q: 'האם הלידים רלוונטיים לנישה שלי?', a: 'כן — המערכת מחפשת לפי קריטריונים שמוגדרים מראש: תחום, גודל חברה, מיקום, תפקיד איש הקשר. מקבלים רק לידים שתואמים את קהל היעד שלך.' },
]

const PROBLEMS = [
  { icon: '🗑️', text: 'רשימות קנויות עם 40-60% מיילים שחוזרים' },
  { icon: '⏰', text: 'חיפוש ידני שלוקח 3-4 שעות ל-20 לידים' },
  { icon: '🎯', text: 'לידים לא ממוקדים לנישה — אחוז סגירה נמוך' },
  { icon: '📉', text: 'אין אפשרות לדרג — קצב הלידים תמיד מוגבל' },
]

const STEPS = [
  { num: '01', title: 'הגדרת קהל יעד', desc: 'מגדירים ביחד: תחום, גודל חברה, מיקום, תפקיד איש הקשר. המערכת יודעת בדיוק מי אתה מחפש.' },
  { num: '02', title: 'איסוף אוטומטי', desc: 'המערכת סורקת מקורות פומביים ואוספת פרטים של עסקים תואמים — שם, אתר, מייל, טלפון.' },
  { num: '03', title: 'אימות בזמן אמת', desc: 'כל מייל וטלפון עוברים אימות. מסנן פרטים לא תקינים ואנשי קשר שלא עובדים יותר בחברה.' },
  { num: '04', title: 'רשימה מוכנה + מעקב', desc: '100+ לידים מוכנים לייצוא לתוך 6 דקות. אפשר לחבר לאוטומציית פנייה ישירה — כל ליד מקבל מסר מותאם.' },
]

export default function LeadGenPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: 'גנרציית לידים לעסקים — Reacherful', description: 'מערכת גנרציית לידים שמוצאת 100+ לידים מאומתים לעסקים ישראליים תוך 6 דקות. מותאמת לנישה, תחום וגודל החברה.', url: '/lead-gen' })} />
      <JsonLd data={faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={breadcrumbSchema([{ name: 'דף הבית', url: '/' }, { name: 'גנרציית לידים', url: '/lead-gen' }])} />
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="page-eyebrow mono">שירות</div>
            <h1 className="page-hero-title">
              100 לידים מוכנים ב-6 דקות —<br />גנרציית לידים לעסקים
            </h1>
            <p className="page-hero-lead">
              Reacherful היא מערכת שמוצאת לך לקוחות פוטנציאליים — <strong>מאומתים, רלוונטיים לנישה שלך</strong> — תוך 6 דקות.
              לא רשימות ישנות, לא הגרלות. 100+ פרטים של אנשים שיכולים לקנות ממך, מוכנים לפנייה.
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
                  <li>100+ לידים מאומתים — מייל פעיל, טלפון תקין, איש קשר רלוונטי</li>
                  <li>מותאם לנישה שלך: תחום, גודל חברה, תפקיד, מיקום</li>
                  <li>ריצה ראשונה — 6 דקות. כל ריצה נוספת — בלחיצת כפתור</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="container">
            <h2 className="page-section-title">הבעיה עם לידים קנויים וחיפוש ידני</h2>
            <p className="page-section-lead">
              רשימות לידים שנקנות מספקים חיצוניים כוללות בממוצע <strong>40-60% מיילים לא פעילים</strong> ואנשי קשר שעזבו את החברה.
              חיפוש ידני לוקח שעות ומייצר 10-15 לידים ביום בעבודת כפיים. אף אחת מהשיטות לא מדרגית.
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
            <h2 className="page-section-title">איך Reacherful עובד</h2>
            <p className="page-section-lead">
              Reacherful מאתרת לקוחות פוטנציאליים לפי קריטריונים שמוגדרים מראש, מאמתת את הפרטים בזמן אמת,
              ומייצרת רשימה מוכנה לפנייה — <strong>כל זה תוך 6 דקות לכל 100 לידים</strong>.
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
            <h2 className="case-study-title">100 לידים מאומתים — 6 דקות, לא 6 שעות</h2>
            <p className="case-study-body">
              סוכנות שיווק ביקשה לידים של מנהלי שיווק בחברות עם 10-50 עובדים באזור המרכז.
              Reacherful ייצרה 100 לידים מאומתים — שם, מייל, טלפון, קישור לחברה — תוך 6 דקות.
              עלות כוח אדם שנחסכה: 4 שעות עבודה שבועיות של עובד שכיר.
              אחוז תגובה לפנייה הראשונה: 18% — פי 3 מרשימות שנקנו.
            </p>
          </div>
        </section>

        <section className="page-faq">
          <div className="container">
            <h2 className="page-section-title">שאלות נפוצות</h2>
            <p className="page-section-lead">
              Reacherful מייצר 100+ לידים מאומתים תוך 6 דקות, מותאם לנישה ולקהל היעד שלך.
              מתאים לסוכנויות ועסקי B2B.
            </p>
            <FaqAccordion items={faqs} />
          </div>
        </section>

        <section className="page-cta">
          <div className="container">
            <h2 className="page-cta-title">מוכן לקבל 100 לידים ב-6 דקות?</h2>
            <p className="page-cta-sub">שיחת ייעוץ חינם. 15 דקות שיבהירו אם Reacherful מתאים לנישה שלך.</p>
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
