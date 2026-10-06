import type { Message, RequestStatus } from '../types/chat'
import { MessageBubble } from './MessageBubble'

interface Props {
  messages: Message[]
  status: RequestStatus
  errorMessage?: string
}

export function MessageList({ messages, status, errorMessage }: Props) {
  return (
    <section className="messages" aria-live="polite" aria-label="Conversation">
      {messages.length === 0 && (
        <p className="messages__empty">
          Start the conversation by describing your symptoms or asking a question.
        </p>
      )}

      <ul className="messages__list">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
      </ul>

      {status === 'loading' && (
        <div className="status status--loading" role="status">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="sr-only">Assistant is typing</span>
        </div>
      )}

      {status === 'error' && (
        <div className="status status--error" role="alert">
          {errorMessage ?? 'Something went wrong. Please try again.'}
        </div>
      )}
    </section>
  )
}
