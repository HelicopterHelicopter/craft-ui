import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftSkeleton } from './CraftSkeleton'

describe('CraftSkeleton', () => {
  it('is hidden from a11y tree', () => {
    render(<CraftSkeleton data-testid="sk" className="h-4 w-20" />)
    expect(screen.getByTestId('sk')).toHaveAttribute('aria-hidden', 'true')
  })
})
