# Mock AI-Assisted Development Interview – Full-Stack Engineer

A deliberately incomplete chatbot app used as a mock interview exercise.
The candidate uses an agentic coding tool (e.g. Claude Code) to finish
three TODOs spanning the full stack.

## Scenario

A patient-facing "Clinical Assistant" chat. The user types a prompt, the
frontend sends it over a WebSocket through a GraphQL middle layer to a
backend, the backend simulates an LLM call against a local mock database,
and the reply comes back to the UI with proper loading and error states.

## Layout

```
frontend/     React + TypeScript (Vite)                      Send button stubbed   ← TODO #1
middleware/   GraphQL over WebSocket (graphql-ws), Node+TS   schema/resolver stubbed ← TODO #2
backend/      Node+TS mock LLM service + local JSON DB       handler/simulator stubbed ← TODO #3
```

Transport is fixed as WebSocket via `graphql-ws` on purpose. The exercise
tests how the candidate designs and implements the API, not which transport
they pick. "Why not SSE?" is a good discussion question afterwards.

## Candidate TODOs

1. **Frontend** – make the Send button work (`frontend/src/components/Composer.tsx`).
   Controlled input, call `sendPrompt` from `frontend/src/api/sendPrompt.ts`,
   optimistic append, disable while loading, surface error state. The API is
   mocked in-browser, so this TODO is testable on its own. A prompt containing
   "fail" triggers the mock error path.
2. **Middle layer** – design and implement a `sendPrompt` GraphQL operation
   (`middleware/src/schema.ts`, `middleware/src/resolvers.ts`), implement the
   client side in `frontend/src/api/sendPrompt.ts`, and wire
   `middleware/src/backendClient.ts` to the backend.
3. **Backend** – implement `POST /completions` (`backend/src/server.ts`) and
   `simulateCompletion` (`backend/src/mockLlm.ts`): look up a canned reply,
   add artificial latency, simulate occasional failure, return the response.

Every stub carries a `TODO #n` comment with the expected behaviour.
Search the repo for `TODO #` to find them all.

> **Important:** `frontend/src/api/sendPrompt.ts` returns the in-browser mock
> (`mockSendPrompt`) until the middle layer exists. After finishing TODO #2,
> change the body of `sendPrompt` to call `realSendPrompt` instead. This is a
> deliberate one-line code switch; there is no env var or feature flag.

## Interviewer notes

Recruiter guidance for the real interview, which this mock mirrors:

- Focus is a comprehensive full-stack solution to a contextual problem.
- Spend time upfront gathering requirements before coding.
- Candidates may use their languages of choice and should show fluency in
  what they already know. Their stack is GCP, Kotlin/KMP backend, GraphQL +
  JavaScript middle layer, React frontend. Node is used here for speed.

## Running everything

Three terminals, each `npm install` once:

```sh
cd backend    && npm run dev    # http://localhost:8080
cd middleware && npm run dev    # ws://localhost:4000/graphql
cd frontend   && npm run dev    # http://localhost:5173
```
