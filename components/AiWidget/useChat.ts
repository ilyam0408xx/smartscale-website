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
  return m.phase === 'reply'
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

/**
 * Convert local chat messages to the format the API expects.
 * Assistant replies preserve the full text plus a brief marker when cards were shown,
 * so the model can see what UI artifacts it produced previously.
 */
function toApiMessages(messages: ChatMessage[]): ApiRequestMessage[] {
  const out: ApiRequestMessage[] = []
  for (const m of messages) {
    if (m.role === 'user') {
      out.push({ role: 'user', content: m.content })
    } else if (m.role === 'assistant' && m.phase === 'reply') {
      let content = m.text
      if (m.cards && m.cards.length > 0) {
        const titles = m.cards.map((c) => c.title).join(', ')
        content += `\n[הצגתי כרטיסיות שירות: ${titles}]`
      }
      out.push({ role: 'assistant', content })
    }
    // typing / thinking / error are transient — not sent to the model
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
      // Insert placeholder. We start with 'typing' and upgrade to 'thinking' if the
      // response turns out to include cards (slower, weightier moment).
      const placeholderId = nextId()
      const placeholder: ChatMessage = { id: placeholderId, role: 'assistant', phase: 'typing' }
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

        if (!res.ok || data?.error || typeof data?.text !== 'string') {
          throw new Error(data?.error || 'api_error')
        }

        const hasCards = Array.isArray(data.cards) && data.cards.length > 0

        // If recommendation incoming, upgrade indicator and let it breathe.
        let finalPlaceholderPhase: 'typing' | 'thinking' = 'typing'
        if (hasCards) {
          setMessages((m) =>
            m.map((msg) =>
              msg.id === placeholderId ? { ...msg, phase: 'thinking' as const } : msg,
            ),
          )
          finalPlaceholderPhase = 'thinking'
        }

        const minMs = finalPlaceholderPhase === 'thinking' ? THINKING_MIN_MS : TYPING_MIN_MS
        const elapsed = Date.now() - placeholderStartedAt
        if (elapsed < minMs) {
          await new Promise((r) => setTimeout(r, minMs - elapsed))
        }

        setMessages((m) =>
          m.map((msg) => {
            if (msg.id !== placeholderId) return msg
            const reply: ChatMessage = {
              id: placeholderId,
              role: 'assistant',
              phase: 'reply',
              text: String(data.text),
            }
            if (Array.isArray(data.chips) && data.chips.length > 0) {
              reply.chips = data.chips.filter((c: unknown) => typeof c === 'string')
            }
            if (hasCards) {
              reply.cards = data.cards
            }
            if (typeof data.cta === 'string' && data.cta.trim()) {
              reply.cta = data.cta
            }
            return reply
          }),
        )
      } catch (err) {
        console.error('chat fetch error', err)
        setMessages((m) =>
          m.map((msg) =>
            msg.id === placeholderId
              ? { id: placeholderId, role: 'assistant' as const, phase: 'error' as const }
              : msg,
          ),
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
      // Drop any transient placeholders before sending
      const prior = messages.filter(
        (m) =>
          m.role !== 'assistant' ||
          (m.phase !== 'typing' && m.phase !== 'thinking' && m.phase !== 'error'),
      )
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

  const userTurns = messages.filter((m) => m.role === 'user').length

  return {
    messages,
    hydrated,
    userTurns,
    startConversation,
    send,
    retry,
    reset,
  }
}
