import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { CraftCheckbox } from './CraftCheckbox'

describe('CraftCheckbox', () => {
  it('toggles via label', async () => {
    const user = userEvent.setup()
    render(<CraftCheckbox label="Accept" />)
    const input = screen.getByRole('checkbox', { name: 'Accept' })
    expect(input).not.toBeChecked()
    await user.click(screen.getByText('Accept'))
    expect(input).toBeChecked()
  })
})
