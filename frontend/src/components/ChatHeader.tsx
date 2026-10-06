import type { ConnectionStatus } from '../types/chat'

interface Props {
  connection: ConnectionStatus
}

const LABELS: Record<ConnectionStatus, string> = {
  idle: 'Not connected',
  connecting: 'Connecting…',
  open: 'Connected',
  closed: 'Disconnected',
  error: 'Connection error',
}

export function ChatHeader({ connection }: Props) {
  return (
    <header className="header">
      <div>
        <h1 className="header__title">Clinical Assistant</h1>
        <p className="header__subtitle">Mock AI-assisted triage chat</p>
      </div>
      <span className={`conn conn--${connection}`} aria-label={LABELS[connection]}>
        <span className="conn__dot" aria-hidden="true" />
        {LABELS[connection]}
      </span>
    </header>
  )
}
