import YouTubeEmbed from './YouTubeEmbed'

interface Testimonial {
  name: string
  role: string
  sub?: string
  quote: string
  youtube: string
  featured?: boolean
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'אלון לוי',
    role: 'מנכ״ל קולמקס ישראל',
    sub: 'לשעבר סמנכ״ל כספים בנק לאומי',
    quote:
      'איליה בנה לנו מערכת שחסכה לצוות שלי שעות אדירות בכל שבוע. מדויק, מהיר, ועם מחשבה על המשתמש הסופי.',
    youtube: '20zo_3tE58Q',
    featured: true,
  },
  {
    name: 'אור חכים',
    role: 'מנכ״ל Videocast',
    quote:
      'הוא הבין את העסק תוך פגישה אחת. אחרי שבועיים כבר היה לי בוט שמטפל ב־80% מהשאלות לבד.',
    youtube: '34CIG2UNFD0',
  },
  {
    name: 'טום לידר',
    role: 'מנכ״ל growgen.ai',
    sub: 'איש עסקים עם פעילות בינלאומית',
    quote: 'נדיר למצוא בן אדם בגיל הזה עם רמת אחריות ומקצועיות כזו. ממליץ ב־100%.',
    youtube: 'tZXjPQQiiAA',
  },
  {
    name: 'אריק גרון',
    role: 'בעלים של המותג "גרונה"',
    sub: 'בעלים של קליניקה לטיפול בדלילות השיער',
    quote:
      'איליה תפס את כל מערך הניהול והאוטומציות של הקליניקה. תהליכים שהיו לוקחים לי שעות — רצים עכשיו לבד.',
    youtube: 'GXDE6HlC8jw',
  },
]

export default function Testimonials() {
  const featured = TESTIMONIALS.filter((t) => t.featured)
  const regular = TESTIMONIALS.filter((t) => !t.featured)

  return (
    <section className="testi" id="testimonials" data-screen-label="06 Testimonials">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow mono">המלצות</div>
          <h2 className="section-title">מה לקוחות מספרים.</h2>
          <p className="section-lead">
            עדויות וידאו מבעלי עסקים שהמערכות שלהם עובדות במקום שלהן.
          </p>
        </div>

        {featured.map((t, i) => (
          <figure key={`f${i}`} className="testi-card testi-card--featured">
            <div className="testi-video">
              <YouTubeEmbed id={t.youtube} title={t.name} />
            </div>
            <div className="testi-featured-body">
              <div className="testi-featured-badge">★ המלצה מובחרת</div>
              <blockquote className="testi-quote">{t.quote}</blockquote>
              <figcaption className="testi-cap">
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                  {t.sub && <div className="testi-sub">{t.sub}</div>}
                </div>
              </figcaption>
            </div>
          </figure>
        ))}

        <div className="testi-grid">
          {regular.map((t, i) => (
            <figure key={i} className="testi-card">
              <div className="testi-video">
                <YouTubeEmbed id={t.youtube} title={t.name} />
              </div>
              <blockquote className="testi-quote">{t.quote}</blockquote>
              <figcaption className="testi-cap">
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                  {t.sub && <div className="testi-sub">{t.sub}</div>}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
