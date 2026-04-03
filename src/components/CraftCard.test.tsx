import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftCard } from './CraftCard'

describe('CraftCard', () => {
  it('renders children with default paper surface', () => {
    render(<CraftCard>Inner</CraftCard>)
    expect(screen.getByText('Inner')).toHaveClass('craft-paper-surface')
  })

  it('applies kraft variant and deckled', () => {
    const { container } = render(
      <CraftCard variant="kraft" deckled={2}>
        X
      </CraftCard>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('craft-paper-kraft')
    expect(el).toHaveClass('craft-deckled-2')
  })

  it('applies lift paste-lg', () => {
    render(<CraftCard lift="paste-lg">Y</CraftCard>)
    expect(screen.getByText('Y')).toHaveClass('craft-lift-paste-lg')
  })
})
