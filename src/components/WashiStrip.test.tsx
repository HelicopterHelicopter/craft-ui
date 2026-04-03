import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { WashiStrip } from './WashiStrip'

describe('WashiStrip', () => {
  it('renders children with torn washi class', () => {
    render(
      <WashiStrip pattern="stripes" tint="mint">
        Title
      </WashiStrip>,
    )
    expect(screen.getByText('Title')).toHaveClass('craft-washi-torn')
  })
})
