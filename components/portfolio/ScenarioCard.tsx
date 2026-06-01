import Image from 'next/image'
import type { Scenario } from '@/app/portfolio/data'

export default function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const s = scenario

  return (
    <article className="pf-scn reveal">
      <div className="pf-scn-shot">
        {s.image ? (
          <Image
            src={s.image}
            alt={`סנריו Make: ${s.title}`}
            fill
            sizes="(max-width: 980px) 100vw, 1000px"
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
        ) : (
          <div className="pf-placeholder pf-placeholder--shot">
            <span>סקרינשוט של הסנריו</span>
            <span className="pf-placeholder-sub">גרף ה-modules · להוספה</span>
          </div>
        )}
      </div>

      <div className="pf-scn-body">
        <div className="pf-scn-top">
          <h3 className="pf-scn-title">{s.title}</h3>
          <span className="pf-chip pf-chip--soft">{s.client}</span>
        </div>
        <p className="pf-scn-summary">{s.summary}</p>

        {s.breakdown.length > 0 && (
          <ul className="pf-breakdown">
            {s.breakdown.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        <div className="pf-scn-foot">
          <span className="pf-scn-result">{s.result}</span>
        </div>
      </div>
    </article>
  )
}
