import { interruptionPrompt } from '../data/content'
import { formatClockTime } from '../lib/format'

interface InterruptionModalProps {
  shownAt: number | null
  onRespond: (response: string) => void
}

export const InterruptionModal = ({ shownAt, onRespond }: InterruptionModalProps) => {
  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className="chat-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="interruption-title"
        data-testid="interruption-modal"
      >
        <div className="chat-meta">
          <div>
            <p className="eyebrow">Incoming Chat</p>
            <h2 id="interruption-title">{interruptionPrompt.sender}</h2>
          </div>
          <span>{shownAt ? formatClockTime(shownAt) : 'Now'}</span>
        </div>
        <p className="chat-message">{interruptionPrompt.message}</p>
        <div className="response-list">
          {interruptionPrompt.responses.map((response) => (
            <button key={response} type="button" className="response-button" onClick={() => onRespond(response)}>
              {response}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
