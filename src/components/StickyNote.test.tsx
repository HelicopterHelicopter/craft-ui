import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StickyNote } from './StickyNote'

describe('StickyNote', () => {
  it('applies rotate style and renders content', () => {
    render(
      <StickyNote color="pink" rotate={3}>
        Memo
      </StickyNote>,
    )
    const el = screen.getByText('Memo')
    expect(el).toHaveStyle({ transform: 'rotate(3deg)' })
    expect(el).toHaveClass('bg-craft-pink')
  })
})
