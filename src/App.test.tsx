import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { AssessmentProvider } from './store/AssessmentContext'

describe('App', () => {
  it('lets the user review the source material and move into the process map', async () => {
    const user = userEvent.setup()

    render(
      <AssessmentProvider>
        <App />
      </AssessmentProvider>,
    )

    await user.click(screen.getByRole('button', { name: /next: capture requirements/i }))
    await user.click(screen.getByRole('button', { name: /review source material/i }))

    expect(screen.getByText(/reference clicks: 1/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/source material reference/i)).toBeInTheDocument()

    const selects = screen.getAllByRole('combobox')
    await user.selectOptions(selects[0]!, 'manual-entry')

    expect(screen.queryByLabelText(/source material reference/i)).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /review source material/i }))
    expect(screen.getByText(/reference clicks: 2/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/source material reference/i)).toBeInTheDocument()

    await user.selectOptions(selects[1]!, 'central-dashboard')
    await user.selectOptions(selects[2]!, 'instant-pto')
    await user.selectOptions(selects[3]!, 'mobile-access')

    await user.click(screen.getByRole('button', { name: /continue to the process map/i }))

    expect(screen.getByTestId('process-map-screen')).toBeInTheDocument()
  })
})
