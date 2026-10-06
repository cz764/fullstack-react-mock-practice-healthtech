# backend

Node + TypeScript service that stands in for the "LLM" tier. It never
calls a real model; replies come from a small local JSON database.

```
db/mockResponses.json   canned replies keyed by keywords      (done)
src/db.ts               loader + keyword lookup               (done)
src/mockLlm.ts          simulateCompletion()                  ← TODO #3
src/server.ts           HTTP routes, POST /completions        ← TODO #3
```

```sh
npm install
npm run dev          # http://localhost:8080
npm run typecheck

curl localhost:8080/healthz
curl localhost:8080/mock/entries | head -c 300
curl -X POST localhost:8080/completions -H 'content-type: application/json' \
     -d '{"prompt":"I have a sore throat"}'
```
