import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftSpinner } from './CraftSpinner'

describe('CraftSpinner', () => {
  it('exposes status and label', () => {
    render(<CraftSpinner label="Saving" />)
    expect(screen.getByRole('status', { name: 'Saving' })).toBeInTheDocument()
  })
})
