import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { CraftSketchUnderline } from './CraftSketchUnderline'

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

describe('CraftSketchUnderline', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders wavy path when motion is allowed', () => {
    mockMatchMedia(false)
    const { container } = render(<CraftSketchUnderline>Text</CraftSketchUnderline>)
    const path = container.querySelector('path[d*="C"]')
    expect(path).toBeTruthy()
    expect(screen.getByText('Text')).toBeInTheDocument()
  })

  it('renders straight path when reduced motion', async () => {
    mockMatchMedia(true)
    const { container } = render(
      <CraftSketchUnderline variant="accent">Line</CraftSketchUnderline>,
    )
    await waitFor(() => {
      const path = container.querySelector('path[d^="M0 9 L100 9"]')
      expect(path).toBeTruthy()
    })
  })
})
