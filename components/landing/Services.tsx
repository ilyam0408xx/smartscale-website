import FlowIcon, { type IconKind } from './FlowIcon'

const SERVICES: { tag: string; title: string; body: string; proof: string; icon: IconKind }[] = [
  {
    tag: 'CRM',
    title: 'מערכת ניהול לקוחות',
    body: 'כל הלקוחות במקום אחד. היסטוריה מלאה, תזכורות אוטומטיות, מעקב אחרי כל שלב.',
    proof: 'אריק: 24 תהליכים אוטומטיים שרצים לבד.',
    icon: 'crm',
  },
  {
    tag: 'BOT',
    title: 'בוטים ואוטומציות',
    body: 'מענה ב-WhatsApp 24/7, אישור תורים, תזכורות, וסיכומי שיחות — בלי שתגע בזה.',
    proof: 'אישור הגעה + תזכורת יום לפני + התראה על ביטולים.',
    icon: 'wa',
  },
  {
    tag: 'OCR',
    title: 'זיהוי מסמכים אוטומטי',
    body: 'תמונה של מסמך נכנסת — הנתונים יוצאים. בלי הקלדה, בלי טעויות.',
    proof: 'תעודת זהות → שם, מספר וכתובת ישירות בכרטיס הלקוח.',
    icon: 'doc',
  },
  {
    tag: 'OUT',
    title: 'מציאת לקוחות חדשים',
    body:
      'Reacherful: פלטפורמת SaaS שבניתי. מאתרת, מאמתת, וכותבת פנייה אישית לכל ליד. (ניתנת כגישה אישית לכל לקוח בהתאמה אישית)',
    proof: '100 לידים מאומתים עם פנייה אישית — תוך 6 דקות.',
    icon: 'lead',
  },
]

export default function Services() {
  return (
    <section className="services" id="services" data-screen-label="03 Services">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">מערכות שעובדות בשבילך.</h2>
          <p className="section-lead">
            עסקים שמפעילים את המערכות האלו חוסכים בממוצע <strong>15 שעות בשבוע</strong>. כל מערכת
            מותאמת בדיוק לעסק — לא תבנית גנרית.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <article key={i} className="svc-card">
              <div className="svc-top">
                <div className="svc-icon">
                  <FlowIcon kind={s.icon} />
                </div>
                <div className="svc-tag mono">{s.tag}</div>
              </div>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-body">{s.body}</p>
              <div className="svc-proof">
                <div className="svc-proof-eyebrow mono">דוגמה אמיתית ↓</div>
                <div className="svc-proof-text">{s.proof}</div>
              </div>
              <div className="svc-arrow" aria-hidden="true">
                ←
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
