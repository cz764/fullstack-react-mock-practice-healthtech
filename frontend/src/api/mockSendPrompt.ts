import type { Message } from '../types/chat'
import type { SendPromptInput } from './sendPrompt'

/**
 * In-browser mock of the middle layer so the UI can be built and tested
 * before the GraphQL API (TODO #2) and backend (TODO #3) exist.
 *
 * Behaviour:
 *   - 600–1200 ms artificial latency so the loading state is visible.
 *   - A prompt containing the word "fail" rejects, so the error state can be
 *     exercised on demand.
 *   - Otherwise returns a keyword-matched canned reply, mirroring
 *     backend/db/mockResponses.json loosely.
 */

const CANNED: Array<{ keywords: string[]; reply: string }> = [
  {
    keywords: ['sore throat', 'throat'],
    reply:
      'A sore throat is most often viral and improves within a week. Warm fluids and rest help. Seek care if you have trouble breathing or swallowing liquids.',
  },
  {
    keywords: ['fever', 'temperature'],
    reply:
      'A mild fever is a normal immune response. Stay hydrated. What is your current temperature, and do you have any rash, stiff neck, or shortness of breath?',
  },
  {
    keywords: ['headache'],
    reply:
      'Headaches are commonly tension or dehydration related. If this is the worst headache of your life or came on suddenly, call 911.',
  },
  {
    keywords: ['hello', 'hi', 'hey'],
    reply: "Hello! I'm your virtual clinical assistant. Tell me what's bothering you today.",
  },
]

const FALLBACK =
  'Thanks for sharing that. When did this start, and does anything make it better or worse?'

function pickReply(prompt: string): string {
  const text = prompt.toLowerCase()
  return CANNED.find((c) => c.keywords.some((k) => text.includes(k)))?.reply ?? FALLBACK
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export async function mockSendPrompt(input: SendPromptInput): Promise<Message> {
  await sleep(600 + Math.random() * 600)

  if (/\bfail\b/i.test(input.content)) {
    throw Object.assign(new Error('Mock middleware error: simulated failure'), {
      code: 'MOCK_FAILURE',
    })
  }

  return {
    id: `mock-${Date.now()}`,
    role: 'assistant',
    content: pickReply(input.content),
    createdAt: new Date().toISOString(),
  }
}
