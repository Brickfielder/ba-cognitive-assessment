import { correctProcessSteps } from '../data/content'
import {
  calculateIntakeAccuracy,
  calculateProcessAccuracy,
  calculateUserStoryAccuracy,
} from './scoring'

describe('scoring helpers', () => {
  it('scores intake answers as a percentage', () => {
    expect(
      calculateIntakeAccuracy({
        autoFill: 'manual-entry',
        dashboard: 'central-dashboard',
        ptoBalance: 'instant-pto',
        mobile: 'vpn-only',
      }),
    ).toBe(75)
  })

  it('scores process sequencing by exact step placement', () => {
    expect(calculateProcessAccuracy(correctProcessSteps)).toBe(100)
    expect(calculateProcessAccuracy([...correctProcessSteps].reverse())).toBe(0)
  })

  it('scores user stories by exact story matches', () => {
    expect(
      calculateUserStoryAccuracy([
        {
          role: 'Employee',
          action: 'view my PTO balance on the home screen',
          benefit: "I don't have to call HR to find out how many days I have left",
        },
        {
          role: 'Manager',
          action: 'export data to a spreadsheet',
          benefit: "I don't lose requests in my email inbox",
        },
      ]),
    ).toBe(50)
  })
})
