import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GlitterAccent } from './GlitterAccent'

describe('GlitterAccent', () => {
  it('renders children and glitter overlay', () => {
    const { container } = render(<GlitterAccent crayon="orange">Pro</GlitterAccent>)
    expect(screen.getByText('Pro')).toBeInTheDocument()
    expect(container.querySelector('.craft-glitter-overlay')).toBeInTheDocument()
  })
})
