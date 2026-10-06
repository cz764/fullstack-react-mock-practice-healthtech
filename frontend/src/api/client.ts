import { createClient, type Client } from 'graphql-ws'
import type { ConnectionStatus } from '../types/chat'

/**
 * Singleton graphql-ws client. This is the real transport to the middle
 * layer and is complete; the candidate should not need to change it.
 *
 * Connection status is exposed through a tiny subscribe API so the header
 * pill can reflect it once someone wires it up (part of TODO #1 if you
 * want to show it, optional).
 */

export const GRAPHQL_WS_URL =
  import.meta.env.VITE_GRAPHQL_WS_URL ?? 'ws://localhost:4000/graphql'

type Listener = (status: ConnectionStatus) => void
const listeners = new Set<Listener>()
let status: ConnectionStatus = 'idle'
let client: Client | null = null

function setStatus(next: ConnectionStatus) {
  status = next
  listeners.forEach((l) => l(next))
}

export function getConnectionStatus(): ConnectionStatus {
  return status
}

export function onConnectionStatus(listener: Listener): () => void {
  listeners.add(listener)
  listener(status)
  return () => listeners.delete(listener)
}

/** Lazily create the socket on first use so a mocked run never opens one. */
export function getClient(): Client {
  if (client) return client
  setStatus('connecting')
  client = createClient({
    url: GRAPHQL_WS_URL,
    lazy: false,
    retryAttempts: 5,
    on: {
      connected: () => setStatus('open'),
      closed: () => setStatus('closed'),
      error: () => setStatus('error'),
    },
  })
  return client
}
