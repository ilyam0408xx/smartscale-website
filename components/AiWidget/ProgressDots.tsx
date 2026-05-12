type Props = { userTurns: number; total?: number }

export default function ProgressDots({ userTurns, total = 3 }: Props) {
  const active = Math.min(userTurns, total)
  return (
    <div className="aiw-progress" role="progressbar" aria-valuenow={active} aria-valuemin={0} aria-valuemax={total} aria-label="התקדמות השיחה">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`aiw-progress-dot ${i < active ? 'is-active' : ''}`} />
      ))}
    </div>
  )
}
