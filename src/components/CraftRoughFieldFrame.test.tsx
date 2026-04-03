import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { CraftRoughFieldFrame } from './CraftRoughFieldFrame'

function mockMatchMedia(matches: boolean) {
  return vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

describe('CraftRoughFieldFrame', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('uses dashed border fallback when reduced motion', async () => {
    mockMatchMedia(true)
    render(
      <CraftRoughFieldFrame>
        <input aria-label="in" />
      </CraftRoughFieldFrame>,
    )
    await waitFor(() => {
      expect(screen.getByLabelText('in').parentElement).toHaveClass('border-dashed')
    })
  })
})
