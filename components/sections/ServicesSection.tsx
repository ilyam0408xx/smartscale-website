const services = [
  {
    icon: '👥',
    title: 'מערכת ניהול לקוחות',
    desc: 'כל הלקוחות שלך במקום אחד. היסטוריה מלאה, תזכורות אוטומטיות, מעקב אחרי כל שלב — בלי לשכוח אף אחד.',
    example:
      'בניתי מערכת לאריק שמנהל עסק עם תורים — 24 תהליכים אוטומטיים שרצים לבד. מהרגע שנכנס ליד חדש ועד פולואפ אחרי טיפול, הכל קורה בלי שהוא נוגע.',
  },
  {
    icon: '🤖',
    title: 'בוטים ואוטומציות',
    desc: 'מערכת שעונה ללקוחות ב-WhatsApp, מאשרת תורים, שולחת תזכורות ומסכמת שיחות — 24 שעות ביממה, בלי שתצטרך לעשות כלום.',
    example:
      'מערכת שמאשרת הגעה ללקוחות, שולחת תזכורת יום לפני התור, ומתריעה על ביטולים — בעל העסק לא נוגע בזה.',
  },
  {
    icon: '📄',
    title: 'זיהוי מסמכים אוטומטי',
    desc: 'שולחים תמונה של מסמך — המערכת קוראת את הטקסט, שולפת את הנתונים, וממלאה הכל בשבילך. בלי הקלדה, בלי טעויות.',
    example:
      'לקוח שולח צילום תעודת זהות — המערכת מזהה שם, מספר וכתובת ומזינה ישירות לכרטיס הלקוח.',
  },
  {
    icon: '🔍',
    title: 'מציאת לקוחות חדשים',
    desc: 'Reacherful — פלטפורמת SaaS שבניתי מאפס. מוצאת לך לקוחות פוטנציאליים, מאמתת פרטים, וכותבת הודעת פנייה מותאמת לכל אחד.',
    example:
      '100 לידים מוכנים עם שם, טלפון מאומת, ופנייה אישית — תוך 6 דקות.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      style={{
        padding: '80px 0',
        background: '#fff',
      }}
    >
      <div
        className="wrap"
        style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}
      >
        <div style={{ marginBottom: 40 }}>
          <p className="section-label">מה אני בונה</p>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 800,
              color: '#0a0a0a',
            }}
          >
            מערכות שעובדות בשבילך
          </h2>
          <p className="direct-answer">
            Smart Scale בונה מערכות שמחליפות את העבודה הידנית החוזרת — כל ליד
            מקבל מענה תוך 2 דקות, תזכורות יוצאות לבד, ומסמכים מסתדרים אוטומטית.
            עסקים שעובדים עם המערכות שלנו חוסכים בממוצע 15 שעות עבודה בשבוע.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {services.map((service, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                border: '1px solid #e5e5e5',
                borderRadius: 16,
                padding: '28px 32px',
                background: '#fff',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 28 }}>{service.icon}</span>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#0a0a0a',
                    margin: 0,
                  }}
                >
                  {service.title}
                </h3>
              </div>
              <p
                style={{
                  fontSize: 16,
                  color: '#3a3a3a',
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {service.desc}
              </p>
              <div
                style={{
                  background: '#f0fdf4',
                  borderRadius: 8,
                  padding: '12px 16px',
                  fontSize: 14,
                  color: '#166534',
                  lineHeight: 1.6,
                }}
              >
                <strong>✅ דוגמה אמיתית:</strong> {service.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
