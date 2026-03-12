import { ProgressHeader } from './components/ProgressHeader'
import { InterruptionModal } from './components/InterruptionModal'
import { useIdleMonitor } from './hooks/useIdleMonitor'
import { useInterruptionScheduler } from './hooks/useInterruptionScheduler'
import { buildResultsViewModel } from './lib/results'
import { ActionItemsScreen } from './screens/ActionItemsScreen'
import { IntakeScreen } from './screens/IntakeScreen'
import { ProcessMapScreen } from './screens/ProcessMapScreen'
import { ResultsScreen } from './screens/ResultsScreen'
import { UserStoriesScreen } from './screens/UserStoriesScreen'
import { useAssessment } from './store/AssessmentContext'

const App = () => {
  const {
    state,
    recordActivity,
    recordMeaningfulInteraction,
    enterModule,
    updateIntakeAnswer,
    submitIntake,
    incrementReferenceClicks,
    reorderProcessSteps,
    submitProcessMap,
    updateUserStory,
    submitUserStories,
    startIdle,
    endIdle,
    showInterruption,
    respondToInterruption,
  } = useAssessment()

  useIdleMonitor({
    onActivity: recordActivity,
    onIdleStart: startIdle,
    onIdleEnd: endIdle,
  })

  useInterruptionScheduler({
    state,
    showInterruption,
  })

  const results = buildResultsViewModel(state)

  return (
    <div className="app-shell">
      <div className="ambient-orb ambient-orb-left" />
      <div className="ambient-orb ambient-orb-right" />

      <main className="workspace">
        <section className="masthead">
          <div>
            <p className="eyebrow">Static React Assessment</p>
            <h1>Business Analyst Cognitive Readiness App</h1>
          </div>
          <p>
            A single-session, privacy-preserving workflow that simulates a compact BA project and
            surfaces clinician-friendly telemetry at the end.
          </p>
        </section>

        <ProgressHeader activeModule={state.activeModule} />

        {state.activeModule === 'intake' ? (
          <IntakeScreen
            answers={state.intakeAnswers}
            referenceClicks={state.metrics.referenceClicks}
            onAnswerChange={updateIntakeAnswer}
            onReferenceClick={incrementReferenceClicks}
            onMeaningfulInteraction={recordMeaningfulInteraction}
            onSubmit={() => {
              const timestamp = Date.now()
              submitIntake(timestamp)
              enterModule('processMap', timestamp)
            }}
          />
        ) : null}

        {state.activeModule === 'processMap' ? (
          <ProcessMapScreen
            steps={state.processSteps}
            onMeaningfulInteraction={recordMeaningfulInteraction}
            onReorder={reorderProcessSteps}
            onSubmit={() => {
              const timestamp = Date.now()
              submitProcessMap(timestamp)
              enterModule('actionItems', timestamp)
            }}
          />
        ) : null}

        {state.activeModule === 'actionItems' ? (
          <ActionItemsScreen
            onMeaningfulInteraction={recordMeaningfulInteraction}
            onOpenBuilder={() => {
              enterModule('userStories')
            }}
          />
        ) : null}

        {state.activeModule === 'userStories' ? (
          <UserStoriesScreen
            stories={state.userStories}
            onMeaningfulInteraction={recordMeaningfulInteraction}
            onChange={updateUserStory}
            onSubmit={() => {
              const timestamp = Date.now()
              submitUserStories(timestamp)
              enterModule('results', timestamp)
            }}
          />
        ) : null}

        {state.activeModule === 'results' ? <ResultsScreen results={results} /> : null}
      </main>

      {state.metrics.interruption.isVisible ? (
        <InterruptionModal
          shownAt={state.metrics.interruption.shownAt}
          onRespond={(response) => {
            respondToInterruption(response)
          }}
        />
      ) : null}
    </div>
  )
}

export default App
