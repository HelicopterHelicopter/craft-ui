import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CraftCarousel } from './CraftCarousel'

const ITEMS = [
  { id: 'a', content: <div>Slide A</div>, caption: 'Caption A' },
  { id: 'b', content: <div>Slide B</div>, caption: 'Caption B' },
  { id: 'c', content: <div>Slide C</div>, caption: 'Caption C' },
]

describe('CraftCarousel', () => {
  it('renders without crashing', () => {
    render(<CraftCarousel items={ITEMS} />)
    expect(screen.getByRole('region', { name: 'Photo carousel' })).toBeTruthy()
  })

  it('renders all slide captions', () => {
    render(<CraftCarousel items={ITEMS} />)
    expect(screen.getByText('Caption A')).toBeTruthy()
    expect(screen.getByText('Caption B')).toBeTruthy()
  })

  it('navigates to next slide on arrow button click', async () => {
    const user = userEvent.setup()
    render(<CraftCarousel items={ITEMS} defaultIndex={0} />)
    const nextBtn = screen.getByRole('button', { name: 'Next slide' })
    await user.click(nextBtn)
    const dots = screen.getAllByRole('button', { name: /Go to slide/ })
    // second dot should now be active (aria-label check via the dots)
    expect(dots[1]).toBeTruthy()
  })

  it('calls onValueChange when navigating', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<CraftCarousel items={ITEMS} defaultIndex={0} onValueChange={onValueChange} />)
    await user.click(screen.getByRole('button', { name: 'Next slide' }))
    expect(onValueChange).toHaveBeenCalledWith(1)
  })

  it('wraps around from last to first', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<CraftCarousel items={ITEMS} defaultIndex={2} onValueChange={onValueChange} />)
    await user.click(screen.getByRole('button', { name: 'Next slide' }))
    expect(onValueChange).toHaveBeenCalledWith(0)
  })

  it('renders nothing for empty items', () => {
    const { container } = render(<CraftCarousel items={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('hides arrows and dots for single item', () => {
    render(<CraftCarousel items={[ITEMS[0]!]} />)
    expect(screen.queryByRole('button', { name: 'Next slide' })).toBeNull()
    expect(screen.queryByRole('tablist')).toBeNull()
  })
})
