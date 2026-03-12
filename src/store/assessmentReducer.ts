import { correctProcessSteps, defaultUserStories } from '../data/content'
import {
  calculateIntakeAccuracy,
  calculateProcessAccuracy,
  calculateUserStoryAccuracy,
} from '../lib/scoring'
import type {
  IntakeAnswers,
  InterruptionTargetModule,
  ModuleId,
  ProcessStep,
  SessionState,
  UserStorySelection,
} from '../types'

export interface SessionSeedOptions {
  randomValue?: number
  now?: number
  e2eMode?: boolean
}

type AssessmentAction =
  | { type: 'recordActivity'; timestamp: number }
  | { type: 'recordMeaningfulInteraction'; timestamp: number }
  | { type: 'enterModule'; moduleId: ModuleId; timestamp: number }
  | { type: 'updateIntakeAnswer'; key: keyof IntakeAnswers; value: string }
  | { type: 'submitIntake'; timestamp: number }
  | { type: 'incrementReferenceClicks' }
  | { type: 'reorderProcessSteps'; steps: ProcessStep[] }
  | { type: 'submitProcessMap'; timestamp: number }
  | {
      type: 'updateUserStory'
      index: 0 | 1
      key: keyof UserStorySelection
      value: string
    }
  | { type: 'submitUserStories'; timestamp: number }
  | { type: 'startIdle'; timestamp: number }
  | { type: 'endIdle'; timestamp: number }
  | { type: 'showInterruption'; timestamp: number }
  | { type: 'respondToInterruption'; timestamp: number; response: string }

const moduleDurations = {
  intake: 0,
  processMap: 0,
  actionItems: 0,
  userStories: 0,
  results: 0,
}

const intakeAnswers: IntakeAnswers = {
  autoFill: '',
  dashboard: '',
  ptoBalance: '',
  mobile: '',
}

const closeCurrentModuleTimer = (state: SessionState, timestamp: number) => {
  const elapsed = Math.max(0, timestamp - state.metrics.moduleEnteredAt)
  return {
    ...state.metrics.moduleDurations,
    [state.activeModule]: state.metrics.moduleDurations[state.activeModule] + elapsed,
  }
}

const shuffleSteps = (steps: ProcessStep[], randomValue: number) => {
  const offset = Math.floor(randomValue * steps.length)
  return [...steps.slice(offset), ...steps.slice(0, offset)].reverse()
}

export const createInitialSessionState = (options: SessionSeedOptions = {}): SessionState => {
  const now = options.now ?? Date.now()
  const randomValue = options.randomValue ?? Math.random()
  const e2eMode = options.e2eMode ?? false
  const targetModule: InterruptionTargetModule = e2eMode
    ? 'userStories'
    : randomValue >= 0.5
      ? 'userStories'
      : 'processMap'

  return {
    activeModule: 'intake',
    metrics: {
      sessionStartedAt: null,
      sessionEndedAt: null,
      moduleEnteredAt: now,
      moduleDurations: { ...moduleDurations },
      idleEvents: [],
      idleActiveSince: null,
      referenceClicks: 0,
      interruption: {
        targetModule,
        triggerDelayMs: e2eMode ? 300 : 4000 + Math.round(randomValue * 2500),
        shownAt: null,
        dismissedAt: null,
        nextPrimaryActionAt: null,
        responseOption: null,
        isVisible: false,
      },
      accuracy: {
        intake: 0,
        processMap: 0,
        userStories: 0,
      },
      lastActivityAt: null,
    },
    intakeAnswers: { ...intakeAnswers },
    processSteps: shuffleSteps(correctProcessSteps, randomValue),
    userStories: [...defaultUserStories] as [UserStorySelection, UserStorySelection],
  }
}

