import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CraftButton } from './CraftButton'

describe('CraftButton', () => {
  it('renders children and defaults type to button', () => {
    render(<CraftButton>Save</CraftButton>)
    const btn = screen.getByRole('button', { name: 'Save' })
    expect(btn).toHaveAttribute('type', 'button')
    expect(btn).toHaveClass('shadow-clay')
  })

  it('supports variant eraser', () => {
    render(
      <CraftButton variant="eraser">
        Go
      </CraftButton>,
    )
    expect(screen.getByRole('button', { name: 'Go' })).toHaveClass('shadow-eraser')
  })

  it('forwards click handler', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<CraftButton onClick={onClick}>Tap</CraftButton>)
    await user.click(screen.getByRole('button', { name: 'Tap' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
