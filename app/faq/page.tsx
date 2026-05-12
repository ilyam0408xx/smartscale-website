import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import JsonLd from '@/components/JsonLd'
import FaqAccordion from '@/components/FaqAccordion'
import { faqSchema, breadcrumbSchema, WA_LINK } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'שאלות של לקוחות — Smart Scale | מערכות אוטומציה לעסקים',
  description:
    'כל השאלות על מערכות Smart Scale — CRM, בוט WhatsApp, אוטומציה, גנרציית לידים. תשובות ברורות לבעלי עסקים ישראליים.',
  alternates: {
    canonical: 'https://ilyamaltsev.com/faq',
    languages: { he: 'https://ilyamaltsev.com/faq' },
  },
  openGraph: {
    title: 'שאלות של לקוחות — Smart Scale',
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
      { q: 'מה זה Smart Scale?', a: 'Smart Scale בונה מערכות אוטומטיות לעסקים ישראליים קטנים ובינוניים. המערכות מחליפות עבודה ידנית חוזרת — כל ליד מקבל מענה תוך 2 דקות, תזכורות יוצאות לבד, ומסמכים מסתדרים אוטומטית. 7+ שנות ניסיון.' },
      { q: 'לאיזה עסקים מתאים?', a: 'לסוכנויות שיווק ופרסום, קליניקות, נדל"ן, e-commerce, עורכי דין, רואי חשבון, סוכני ביטוח, ועסקי שירות בכלל. בקיצור — כל עסק שמתנהל חלקית דרך WhatsApp ומבזבז שעות על עבודה ידנית חוזרת.' },
      { q: 'האם אני צריך לדעת טכנולוגיה?', a: 'לא. המערכות עובדות עם הכלים שכבר יש לך — WhatsApp, Gmail, Google Drive. לא צריך ללמוד שום תוכנה חדשה. איליה מלווה עד שהכל עובד.' },
    ],
  },
  {
    category: 'מערכת ניהול לקוחות (CRM)',
    items: [
      { q: 'כמה זמן לוקח להקים CRM?', a: 'שבוע עד שלושה שבועות, תלוי במורכבות. לאחר מכן — עובדת לבד.' },
      { q: 'מה עם הנתונים הקיימים שלי?', a: 'מייבאים את כל הנתונים מ-Excel, WhatsApp, ומגוגל שיטס. לא מתחילים מאפס.' },
      { q: 'ממה המערכת מרכזת לידים?', a: 'WhatsApp, אתר, פייסבוק, אינסטגרם, טלפון — הכל נכנס למקום אחד אוטומטית. כל ליד רואים את כל היסטוריית הקשר בלחיצה.' },
    ],
  },
  {
    category: 'בוט WhatsApp',
    items: [
      { q: 'האם הלקוחות מרגישים שמדברים עם בוט?', a: 'בוט שכתוב נכון עם שפה טבעית — רוב הלקוחות לא מרגישים. כשהשיחה מורכבת מדי, הבוט מעביר לאדם אמיתי עם כל הפרטים.' },
      { q: 'מה הבוט יכול לעשות?', a: 'לענות לשאלות נפוצות, לתאם תורים, לשלוח תזכורות, למיין לידים ולהעביר לידים רציניים אליך עם כל הפרטים. מטפל ב-80% מהפניות לבד.' },
      { q: 'צריך WhatsApp Business?', a: 'כן — WhatsApp Business API. איליה מסדיר את כל ההתחברות. לא צריך לעשות כלום לבד.' },
    ],
  },
  {
    category: 'אוטומציה',
    items: [
      { q: 'מה ניתן לאוטמט?', a: 'לידים, תזכורות לתורים, ניהול מסמכים, דוחות שבועיים, תשובות לשאלות נפוצות, פולואפ לאחר פגישה, עדכוני סטטוס ללקוחות. אם זה חוזר על עצמו — אפשר לאוטמט.' },
      { q: 'כמה שעות אוטומציה חוסכת?', a: 'עסקים שבניתי להם מערכות חוסכים בממוצע 15 שעות עבודה ידנית בשבוע. חלקם חוסכים יותר.' },
      { q: 'האם האוטומציה עובדת עם הכלים שכבר יש לי?', a: 'כן. Google Sheets, Gmail, WhatsApp, Google Drive, Airtable, Notion — אנחנו מתחברים למה שכבר עובד, לא מחליפים הכל.' },
    ],
  },
  {
    category: 'גנרציית לידים',
    items: [
      { q: 'מה זה Reacherful?', a: 'Reacherful היא מערכת שמוצאת לקוחות פוטנציאליים — 100+ לידים מאומתים לפי נישה, תחום, גודל חברה — תוך 6 דקות. לא רשימות ישנות, פרטים שנאומתו בזמן אמת.' },
      { q: 'לאיזה עסקים מתאים Reacherful?', a: 'לסוכנויות שיווק, חברות B2B, נדל"ן מסחרי, ספקי שירות לעסקים. לא מתאים לעסקי B2C עם לקוחות פרטיים בלבד.' },
    ],
  },
]

const flatFaqs = allFaqs.flatMap((c) => c.items.map((it) => ({ question: it.q, answer: it.a })))

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema(flatFaqs)} />
      <JsonLd data={breadcrumbSchema([{ name: 'דף הבית', url: '/' }, { name: 'שאלות של לקוחות', url: '/faq' }])} />
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="page-eyebrow mono">עזרה</div>
            <h1 className="page-hero-title">שאלות של לקוחות</h1>
            <p className="page-hero-lead">
              כאן מרוכזות כל השאלות על מערכות Smart Scale — זמני הקמה, התאמה לעסק, וכלים נתמכים.
              לא מצאת תשובה? <strong>שלח הודעה ב-WhatsApp</strong> ותקבל מענה תוך שעות.
            </p>
          </div>
        </section>

        {allFaqs.map((cat, idx) => (
          <section
            key={cat.category}
            className={`page-section ${idx % 2 === 1 ? 'page-section--alt' : ''}`}
          >
            <div className="container">
              <h2 className="faq-category-title">{cat.category}</h2>
              <FaqAccordion items={cat.items} />
            </div>
          </section>
        ))}

        <section className="page-cta">
          <div className="container">
            <h2 className="page-cta-title">עדיין יש שאלה?</h2>
            <p className="page-cta-sub">שלח הודעה ב-WhatsApp — מענה תוך שעות, ללא עלות.</p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              <span>שאל ב-WhatsApp</span>
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
