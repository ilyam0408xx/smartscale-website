import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export const metadata: Metadata = {
  title: 'תנאי שימוש',
  description: 'תנאי השימוש של Smart Scale.',
  alternates: { canonical: 'https://ilyamaltsev.com/terms' },
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="legal-page">
        <div className="container">
          <h1>תנאי שימוש</h1>
          <p className="legal-updated mono">עודכן לאחרונה: מאי 2026</p>

          <div className="prose">
            <h2>1. הסכמה לתנאים</h2>
            <p>
              השימוש באתר ilyamaltsev.com ובשירותי Smart Scale מהווה הסכמה לתנאים אלה.
              אם אינך מסכים לתנאים, אנא הפסק את השימוש באתר.
            </p>

            <h2>2. תיאור השירותים</h2>
            <p>Smart Scale מספקת שירותי:</p>
            <ul>
              <li>בניית מערכות ניהול לקוחות (CRM) מותאמות אישית</li>
              <li>פיתוח בוטים ואוטומציות ל-WhatsApp ולפלטפורמות אחרות</li>
              <li>מערכות זיהוי ועיבוד מסמכים</li>
              <li>כלים לגנרציית לידים</li>
              <li>שירותי אוטומציה עסקית כלליים</li>
            </ul>
            <p>
              תנאי השירות הספציפיים — מחיר, לוחות זמנים, ותכולה — מוסכמים בכתב מול הלקוח לפני
              תחילת עבודה ומפורטים בהצעת המחיר הייעודית.
            </p>

            <h2>3. קניין רוחני</h2>
            <p>
              עם השלמת הפרויקט, הקוד והמערכות שנבנו עבורך הם בבעלותך המלאה.
              Smart Scale שומרת על הזכות להשתמש בפרויקטים כהפניה שיווקית (ללא חשיפת מידע סודי)
              אלא אם הוסכם אחרת בכתב.
            </p>

            <h2>4. הגבלת אחריות</h2>
            <p>
              Smart Scale אינה אחראית לנזקים עקיפים, אובדן הכנסות, או נזקים הנובעים משימוש
              לא תקין במערכות.
              האחריות המקסימלית של Smart Scale מוגבלת לסכום ששולם עבור הפרויקט הספציפי.
            </p>

            <h2>5. יישוב סכסוכים</h2>
            <p>
              תנאים אלה כפופים לדין הישראלי.
              כל סכסוך יידון בבתי המשפט המוסמכים במחוז תל אביב.
            </p>

            <h2>6. יצירת קשר</h2>
            <p>
              לשאלות בנוגע לתנאים אלה: <a href="mailto:ilya@ilyamaltsev.com">ilya@ilyamaltsev.com</a>
              {' '}| טלפון: <span dir="ltr">050-261-1165</span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
