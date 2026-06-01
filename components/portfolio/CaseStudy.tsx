import Image from 'next/image'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import { caseStudy } from '@/app/portfolio/data'

export default function CaseStudy() {
  const c = caseStudy
  const t = c.testimonial

  return (
    <div className="pf-case">
      <div className="pf-case-grid">
        {/* Left: narrative */}
        <div className="pf-case-main reveal">
          {c.tags.length > 0 && (
            <div className="pf-case-tags">
              {c.tags.map((tag) => (
                <span className="pf-chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="pf-case-client">{c.clientLabel}</p>

          <div className="pf-case-block">
            <h4 className="pf-case-h">הבעיה</h4>
            <p className="pf-case-text">{c.problem}</p>
          </div>

          <div className="pf-case-block">
            <h4 className="pf-case-h">מה נבנה</h4>
            <ul className="pf-case-build">
              {c.build.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

          {c.techBreakdown.length > 0 && (
            <div className="pf-case-block">
              <h4 className="pf-case-h">איך זה בנוי</h4>
              <ul className="pf-breakdown">
                {c.techBreakdown.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          {/* סקרינשוט סנריו ה-Make של סוכן ה-AI המרכזי */}
          <figure className="pf-case-shot">
            {c.image ? (
              <Image
                src={c.image}
                alt={c.imageCaption || 'סנריו Make'}
                width={1200}
                height={700}
                className="pf-case-shot-img"
              />
            ) : (
              <div className="pf-placeholder pf-placeholder--video">
                <span>סנריו ה-Make של סוכן ה-AI</span>
                <span className="pf-placeholder-sub">להוספה</span>
              </div>
            )}
            {c.imageCaption && (
              <figcaption className="pf-case-shot-cap">{c.imageCaption}</figcaption>
            )}
          </figure>
        </div>

        {/* Right: metrics + testimonial */}
        <aside className="pf-case-side reveal">
          <div className="pf-metrics">
            {c.metrics.map((m) => (
              <div className="pf-metric" key={m.label}>
                <div className="pf-metric-val">{m.value}</div>
                <div className="pf-metric-label">{m.label}</div>
              </div>
            ))}
          </div>

          {t && (
            <div className="pf-case-testi">
              {t.videoId ? (
                <YouTubeEmbed
                  videoId={t.videoId}
                  title={`עדות מ${t.name}`}
                  portrait={t.portrait}
                />
              ) : (
                <div className="pf-placeholder pf-placeholder--video">
                  <span>עדות וידאו של {t.name}</span>
                  <span className="pf-placeholder-sub">להוספה</span>
                </div>
              )}
              <div className="pf-case-testi-cap">
                <span className="pf-case-testi-name">{t.name}</span>
                <span className="pf-case-testi-role">{t.role}</span>
                {t.context && <span className="pf-case-testi-ctx">{t.context}</span>}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
