import { actionOptions, benefitOptions, roleOptions } from '../data/content'
import type { UserStorySelection } from '../types'

interface UserStoriesScreenProps {
  stories: [UserStorySelection, UserStorySelection]
  onChange: (index: 0 | 1, key: keyof UserStorySelection, value: string) => void
  onSubmit: () => void
  onMeaningfulInteraction: () => void
}

export const UserStoriesScreen = ({
  stories,
  onChange,
  onSubmit,
  onMeaningfulInteraction,
}: UserStoriesScreenProps) => {
  const isComplete = stories.every((story) => story.role && story.action && story.benefit)

  return (
    <section className="module-card" data-testid="user-stories-screen">
      <header className="module-header">
        <div>
          <p className="eyebrow">Module 3</p>
          <h1>User story drafting</h1>
        </div>
        <p className="module-copy">
          Build two user stories using the format: As a [Role], I want to [Action] so that [Benefit].
        </p>
      </header>

      <div className="story-stack">
        {stories.map((story, index) => (
          <section key={`story-${index}`} className="story-card">
            <h2>User Story {index + 1}</h2>
            <p className="story-preview">
              As a <strong>{story.role || '...'}</strong>, I want to{' '}
              <strong>{story.action || '...'}</strong> so that <strong>{story.benefit || '...'}</strong>.
            </p>
            <div className="story-grid">
              <label>
                <span>Role</span>
                <select
                  value={story.role}
                  onChange={(event) => {
                    onMeaningfulInteraction()
                    onChange(index as 0 | 1, 'role', event.target.value)
                  }}
                >
                  <option value="">Select a role</option>
                  {roleOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Action</span>
                <select
                  value={story.action}
                  onChange={(event) => {
                    onMeaningfulInteraction()
                    onChange(index as 0 | 1, 'action', event.target.value)
                  }}
                >
                  <option value="">Select an action</option>
                  {actionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Benefit</span>
                <select
                  value={story.benefit}
                  onChange={(event) => {
                    onMeaningfulInteraction()
                    onChange(index as 0 | 1, 'benefit', event.target.value)
                  }}
                >
                  <option value="">Select a benefit</option>
                  {benefitOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>
        ))}

        <button
          type="button"
          className="primary-button"
          disabled={!isComplete}
          onClick={() => {
            onMeaningfulInteraction()
            onSubmit()
          }}
        >
          Finish assessment
        </button>
      </div>
    </section>
  )
}
