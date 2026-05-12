import type { ReactNode } from 'react'

type Props = {
  role: 'user' | 'assistant'
  showAvatar?: boolean
  showSenderName?: boolean
  children: ReactNode
}

export default function MessageBubble({ role, showAvatar, showSenderName, children }: Props) {
  const isUser = role === 'user'
  return (
    <div>
      {!isUser && showSenderName && <p className="aiw-sender-name">Smart Scale</p>}
      <div className={`aiw-message-row ${isUser ? 'is-user' : ''}`}>
        {!isUser && showAvatar && (
          <div className="aiw-avatar" aria-hidden>S</div>
        )}
        <div className={`aiw-bubble ${isUser ? 'is-user' : 'is-assistant'}`}>{children}</div>
      </div>
    </div>
  )
}
