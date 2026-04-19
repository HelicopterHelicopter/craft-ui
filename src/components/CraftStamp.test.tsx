import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftStamp } from './CraftStamp'

describe('CraftStamp', () => {
  it('renders label text', () => {
    render(<CraftStamp label="APPROVED" />)
    expect(screen.getByText('APPROVED')).toBeTruthy()
  })

  it('renders children over label when both provided', () => {
    render(<CraftStamp label="APPROVED"><span>CUSTOM</span></CraftStamp>)
    expect(screen.queryByText('APPROVED')).toBeNull()
    expect(screen.getByText('CUSTOM')).toBeTruthy()
  })

  it('renders SVG filter element', () => {
    const { container } = render(<CraftStamp label="DRAFT" />)
    expect(container.querySelector('filter')).toBeTruthy()
  })

  it('accepts all tone values without throwing', () => {
    const tones = ['red', 'blue', 'green', 'violet', 'gold'] as const
    for (const tone of tones) {
      expect(() => render(<CraftStamp label="X" tone={tone} />)).not.toThrow()
    }
  })
})
