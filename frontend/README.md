# frontend

React + TypeScript (Vite) chat UI for the Clinical Assistant mock interview.

```
src/
  App.tsx                   static shell with hardcoded messages
  types/chat.ts             Message, Role, ConnectionStatus, RequestStatus
  components/
    ChatHeader.tsx          title + connection pill
    MessageList.tsx         bubbles, loading dots, error alert
    MessageBubble.tsx       one message
    Composer.tsx            textarea + Send button             ← TODO #1
  api/
    client.ts               graphql-ws singleton               (done)
    mockSendPrompt.ts       in-browser mock with latency       (done)
    sendPrompt.ts           entry point the Composer calls     ← TODO #2 (real transport)
```

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + bundle
```

> **Important:** `src/api/sendPrompt.ts` returns the in-browser mock
> (`mockSendPrompt`) until the middle layer exists. After finishing TODO #2,
> change the body of `sendPrompt` to call `realSendPrompt` instead. This is a
> deliberate one-line code switch; there is no env var or feature flag.

Mock behaviour: 600–1200 ms latency, keyword-matched canned replies with a
fallback, and a prompt containing the word "fail" rejects so the error state
can be demoed.

`VITE_GRAPHQL_WS_URL` (see `.env.example`) overrides the middleware socket
address once the real transport is in use.
