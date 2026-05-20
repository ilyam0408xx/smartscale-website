'use client'

import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import TypingDots from './TypingDots'
import ThinkingStages from './ThinkingStages'
import QuickReplyChips from './QuickReplyChips'
import Cards from './Cards'
import RetryBubble from './RetryBubble'
import type { ChatMessage } from './types'

type Props = {
  messages: ChatMessage[]
  onChipSelect: (chip: string) => void
  onRetry: () => void
  onCta: () => void
}

export default function MessageList({ messages, onChipSelect, onRetry, onCta }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  const firstAssistantIdx = messages.findIndex((m) => m.role === 'assistant')

  return (
    <div className="aiw-messages">
      {messages.map((m, i) => {
        if (m.role === 'user') {
          return (
            <MessageBubble key={m.id} role="user">
              {m.content}
            </MessageBubble>
          )
        }

        const showSenderName = i === firstAssistantIdx

        if (m.phase === 'typing') {
          return (
            <MessageBubble key={m.id} role="assistant" showAvatar showSenderName={showSenderName}>
              <TypingDots />
            </MessageBubble>
          )
        }

        if (m.phase === 'thinking') {
          return (
            <div key={m.id} className="aiw-message-row">
              <div className="aiw-avatar" aria-hidden>S</div>
              <ThinkingStages />
            </div>
          )
        }

        if (m.phase === 'error') {
          return (
            <div key={m.id} className="aiw-message-row">
              <div className="aiw-avatar" aria-hidden>S</div>
              <RetryBubble onRetry={onRetry} />
            </div>
          )
        }

        // reply — unified bubble: text + optional chips + optional cards
        const isLatest = i === messages.length - 1
        const hasCards = !!m.cards && m.cards.length > 0
        const hasChips = isLatest && !!m.chips && m.chips.length > 0

        return (
          <div key={m.id}>
            <MessageBubble role="assistant" showAvatar showSenderName={showSenderName}>
              {m.text}
            </MessageBubble>
            {hasCards && (
              <>
                <Cards cards={m.cards!} />
                <button type="button" className="aiw-cta" onClick={onCta}>
                  {m.cta || 'בוא נדבר ב-WhatsApp'} ←
                </button>
              </>
            )}
            {hasChips && <QuickReplyChips chips={m.chips!} onSelect={onChipSelect} />}
          </div>
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}
