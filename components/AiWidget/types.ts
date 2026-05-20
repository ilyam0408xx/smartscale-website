import type { Card } from '@/lib/ai-widget-prompt'

export type { Card }

export type AssistantReply = {
  id: string
  role: 'assistant'
  phase: 'reply'
  text: string
  chips?: string[]
  cards?: Card[]
  cta?: string
}

export type ChatMessage =
  | { id: string; role: 'user'; content: string }
  | AssistantReply
  | { id: string; role: 'assistant'; phase: 'typing' }
  | { id: string; role: 'assistant'; phase: 'thinking' }
  | { id: string; role: 'assistant'; phase: 'error' }

export type WidgetState = 'closed' | 'chatting' | 'capture' | 'thankyou'
