import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftScribble } from './CraftScribble'

describe('CraftScribble', () => {
  it('renders an SVG', () => {
    const { container } = render(<CraftScribble type="check" />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('renders at least one path per type', () => {
    const types = [
      'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down',
      'check', 'cross', 'circle', 'underline', 'star', 'heart',
      'bracket-left', 'bracket-right',
    ] as const
    for (const type of types) {
      const { container } = render(<CraftScribble type={type} />)
      expect(container.querySelectorAll('path').length).toBeGreaterThan(0)
    }
  })

  it('applies custom size', () => {
    const { container } = render(<CraftScribble type="cross" size={40} />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('40')
    expect(svg.getAttribute('height')).toBe('40')
  })
})
