import { correctProcessSteps } from '../data/content'
import { assessmentReducer, createInitialSessionState } from './assessmentReducer'

describe('assessmentReducer', () => {
  it('starts the session on the first meaningful interaction', () => {
    const initial = createInitialSessionState({ now: 100, randomValue: 0 })
    const next = assessmentReducer(initial, {
      type: 'recordMeaningfulInteraction',
      timestamp: 150,
    })

    expect(next.metrics.sessionStartedAt).toBe(150)
  })

  it('tracks reference clicks and idle events', () => {
    const initial = createInitialSessionState({ now: 100, randomValue: 0 })
    const withClicks = assessmentReducer(initial, { type: 'incrementReferenceClicks' })
    const idleStarted = assessmentReducer(withClicks, { type: 'startIdle', timestamp: 200 })
    const idleEnded = assessmentReducer(idleStarted, { type: 'endIdle', timestamp: 24100 })

    expect(idleEnded.metrics.referenceClicks).toBe(1)
    expect(idleEnded.metrics.idleEvents).toHaveLength(1)
    expect(idleEnded.metrics.idleEvents[0]?.durationMs).toBe(23900)
  })

  it('records module timing and interruption recovery', () => {
    const initial = createInitialSessionState({ now: 0, randomValue: 0 })
    const active = assessmentReducer(initial, {
      type: 'recordMeaningfulInteraction',
      timestamp: 1000,
    })
    const processMap = assessmentReducer(active, {
      type: 'enterModule',
      moduleId: 'processMap',
      timestamp: 2000,
    })
    const shown = assessmentReducer(processMap, { type: 'showInterruption', timestamp: 2500 })
    const responded = assessmentReducer(shown, {
      type: 'respondToInterruption',
      timestamp: 3000,
      response: 'Yes',
    })
    const recovered = assessmentReducer(responded, {
      type: 'recordMeaningfulInteraction',
      timestamp: 3600,
    })
    const reordered = assessmentReducer(recovered, {
      type: 'reorderProcessSteps',
      steps: correctProcessSteps,
    })
    const submitted = assessmentReducer(reordered, {
      type: 'submitProcessMap',
      timestamp: 5000,
    })
    const results = assessmentReducer(submitted, {
      type: 'enterModule',
      moduleId: 'results',
      timestamp: 7000,
    })

    expect(results.metrics.moduleDurations.intake).toBe(2000)
    expect(results.metrics.moduleDurations.processMap).toBe(5000)
    expect(results.metrics.interruption.nextPrimaryActionAt).toBe(3600)
    expect(results.metrics.accuracy.processMap).toBe(100)
    expect(results.metrics.sessionEndedAt).toBe(7000)
  })
})
