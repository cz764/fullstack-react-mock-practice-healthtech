import type { Message } from "../types/chat";
import { mockSendPrompt } from "./mockSendPrompt";
import { getClient } from "./client";

/**
 * Frontend entry point for sending a prompt to the assistant.
 * This is the function the Composer should call in TODO #1.
 *
 * Important: `sendPrompt` currently returns the in-browser mock
 * (`mockSendPrompt`) so the UI can be built and tested in isolation.
 * After TODO #2 is done, switch the body of `sendPrompt` at the bottom of
 * this file to call `realSendPrompt` instead. There is no env var or
 * feature flag; the switch is a deliberate one-line code change.
 *
 * TODO #2 (middle layer): implement `realSendPrompt` below once the
 * `sendPrompt` mutation exists in middleware/src/schema.ts. The exact
 * document, variables and response mapping depend on the schema you
 * design, so they are deliberately left open. Sketch:
 *
 *   const SEND_PROMPT = `
 *     mutation SendPrompt($input: SendPromptInput!) {
 *       sendPrompt(input: $input) { id role content createdAt }
 *     }`
 *
 *   return new Promise((resolve, reject) => {
 *     let result: Message | undefined
 *     getClient().subscribe<{ sendPrompt: Message }>(
 *       { query: SEND_PROMPT, variables: { input } },
 *       {
 *         next: (r) => { result = r.data?.sendPrompt },
 *         error: reject,
 *         complete: () => result ? resolve(result) : reject(new Error('empty')),
 *       },
 *     )
 *   })
 *
 * Remember to map GraphQL errors (and `extensions.code`) into something the
 * UI can show, and to keep `Message` in sync with the schema's `Message` type.
 */

export interface SendPromptInput {
  content: string;
  conversationId?: string;
}

async function realSendPrompt(_input: SendPromptInput): Promise<Message> {
  getClient(); // opens the socket so the connection pill reacts
  throw Object.assign(
    new Error("sendPrompt over graphql-ws is not implemented (TODO #2)"),
    {
      code: "NOT_IMPLEMENTED",
    },
  );
}

export function sendPrompt(input: SendPromptInput): Promise<Message> {
  return mockSendPrompt(input);

  // Important: TODO #2 change to this after TODO #2 is done
  // return realSendPrompt(input);
}
