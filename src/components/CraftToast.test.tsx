import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { CraftToast } from './CraftToast'

describe('CraftToast', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('portals to body and dismisses via button', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <CraftToast open title="Hey" onOpenChange={onOpenChange} duration={0}>
        Message
      </CraftToast>,
    )
    expect(screen.getByRole('status')).toHaveTextContent('Hey')
    expect(screen.getByText('Message')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('auto-dismisses after.duration', () => {
    vi.useFakeTimers()
    const onOpenChange = vi.fn()
    render(
      <CraftToast open onOpenChange={onOpenChange} duration={1000}>
        T
      </CraftToast>,
    )
    vi.advanceTimersByTime(1000)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
