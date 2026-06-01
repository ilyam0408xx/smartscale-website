import ScrollReveal from '@/components/ScrollReveal'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import OrgTree from '@/components/portfolio/OrgTree'
import CaseStudy from '@/components/portfolio/CaseStudy'
import ReacherfulSection from '@/components/portfolio/ReacherfulSection'
import ScenarioCard from '@/components/portfolio/ScenarioCard'
import ProductCard from '@/components/portfolio/ProductCard'
import ProofGrid from '@/components/portfolio/ProofGrid'
import {
  hero,
  stats,
  caseStudy,
  scenarios,
  products,
  testimonials,
} from './data'

export default function PortfolioPage() {
  return (
    <>
      <ScrollReveal />

      {/* ─── TOP BAR ─────────────────────────────────────────────── */}
      <header className="pf-topbar">
        <div className="container pf-topbar-inner">
          <div className="pf-brand">
            <span className="pf-brand-name">איליה מלצב</span>
            <span className="pf-brand-sub">Smart Scale · אוטומציה ו-AI</span>
          </div>
          <span className="pf-topbar-tag">תיק עבודות</span>
        </div>
      </header>

      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="pf-hero">
        <div className="container">
          <span className="section-eyebrow">{hero.eyebrow}</span>
          <h1 className="pf-hero-title">
            מערכות שעובדות <em>והמכונה שבונה אותן</em>
          </h1>
          <p className="pf-hero-lead">{hero.lead}</p>
        </div>
      </section>

      {/* ─── STATS ───────────────────────────────────────────────── */}
      <section className="pf-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat reveal" key={s.label}>
                <div className="stat-num mono">{s.num}</div>
                <div className="stat-label">{s.label}</div>
                {s.sub && <div className="stat-sub">{s.sub}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CASE STUDY (Erik — first, per Grok) ─────────────────── */}
      <section className="pf-section">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">{caseStudy.eyebrow}</span>
            <h2 className="section-title">{caseStudy.title}</h2>
            <p className="section-lead">
              מערכת חיה שמנהלת קליניקה מקצה לקצה: CRM, יומן, תזכורות, ו-35
              אוטומציות שרצות לבד. <strong>בלב המערכת סוכן AI</strong> שמתזמר את כל
              הזרימה.
            </p>
          </div>
          <CaseStudy />
        </div>
      </section>

      {/* ─── REACHERFUL (flagship — right after Erik) ─────────────── */}
      <ReacherfulSection />

      {/* ─── AGENT ARMY ──────────────────────────────────────────── */}
      <section className="pf-section">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">המנוע · צבא הסוכנים</span>
            <h2 className="section-title">
              חברה שמנוהלת ע״י <em>סוכני AI</em>
            </h2>
            <p className="section-lead">
              16 סוכני Claude ב-4 מחלקות מריצים את כל Smart Scale: שיווק, מכירות,
              תפעול ומשפטי. <strong>זה לא רעיון, זה רץ.</strong> וככה זה שומר על
              עצמו מסודר ובטוח.
            </p>
          </div>
          <OrgTree />
        </div>
      </section>

      {/* ─── MAKE SCENARIOS ──────────────────────────────────────── */}
      <section className="pf-section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">סנריואים ב-make.com שמנהלים עסקים ביומיום</h2>
          </div>
          <div className="pf-scenarios">
            {scenarios.map((s) => (
              <ScenarioCard key={s.title} scenario={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS BUILT FROM SCRATCH ─────────────────────────── */}
      <section className="pf-section">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">מוצרים מאפס</span>
            <h2 className="section-title">לא רק לחבר כלים, לבנות אותם</h2>
            <p className="section-lead">
              פלטפורמת SaaS, CRM, בוט, ואתר עם ווידג׳ט AI. הנדסה end-to-end, לא
              הדבקה.
            </p>
          </div>
          <div className="pf-products">
            {products.map((p) => (
              <ProductCard key={p.name} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── MORE WORK ───────────────────────────────────────────── */}
      <section className="pf-section">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">עוד עבודות</span>
            <h2 className="section-title">דברים נוספים שבניתי</h2>
          </div>
          <ProofGrid />
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────── */}
      <section className="pf-section">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">המלצות</span>
            <h2 className="section-title">מנכ״לים שעבדתי איתם</h2>
          </div>
          <div className="pf-testi-grid">
            {testimonials.map((t) =>
              t.videoId ? (
                <div className="pf-testi-card reveal" key={t.videoId}>
                  <YouTubeEmbed
                    videoId={t.videoId}
                    title={`המלצה מ${t.name}`}
                    portrait={t.portrait}
                  />
                  <div className="pf-testi-cap">
                    <div className="pf-testi-name">{t.name}</div>
                    <div className="pf-testi-role">{t.role}</div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </section>

      {/* ─── FOOTER STRIP (no CTA) ───────────────────────────────── */}
      <footer className="pf-foot">
        <div className="container">
          <p className="pf-foot-id">איליה מלצב · Smart Scale</p>
        </div>
      </footer>
    </>
  )
}
