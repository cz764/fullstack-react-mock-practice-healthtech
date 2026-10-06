/**
 * GraphQL schema for the chat middle layer.
 *
 * TODO #2 (middle layer): design the `sendPrompt` API.
 *
 * Suggested shape (adjust as you see fit, but justify your choices):
 *
 *   input SendPromptInput { conversationId: ID, content: String! }
 *
 *   type Message { id: ID!, role: Role!, content: String!, createdAt: String! }
 *   enum Role { USER ASSISTANT }
 *
 *   type Mutation {
 *     # Accepts the user's prompt, forwards it to the backend, and returns
 *     # the assistant reply. Must surface backend failures as GraphQL errors
 *     # so the frontend can render its error state.
 *     sendPrompt(input: SendPromptInput!): Message!
 *   }
 *
 *   type Subscription {
 *     # Optional stretch: stream partial assistant output instead of
 *     # waiting for the full reply.
 *     assistantReply(conversationId: ID!): Message!
 *   }
 *
 * Things we look for:
 *   - Types line up with `frontend/src/types/chat.ts`.
 *   - Input validation (empty prompt, oversized prompt).
 *   - Clear error semantics (what does the client see when the backend is down?).
 *
 * The `health` query below exists only so the server can boot before the
 * real schema is written. Remove or keep it, your call.
 */
export const typeDefs = /* GraphQL */ `
  type Query {
    health: String!
  }
`
