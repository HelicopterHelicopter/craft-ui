import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TissuePanel } from './TissuePanel'

describe('TissuePanel', () => {
  it('applies craft-tissue-panel', () => {
    render(<TissuePanel>inside</TissuePanel>)
    expect(screen.getByText('inside')).toHaveClass('craft-tissue-panel')
  })
})
