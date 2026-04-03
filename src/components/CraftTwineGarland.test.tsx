import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftTwineGarland } from './CraftTwineGarland'

describe('CraftTwineGarland', () => {
  it('renders svg twine and children', () => {
    const { container } = render(
      <CraftTwineGarland>
        <span>chip</span>
      </CraftTwineGarland>,
    )
    expect(container.querySelector('svg[aria-hidden]')).toBeInTheDocument()
    expect(screen.getByText('chip')).toBeInTheDocument()
  })
})
