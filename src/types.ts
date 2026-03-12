export type ModuleId = 'intake' | 'processMap' | 'actionItems' | 'userStories' | 'results'

export type AssessableModuleId = 'intake' | 'processMap' | 'userStories'

export type InterruptionTargetModule = 'processMap' | 'userStories'

export interface ProcessStep {
  id: string
  label: string
}

export interface IntakeAnswers {
  autoFill: string
  dashboard: string
  ptoBalance: string
  mobile: string
}

export interface UserStorySelection {
  role: string
  action: string
  benefit: string
}

export interface IdleEvent {
  startedAt: number
  endedAt: number
  durationMs: number
}

export interface InterruptionMetrics {
  targetModule: InterruptionTargetModule
  triggerDelayMs: number
  shownAt: number | null
  dismissedAt: number | null
  nextPrimaryActionAt: number | null
  responseOption: string | null
  isVisible: boolean
}

export interface AccuracyScores {
  intake: number
  processMap: number
  userStories: number
}

export interface SessionMetrics {
  sessionStartedAt: number | null
  sessionEndedAt: number | null
  moduleEnteredAt: number
  moduleDurations: Record<ModuleId, number>
  idleEvents: IdleEvent[]
  idleActiveSince: number | null
  referenceClicks: number
  interruption: InterruptionMetrics
  accuracy: AccuracyScores
  lastActivityAt: number | null
}

export interface ResultsViewModel {
  totalSessionMs: number
  moduleSummaries: Array<{
    moduleId: ModuleId
    label: string
    durationMs: number
  }>
  idleCount: number
  idleDurationMs: number
  referenceClicks: number
  moduleScores: Array<{
    moduleId: AssessableModuleId
    label: string
    score: number
    interpretation: string
  }>
  interruption: {
    targetModuleLabel: string
    responseLatencyMs: number | null
    recoveryTimeMs: number | null
    responseOption: string | null
  }
  processMapReview: Array<{
    stepId: string
    expectedPosition: number
    actualPosition: number | null
    label: string
    isCorrect: boolean
  }>
}

export interface SessionState {
  activeModule: ModuleId
  metrics: SessionMetrics
  intakeAnswers: IntakeAnswers
  processSteps: ProcessStep[]
  userStories: [UserStorySelection, UserStorySelection]
}
