const pains = [
  { icon: '📱', text: 'לקוחות שואלים שאלות ב-WhatsApp — ואתה עונה על אותו דבר 20 פעם ביום' },
  { icon: '📋', text: 'מעקב לקוחות בגוגל שיטס, פתקים, וראש — ותמיד משהו נופל בין הכיסאות' },
  { icon: '⏰', text: 'שעות על עבודה ידנית: תזכורות, הצעות מחיר, פולואפים — במקום להתעסק בעסק' },
  { icon: '🔍', text: 'יודע שצריך לקוחות חדשים אבל אין לך זמן לחפש אותם' },
]

export default function PainSection() {
  return (
    <section
      style={{
        padding: '80px 0',
        background: '#f9f9f7',
      }}
    >
      <div
        className="wrap"
        style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}
      >
        <h2
          style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            fontWeight: 800,
            marginBottom: 40,
            color: '#0a0a0a',
          }}
        >
          מכירים את זה?
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          {pains.map((pain, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '24px 20px',
                border: '1px solid #e5e5e5',
                fontSize: 16,
                lineHeight: 1.6,
                color: '#3a3a3a',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <span style={{ fontSize: 28 }}>{pain.icon}</span>
              {pain.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
