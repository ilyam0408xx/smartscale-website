import YouTubeEmbed from '@/components/YouTubeEmbed'

const testimonials = [
  {
    videoId: '20zo_3tE58Q',
    name: 'אלון לוי',
    role: 'מנכ"ל קולמקס ישראל\nלשעבר סמנכ"ל כספים בנק לאומי',
    portrait: false,
  },
  {
    videoId: '34CIG2UNFD0',
    name: 'אור חכים',
    role: 'מנכ"ל Videocast',
    portrait: true,
  },
  {
    videoId: 'tZXjPQQiiAA',
    name: 'טום לידר',
    role: 'מנכ"ל growgen.ai\nאיש עסקים עם עסקים בכל העולם',
    portrait: true,
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ padding: '80px 0', background: '#fff' }}>
      <div className="wrap" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ marginBottom: 40 }}>
          <p className="section-label">המלצות</p>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 800,
              color: '#0a0a0a',
            }}
          >
            אנשים שעבדתי איתם
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 28,
            alignItems: 'start',
          }}
        >
          {testimonials.map((t) => (
            <div key={t.videoId} className="reveal">
              <YouTubeEmbed
                videoId={t.videoId}
                title={`המלצה מ${t.name}`}
                portrait={t.portrait}
              />
              <p
                style={{
                  fontWeight: 700,
                  marginTop: 14,
                  fontSize: 16,
                  color: '#0a0a0a',
                }}
              >
                {t.name}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: '#6b6b6b',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line',
                  marginTop: 4,
                }}
              >
                {t.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
