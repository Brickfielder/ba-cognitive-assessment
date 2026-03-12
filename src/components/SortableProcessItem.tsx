import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { ProcessStep } from '../types'

interface SortableProcessItemProps {
  step: ProcessStep
  index: number
}

export const SortableProcessItem = ({ step, index }: SortableProcessItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: step.id,
  })

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`process-item${isDragging ? ' is-dragging' : ''}`}
    >
      <button
        type="button"
        className="process-handle"
        aria-label={`Move step ${index + 1}: ${step.label}`}
        {...attributes}
        {...listeners}
      >
        <span className="process-number">{index + 1}</span>
        <span>{step.label}</span>
      </button>
    </li>
  )
}
