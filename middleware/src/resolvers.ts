import { requestCompletion } from './backendClient.js'

/**
 * Resolver map for the schema in ./schema.ts
 *
 * TODO #2 (middle layer): implement `Mutation.sendPrompt`.
 *   - Validate the input.
 *   - Call `requestCompletion()` from ./backendClient.ts (its real
 *     implementation is TODO #3; until then it throws NOT_IMPLEMENTED).
 *   - Map the backend result onto the `Message` type.
 *   - Translate backend failures into a GraphQLError with a stable
 *     `extensions.code` so the frontend can branch on it.
 */
export const resolvers = {
  Query: {
    health: () => 'ok',
  },

  // Mutation: {
  //   sendPrompt: async (_parent: unknown, args: { input: SendPromptInput }) => {
  //     ...
  //   },
  // },
}

// Keep the import "used" until the resolver is written so the type-checker
// and linter do not complain about an unused symbol.
void requestCompletion
