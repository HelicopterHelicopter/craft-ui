import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { CraftButton } from './CraftButton'
import { CraftTooltip } from './CraftTooltip'

describe('CraftTooltip', () => {
  it('shows tooltip on hover', async () => {
    const user = userEvent.setup()
    render(
      <CraftTooltip content="Extra help">
        <CraftButton>Focus me</CraftButton>
      </CraftTooltip>,
    )
    await user.hover(screen.getByRole('button'))
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Extra help')
  })
})
