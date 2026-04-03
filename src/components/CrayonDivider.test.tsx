import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CrayonDivider } from './CrayonDivider'

describe('CrayonDivider', () => {
  it('exposes separator semantics', () => {
    render(<CrayonDivider crayon="pink" data-testid="div" />)
    const el = screen.getByTestId('div')
    expect(el).toHaveAttribute('role', 'separator')
    expect(el).toHaveAttribute('aria-orientation', 'horizontal')
  })
})
