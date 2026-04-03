import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftPaperClip } from './CraftPaperClip'

describe('CraftPaperClip', () => {
  it('renders svg with dimensions', () => {
    const { container } = render(<CraftPaperClip tone="silver" size={28} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).toHaveAttribute('height', '28')
  })
})
