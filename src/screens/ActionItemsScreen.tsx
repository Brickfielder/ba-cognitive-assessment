interface ActionItemsScreenProps {
  onOpenBuilder: () => void
  onMeaningfulInteraction: () => void
}

export const ActionItemsScreen = ({
  onOpenBuilder,
  onMeaningfulInteraction,
}: ActionItemsScreenProps) => {
  return (
    <section className="module-card" data-testid="action-items-screen">
      <header className="module-header">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>Action Items</h1>
        </div>
        <p className="module-copy">
          The project board has been refreshed with the next logical task. Continue when ready.
        </p>
      </header>

      <div className="action-grid">
        <article className="action-card is-active">
          <p className="eyebrow">Ready now</p>
          <h2>Draft initial user stories</h2>
          <p>Translate the source requirements into two Agile-style user stories.</p>
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              onMeaningfulInteraction()
              onOpenBuilder()
            }}
          >
            Open drafting workspace
          </button>
        </article>

        <article className="action-card">
          <p className="eyebrow">Queued later</p>
          <h2>Prepare stakeholder readout</h2>
          <p>Hold for later. This card is intentionally unavailable in the MVP flow.</p>
          <button type="button" className="secondary-button" disabled>
            Not started
          </button>
        </article>
      </div>
    </section>
  )
}
