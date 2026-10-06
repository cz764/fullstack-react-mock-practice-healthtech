# middleware

GraphQL middle layer served over WebSocket using the
[`graphql-ws`](https://github.com/enisdenjo/graphql-ws) protocol.

```
src/
  server.ts         HTTP + WS server, graphql-ws wiring   (done, do not need to touch)
  schema.ts         GraphQL SDL                           ← TODO #2
  resolvers.ts      Resolver map                          ← TODO #2
  backendClient.ts  Boundary to the backend service       ← wired in TODO #3
```

```sh
npm install
npm run dev          # ws://localhost:4000/graphql, GET /healthz
npm run typecheck
```

Smoke test the socket from Node:

```sh
node --input-type=module -e "
import { createClient } from 'graphql-ws';
import WebSocket from 'ws';
const c = createClient({ url: 'ws://localhost:4000/graphql', webSocketImpl: WebSocket });
const r = await new Promise((res, rej) => { let d; c.subscribe({ query: '{ health }' }, { next: v => d = v, error: rej, complete: () => res(d) }) });
console.log(r); c.dispose();
"
```
