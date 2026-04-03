import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CraftSwitch } from './CraftSwitch'

describe('CraftSwitch', () => {
  it('uncontrolled toggles', async () => {
    const user = userEvent.setup()
    render(<CraftSwitch aria-label="power" />)
    const sw = screen.getByRole('switch', { name: 'power' })
    expect(sw).toHaveAttribute('aria-checked', 'false')
    await user.click(sw)
    expect(sw).toHaveAttribute('aria-checked', 'true')
  })

  it('controlled calls onCheckedChange', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <CraftSwitch checked={false} onCheckedChange={onCheckedChange} aria-label="x" />,
    )
    await user.click(screen.getByRole('switch', { name: 'x' }))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })
})
