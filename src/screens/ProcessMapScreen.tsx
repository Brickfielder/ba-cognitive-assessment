import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableProcessItem } from '../components/SortableProcessItem'
import type { ProcessStep } from '../types'

interface ProcessMapScreenProps {
  steps: ProcessStep[]
  onReorder: (steps: ProcessStep[]) => void
  onSubmit: () => void
  onMeaningfulInteraction: () => void
}

export const ProcessMapScreen = ({
  steps,
  onReorder,
  onSubmit,
  onMeaningfulInteraction,
}: ProcessMapScreenProps) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 120,
        tolerance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = steps.findIndex((step) => step.id === active.id)
    const newIndex = steps.findIndex((step) => step.id === over.id)

    onMeaningfulInteraction()
    onReorder(arrayMove(steps, oldIndex, newIndex))
  }

  return (
    <section className="module-card" data-testid="process-map-screen">
      <header className="module-header">
        <div>
          <p className="eyebrow">Module 2</p>
          <h1>Process sequencing</h1>
        </div>
        <p className="module-copy">
          Reorder the vacation-booking workflow into the correct chronological sequence.
        </p>
      </header>

      <div className="process-layout">
        <div className="support-card">
          <h2>How to complete this step</h2>
          <p>
            Drag each step into place. Touch users can press and drag a row, and keyboard users
            can focus a row and use the arrow keys to move it.
          </p>
          <p className="support-stat">Accuracy is based on exact step placement across all eight items.</p>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={steps.map((step) => step.id)} strategy={verticalListSortingStrategy}>
            <ol className="process-list">
              {steps.map((step, index) => (
                <SortableProcessItem key={step.id} step={step} index={index} />
              ))}
            </ol>
          </SortableContext>
        </DndContext>

        <button
          type="button"
          className="primary-button"
          onClick={() => {
            onMeaningfulInteraction()
            onSubmit()
          }}
        >
          Save process map
        </button>
      </div>
    </section>
  )
}
