import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftLetterChip } from './CraftLetterChip'

describe('CraftLetterChip', () => {
  it('applies rotation style', () => {
    render(<CraftLetterChip rotate={5}>A</CraftLetterChip>)
    const el = screen.getByText('A')
    expect(el).toHaveStyle({ transform: 'rotate(5deg)' })
  })
})
