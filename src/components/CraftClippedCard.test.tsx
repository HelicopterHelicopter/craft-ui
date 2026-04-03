import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftClippedCard, CraftClippedStack } from './CraftClippedCard'

describe('CraftClippedCard', () => {
  it('renders clip and paper body', () => {
    const { container } = render(
      <CraftClippedCard clipPosition="center" variant="kraft">
        Note
      </CraftClippedCard>,
    )
    expect(container.querySelector('svg[aria-hidden]')).toBeInTheDocument()
    const paper = container.querySelector('.craft-paper-kraft')
    expect(paper).toBeInTheDocument()
    expect(paper).toHaveTextContent('Note')
  })
})

describe('CraftClippedStack', () => {
  it('nests clipped card with ghost sheets', () => {
    const { container } = render(
      <CraftClippedStack depth={1} clipPosition="right">
        Stack content
      </CraftClippedStack>,
    )
    expect(screen.getByText('Stack content')).toBeInTheDocument()
    expect(container.querySelectorAll('.absolute.inset-0').length).toBeGreaterThan(0)
  })
})
