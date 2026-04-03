import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  CraftTable,
  CraftTableBody,
  CraftTableCaption,
  CraftTableCell,
  CraftTableFooter,
  CraftTableHeadCell,
  CraftTableHeader,
  CraftTableRow,
} from './CraftTable'

describe('CraftTable', () => {
  it('renders table in wrapper', () => {
    render(
      <CraftTable>
        <CraftTableCaption>Cap</CraftTableCaption>
        <CraftTableHeader>
          <CraftTableRow>
            <CraftTableHeadCell>H</CraftTableHeadCell>
          </CraftTableRow>
        </CraftTableHeader>
        <CraftTableBody>
          <CraftTableRow>
            <CraftTableCell>cell</CraftTableCell>
          </CraftTableRow>
        </CraftTableBody>
        <CraftTableFooter>
          <CraftTableRow>
            <CraftTableCell>foot</CraftTableCell>
          </CraftTableRow>
        </CraftTableFooter>
      </CraftTable>,
    )
    expect(document.querySelector('.craft-table-wrap')).toBeInTheDocument()
    expect(screen.getByRole('table')).toHaveClass('craft-table')
    expect(screen.getByText('Cap')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'H' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'cell' })).toHaveClass('craft-table-cell')
    expect(screen.getByRole('row', { name: /foot/i })).toBeInTheDocument()
  })
})
