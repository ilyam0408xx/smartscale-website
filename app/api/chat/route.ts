import Anthropic from '@anthropic-ai/sdk'
import {
  buildAdvisorPrompt,
  SEND_MESSAGE_TOOL,
  type ReplyPayload,
} from '@/lib/ai-widget-prompt'

const client = new Anthropic()

type RequestMessage = {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const messages: RequestMessage[] = Array.isArray(body?.messages) ? body.messages : []
    const pathname: string = typeof body?.pathname === 'string' ? body.pathname : '/'

    const system = buildAdvisorPrompt(pathname)

    // Anthropic API requires the first message to be role: user. The widget's history
    // begins with the assistant's opening, so prepend a synthetic user marker whenever
    // the first message we'd send is the assistant.
    const mapped = messages.map((m) => ({ role: m.role, content: m.content }))
    const apiMessages =
      mapped.length === 0
        ? [{ role: 'user' as const, content: 'התחל את השיחה.' }]
        : mapped[0].role === 'assistant'
          ? [{ role: 'user' as const, content: 'התחל את השיחה.' }, ...mapped]
          : mapped

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system,
      tools: [SEND_MESSAGE_TOOL],
      tool_choice: { type: 'tool', name: 'send_message' },
      messages: apiMessages,
    })

    const toolBlock = response.content.find(
      (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use',
    )

    if (toolBlock && toolBlock.name === 'send_message') {
      const input = (toolBlock.input ?? {}) as Partial<ReplyPayload>
      const payload: ReplyPayload = {
        text: typeof input.text === 'string' && input.text.trim() ? input.text : '...',
        ...(Array.isArray(input.chips) && input.chips.length > 0
          ? { chips: input.chips.filter((c) => typeof c === 'string') }
          : {}),
        ...(Array.isArray(input.cards) && input.cards.length > 0
          ? { cards: input.cards as ReplyPayload['cards'] }
          : {}),
        ...(typeof input.cta === 'string' && input.cta.trim() ? { cta: input.cta } : {}),
      }
      return Response.json(payload)
    }

    // Fallback: model returned a plain text block without using the tool. Wrap and continue.
    const textBlock = response.content.find(
      (block): block is Anthropic.TextBlock => block.type === 'text',
    )
    const fallbackText = textBlock?.text?.trim()
    if (fallbackText) {
      return Response.json({ text: fallbackText } satisfies ReplyPayload)
    }

    // True empty response — extremely rare.
    return Response.json(
      { error: 'empty_response', userMessage: 'בעיית חיבור. נסה שוב.' },
      { status: 502 },
    )
  } catch (err) {
    console.error('AI Widget error:', err)
    return Response.json(
      { error: 'server_error', userMessage: 'בעיית חיבור. נסה שוב.' },
      { status: 500 },
    )
  }
}
