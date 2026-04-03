import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { WatercolorPanel } from './WatercolorPanel'

describe('WatercolorPanel', () => {
  it('renders wash preset', () => {
    const { container } = render(<WatercolorPanel wash="sea">content</WatercolorPanel>)
    expect(container.firstChild as HTMLElement).toHaveClass('from-craft-blue/30')
  })
})
