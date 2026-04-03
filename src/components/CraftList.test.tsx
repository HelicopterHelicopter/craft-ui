import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CraftList, CraftListItem } from './CraftList'

describe('CraftList', () => {
  it('renders ul with marker class', () => {
    const { container } = render(
      <CraftList marker="dot">
        <CraftListItem>One</CraftListItem>
      </CraftList>,
    )
    const list = container.querySelector('ul.craft-list--dot')
    expect(list).toBeInTheDocument()
    expect(screen.getByRole('listitem')).toHaveTextContent('One')
  })

  it('renders ol when ordered', () => {
    const { container } = render(
      <CraftList ordered marker="numbered">
        <CraftListItem>First</CraftListItem>
      </CraftList>,
    )
    expect(container.querySelector('ol.craft-list--numbered')).toBeInTheDocument()
  })
})
