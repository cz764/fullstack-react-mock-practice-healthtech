import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

/**
 * Tiny local "database" of canned assistant responses.
 * Loaded once at startup from ../db/mockResponses.json.
 * This file is complete; the candidate should not need to change it.
 */

export interface MockEntry {
  id: string
  keywords: string[]
  response: string
}

interface MockDb {
  fallback: string
  entries: MockEntry[]
}

const here = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.resolve(here, '../db/mockResponses.json')

const db: MockDb = JSON.parse(readFileSync(dbPath, 'utf8'))

/**
 * Returns the canned response whose keywords match the prompt,
 * falling back to a generic follow-up question.
 */
export function findResponse(prompt: string): { entryId: string; content: string } {
  const text = prompt.toLowerCase()
  const match = db.entries.find((e) => e.keywords.some((k) => text.includes(k)))
  return match
    ? { entryId: match.id, content: match.response }
    : { entryId: 'fallback', content: db.fallback }
}

export function listEntries(): MockEntry[] {
  return db.entries
}
