/**
 * Boundary between the middle layer and the backend service.
 *
 * The backend (TODO #3) will expose an endpoint that receives a prompt and
 * returns a simulated LLM completion from a local mock database.
 * This module is the ONLY place the middle layer should know about how to
 * reach that service, so swapping transports or hosts later is a one-file change.
 */

export interface CompletionRequest {
  prompt: string
  conversationId?: string
}

export interface CompletionResponse {
  id: string
  content: string
  createdAt: string
}

export const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:8080'

/**
 * Forwards a prompt to the backend and resolves with its completion.
 *
 * Intentionally unimplemented. The candidate wires this once the backend
 * exists (TODO #3). Until then it rejects so the resolver's error path can
 * be exercised end-to-end.
 */
export async function requestCompletion(
  _req: CompletionRequest,
): Promise<CompletionResponse> {
  throw Object.assign(new Error('backendClient.requestCompletion is not implemented'), {
    code: 'NOT_IMPLEMENTED',
  })
}
