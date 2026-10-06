import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { simulateCompletion } from './mockLlm.js'
import { listEntries } from './db.js'

/**
 * Backend service: receives a prompt from the middle layer and returns a
 * simulated LLM completion.
 *
 * Routes
 *   GET  /healthz          liveness                      (done)
 *   GET  /mock/entries     inspect the canned responses  (done)
 *   POST /completions      { prompt, conversationId? }   ← TODO #3
 *
 * TODO #3 (backend): implement the POST /completions handler.
 *   - Read and JSON-parse the body (reject anything that is not valid JSON
 *     or lacks a non-empty string `prompt` with 400).
 *   - Call `simulateCompletion(prompt)` from ./mockLlm.ts.
 *   - Respond 200 with `{ id, content, createdAt }` matching
 *     `CompletionResponse` in middleware/src/backendClient.ts.
 *   - Map failures to 5xx with a JSON error body `{ code, message }`.
 *   - Then wire middleware/src/backendClient.ts to call this endpoint.
 */

const PORT = Number(process.env.PORT ?? 8080)

function json(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { 'content-type': 'application/json' })
  res.end(JSON.stringify(body))
}

async function handleCompletions(_req: IncomingMessage, res: ServerResponse) {
  // TODO #3: implement
  json(res, 501, { code: 'NOT_IMPLEMENTED', message: 'POST /completions is not implemented yet' })
}

const server = createServer(async (req, res) => {
  const method = req.method ?? 'GET'
  const url = req.url ?? '/'

  try {
    if (method === 'GET' && url === '/healthz') {
      res.writeHead(200, { 'content-type': 'text/plain' }).end('ok')
      return
    }
    if (method === 'GET' && url === '/mock/entries') {
      json(res, 200, listEntries())
      return
    }
    if (method === 'POST' && url === '/completions') {
      await handleCompletions(req, res)
      return
    }
    json(res, 404, { code: 'NOT_FOUND', message: `No route for ${method} ${url}` })
  } catch (err) {
    console.error('[backend] unhandled error', err)
    json(res, 500, { code: 'INTERNAL', message: 'Unexpected server error' })
  }
})

server.listen(PORT, () => {
  console.log(`backend listening on http://localhost:${PORT}`)
})

// Keep the import used until the handler is written.
void simulateCompletion
