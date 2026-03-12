import { useEffect } from 'react'

interface UseIdleMonitorOptions {
  onActivity: (timestamp: number) => void
  onIdleStart: (timestamp: number) => void
  onIdleEnd: (timestamp: number) => void
}

const idleThresholdMs = 30_000
const activityEvents = ['mousemove', 'scroll', 'click', 'keydown', 'pointerdown', 'touchstart']

export const useIdleMonitor = ({
  onActivity,
  onIdleStart,
  onIdleEnd,
}: UseIdleMonitorOptions) => {
  useEffect(() => {
    let idle = false
    let idleTimer = window.setTimeout(() => {
      idle = true
      onIdleStart(Date.now())
    }, idleThresholdMs)

    const resetTimer = () => {
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        idle = true
        onIdleStart(Date.now())
      }, idleThresholdMs)
    }

    const handleActivity = () => {
      const timestamp = Date.now()
      onActivity(timestamp)

      if (idle) {
        idle = false
        onIdleEnd(timestamp)
      }

      resetTimer()
    }

    activityEvents.forEach((eventName) => window.addEventListener(eventName, handleActivity, { passive: true }))

    return () => {
      window.clearTimeout(idleTimer)
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, handleActivity))
    }
  }, [onActivity, onIdleEnd, onIdleStart])
}
