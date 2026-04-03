import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RopeFrame } from './RopeFrame'

describe('RopeFrame', () => {
  it('wraps children in rope frame and inner', () => {
    const { container } = render(
      <RopeFrame contentClassName="inner-pad">
        Body
      </RopeFrame>,
    )
    const outer = container.querySelector('.craft-rope-frame')
    const inner = container.querySelector('.craft-rope-inner')
    expect(outer).toBeInTheDocument()
    expect(inner).toHaveClass('inner-pad')
    expect(screen.getByText('Body')).toBeInTheDocument()
  })
})
