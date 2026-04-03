import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  CraftBreadcrumb,
  CraftBreadcrumbItem,
  CraftBreadcrumbLink,
  CraftBreadcrumbList,
  CraftBreadcrumbPage,
  CraftBreadcrumbSepLi,
  CraftBreadcrumbSeparator,
} from './CraftBreadcrumb'

describe('CraftBreadcrumb', () => {
  it('composes list with nav landmark', () => {
    render(
      <CraftBreadcrumb>
        <CraftBreadcrumbList>
          <CraftBreadcrumbItem>
            <CraftBreadcrumbLink href="/">Home</CraftBreadcrumbLink>
          </CraftBreadcrumbItem>
          <CraftBreadcrumbSepLi />
          <CraftBreadcrumbItem>
            <CraftBreadcrumbPage>Here</CraftBreadcrumbPage>
          </CraftBreadcrumbItem>
        </CraftBreadcrumbList>
      </CraftBreadcrumb>,
    )
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    const current = screen.getByText('Here')
    expect(current).toHaveAttribute('aria-current', 'page')
  })

  it('separator is decorative', () => {
    render(<CraftBreadcrumbSeparator>›</CraftBreadcrumbSeparator>)
    const sep = screen.getByText('›')
    expect(sep).toHaveAttribute('aria-hidden', 'true')
  })
})
