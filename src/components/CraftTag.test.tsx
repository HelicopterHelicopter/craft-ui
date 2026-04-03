import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftTag } from './CraftTag'

describe('CraftTag', () => {
  it('uses gradient variant by default', () => {
    render(<CraftTag>label</CraftTag>)
    expect(screen.getByText('label')).toHaveClass('[background-image:var(--craft-tag-gradient)]')
  })

  it('paper variant applies craft-paper-base', () => {
    render(<CraftTag variant="paper">x</CraftTag>)
    expect(screen.getByText('x')).toHaveClass('craft-paper-base')
  })
})
