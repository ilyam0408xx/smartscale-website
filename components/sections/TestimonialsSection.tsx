import Image from 'next/image'

const testimonials = [
  {
    videoId: '20zo_3tE58Q',
    url: 'https://youtu.be/20zo_3tE58Q',
    name: 'אלון לוי',
    role: 'מנכ"ל קולמקס ישראל\nלשעבר סמנכ"ל כספים בנק לאומי',
    alt: 'המלצה מאלון לוי על Smart Scale ואיליה מלצב',
    landscape: true,
  },
  {
    videoId: '34CIG2UNFD0',
    url: 'https://youtube.com/shorts/34CIG2UNFD0',
    name: 'אור חכים',
    role: 'מנכ"ל Videocast',
    alt: 'המלצה מאור חכים על מערכות האוטומציה של Smart Scale',
    landscape: false,
  },
  {
    videoId: 'tZXjPQQiiAA',
    url: 'https://youtube.com/shorts/tZXjPQQiiAA',
    name: 'טום לידר',
    role: 'מנכ"ל growgen.ai\nאיש עסקים עם עסקים בכל העולם',
    alt: 'המלצה מטום לידר על איליה מלצב ו-Smart Scale',
    landscape: false,
  },
]

const PlayIcon = () => (
  <span
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: 'rgba(0,0,0,0.65)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.2s',
    }}
  >
    <svg viewBox="0 0 24 24" fill="white" width={24} height={24}>
      <path d="M8 5v14l11-7z" />
    </svg>
  </span>
)

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      style={{ padding: '80px 0', background: '#fff' }}
    >
      <div
        className="wrap"
        style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}
      >
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
            gap: 24,
          }}
        >
          {testimonials.map((t) => (
            <div key={t.videoId}>
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  position: 'relative',
                  borderRadius: 12,
                  overflow: 'hidden',
                  aspectRatio: t.landscape ? '16/9' : '9/16',
                  maxHeight: t.landscape ? 'none' : 400,
                }}
              >
                <Image
                  src={`https://img.youtube.com/vi/${t.videoId}/hqdefault.jpg`}
                  alt={t.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <PlayIcon />
              </a>
              <p
                style={{
                  fontWeight: 700,
                  marginTop: 12,
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
