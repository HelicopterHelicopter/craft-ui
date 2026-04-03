import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { CraftSelect } from './CraftSelect'

describe('CraftSelect', () => {
  it('renders options and changes value', async () => {
    const user = userEvent.setup()
    render(
      <CraftSelect aria-label="pick">
        <option value="a">A</option>
        <option value="b">B</option>
      </CraftSelect>,
    )
    await user.selectOptions(screen.getByLabelText('pick'), 'b')
    expect(screen.getByLabelText('pick')).toHaveValue('b')
  })
})
