import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CraftDialog } from './CraftDialog'

describe('CraftDialog', () => {
  it('renders title and calls onOpenChange when closed via native close', () => {
    const onOpenChange = vi.fn()
    render(
      <CraftDialog
        open
        onOpenChange={onOpenChange}
        title="Hello"
        description="More"
      >
        <p>Body</p>
      </CraftDialog>,
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Hello' })).toBeInTheDocument()
    expect(screen.getByText('More')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()

    const dlg = document.querySelector('dialog')
    expect(dlg).toBeInTheDocument()
    dlg?.dispatchEvent(new Event('close'))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
