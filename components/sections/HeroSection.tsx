import Image from 'next/image'
import { WA_LINK } from '@/lib/schema'

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20} style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function HeroSection() {
  return (
    <section
      style={{
        paddingTop: 120,
        paddingBottom: 80,
        background: '#fff',
      }}
    >
      <div
        className="wrap"
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 60,
          flexWrap: 'wrap',
        }}
      >
        {/* Text */}
        <div style={{ flex: '1 1 320px', minWidth: 280 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#aaaaaa',
              marginBottom: 16,
            }}
          >
            איליה מלצב — מייסד Smart Scale
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              color: '#0a0a0a',
              marginBottom: 20,
            }}
          >
            המערכות שגורמות
            <br />
            לעסק שלך לעבוד בלעדיך
          </h1>
          <p
            className="direct-answer"
            style={{ color: '#6b6b6b', marginBottom: 32, fontSize: 18 }}
          >
            אני בונה מערכות חכמות לעסקים. ניהול לקוחות, בוטי WhatsApp,
            ותזכורות אוטומטיות — כל מה שחוסך לך זמן ומכניס לך כסף, עובד 24/7
            בלי שתגע בזה.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 28px',
                background: '#25D366',
                color: '#fff',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: 'none',
                boxShadow: '0 2px 12px rgba(37,211,102,0.3)',
              }}
            >
              {WA_ICON}
              שיחת ייעוץ חינם
            </a>
            <a
              href="#services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 28px',
                border: '2px solid #e5e5e5',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 16,
                color: '#0a0a0a',
                textDecoration: 'none',
              }}
            >
              מה אני בונה ↓
            </a>
          </div>
        </div>

        {/* Photo */}
        <div
          style={{
            flex: '0 0 260px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 240,
              height: 240,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid #e5e5e5',
              boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            }}
          >
            <Image
              src="/images/ilya.jpg"
              alt="איליה מלצב — מייסד Smart Scale, מומחה אוטומציה לעסקים ישראליים"
              width={240}
              height={240}
              priority
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
