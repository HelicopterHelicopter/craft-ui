import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { CraftRadio } from './CraftRadio'

describe('CraftRadio', () => {
  it('groups by name', async () => {
    const user = userEvent.setup()
    render(
      <>
        <CraftRadio name="g" value="1" label="One" />
        <CraftRadio name="g" value="2" label="Two" />
      </>,
    )
    await user.click(screen.getByLabelText('Two'))
    expect(screen.getByLabelText('Two')).toBeChecked()
    expect(screen.getByLabelText('One')).not.toBeChecked()
  })
})
