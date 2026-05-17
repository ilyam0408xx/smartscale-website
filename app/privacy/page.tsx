import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

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
      <main className="legal-page">
        <div className="container">
          <h1>מדיניות פרטיות</h1>
          <p className="legal-updated mono">עודכן לאחרונה: מאי 2026</p>

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
              <li><strong>מידע שנאסף אוטומטית (בהסכמה לקטגוריית Marketing בלבד):</strong>
                <ul>
                  <li><strong>Meta Pixel (Facebook Pixel):</strong> עמודים שנצפו, פעולות שבוצעו, וכתובת IP — לטובת ניתוח קמפיינים ופרסום ממוקד.</li>
                  <li><strong>Outbrain Amplify Pixel:</strong> עמודים שנצפו וקליקים על כפתורי המרה (כגון WhatsApp) — לטובת מדידת קמפיינים ממומנים, רטרגטינג ויצירת קהלים דומים.</li>
                </ul>
              </li>
              <li><strong>קוקיז:</strong> אנחנו משתמשים בקוקיז לצרכי ניתוח תנועה ושיפור חוויית השימוש, מחולקות לארבע קטגוריות:
                <ul>
                  <li><strong>Functional</strong> — תמיד פעילות, נדרשות לתפעול בסיסי של האתר.</li>
                  <li><strong>Preferences</strong> — שמירת העדפות שאינן הכרחיות.</li>
                  <li><strong>Statistics</strong> — איסוף אנונימי של נתוני שימוש.</li>
                  <li><strong>Marketing</strong> — פיקסלי פרסום (Meta, Outbrain) ויצירת קהלים לקמפיינים ממומנים.</li>
                </ul>
                ניתן לקבל או לסרב לקטגוריות באמצעות באנר העוגיות המופיע בביקור הראשון, ולשנות הסכמה בכל עת על ידי מחיקת ה-localStorage של האתר.
              </li>
            </ul>

            <h2>3. למה אנחנו משתמשים במידע</h2>
            <ul>
              <li>מתן שירות ומענה לפניות</li>
              <li>שיפור האתר ושירותינו</li>
              <li>פרסום ממוקד (בהסכמה בלבד, דרך Meta Pixel ו-Outbrain Amplify Pixel)</li>
              <li>מדידת אפקטיביות של קמפיינים ממומנים ויצירת קהלי רטרגטינג</li>
              <li>יצירת קשר בנוגע לשירותים שביקשת</li>
            </ul>

            <h2>4. שיתוף מידע עם צדדים שלישיים</h2>
            <p>אנחנו לא מוכרים או מעבירים את המידע האישי שלך לצדדים שלישיים, למעט:</p>
            <ul>
              <li><strong>Meta (Facebook):</strong> נתוני Pixel לצרכי פרסום — בהסכמה בלבד.</li>
              <li><strong>Outbrain (Amplify):</strong> נתוני פיקסל הכוללים צפיות בעמודים וקליקים על כפתורי המרה — בהסכמה בלבד, לטובת מדידה ורטרגטינג של קמפיינים ממומנים.</li>
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
      <WhatsAppFloat />
    </>
  )
}
