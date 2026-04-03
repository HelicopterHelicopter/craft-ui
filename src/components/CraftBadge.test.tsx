import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftBadge } from './CraftBadge'

describe('CraftBadge', () => {
  it('renders as span with label text', () => {
    render(<CraftBadge>New</CraftBadge>)
    expect(screen.getByText('New').tagName).toBe('SPAN')
    expect(screen.getByText('New')).toHaveClass('bg-craft-ink')
  })
})
