import {
  correctIntakeAnswers,
  correctProcessSteps,
  correctUserStories,
} from '../data/content'
import type { IntakeAnswers, ProcessStep, UserStorySelection } from '../types'

const percentage = (value: number, total: number) => {
  if (total === 0) {
    return 0
  }

  return Math.round((value / total) * 100)
}

export const calculateIntakeAccuracy = (answers: IntakeAnswers) => {
  const matches = Object.entries(correctIntakeAnswers).filter(([key, value]) => {
    return answers[key as keyof IntakeAnswers] === value
  }).length

  return percentage(matches, Object.keys(correctIntakeAnswers).length)
}

export const calculateProcessAccuracy = (steps: ProcessStep[]) => {
  const exactMatches = steps.filter((step, index) => step.id === correctProcessSteps[index]?.id).length
  return percentage(exactMatches, correctProcessSteps.length)
}

export const calculateUserStoryAccuracy = (stories: UserStorySelection[]) => {
  const exactMatches = stories.filter((story, index) => {
    const correctStory = correctUserStories[index]
    return (
      story.role === correctStory.role &&
      story.action === correctStory.action &&
      story.benefit === correctStory.benefit
    )
  }).length

  return percentage(exactMatches, correctUserStories.length)
}

export const describeScore = (score: number) => {
  if (score >= 90) {
    return 'High accuracy'
  }

  if (score >= 60) {
    return 'Moderate support need'
  }

  return 'High support need'
}
