import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftLabel } from './CraftLabel'

describe('CraftLabel', () => {
  it('shows required star', () => {
    render(<CraftLabel required>Name</CraftLabel>)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByTitle('Required')).toBeInTheDocument()
  })
})
