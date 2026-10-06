/**
 * Shared chat domain types for the frontend.
 * These shapes are intended to mirror the GraphQL schema that will be
 * designed in the middle layer (see TODO #2).
 */

export type Role = 'user' | 'assistant'

export interface Message {
  id: string
  role: Role
  content: string
  createdAt: string // ISO-8601
}

/** Connection lifecycle for the (future) WebSocket transport. */
export type ConnectionStatus = 'idle' | 'connecting' | 'open' | 'closed' | 'error'

/** Request lifecycle for a single prompt round-trip. */
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error'
