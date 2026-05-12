import Anthropic from '@anthropic-ai/sdk'
import {
  getOpeningPrompt,
  QUESTION_PROMPT,
  DECISION_PROMPT,
  RECOMMENDATION_PROMPT,
  SEND_MESSAGE_TOOL,
  type ChatPayload,
} from '@/lib/ai-widget-prompt'

const client = new Anthropic()

type RequestMessage = {
  role: 'user' | 'assistant'
  content: string
}

function pickSystemPrompt(userTurns: number, pathname: string): string {
  if (userTurns === 0) return getOpeningPrompt(pathname)
  if (userTurns <= 2) return QUESTION_PROMPT
  if (userTurns === 3) return DECISION_PROMPT
  return RECOMMENDATION_PROMPT
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const messages: RequestMessage[] = Array.isArray(body?.messages) ? body.messages : []
    const pathname: string = typeof body?.pathname === 'string' ? body.pathname : '/'

    const userTurns = messages.filter((m) => m.role === 'user').length
    const system = pickSystemPrompt(userTurns, pathname)

    // For the opening message, Anthropic API requires at least one message.
    // Use a placeholder user message that the system prompt accounts for.
    const apiMessages =
      messages.length === 0
        ? [{ role: 'user' as const, content: 'התחל את השיחה.' }]
        : messages.map((m) => ({ role: m.role, content: m.content }))

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system,
      tools: [SEND_MESSAGE_TOOL],
      tool_choice: { type: 'tool', name: 'send_message' },
      messages: apiMessages,
    })

    const toolBlock = response.content.find(
      (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use',
    )

    if (!toolBlock || toolBlock.name !== 'send_message') {
      return Response.json(
        { error: 'no_tool_use', userMessage: 'משהו השתבש. נסה שוב.' },
        { status: 500 },
      )
    }

    const payload = toolBlock.input as ChatPayload

    // Server-side enforcement: if userTurns >= 4 and the model still returned a question, force recommendation.
    if (userTurns >= 4 && payload.phase !== 'recommendation') {
      return Response.json(
        { error: 'turn_limit_violation', userMessage: 'משהו השתבש. נסה שוב.' },
        { status: 500 },
      )
    }

    return Response.json(payload)
  } catch (err) {
    console.error('AI Widget error:', err)
    return Response.json(
      { error: 'server_error', userMessage: 'בעיית חיבור. נסה שוב.' },
      { status: 500 },
    )
  }
}
