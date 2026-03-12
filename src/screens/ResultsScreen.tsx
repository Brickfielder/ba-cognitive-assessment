import { formatDuration } from '../lib/format'
import type { ResultsViewModel } from '../types'

interface ResultsScreenProps {
  results: ResultsViewModel
}

export const ResultsScreen = ({ results }: ResultsScreenProps) => {
  return (
    <section className="module-card results-screen" data-testid="results-screen">
      <header className="module-header">
        <div>
          <p className="eyebrow">Clinician Dashboard</p>
          <h1>Session summary</h1>
        </div>
        <p className="module-copy">
          All telemetry below is session-local and will clear on refresh or close.
        </p>
      </header>

      <div className="results-hero">
        <article className="metric-card">
          <span>Total session time</span>
          <strong>{formatDuration(results.totalSessionMs)}</strong>
        </article>
        <article className="metric-card">
          <span>Idle instances (30s+)</span>
          <strong>{results.idleCount}</strong>
        </article>
        <article className="metric-card">
          <span>Reference clicks</span>
          <strong>{results.referenceClicks}</strong>
        </article>
        <article className="metric-card">
          <span>Total idle duration</span>
          <strong>{formatDuration(results.idleDurationMs)}</strong>
        </article>
      </div>

      <div className="results-grid">
        <article className="results-panel">
          <h2>Time per module</h2>
          <ul className="results-list">
            {results.moduleSummaries.map((summary) => (
              <li key={summary.moduleId}>
                <span>{summary.label}</span>
                <strong>{formatDuration(summary.durationMs)}</strong>
              </li>
            ))}
          </ul>
        </article>

        <article className="results-panel">
          <h2>Accuracy scores</h2>
          <ul className="results-list">
            {results.moduleScores.map((score) => (
              <li key={score.moduleId}>
                <span>
                  {score.label}
                  <small>{score.interpretation}</small>
                </span>
                <strong>{score.score}%</strong>
              </li>
            ))}
          </ul>
        </article>

        <article className="results-panel process-review-panel">
          <h2>Module 2 ground truth review</h2>
          <p className="results-note">
            The Module 2 score reflects exact-position matches against the canonical process sequence
            below.
          </p>
          <ol className="process-review-list">
            {results.processMapReview.map((item) => (
              <li key={item.stepId} className={item.isCorrect ? 'is-correct' : 'is-mismatch'}>
                <div>
                  <strong>
                    #{item.expectedPosition} expected
                  </strong>
                  <p>{item.label}</p>
                </div>
                <span>
                  {item.actualPosition !== null ? `Placed at #${item.actualPosition}` : 'Not placed'}
                </span>
              </li>
            ))}
          </ol>
        </article>

        <article className="results-panel">
          <h2>Interruption recovery</h2>
          <ul className="results-list">
            <li>
              <span>Target module</span>
              <strong>{results.interruption.targetModuleLabel}</strong>
            </li>
            <li>
              <span>Response latency</span>
              <strong>
                {results.interruption.responseLatencyMs !== null
                  ? formatDuration(results.interruption.responseLatencyMs)
                  : 'Not triggered'}
              </strong>
            </li>
            <li>
              <span>Return-to-task time</span>
              <strong>
                {results.interruption.recoveryTimeMs !== null
                  ? formatDuration(results.interruption.recoveryTimeMs)
                  : 'Not recorded'}
              </strong>
            </li>
            <li>
              <span>Selected response</span>
              <strong>{results.interruption.responseOption ?? 'No response captured'}</strong>
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}
