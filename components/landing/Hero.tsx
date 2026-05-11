import AutomationFlow from './AutomationFlow'

export default function Hero() {
  return (
    <section className="hero hero-editorial" data-screen-label="01 Hero">
      <div className="container">
        <h1 className="hero-title hero-title-xl">
          העסק שלך עובד
          <br />
          <em>בזמן שאתה ישן.</em>
        </h1>
        <p className="hero-lead center">
          מערכות אוטומטיות שמעניקות לך וללקוחות שלך מענה מיידי, מוציאות תזכורות לבד, ומסדרות את
          הניירת שלך — כל זה בלי שתצטרך להיות מול המחשב.
        </p>
        <div className="hero-ctas center">
          <a href="#contact" className="btn btn-primary btn-lg">
            <span>שיחת ייעוץ חינם</span>
            <span className="btn-arrow" aria-hidden="true">
              ←
            </span>
          </a>
          <a href="#demo" className="btn btn-ghost btn-lg">
            <span>הדגמה חיה</span>
            <span className="btn-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
        <div className="hero-flow-wrap">
          <AutomationFlow />
        </div>
      </div>
    </section>
  )
}
