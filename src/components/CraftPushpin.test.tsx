import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftPushpin } from './CraftPushpin'

describe('CraftPushpin', () => {
  it('renders an SVG', () => {
    const { container } = render(<CraftPushpin />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('applies custom size', () => {
    const { container } = render(<CraftPushpin size={40} />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('height')).toBe('40')
  })

  it('accepts all tone values without throwing', () => {
    const tones = ['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'lime', 'silver', 'gold'] as const
    for (const tone of tones) {
      expect(() => render(<CraftPushpin tone={tone} />)).not.toThrow()
    }
  })
})
