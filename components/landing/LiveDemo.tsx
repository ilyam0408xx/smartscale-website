import WhatsAppSim from './WhatsAppSim'
import AutomationFlow from './AutomationFlow'
import CRMMini from './CRMMini'

export default function LiveDemo() {
  return (
    <section className="demo" data-screen-label="05 Live Demo">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow mono">הדגמה חיה</div>
          <h2 className="section-title">
            ככה זה נראה <em>אצל הלקוח שלך.</em>
          </h2>
          <p className="section-lead">
            ליד נכנס מהאתר. הבוט עונה תוך שניות. התור נכנס לכרטיס. התזכורת יוצאת לבד יום לפני.
            שום דבר לא נופל בין הכיסאות.
          </p>
        </div>
        {/* anchor lands here, at the start of the WhatsApp + flow + CRM demos */}
        <div className="demo-grid" id="demo">
          <div className="demo-side">
            <div className="demo-side-eyebrow mono">• שיחה חיה ב-WhatsApp</div>
            <WhatsAppSim />
          </div>
          <div className="demo-side">
            <div className="demo-side-eyebrow mono">• זרימת אוטומציה</div>
            <div className="demo-flow-wrap">
              <AutomationFlow />
            </div>
            <div className="demo-side-eyebrow mono" style={{ marginTop: 28 }}>
              • לוח לקוחות
            </div>
            <CRMMini />
          </div>
        </div>
      </div>
    </section>
  )
}
