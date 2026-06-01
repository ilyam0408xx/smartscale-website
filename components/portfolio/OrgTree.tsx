import { departments, governance } from '@/app/portfolio/data'

const badgeLabel: Record<string, string> = {
  telegram: 'TELEGRAM',
  infra: 'תשתית',
  new: 'חדש',
}

export default function OrgTree() {
  return (
    <div className="pf-org">
      <div className="pf-org-top">
        <div className="pf-node pf-node--owner">
          <span className="pf-node-name">איליה</span>
          <span className="pf-node-sub">בעל העסק</span>
        </div>
        <div className="pf-org-line" aria-hidden />
        <div className="pf-node pf-node--hq">
          <span className="pf-node-name">_מטה · HQ</span>
          <span className="pf-node-sub">קונטקסט-אם · נהלים · חדר-מצב</span>
        </div>
      </div>

      <div className="pf-depts">
        {departments.map((d) => (
          <div className="pf-dept reveal" key={d.name}>
            <div className="pf-dept-name">{d.name}</div>
            <div className="pf-agents">
              {d.agents.map((a) => (
                <div
                  className={`pf-agent${a.badge ? ` pf-agent--${a.badge}` : ''}`}
                  key={a.name}
                >
                  <div className="pf-agent-top">
                    <span className="pf-agent-name">{a.name}</span>
                    {a.badge && (
                      <span className="pf-agent-badge">{badgeLabel[a.badge]}</span>
                    )}
                  </div>
                  <div className="pf-agent-role">{a.role}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pf-gov">
        <div className="pf-gov-col">
          <h4 className="pf-gov-h">איך הסוכנים עובדים יחד</h4>
          <ol className="pf-gov-list">
            {governance.workflow.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ol>
        </div>
        <div className="pf-gov-col">
          <h4 className="pf-gov-h">חוקי הברזל (ממשל)</h4>
          <ul className="pf-gov-list pf-gov-list--rules">
            {governance.rules.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
