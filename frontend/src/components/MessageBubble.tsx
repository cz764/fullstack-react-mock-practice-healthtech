import type { Message } from '../types/chat'

interface Props {
  message: Message
}

export function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user'
  return (
    <li className={`bubble ${isUser ? 'bubble--user' : 'bubble--assistant'}`}>
      <span className="bubble__role">{isUser ? 'You' : 'Assistant'}</span>
      <p className="bubble__content">{message.content}</p>
      <time className="bubble__time" dateTime={message.createdAt}>
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </time>
    </li>
  )
}
