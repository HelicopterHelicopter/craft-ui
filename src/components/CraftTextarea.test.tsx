import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftTextarea } from './CraftTextarea'

describe('CraftTextarea', () => {
  it('defaults rows to 4', () => {
    render(<CraftTextarea aria-label="note" />)
    expect(screen.getByLabelText('note')).toHaveAttribute('rows', '4')
    expect(screen.getByLabelText('note')).toHaveClass('resize-y')
  })
})
