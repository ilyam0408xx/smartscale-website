import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'מדיניות פרטיות',
  description: 'מדיניות הפרטיות של Smart Scale — איך אנחנו מגנים על המידע שלך.',
  alternates: { canonical: 'https://ilyamaltsev.com/privacy' },
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 40px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 8, color: '#0a0a0a' }}>
            מדיניות פרטיות
          </h1>
          <p style={{ color: '#aaaaaa', fontSize: 13, marginBottom: 40 }}>
            עודכן לאחרונה: אפריל 2025
          </p>

          <div className="prose">
            <h2>1. מי אנחנו</h2>
            <p>
              Smart Scale (להלן: "החברה") היא עסק המספק שירותי בניית מערכות אוטומציה לעסקים.
              המייסד ובעל העסק: איליה מלצב. כתובת: ישראל.
              ליצירת קשר בנושא פרטיות: <a href="mailto:ilya@ilyamaltsev.com">ilya@ilyamaltsev.com</a>
            </p>

            <h2>2. מה אנחנו אוספים</h2>
            <p>אנחנו עשויים לאסוף את המידע הבא:</p>
            <ul>
              <li><strong>מידע שאתה מספק:</strong> שם, מספר טלפון, ופרטי קשר שנמסרים דרך WhatsApp, טפסים באתר, או תקשורת ישירה.</li>
              <li><strong>מידע שנאסף אוטומטית (בהסכמה בלבד):</strong> נתוני שימוש באתר דרך Facebook Pixel — כולל עמודים שנצפו, פעולות שבוצעו, וכתובת IP. נתונים אלה נאספים רק לאחר קבלת הסכמתך.</li>
              <li><strong>קוקיז:</strong> אנחנו משתמשים בקוקיז לצרכי ניתוח תנועה ושיפור חוויית השימוש. ניתן לסרב לשימוש בקוקיז דרך הבאנר שמופיע בביקור הראשון.</li>
            </ul>

            <h2>3. למה אנחנו משתמשים במידע</h2>
            <ul>
              <li>מתן שירות ומענה לפניות</li>
              <li>שיפור האתר ושירותינו</li>
              <li>פרסום ממוקד (בהסכמה בלבד, דרך Facebook Pixel)</li>
              <li>יצירת קשר בנוגע לשירותים שביקשת</li>
            </ul>

            <h2>4. שיתוף מידע עם צדדים שלישיים</h2>
            <p>
              אנחנו לא מוכרים או מעבירים את המידע האישי שלך לצדדים שלישיים, למעט:
            </p>
            <ul>
              <li><strong>Meta (Facebook):</strong> נתוני Pixel לצרכי פרסום — בהסכמה בלבד.</li>
              <li><strong>Vercel:</strong> שירות אחסון האתר — נתוני log בסיסיים.</li>
              <li><strong>Google Analytics:</strong> ניתוח תנועה — בהסכמה בלבד.</li>
            </ul>

            <h2>5. זכויותיך</h2>
            <p>בהתאם לחוק הגנת הפרטיות הישראלי (תשמ"א-1981), יש לך זכות:</p>
            <ul>
              <li>לעיין במידע שנשמר עליך</li>
              <li>לבקש תיקון מידע שגוי</li>
              <li>לבקש מחיקת המידע שלך</li>
              <li>לבטל הסכמה לשימוש בקוקיז בכל עת (על ידי מחיקת ה-localStorage של האתר)</li>
            </ul>
            <p>לכל בקשה: <a href="mailto:ilya@ilyamaltsev.com">ilya@ilyamaltsev.com</a></p>

            <h2>6. אבטחת מידע</h2>
            <p>
              האתר פועל על HTTPS מוצפן. אנחנו נוקטים באמצעי אבטחה סבירים להגנה על המידע.
              עם זאת, אין אנו יכולים להבטיח אבטחה מוחלטת בסביבת האינטרנט.
            </p>

            <h2>7. שינויים במדיניות</h2>
            <p>
              אנחנו עשויים לעדכן מדיניות זו מעת לעת. שינויים מהותיים יפורסמו באתר.
              המשך השימוש באתר לאחר פרסום שינויים מהווה הסכמה למדיניות המעודכנת.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
