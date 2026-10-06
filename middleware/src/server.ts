import { createServer } from 'node:http'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/use/ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs } from './schema.js'
import { resolvers } from './resolvers.js'

/**
 * GraphQL-over-WebSocket server using the `graphql-ws` protocol.
 *
 * The frontend connects to ws://localhost:4000/graphql and sends
 * queries, mutations and subscriptions over the single socket.
 * The transport is fixed on purpose; the candidate's work (TODO #2) is the
 * schema and resolvers, not the plumbing.
 */

const PORT = Number(process.env.PORT ?? 4000)
const PATH = '/graphql'

const schema = makeExecutableSchema({ typeDefs, resolvers })

// Plain HTTP server so we have something to attach the WS upgrade to,
// and a trivial liveness endpoint for curl / load balancers.
const httpServer = createServer((req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200, { 'content-type': 'text/plain' }).end('ok')
    return
  }
  res.writeHead(404).end()
})

const wsServer = new WebSocketServer({ server: httpServer, path: PATH })

useServer(
  {
    schema,
    onConnect: (ctx) => {
      console.log('[ws] client connected', ctx.extra.request.socket.remoteAddress)
    },
    onDisconnect: () => {
      console.log('[ws] client disconnected')
    },
    onError: (_ctx, _id, _payload, errors) => {
      console.error('[ws] operation error', errors)
    },
  },
  wsServer,
)

httpServer.listen(PORT, () => {
  console.log(`middleware listening on http://localhost:${PORT}  (ws path: ${PATH})`)
})
