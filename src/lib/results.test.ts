import { correctProcessSteps } from '../data/content'
import { buildResultsViewModel } from './results'
import { createInitialSessionState } from '../store/assessmentReducer'

describe('buildResultsViewModel', () => {
  it('includes process-map ground truth details for the clinician dashboard', () => {
    const state = createInitialSessionState({ now: 0, randomValue: 0 })
    const orderedState = {
      ...state,
      processSteps: correctProcessSteps.map((step, index, list) => {
        if (index === 0) {
          return list[1]!
        }

        if (index === 1) {
          return list[0]!
        }

        return step
      }),
    }

    const results = buildResultsViewModel(orderedState)

    expect(results.processMapReview[0]).toMatchObject({
      expectedPosition: 1,
      actualPosition: 2,
      isCorrect: false,
    })
    expect(results.processMapReview[1]).toMatchObject({
      expectedPosition: 2,
      actualPosition: 1,
      isCorrect: false,
    })
    expect(results.processMapReview[2]).toMatchObject({
      expectedPosition: 3,
      actualPosition: 3,
      isCorrect: true,
    })
  })
})
