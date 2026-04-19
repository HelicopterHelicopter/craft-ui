import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CraftAccordion } from './CraftAccordion'

const ITEMS = [
  { value: 'a', label: 'Panel A', content: <p>Content A</p> },
  { value: 'b', label: 'Panel B', content: <p>Content B</p> },
  { value: 'c', label: 'Panel C', content: <p>Content C</p>, disabled: true },
]

describe('CraftAccordion', () => {
  it('renders all item labels', () => {
    render(<CraftAccordion items={ITEMS} />)
    expect(screen.getByText('Panel A')).toBeTruthy()
    expect(screen.getByText('Panel B')).toBeTruthy()
  })

  it('expands item on click', async () => {
    const user = userEvent.setup()
    render(<CraftAccordion items={ITEMS} />)
    const btn = screen.getByRole('button', { name: /Panel A/ })
    await user.click(btn)
    expect(btn.getAttribute('aria-expanded')).toBe('true')
  })

  it('collapses open item on second click', async () => {
    const user = userEvent.setup()
    render(<CraftAccordion items={ITEMS} defaultValue="a" />)
    const btn = screen.getByRole('button', { name: /Panel A/ })
    await user.click(btn)
    expect(btn.getAttribute('aria-expanded')).toBe('false')
  })

  it('closes previously open item when another opens (single mode)', async () => {
    const user = userEvent.setup()
    render(<CraftAccordion items={ITEMS} defaultValue="a" />)
    await user.click(screen.getByRole('button', { name: /Panel B/ }))
    expect(screen.getByRole('button', { name: /Panel A/ }).getAttribute('aria-expanded')).toBe('false')
    expect(screen.getByRole('button', { name: /Panel B/ }).getAttribute('aria-expanded')).toBe('true')
  })

  it('allows multiple open panels in multiple mode', async () => {
    const user = userEvent.setup()
    render(<CraftAccordion items={ITEMS} multiple />)
    await user.click(screen.getByRole('button', { name: /Panel A/ }))
    await user.click(screen.getByRole('button', { name: /Panel B/ }))
    expect(screen.getByRole('button', { name: /Panel A/ }).getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByRole('button', { name: /Panel B/ }).getAttribute('aria-expanded')).toBe('true')
  })

  it('calls onValueChange on toggle', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<CraftAccordion items={ITEMS} onValueChange={onChange} />)
    await user.click(screen.getByRole('button', { name: /Panel A/ }))
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('disabled item is not interactive', () => {
    render(<CraftAccordion items={ITEMS} />)
    const disabledBtn = screen.getByRole('button', { name: /Panel C/ })
    expect(disabledBtn).toBeDisabled()
  })
})
