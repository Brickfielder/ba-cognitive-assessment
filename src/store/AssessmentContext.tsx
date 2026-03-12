import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ActionDispatch,
  type PropsWithChildren,
} from 'react'
import { assessmentReducer, createInitialSessionState } from './assessmentReducer'
import type { IntakeAnswers, ModuleId, SessionState, UserStorySelection } from '../types'

interface AssessmentContextValue {
  state: SessionState
  recordActivity: (timestamp?: number) => void
  recordMeaningfulInteraction: (timestamp?: number) => void
  enterModule: (moduleId: ModuleId, timestamp?: number) => void
  updateIntakeAnswer: (key: keyof IntakeAnswers, value: string) => void
  submitIntake: (timestamp?: number) => void
  incrementReferenceClicks: () => void
  reorderProcessSteps: (steps: SessionState['processSteps']) => void
  submitProcessMap: (timestamp?: number) => void
  updateUserStory: (index: 0 | 1, key: keyof UserStorySelection, value: string) => void
  submitUserStories: (timestamp?: number) => void
  startIdle: (timestamp?: number) => void
  endIdle: (timestamp?: number) => void
  showInterruption: (timestamp?: number) => void
  respondToInterruption: (response: string, timestamp?: number) => void
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null)

const createActions = (dispatch: ActionDispatch<[Parameters<typeof assessmentReducer>[1]]>) => ({
  recordActivity: (timestamp = Date.now()) => dispatch({ type: 'recordActivity', timestamp }),
  recordMeaningfulInteraction: (timestamp = Date.now()) =>
    dispatch({ type: 'recordMeaningfulInteraction', timestamp }),
  enterModule: (moduleId: ModuleId, timestamp = Date.now()) =>
    dispatch({ type: 'enterModule', moduleId, timestamp }),
  updateIntakeAnswer: (key: keyof IntakeAnswers, value: string) =>
    dispatch({ type: 'updateIntakeAnswer', key, value }),
  submitIntake: (timestamp = Date.now()) => dispatch({ type: 'submitIntake', timestamp }),
  incrementReferenceClicks: () => dispatch({ type: 'incrementReferenceClicks' }),
  reorderProcessSteps: (steps: SessionState['processSteps']) =>
    dispatch({ type: 'reorderProcessSteps', steps }),
  submitProcessMap: (timestamp = Date.now()) => dispatch({ type: 'submitProcessMap', timestamp }),
  updateUserStory: (index: 0 | 1, key: keyof UserStorySelection, value: string) =>
    dispatch({ type: 'updateUserStory', index, key, value }),
  submitUserStories: (timestamp = Date.now()) => dispatch({ type: 'submitUserStories', timestamp }),
  startIdle: (timestamp = Date.now()) => dispatch({ type: 'startIdle', timestamp }),
  endIdle: (timestamp = Date.now()) => dispatch({ type: 'endIdle', timestamp }),
  showInterruption: (timestamp = Date.now()) => dispatch({ type: 'showInterruption', timestamp }),
  respondToInterruption: (response: string, timestamp = Date.now()) =>
    dispatch({ type: 'respondToInterruption', response, timestamp }),
})

export const AssessmentProvider = ({ children }: PropsWithChildren) => {
  const e2eMode =
    typeof window !== 'undefined' && new URL(window.location.href).searchParams.get('e2e') === '1'
  const [state, dispatch] = useReducer(
    assessmentReducer,
    undefined,
    () => createInitialSessionState({ e2eMode, randomValue: e2eMode ? 0 : undefined }),
  )

  const actions = useMemo(() => createActions(dispatch), [dispatch])

  return (
    <AssessmentContext.Provider value={{ state, ...actions }}>
      {children}
    </AssessmentContext.Provider>
  )
}

export const useAssessment = () => {
  const context = useContext(AssessmentContext)

  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider')
  }

  return context
}
