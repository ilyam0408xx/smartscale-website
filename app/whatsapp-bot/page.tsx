import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import JsonLd from '@/components/JsonLd'
import FaqAccordion from '@/components/FaqAccordion'
import { faqSchema, breadcrumbSchema, serviceSchema, WA_LINK } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'בוט WhatsApp לעסקים — תגובה תוך 2 דקות',
  description:
    'בוט WhatsApp שעונה ללידים 24/7, מתאם תורים, ושולח תזכורות אוטומטיות. לא מאבדים לידים בשעה 2 לילה. שיחת ייעוץ חינם.',
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
  { q: 'האם הלקוחות מרגישים שמדברים עם בוט?', a: 'בוט שכתוב נכון עם שפה טבעית — רוב הלקוחות לא מרגישים. כשהשיחה מורכבת מדי, הבוט מעביר לאדם אמיתי עם כל הפרטים.' },
  { q: 'צריך WhatsApp Business?', a: 'כן — WhatsApp Business API. אני מסדיר את כל ההתחברות. לא צריך לעשות כלום לבד.' },
  { q: 'כמה זמן לוקח להקים?', a: 'בוט בסיסי — שבוע. מערכת מלאה — שבועיים עד שלושה. כולל הדרכה והעברת ידע מלאה.' },
  { q: 'מה קורה אם הבוט לא יודע לענות?', a: 'הבוט מזהה שאלות מחוץ לתחום שלו ומעביר לאדם אמיתי עם כל הפרטים — שם, שאלה, והיסטוריה.' },
]

const USE_CASES = [
  { icon: '📅', title: 'תיאום תורים', desc: 'לקוח שואל על תור → הבוט מציע שעות פנויות → מאשר ומרשים' },
  { icon: '⏰', title: 'תזכורות אוטומטיות', desc: '24 שעות לפני — תזכורת + בקשת אישור. no-shows יורדים ב-40-60%' },
  { icon: '❓', title: 'שאלות נפוצות', desc: '"מה המחיר?", "איפה אתם?", "מה שעות פתיחה?" — תשובה אוטומטית' },
  { icon: '🎯', title: 'מיון לידים', desc: 'הבוט שואל שאלות, מפריד לידים רציניים ומעביר אליך רק את המתאימים' },
]

export default function WhatsAppBotPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: 'בוט WhatsApp לעסקים', description: 'בוט WhatsApp שעונה ללידים 24/7 תוך 2 דקות — תיאום תורים, תזכורות, מיון לידים. מסיר 80% מהעומס.', url: '/whatsapp-bot' })} />
      <JsonLd data={faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={breadcrumbSchema([{ name: 'דף הבית', url: '/' }, { name: 'בוט WhatsApp', url: '/whatsapp-bot' }])} />
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="page-eyebrow mono">שירות</div>
            <h1 className="page-hero-title">
              תגובה תוך 2 דקות —<br />בוט WhatsApp לעסקים
            </h1>
            <p className="page-hero-lead">
              ליד שלח הודעה בשעה 23:00 ולא קיבל מענה — <strong>60% ממנו כבר אצל המתחרה בבוקר</strong>.
              בוט WhatsApp עונה תוך 2 דקות, שואל שאלות מיון, ומעביר לידים רציניים אליך — 24 שעות ביממה.
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
                  <li>עונה ללידים תוך 2 דקות — כולל שבתות, חגים, ו-23:00 בלילה</li>
                  <li>מסיר 80% מהעומס: תזכורות, שאלות נפוצות, תיאום תורים</li>
                  <li>מוכן תוך שבוע. עובד דרך WhatsApp Business API.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="container">
            <h2 className="page-section-title">מה הבוט עושה בשבילך</h2>
            <p className="page-section-lead">
              בוט WhatsApp יכול לטפל ב-80% מהפניות הנכנסות לבד — תיאום תורים, תשובות לשאלות נפוצות, מיון לידים,
              ותזכורות. ה-20% שנשארים — שאלות מורכבות — מועברים אליך עם כל הפרטים.
            </p>
            <div className="feature-grid">
              {USE_CASES.map((u, i) => (
                <div key={i} className="feature-card">
                  <div className="feature-card-icon">{u.icon}</div>
                  <h3 className="feature-card-title">{u.title}</h3>
                  <p className="feature-card-body">{u.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="case-study">
          <div className="container">
            <span className="case-study-eyebrow mono">דוגמה אמיתית</span>
            <h2 className="case-study-title">קליניקה שהורידה no-shows ב-55% בחודש הראשון</h2>
            <p className="case-study-body">
              קליניקת ייעוץ ביקשה להפחית אי-הגעות לתורים שעלו להם 4-5 שעות אבודות בשבוע.
              הקמנו בוט WhatsApp שמתאם תורים, שולח תזכורת 24 שעות לפני, ומבקש אישור חזרה.
              בחודש הראשון — no-shows ירדו מ-20% ל-9%. הבעלים עצמה הפסיקה לטפל בתיאום ידני לגמרי.
            </p>
          </div>
        </section>

        <section className="page-faq">
          <div className="container">
            <h2 className="page-section-title">שאלות נפוצות</h2>
            <p className="page-section-lead">
              בוט WhatsApp לעסקים נבנה תוך שבוע, מותאם לעסק שלך, ועובד דרך WhatsApp Business API.
            </p>
            <FaqAccordion items={faqs} />
          </div>
        </section>

        <section className="page-cta">
          <div className="container">
            <h2 className="page-cta-title">מוכן להפסיק לאבד לידים בלילה?</h2>
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
