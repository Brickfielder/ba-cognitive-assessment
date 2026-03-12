import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

const completeIntake = async (page: Page) => {
  await page.goto('/?e2e=1')
  await page.getByRole('button', { name: 'Next: Capture requirements' }).click()

  const selects = page.getByRole('combobox')
  await selects.nth(0).selectOption('manual-entry')
  await selects.nth(1).selectOption('central-dashboard')
  await selects.nth(2).selectOption('instant-pto')
  await selects.nth(3).selectOption('mobile-access')
  await page.getByRole('button', { name: 'Continue to the process map' }).click()
}

const reorderProcessMapByKeyboard = async (page: Page) => {
  for (let moveCount = 7; moveCount >= 1; moveCount -= 1) {
    await page.locator('.process-handle').nth(7).focus()
    await page.keyboard.press('Space')

    for (let step = 0; step < moveCount; step += 1) {
      await page.keyboard.press('ArrowUp')
    }

    await page.keyboard.press('Space')
  }
}

test.describe('BA assessment flow', () => {
  test('completes the assessment and shows clinician metrics', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Full flow runs once in desktop Chromium.')

    await completeIntake(page)
    await reorderProcessMapByKeyboard(page)
    await page.getByRole('button', { name: 'Save process map' }).click()

    await page.getByRole('button', { name: 'Open drafting workspace' }).click()
    await expect(page.getByTestId('interruption-modal')).toBeVisible()
    await page
      .getByRole('button', {
        name: "I'm working on something else right now, let me check my notes and get back to you.",
      })
      .click()

    const selects = page.getByRole('combobox')
    await selects.nth(0).selectOption('Employee')
    await selects.nth(1).selectOption('view my PTO balance on the home screen')
    await selects.nth(2).selectOption("I don't have to call HR to find out how many days I have left")
    await selects.nth(3).selectOption('Manager')
    await selects.nth(4).selectOption('approve requests from a central dashboard')
    await selects.nth(5).selectOption("I don't lose requests in my email inbox")
    await page.getByRole('button', { name: 'Finish assessment' }).click()

    await expect(page.getByTestId('results-screen')).toBeVisible()
    await expect(page.getByText('Total session time')).toBeVisible()
    await expect(page.getByText('Reference clicks')).toBeVisible()
    await expect(page.getByText('Interruption recovery')).toBeVisible()
  })

  test('supports the intake flow on a mobile viewport', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile assertion runs in the mobile project.')

    await completeIntake(page)

    const handles = page.locator('.process-handle')
    await expect(page.getByText(/touch users can press and drag a row/i)).toBeVisible()
    await expect(handles.nth(0)).toContainText('System updates the employee’s remaining PTO balance.')
    await expect(handles.nth(0)).toHaveCSS('touch-action', 'none')
  })

  test('clears the in-memory session on refresh', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Refresh assertion runs once in desktop Chromium.')

    await page.goto('/?e2e=1')
    await page.getByRole('button', { name: 'Next: Capture requirements' }).click()
    await page.getByRole('combobox').first().selectOption('manual-entry')
    await page.reload()

    await expect(page.getByRole('button', { name: 'Next: Capture requirements' })).toBeVisible()
    await expect(page.getByRole('combobox')).toHaveCount(0)
  })
})
