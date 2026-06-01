import type { Product } from '@/app/portfolio/data'

export default function ProductCard({ product }: { product: Product }) {
  const p = product
  return (
    <article className="pf-prod reveal">
      <div className="pf-prod-top">
        <h3 className="pf-prod-name">{p.name}</h3>
        <span className="pf-chip pf-chip--soft">{p.tag}</span>
      </div>
      <p className="pf-prod-tagline">{p.tagline}</p>
      <p className="pf-prod-desc">{p.desc}</p>
      <ul className="pf-prod-points">
        {p.points.map((pt) => (
          <li key={pt}>{pt}</li>
        ))}
      </ul>
      {p.link && (
        <a
          className="pf-link"
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          לצפייה ↗
        </a>
      )}
    </article>
  )
}
