import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { CraftInput } from './CraftInput'

describe('CraftInput', () => {
  it('applies paper appearance class', () => {
    render(<CraftInput appearance="paper" placeholder="p" />)
    expect(screen.getByPlaceholderText('p')).toHaveClass('craft-input-field-paper')
  })

  it('accepts typing', async () => {
    const user = userEvent.setup()
    render(<CraftInput defaultValue="" aria-label="field" />)
    await user.type(screen.getByLabelText('field'), 'hi')
    expect(screen.getByLabelText('field')).toHaveValue('hi')
  })
})
