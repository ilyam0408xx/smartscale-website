import type { Card } from '@/lib/ai-widget-prompt'

export type { Card }

export type ChatMessage =
  | { id: string; role: 'user'; content: string }
  | { id: string; role: 'assistant'; phase: 'question'; text: string; chips: string[] }
  | { id: string; role: 'assistant'; phase: 'recommendation'; greeting: string; cards: Card[]; cta: string }
  | { id: string; role: 'assistant'; phase: 'typing' }
  | { id: string; role: 'assistant'; phase: 'thinking' }
  | { id: string; role: 'assistant'; phase: 'error' }

export type WidgetState = 'closed' | 'chatting' | 'capture' | 'thankyou'
