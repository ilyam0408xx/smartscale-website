import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import JsonLd from '@/components/JsonLd'
import FaqAccordion from '@/components/FaqAccordion'
import { faqSchema, breadcrumbSchema, serviceSchema, WA_LINK } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'אוטומציה לעסקים — 15 שעות בשבוע שחוזרות אליך',
  description:
    'אוטומציה עסקית לעסקים ישראליים. לידים, תזכורות, מסמכים, דוחות — הכל קורה לבד. שיחת ייעוץ חינם.',
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
  { q: 'מאיפה מתחילים?', a: 'מהתהליך שמבזבז לך הכי הרבה זמן. לרוב — מענה ללידים או תזכורות. בשיחת ייעוץ מזהים ביחד מה הכי כדאי לאוטמט קודם.' },
  { q: 'האם זה עובד עם הכלים שכבר יש לי?', a: 'כן. כל האוטומציות עובדות עם WhatsApp, Gmail, גוגל שיטס, ו-Drive. לא צריך לשנות כלים.' },
  { q: 'כמה זמן לוקח?', a: 'שבוע עד שלושה שבועות, תלוי במורכבות. לאחר ההקמה — עובדת לבד ללא תחזוקה שוטפת.' },
  { q: 'מה אפשר לאוטמט?', a: 'כל תהליך שחוזר על עצמו: מענה ללידים, תזכורות לתורים, ניהול מסמכים, דוחות שבועיים, פולואפ אחרי שירות. אם זה חוזר — אפשר לאוטמט.' },
]

const AUTOMATIONS = [
  { num: '1', title: 'מענה אוטומטי ללידים', time: 'חוסך 1-2 שעות/יום', desc: 'ליד נכנס → מענה תוך 2 דקות → שאלות מיון → כרטיס לקוח נפתח' },
  { num: '2', title: 'תזכורות לתורים', time: 'חוסך 45 דקות/יום', desc: '24 שעות לפני כל תור → תזכורת → אישור → no-shows יורדים 40-60%' },
  { num: '3', title: 'פולואפ אחרי שירות', time: 'חוסך שעה/שבוע', desc: '3 ימים אחרי → "הכל בסדר?" → בקשת ביקורת → לקוח חוזר' },
  { num: '4', title: 'ניהול מסמכים', time: 'חוסך 2-3 שעות/יום', desc: 'מסמך ב-WhatsApp → קריאה אוטומטית → שמירה ב-Drive → עדכון גיליון' },
  { num: '5', title: 'דוחות שבועיים', time: 'חוסך 3-5 שעות/שבוע', desc: 'כל שני בבוקר → דוח מוכן → נשלח ללקוחות → לא נגעת בו' },
]

export default function AutomationPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: 'אוטומציה עסקית לעסקים ישראליים', description: 'אוטומציה עסקית לעסקים ישראליים — לידים, תזכורות, מסמכים, דוחות. עסקים חוסכים 12-18 שעות שבועיות.', url: '/automation' })} />
      <JsonLd data={faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={breadcrumbSchema([{ name: 'דף הבית', url: '/' }, { name: 'אוטומציה לעסקים', url: '/automation' }])} />
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="page-eyebrow mono">שירות</div>
            <h1 className="page-hero-title">
              15 שעות בשבוע<br />שחוזרות אליך
            </h1>
            <p className="page-hero-lead">
              רוב בעלי העסקים מבזבזים <strong>3-4 שעות ביום</strong> על עבודה שמחשב יכול לעשות ב-3 שניות.
              אוטומציה עסקית שמה את הדברים החוזרים על טייס אוטומטי — לידים, תזכורות, מסמכים, דוחות —
              ומחזירה לך זמן.
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
                  <li>עסקים שבונים 5 אוטומציות בסיסיות חוסכים 12-18 שעות שבועיות</li>
                  <li>עובד עם WhatsApp, Gmail, גוגל שיטס — ללא שינוי כלים</li>
                  <li>תוצאות — תוך שבוע ראשון מההקמה</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="container">
            <h2 className="page-section-title">5 האוטומציות שכל עסק צריך</h2>
            <p className="page-section-lead">
              אוטומציה עסקית לא אומרת לבנות רובוט — אומרת להגדיר כללים: "כשקורה X, תעשה Y".
              כל אחת מהאוטומציות האלה לוקחת שבוע להקים ו<strong>עובדת לבד אחרי כן</strong>.
            </p>
            <div className="step-list">
              {AUTOMATIONS.map((a, i) => (
                <div key={i} className="step-card">
                  <span className="step-num">{a.num}</span>
                  <div className="step-content">
                    <div className="step-head">
                      <h3 className="step-title">{a.title}</h3>
                      <span className="step-badge">{a.time}</span>
                    </div>
                    <p className="step-body">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-faq">
          <div className="container">
            <h2 className="page-section-title">שאלות נפוצות</h2>
            <p className="page-section-lead">
              האוטומציה שאני בונה עובדת עם הכלים שכבר יש לך, ועובדת לבד תוך שבוע מההקמה.
            </p>
            <FaqAccordion items={faqs} />
          </div>
        </section>

        <section className="case-study">
          <div className="container">
            <span className="case-study-eyebrow mono">דוגמה אמיתית</span>
            <h2 className="case-study-title">סוכנות שיווק — חסכה 18 שעות בשבוע ראשון</h2>
            <p className="case-study-body">
              סוכנות שיווק עם 12 לקוחות בנתה איתי 5 אוטומציות בסיסיות: מענה ללידים, תזכורות לפגישות,
              פולואפ אחרי הגשת קמפיין, ייצור דוחות שבועיים, וריכוז מסמכים מ-WhatsApp. ההקמה לקחה שבועיים.
              מהשבוע הראשון — הסוכנות חסכה 18 שעות עבודה, השוות ל-1 עובד-משרה-מלאה.
            </p>
          </div>
        </section>

        <section className="page-cta">
          <div className="container">
            <h2 className="page-cta-title">מוכן שהמחשב יעשה את העבודה?</h2>
            <p className="page-cta-sub">שיחת ייעוץ חינם. מזהים ביחד מה הכי כדאי לאוטמט קודם.</p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              <span>שיחת ייעוץ חינם</span>
              <span className="btn-arrow" aria-hidden="true">←</span>
            </a>
            <br />
            <Link href="/blog/5-thalichim-leautmet" className="page-cta-extra">
              קרא עוד: 5 תהליכים לאוטמט עכשיו ←
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
