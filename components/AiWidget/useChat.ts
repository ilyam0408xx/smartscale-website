'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChatMessage } from './types'

const STORAGE_KEY = 'smartscale_chat'
const TYPING_MIN_MS = 500
const THINKING_MIN_MS = 3000

function nextId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function isPersistable(m: ChatMessage): boolean {
  if (m.role === 'user') return true
  return m.phase === 'question' || m.phase === 'recommendation'
}

function loadFromStorage(): ChatMessage[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isPersistable)
  } catch {
    return []
  }
}

function saveToStorage(messages: ChatMessage[]) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.filter(isPersistable)))
  } catch {
    /* quota / private mode — silently ignore */
  }
}

function clearStorage() {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

type ApiRequestMessage = { role: 'user' | 'assistant'; content: string }

function toApiMessages(messages: ChatMessage[]): ApiRequestMessage[] {
  const out: ApiRequestMessage[] = []
  for (const m of messages) {
    if (m.role === 'user') {
      out.push({ role: 'user', content: m.content })
    } else if (m.role === 'assistant') {
      if (m.phase === 'question') {
        out.push({ role: 'assistant', content: m.text })
      } else if (m.phase === 'recommendation') {
        const cardsText = m.cards.map((c) => `${c.title}: ${c.result}`).join(' | ')
        out.push({ role: 'assistant', content: `${m.greeting} ${cardsText}` })
      }
    }
  }
  return out
}

type Send = (content: string) => Promise<void>

export function useChat(pathname: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [hydrated, setHydrated] = useState(false)
  const inflightRef = useRef(false)

  // Hydrate from sessionStorage on mount
  useEffect(() => {
    setMessages(loadFromStorage())
    setHydrated(true)
  }, [])

  // Persist on every change
  useEffect(() => {
    if (!hydrated) return
    saveToStorage(messages)
  }, [messages, hydrated])

  const callApi = useCallback(
    async (priorMessages: ChatMessage[]): Promise<void> => {
      const userTurns = priorMessages.filter((m) => m.role === 'user').length
      const expectsRecommendation = userTurns >= 4
      // userTurns === 3 may or may not be recommendation — model decides via DECISION_PROMPT

      // Insert appropriate placeholder
      const placeholderId = nextId()
      const placeholder: ChatMessage = expectsRecommendation
        ? { id: placeholderId, role: 'assistant', phase: 'thinking' }
        : { id: placeholderId, role: 'assistant', phase: 'typing' }
      const placeholderStartedAt = Date.now()
      setMessages((m) => [...m, placeholder])

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: toApiMessages(priorMessages),
            pathname,
          }),
        })

        const data = await res.json()

        if (!res.ok || data?.error || !data?.phase) {
          throw new Error(data?.error || 'api_error')
        }

        // If the response is recommendation but we were showing typing (turn 3 surprise),
        // upgrade the placeholder to thinking and wait for minimum stages duration.
        let finalPlaceholderPhase = placeholder.phase as 'typing' | 'thinking'
        if (data.phase === 'recommendation' && finalPlaceholderPhase === 'typing') {
          setMessages((m) =>
            m.map((msg) => (msg.id === placeholderId ? { ...msg, phase: 'thinking' as const } : msg)),
          )
          finalPlaceholderPhase = 'thinking'
        }

        // Enforce minimum display duration so the indicator doesn't pop in/out
        const minMs = finalPlaceholderPhase === 'thinking' ? THINKING_MIN_MS : TYPING_MIN_MS
        const elapsed = Date.now() - placeholderStartedAt
        if (elapsed < minMs) {
          await new Promise((r) => setTimeout(r, minMs - elapsed))
        }

        // Replace placeholder with the real response
        setMessages((m) =>
          m.map((msg) => {
            if (msg.id !== placeholderId) return msg
            if (data.phase === 'question') {
              return {
                id: placeholderId,
                role: 'assistant',
                phase: 'question',
                text: String(data.text || ''),
                chips: Array.isArray(data.chips) ? data.chips.filter((c: unknown) => typeof c === 'string') : [],
              }
            }
            // recommendation
            return {
              id: placeholderId,
              role: 'assistant',
              phase: 'recommendation',
              greeting: String(data.greeting || ''),
              cards: Array.isArray(data.cards) ? data.cards : [],
              cta: String(data.cta || 'בוא נדבר ב-WhatsApp'),
            }
          }),
        )
      } catch (err) {
        console.error('chat fetch error', err)
        setMessages((m) =>
          m.map((msg) => (msg.id === placeholderId ? { id: placeholderId, role: 'assistant' as const, phase: 'error' as const } : msg)),
        )
      }
    },
    [pathname],
  )

  // Initial opening — fire only once when widget hydrated and messages are empty
  const startConversation = useCallback(async () => {
    if (inflightRef.current) return
    if (messages.length > 0) return
    inflightRef.current = true
    try {
      await callApi([])
    } finally {
      inflightRef.current = false
    }
  }, [messages.length, callApi])

  const send: Send = useCallback(
    async (content) => {
      const trimmed = content.trim()
      if (!trimmed) return
      if (inflightRef.current) return
      inflightRef.current = true
      const userMsg: ChatMessage = { id: nextId(), role: 'user', content: trimmed }
      // Capture previous (excluding any transient placeholder) for API
      const prior = messages.filter((m) => m.role !== 'assistant' || (m.phase !== 'typing' && m.phase !== 'thinking' && m.phase !== 'error'))
      const nextMessages = [...prior, userMsg]
      setMessages(nextMessages)
      try {
        await callApi(nextMessages)
      } finally {
        inflightRef.current = false
      }
    },
    [messages, callApi],
  )

  const retry = useCallback(async () => {
    if (inflightRef.current) return
    inflightRef.current = true
    // Remove the error bubble and re-fetch with the same prior context
    const withoutError = messages.filter(
      (m) => !(m.role === 'assistant' && m.phase === 'error'),
    )
    setMessages(withoutError)
    try {
      await callApi(withoutError)
    } finally {
      inflightRef.current = false
    }
  }, [messages, callApi])

  const reset = useCallback(() => {
    setMessages([])
    clearStorage()
  }, [])

  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant')
  const chatLocked = lastAssistant?.role === 'assistant' && lastAssistant.phase === 'recommendation'

  const userTurns = messages.filter((m) => m.role === 'user').length

  return {
    messages,
    hydrated,
    userTurns,
    chatLocked,
    startConversation,
    send,
    retry,
    reset,
  }
}
