import { proofItems } from '@/app/portfolio/data'

export default function ProofGrid() {
  return (
    <div className="pf-proof">
      {proofItems.map((item) => (
        <div className="pf-proof-card reveal" key={item.title}>
          <span className="pf-proof-field">{item.field}</span>
          <h3 className="pf-proof-title">{item.title}</h3>
          <p className="pf-proof-desc">{item.desc}</p>
        </div>
      ))}
    </div>
  )
}
