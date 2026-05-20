import type { Card } from './types'

type Props = { greeting?: string; cards: Card[] }

export default function Cards({ greeting, cards }: Props) {
  return (
    <div>
      {greeting && <p className="aiw-greeting">{greeting}</p>}
      <div className="aiw-cards">
        {cards.map((card, i) => (
          <div
            key={i}
            className="aiw-card"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <p className="aiw-card-title">
              <span aria-hidden>💡</span>
              <span>{card.title}</span>
            </p>
            <p className="aiw-card-problem">{card.problem}</p>
            <p className="aiw-card-result">
              <span aria-hidden>✅</span>
              <span>{card.result}</span>
            </p>
            {card.example && <p className="aiw-card-example">{card.example}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