export const assessmentReducer = (state: SessionState, action: AssessmentAction): SessionState => {
  switch (action.type) {
    case 'recordActivity':
      return {
        ...state,
        metrics: {
          ...state.metrics,
          lastActivityAt: action.timestamp,
        },
      }

    case 'recordMeaningfulInteraction': {
      const startedAt = state.metrics.sessionStartedAt ?? action.timestamp
      const shouldMarkRecovery =
        !state.metrics.interruption.isVisible &&
        state.metrics.interruption.dismissedAt !== null &&
        state.metrics.interruption.nextPrimaryActionAt === null

      return {
        ...state,
        metrics: {
          ...state.metrics,
          sessionStartedAt: startedAt,
          lastActivityAt: action.timestamp,
          interruption: shouldMarkRecovery
            ? {
                ...state.metrics.interruption,
                nextPrimaryActionAt: action.timestamp,
              }
            : state.metrics.interruption,
        },
      }
    }

    case 'enterModule': {
      if (action.moduleId === state.activeModule) {
        return state
      }

      const nextModuleDurations = closeCurrentModuleTimer(state, action.timestamp)
      const sessionEndedAt = action.moduleId === 'results' ? action.timestamp : state.metrics.sessionEndedAt

      return {
        ...state,
        activeModule: action.moduleId,
        metrics: {
          ...state.metrics,
          sessionEndedAt,
          moduleEnteredAt: action.timestamp,
          moduleDurations: nextModuleDurations,
        },
      }
    }

    case 'updateIntakeAnswer':
      return {
        ...state,
        intakeAnswers: {
          ...state.intakeAnswers,
          [action.key]: action.value,
        },
      }

    case 'submitIntake':
      return {
        ...state,
        metrics: {
          ...state.metrics,
          accuracy: {
            ...state.metrics.accuracy,
            intake: calculateIntakeAccuracy(state.intakeAnswers),
          },
          lastActivityAt: action.timestamp,
        },
      }

    case 'incrementReferenceClicks':
      return {
        ...state,
        metrics: {
          ...state.metrics,
          referenceClicks: state.metrics.referenceClicks + 1,
        },
      }

    case 'reorderProcessSteps':
      return {
        ...state,
        processSteps: action.steps,
      }

    case 'submitProcessMap':
      return {
        ...state,
        metrics: {
          ...state.metrics,
          accuracy: {
            ...state.metrics.accuracy,
            processMap: calculateProcessAccuracy(state.processSteps),
          },
          lastActivityAt: action.timestamp,
        },
      }

    case 'updateUserStory': {
      const nextStories = state.userStories.map((story, index) => {
        if (index !== action.index) {
          return story
        }

        return {
          ...story,
          [action.key]: action.value,
        }
      }) as [UserStorySelection, UserStorySelection]

      return {
        ...state,
        userStories: nextStories,
      }
    }

    case 'submitUserStories':
      return {
        ...state,
        metrics: {
          ...state.metrics,
          accuracy: {
            ...state.metrics.accuracy,
            userStories: calculateUserStoryAccuracy(state.userStories),
          },
          lastActivityAt: action.timestamp,
        },
      }

    case 'startIdle':
      if (state.metrics.idleActiveSince !== null) {
        return state
      }

      return {
        ...state,
        metrics: {
          ...state.metrics,
          idleActiveSince: action.timestamp,
        },
      }

    case 'endIdle': {
      if (state.metrics.idleActiveSince === null) {
        return state
      }

      return {
        ...state,
        metrics: {
          ...state.metrics,
          idleActiveSince: null,
          idleEvents: [
            ...state.metrics.idleEvents,
            {
              startedAt: state.metrics.idleActiveSince,
              endedAt: action.timestamp,
              durationMs: Math.max(0, action.timestamp - state.metrics.idleActiveSince),
            },
          ],
          lastActivityAt: action.timestamp,
        },
      }
    }

    case 'showInterruption':
      if (
        state.metrics.interruption.shownAt !== null ||
        state.activeModule !== state.metrics.interruption.targetModule
      ) {
        return state
      }

      return {
        ...state,
        metrics: {
          ...state.metrics,
          interruption: {
            ...state.metrics.interruption,
            shownAt: action.timestamp,
            isVisible: true,
          },
          lastActivityAt: action.timestamp,
        },
      }

    case 'respondToInterruption':
      return {
        ...state,
        metrics: {
          ...state.metrics,
          interruption: {
            ...state.metrics.interruption,
            dismissedAt: action.timestamp,
            responseOption: action.response,
            isVisible: false,
          },
          lastActivityAt: action.timestamp,
        },
      }

    default:
      return state
  }
}
