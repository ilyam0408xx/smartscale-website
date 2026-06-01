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
  whatsapp,
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

      {/* ─── FOOTER STRIP (single WhatsApp CTA) ──────────────────── */}
      <footer className="pf-foot">
        <div className="container pf-foot-inner">
          <p className="pf-foot-id">איליה מלצב · Smart Scale</p>
          <a
            className="pf-wa-btn"
            href={whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="שיחה ב-WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width={22} height={22} aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>{whatsapp.label}</span>
          </a>
        </div>
      </footer>
    </>
  )
}
