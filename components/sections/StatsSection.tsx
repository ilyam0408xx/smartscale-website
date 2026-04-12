const stats = [
  { number: '+7', label: 'שנים של ניסיון\nבבנייה לעסקים' },
  { number: '24', label: 'תהליכים אוטומטיים\nללקוח אחד' },
  { number: '100+', label: 'לקוחות פוטנציאליים\nב-6 דקות' },
  { number: '14', label: 'הגיל שבו\nהתחלתי לעבוד' },
]

export default function StatsSection() {
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 32,
            textAlign: 'center',
          }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="reveal">
              <div
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: 900,
                  color: '#0ea5e9',
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {stat.number}
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: '#6b6b6b',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
