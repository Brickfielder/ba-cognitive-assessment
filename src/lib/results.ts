import { correctProcessSteps, moduleLabels } from '../data/content'
import { describeScore } from './scoring'
import type { ModuleId, ResultsViewModel, SessionState } from '../types'

const orderedModules: ModuleId[] = ['intake', 'processMap', 'actionItems', 'userStories']

export const buildResultsViewModel = (state: SessionState): ResultsViewModel => {
  const { metrics } = state
  const totalSessionMs =
    metrics.sessionStartedAt !== null && metrics.sessionEndedAt !== null
      ? metrics.sessionEndedAt - metrics.sessionStartedAt
      : 0

  const idleDurationMs = metrics.idleEvents.reduce((total, event) => total + event.durationMs, 0)
  const responseLatencyMs =
    metrics.interruption.shownAt !== null && metrics.interruption.dismissedAt !== null
      ? metrics.interruption.dismissedAt - metrics.interruption.shownAt
      : null
  const recoveryTimeMs =
    metrics.interruption.dismissedAt !== null && metrics.interruption.nextPrimaryActionAt !== null
      ? metrics.interruption.nextPrimaryActionAt - metrics.interruption.dismissedAt
      : null

  return {
    totalSessionMs,
    moduleSummaries: orderedModules.map((moduleId) => ({
      moduleId,
      label: moduleLabels[moduleId],
      durationMs: metrics.moduleDurations[moduleId],
    })),
    idleCount: metrics.idleEvents.length,
    idleDurationMs,
    referenceClicks: metrics.referenceClicks,
    moduleScores: [
      {
        moduleId: 'intake',
        label: moduleLabels.intake,
        score: metrics.accuracy.intake,
        interpretation: describeScore(metrics.accuracy.intake),
      },
      {
        moduleId: 'processMap',
        label: moduleLabels.processMap,
        score: metrics.accuracy.processMap,
        interpretation: describeScore(metrics.accuracy.processMap),
      },
      {
        moduleId: 'userStories',
        label: moduleLabels.userStories,
        score: metrics.accuracy.userStories,
        interpretation: describeScore(metrics.accuracy.userStories),
      },
    ],
    interruption: {
      targetModuleLabel: moduleLabels[metrics.interruption.targetModule],
      responseLatencyMs,
      recoveryTimeMs,
      responseOption: metrics.interruption.responseOption,
    },
    processMapReview: correctProcessSteps.map((step, index) => {
      const actualIndex = state.processSteps.findIndex((item) => item.id === step.id)

      return {
        stepId: step.id,
        expectedPosition: index + 1,
        actualPosition: actualIndex >= 0 ? actualIndex + 1 : null,
        label: step.label,
        isCorrect: actualIndex === index,
      }
    }),
  }
}
