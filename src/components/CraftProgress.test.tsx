import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftProgress } from './CraftProgress'

describe('CraftProgress', () => {
  it('sets progressbar semantics', () => {
    render(<CraftProgress value={40} max={100} aria-label="Upload" />)
    const bar = screen.getByRole('progressbar', { name: 'Upload' })
    expect(bar).toHaveAttribute('aria-valuenow', '40')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
  })
})
