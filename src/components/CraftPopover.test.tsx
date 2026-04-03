import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CraftPopover } from './CraftPopover'

describe('CraftPopover', () => {
  it('opens on trigger click and closes on Escape', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <CraftPopover
        trigger={<span>Open</span>}
        onOpenChange={onOpenChange}
        defaultOpen={false}
      >
        Inside panel
      </CraftPopover>,
    )
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toHaveTextContent('Inside panel')
    expect(onOpenChange).toHaveBeenLastCalledWith(true)

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
  })
})
