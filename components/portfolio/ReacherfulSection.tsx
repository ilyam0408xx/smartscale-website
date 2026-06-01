import Image from 'next/image'
import { reacherful } from '@/app/portfolio/data'

export default function ReacherfulSection() {
  const r = reacherful

  return (
    <section className="pf-section pf-reacher">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">{r.eyebrow}</span>
          <h2 className="section-title pf-reacher-title">{r.title}</h2>
          <p className="section-lead">{r.tagline}</p>
        </div>

        <div className="pf-reacher-metrics">
          {r.metrics.map((m) => (
            <div className="pf-reacher-metric reveal" key={m.label}>
              <div className="pf-reacher-metric-val mono">{m.value}</div>
              <div className="pf-reacher-metric-label">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Full-width screenshot — the flagship visual */}
        <figure className="pf-reacher-shot reveal">
          {r.image ? (
            <Image
              src={r.image}
              alt="הממשק של Reacherful — סקרייפר לידים"
              width={1648}
              height={868}
              className="pf-reacher-shot-img"
            />
          ) : (
            <div className="pf-placeholder pf-placeholder--video">
              <span>סקרינשוט הפלטפורמה</span>
              <span className="pf-placeholder-sub">להוספה</span>
            </div>
          )}
          {r.link && (
            <a
              className="pf-link pf-reacher-link"
              href={r.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              לאתר החי ↗
            </a>
          )}
        </figure>

        <div className="pf-reacher-grid">
          {/* Left: story + flow */}
          <div className="pf-reacher-main reveal">
            <p className="pf-reacher-lead">{r.lead}</p>

            <div className="pf-reacher-platforms">
              {r.platforms.map((p) => (
                <span className="pf-chip" key={p}>
                  {p}
                </span>
              ))}
            </div>

            <ol className="pf-reacher-flow">
              {r.flow.map((f, i) => (
                <li className="pf-reacher-step" key={f.step}>
                  <span className="pf-reacher-step-num mono">{i + 1}</span>
                  <div>
                    <div className="pf-reacher-step-title">{f.step}</div>
                    <div className="pf-reacher-step-desc">{f.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: architecture */}
          <aside className="pf-reacher-arch reveal">
            <h4 className="pf-case-h">איך זה בנוי</h4>
            <ul className="pf-breakdown">
              {r.architecture.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
