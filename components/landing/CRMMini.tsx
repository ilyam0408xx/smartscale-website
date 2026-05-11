type Tone = 'ok' | 'wait' | 'soft' | 'new'

const ROWS: { name: string; stage: string; status: string; tone: Tone }[] = [
  { name: 'דנה כהן', stage: 'תור • רביעי 16:00', status: 'מאושר', tone: 'ok' },
  { name: 'יוסי לוי', stage: 'הצעת מחיר נשלחה', status: 'ממתין', tone: 'wait' },
  { name: 'רינת אברהם', stage: 'פולואפ +3 ימים', status: 'מתוזמן', tone: 'soft' },
  { name: 'אורי בן דוד', stage: 'ליד חדש מהאתר', status: 'חדש', tone: 'new' },
]

export default function CRMMini() {
  return (
    <div className="crm">
      <div className="crm-head">
        <div>
          <div className="crm-eyebrow mono">CRM • היום</div>
          <div className="crm-title">לקוחות פעילים</div>
        </div>
        <div className="crm-pill">↻ סנכרון אוטומטי</div>
      </div>
      <div className="crm-rows">
        {ROWS.map((r, i) => (
          <div
            key={i}
            className="crm-row"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="crm-avatar">{r.name[0]}</div>
            <div className="crm-info">
              <div className="crm-name">{r.name}</div>
              <div className="crm-stage">{r.stage}</div>
            </div>
            <div className={`crm-status crm-${r.tone}`}>{r.status}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
