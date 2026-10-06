import { findResponse } from './db.js'

/**
 * Simulated LLM call. No real model is contacted.
 *
 * TODO #3 (backend): implement `simulateCompletion`.
 *   - Look up a canned reply with `findResponse(prompt)`.
 *   - Simulate inference latency (e.g. 600–1500 ms) so the frontend's
 *     loading state is actually visible.
 *   - Simulate occasional failure (e.g. ~10%) or honour an opt-in header /
 *     env flag so the error path can be demonstrated on demand.
 *   - Return a `Completion` with a unique id and ISO timestamp.
 *
 * Stretch: expose an async iterator that yields the reply in chunks so the
 * middle layer can stream it over a GraphQL subscription.
 */

export interface Completion {
  id: string
  content: string
  createdAt: string
  /** which mock entry produced this reply, useful for debugging */
  source: string
}

export async function simulateCompletion(_prompt: string): Promise<Completion> {
  throw Object.assign(new Error('mockLlm.simulateCompletion is not implemented'), {
    code: 'NOT_IMPLEMENTED',
  })
}

// Keep the import used until the function body is written.
void findResponse
