import type { RequestStatus } from '../types/chat'

interface Props {
  status: RequestStatus
}

/**
 * Prompt input + send button.
 *
 * TODO #1 (frontend): make the Send button work.
 *   - Hold the draft prompt in local state (controlled textarea).
 *   - On submit (button click or Enter without Shift), call `sendPrompt`
 *     from `src/api/sendPrompt.ts` (mocked in-browser by default, real
 *     transport arrives with TODO #2), append the user message
 *     optimistically, and clear the draft.
 *   - Tip: a prompt containing the word "fail" makes the mock reject, so
 *     you can demo the error state.
 *   - Disable the button while `status === 'loading'` or the draft is empty.
 *   - Surface loading / error state through the parent (`App`) so
 *     `MessageList` can render it.
 */
export function Composer({ status }: Props) {
  const isBusy = status === 'loading'

  return (
    <form
      className="composer"
      onSubmit={(e) => {
        e.preventDefault()
        // TODO #1: wire submission here
      }}
    >
      <label htmlFor="prompt" className="sr-only">
        Your message
      </label>
      <textarea
        id="prompt"
        className="composer__input"
        placeholder="Describe how you're feeling…"
        rows={2}
        disabled={isBusy}
      />
      <button type="submit" className="composer__send" disabled>
        {isBusy ? 'Sending…' : 'Send'}
      </button>
    </form>
  )
}
