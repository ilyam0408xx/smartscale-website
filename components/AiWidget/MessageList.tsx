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
  chatLocked: boolean
}

export default function MessageList({ messages, onChipSelect, onRetry, onCta, chatLocked }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  // First assistant index — for showing "Smart Scale" label only once at the top
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

        if (m.phase === 'question') {
          // chips only show on the most recent question, and only if chat is not locked
          const isLatest = i === messages.length - 1
          return (
            <div key={m.id}>
              <MessageBubble role="assistant" showAvatar showSenderName={showSenderName}>
                {m.text}
              </MessageBubble>
              {isLatest && !chatLocked && (
                <QuickReplyChips chips={m.chips} onSelect={onChipSelect} />
              )}
            </div>
          )
        }

        // recommendation
        return (
          <div key={m.id}>
            <MessageBubble role="assistant" showAvatar showSenderName={showSenderName}>
              <Cards greeting={m.greeting} cards={m.cards} />
              <button type="button" className="aiw-cta" onClick={onCta}>
                {m.cta} ←
              </button>
            </MessageBubble>
          </div>
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}
