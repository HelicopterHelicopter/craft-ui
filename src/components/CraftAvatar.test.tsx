import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftAvatar } from './CraftAvatar'

describe('CraftAvatar', () => {
  it('shows img when src set', () => {
    render(<CraftAvatar src="/x.png" alt="User" fallback="U" />)
    const img = screen.getByRole('img', { name: 'User' })
    expect(img).toHaveAttribute('src', '/x.png')
  })

  it('uses role img and initials when no src', () => {
    render(<CraftAvatar alt="Jane Doe" fallback="Jane Doe" />)
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent('JD')
  })
})
