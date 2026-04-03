import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftRadio } from './CraftRadio'
import { CraftRadioGroup } from './CraftRadioGroup'

describe('CraftRadioGroup', () => {
  it('wires aria-labelledby when label set', () => {
    render(
      <CraftRadioGroup label="Pick">
        <CraftRadio name="x" value="a" label="A" />
      </CraftRadioGroup>,
    )
    const group = screen.getByRole('radiogroup')
    const labelId = group.getAttribute('aria-labelledby')
    expect(labelId).toBeTruthy()
    expect(document.getElementById(labelId!)).toHaveTextContent('Pick')
  })
})
