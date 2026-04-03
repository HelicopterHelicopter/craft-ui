import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftAlert } from './CraftAlert'

describe('CraftAlert', () => {
  it('uses status role by default', () => {
    render(<CraftAlert>Note</CraftAlert>)
    expect(screen.getByRole('status')).toHaveTextContent('Note')
  })

  it('uses alert role when live', () => {
    render(<CraftAlert live>Error</CraftAlert>)
    expect(screen.getByRole('alert')).toHaveTextContent('Error')
  })
})
