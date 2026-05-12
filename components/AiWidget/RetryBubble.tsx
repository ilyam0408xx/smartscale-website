type Props = { onRetry: () => void }

export default function RetryBubble({ onRetry }: Props) {
  return (
    <div className="aiw-retry">
      <p className="aiw-retry-text">⚠ משהו השתבש. רוצה לנסות שוב?</p>
      <button type="button" className="aiw-retry-btn" onClick={onRetry}>
        נסה שוב
      </button>
    </div>
  )
}
