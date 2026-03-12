import { useState } from 'react'
import { hrEmail, intakeQuestions } from '../data/content'
import type { IntakeAnswers } from '../types'

interface IntakeScreenProps {
  answers: IntakeAnswers
  referenceClicks: number
  onAnswerChange: (key: keyof IntakeAnswers, value: string) => void
  onSubmit: () => void
  onMeaningfulInteraction: () => void
  onReferenceClick: () => void
}

export const IntakeScreen = ({
  answers,
  referenceClicks,
  onAnswerChange,
  onSubmit,
  onMeaningfulInteraction,
  onReferenceClick,
}: IntakeScreenProps) => {
  const [showForm, setShowForm] = useState(false)
  const [showReference, setShowReference] = useState(false)

  const isComplete = Object.values(answers).every(Boolean)

  return (
    <section className="module-card" data-testid="intake-screen">
      <header className="module-header">
        <div>
          <p className="eyebrow">Business Analyst Return-to-Work Assessment</p>
          <h1>{showForm ? 'Requirement Gathering Form' : 'Module 1: Information Intake'}</h1>
        </div>
        <p className="module-copy">
          Capture the key pain points and requested capabilities for the new vacation booking system.
        </p>
      </header>

      {!showForm ? (
        <div className="email-card">
          <div className="email-header">
            <div>
              <p className="eyebrow">From</p>
              <h2>{hrEmail.sender}</h2>
            </div>
            <div>
              <p className="eyebrow">Subject</p>
              <p>{hrEmail.title}</p>
            </div>
          </div>
          <div className="email-body">
            {hrEmail.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              onMeaningfulInteraction()
              setShowForm(true)
            }}
          >
            Next: Capture requirements
          </button>
        </div>
      ) : (
        <div className="form-layout">
          <div className="card-stack">
            <div className="support-card">
              <div>
                <p className="eyebrow">Memory aid</p>
                <h2>Source material access</h2>
              </div>
              <p>You can reopen the original email while completing the form. Each access is counted.</p>
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  onMeaningfulInteraction()
                  onReferenceClick()
                  setShowReference(true)
                }}
              >
                Review source material
              </button>
              <p className="support-stat">Reference clicks: {referenceClicks}</p>
            </div>

            {showReference ? (
              <aside className="reference-card" aria-label="Source material reference">
                <div className="reference-header">
                  <h3>{hrEmail.title}</h3>
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => {
                      onMeaningfulInteraction()
                      setShowReference(false)
                    }}
                  >
                    Close
                  </button>
                </div>
                {hrEmail.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </aside>
            ) : null}
          </div>

          <form
            className="question-grid"
            onSubmit={(event) => {
              event.preventDefault()
              onMeaningfulInteraction()
              onSubmit()
            }}
          >
            {intakeQuestions.map((question) => (
              <label key={question.key} className="question-card">
                <span>{question.label}</span>
                <select
                  value={answers[question.key]}
                  onChange={(event) => {
                    onMeaningfulInteraction()
                    setShowReference(false)
                    onAnswerChange(question.key, event.target.value)
                  }}
                >
                  {question.options.map((option) => (
                    <option key={option.value || 'empty'} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}

            <button type="submit" className="primary-button" disabled={!isComplete}>
              Continue to the process map
            </button>
          </form>
        </div>
      )}
    </section>
  )
}
