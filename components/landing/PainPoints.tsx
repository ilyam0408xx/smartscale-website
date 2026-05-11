const PAINS = [
  {
    glyph: '⏱',
    title: 'אותה שאלה, 20 פעם ביום',
    body: 'לקוחות שואלים ב-WhatsApp ואתה עונה ידנית — שוב ושוב, אותו דבר.',
  },
  {
    glyph: '✨',
    title: 'גוגל-שיטס + פתקים.. הכל בראש',
    body: 'המעקב מפוזר בכל מקום, ותמיד משהו נופל בין הכיסאות.',
  },
  {
    glyph: '⟳',
    title: 'שעות על תזכורות והצעות',
    body: 'במקום להתעסק בעבודה שלך, אתה מתעסק במשימות טכניות חוזרות.',
  },
  {
    glyph: '◎',
    title: 'אין זמן ללידים חדשים',
    body: 'אתה יודע שצריך לקוחות חדשים אבל אתה לא מספיק להתעסק בזה.',
  },
]

export default function PainPoints() {
  return (
    <section className="pains" id="pains" data-screen-label="02 Pains">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">מכירים את זה?</h2>
        </div>
        <div className="pains-grid">
          {PAINS.map((p, i) => (
            <div key={i} className="pain-card" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="pain-glyph" aria-hidden="true">
                {p.glyph}
              </div>
              <h3 className="pain-title">{p.title}</h3>
              <p className="pain-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
