import { moduleLabels } from '../data/content'
import type { ModuleId } from '../types'

const visibleModules: ModuleId[] = ['intake', 'processMap', 'actionItems', 'userStories', 'results']

interface ProgressHeaderProps {
  activeModule: ModuleId
}

export const ProgressHeader = ({ activeModule }: ProgressHeaderProps) => {
  return (
    <div className="progress-shell" aria-label="Assessment progress">
      {visibleModules.map((moduleId, index) => {
        const isActive = moduleId === activeModule
        const isComplete = visibleModules.indexOf(activeModule) > index

        return (
          <div
            key={moduleId}
            className={`progress-step${isActive ? ' is-active' : ''}${isComplete ? ' is-complete' : ''}`}
          >
            <span className="progress-index">{index + 1}</span>
            <span className="progress-label">{moduleLabels[moduleId]}</span>
          </div>
        )
      })}
    </div>
  )
}
