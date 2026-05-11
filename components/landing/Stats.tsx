import Counter from './Counter'

const ITEMS = [
  { num: 7, suffix: '+', label: 'שנות ניסיון', sub: 'בבנייה לעסקים' },
  { num: 24, suffix: '', label: 'תהליכים אוטומטיים', sub: 'ללקוח אחד' },
  { num: 100, suffix: '+', label: 'לידים מאומתים באמצעות מערכת מציאת לידים', sub: 'תוך 6 דקות' },
  { num: 14, suffix: '', label: 'הגיל בו התחלתי', sub: 'לעבוד עם עסקים' },
]

export default function Stats() {
  return (
    <section className="stats" data-screen-label="04 Stats">
      <div className="container">
        <div className="stats-grid">
          {ITEMS.map((it, i) => (
            <div key={i} className="stat">
              <div className="stat-num">
                <Counter to={it.num} suffix={it.suffix} />
              </div>
              <div className="stat-label">{it.label}</div>
              <div className="stat-sub">{it.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
