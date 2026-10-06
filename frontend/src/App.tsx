import { ChatHeader } from './components/ChatHeader'
import { MessageList } from './components/MessageList'
import { Composer } from './components/Composer'
import type { Message } from './types/chat'

/**
 * Static skeleton. No state, no network, no WebSocket yet.
 * The hardcoded conversation below exists only so the layout can be seen.
 * Once TODO #1–#3 are done, this should come from the transport layer.
 */
const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    role: 'user',
    content: "I've had a sore throat and mild fever since yesterday.",
    createdAt: '2026-10-06T14:02:00Z',
  },
  {
    id: 'm2',
    role: 'assistant',
    content:
      "I'm sorry you're not feeling well. A sore throat with a mild fever is often viral. Are you also experiencing a cough, difficulty swallowing, or swollen glands?",
    createdAt: '2026-10-06T14:02:04Z',
  },
]

export default function App() {
  return (
    <main className="app">
      <ChatHeader connection="idle" />
      <MessageList messages={MOCK_MESSAGES} status="idle" />
      <Composer status="idle" />
      <footer className="disclaimer">
        This is a mock interview sandbox. No real clinical advice is provided and no data is stored.
      </footer>
    </main>
  )
}
