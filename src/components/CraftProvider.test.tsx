import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftProvider } from './CraftProvider'

describe('CraftProvider', () => {
  it('sets data-theme and scrapbook vibe', () => {
    const { rerender } = render(
      <CraftProvider theme="dark" vibe="scrapbook">
        hello
      </CraftProvider>,
    )
    const el = screen.getByText('hello')
    expect(el).toHaveAttribute('data-theme', 'dark')
    expect(el).toHaveAttribute('data-craft-vibe', 'scrapbook')
    expect(el).toHaveClass('craft-ui')

    rerender(
      <CraftProvider theme="craft" vibe="default">
        x
      </CraftProvider>,
    )
    expect(screen.getByText('x')).not.toHaveAttribute('data-craft-vibe')
  })
})
