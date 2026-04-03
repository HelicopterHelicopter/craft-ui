import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { CraftTabs } from './CraftTabs'

const items = [
  { value: 'a', label: 'Alpha', content: <p>Panel A</p> },
  { value: 'b', label: 'Beta', content: <p>Panel B</p> },
]

describe('CraftTabs', () => {
  it('switches panel on click', async () => {
    const user = userEvent.setup()
    render(<CraftTabs items={items} defaultValue="a" />)
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute('aria-selected', 'true')
    await user.click(screen.getByRole('tab', { name: 'Beta' }))
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Panel B')).toBeInTheDocument()
  })

  it('moves selection with ArrowRight', async () => {
    const user = userEvent.setup()
    render(<CraftTabs items={items} defaultValue="a" />)
    screen.getByRole('tab', { name: 'Alpha' }).focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveFocus()
  })

  it('returns null for empty items', () => {
    const { container } = render(<CraftTabs items={[]} />)
    expect(container.firstChild).toBeNull()
  })
})
