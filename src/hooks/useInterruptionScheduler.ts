import { useEffect } from 'react'
import type { SessionState } from '../types'

interface UseInterruptionSchedulerOptions {
  state: SessionState
  showInterruption: (timestamp?: number) => void
}

export const useInterruptionScheduler = ({
  state,
  showInterruption,
}: UseInterruptionSchedulerOptions) => {
  useEffect(() => {
    if (
      state.metrics.interruption.shownAt !== null ||
      state.metrics.interruption.dismissedAt !== null ||
      state.activeModule !== state.metrics.interruption.targetModule ||
      state.metrics.sessionStartedAt === null
    ) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      showInterruption(Date.now())
    }, state.metrics.interruption.triggerDelayMs)

    return () => window.clearTimeout(timer)
  }, [
    showInterruption,
    state.activeModule,
    state.metrics.interruption.dismissedAt,
    state.metrics.interruption.shownAt,
    state.metrics.interruption.targetModule,
    state.metrics.interruption.triggerDelayMs,
    state.metrics.sessionStartedAt,
  ])
}
