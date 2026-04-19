import type { Meta, StoryObj } from '@storybook/react'

import { CraftCard } from './components/CraftCard'
import { CraftCarousel } from './components/CraftCarousel'
import { StickyNote } from './components/StickyNote'

const meta = {
  title: 'Craft/CraftCarousel',
  component: CraftCarousel,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CraftCarousel>

export default meta
type Story = StoryObj<typeof meta>

const photoItems = [
  {
    id: 'beach',
    caption: 'Beach day ☀️',
    content: (
      <div className="flex h-48 items-center justify-center rounded-sm bg-[#cfe8f7] font-craftMarker text-2xl text-craft-ink/80">
        🏖️
      </div>
    ),
  },
  {
    id: 'market',
    caption: 'Farmers market',
    content: (
      <div className="flex h-48 items-center justify-center rounded-sm bg-[#d4f0d4] font-craftMarker text-2xl text-craft-ink/80">
        🌿
      </div>
    ),
  },
  {
    id: 'sunset',
    caption: 'Golden hour',
    content: (
      <div className="flex h-48 items-center justify-center rounded-sm bg-[#fde8c6] font-craftMarker text-2xl text-craft-ink/80">
        🌅
      </div>
    ),
  },
  {
    id: 'rain',
    caption: 'Rainy afternoon',
    content: (
      <div className="flex h-48 items-center justify-center rounded-sm bg-[#dde3f0] font-craftMarker text-2xl text-craft-ink/80">
        🌧️
      </div>
    ),
  },
  {
    id: 'picnic',
    caption: 'Picnic in the park',
    content: (
      <div className="flex h-48 items-center justify-center rounded-sm bg-[#f0ecd4] font-craftMarker text-2xl text-craft-ink/80">
        🧺
      </div>
    ),
  },
]

export const PhotoAlbum: Story = {
  args: {
    items: photoItems,
    showArrows: true,
    showDots: true,
  },
}

export const WithCraftCards: Story = {
  args: { items: [] },
  render: () => (
    <CraftCarousel
      items={[
        {
          id: '1',
          caption: 'Yellow card',
          content: (
            <CraftCard tint="yellow" className="min-h-[10rem]">
              <p className="font-craftMarker text-xl">Card one — yellow wash</p>
            </CraftCard>
          ),
        },
        {
          id: '2',
          caption: 'Blue card',
          content: (
            <CraftCard tint="blue" className="min-h-[10rem]">
              <p className="font-craftMarker text-xl">Card two — blue wash</p>
            </CraftCard>
          ),
        },
        {
          id: '3',
          caption: 'Pink card',
          content: (
            <CraftCard tint="pink" className="min-h-[10rem]">
              <p className="font-craftMarker text-xl">Card three — pink wash</p>
            </CraftCard>
          ),
        },
      ]}
    />
  ),
}

export const WithStickyNotes: Story = {
  args: { items: [] },
  render: () => (
    <CraftCarousel
      items={[
        {
          id: 'n1',
          caption: 'Monday',
          content: (
            <StickyNote color="yellow" rotate={0} className="w-full">
              Buy groceries & call mum
            </StickyNote>
          ),
        },
        {
          id: 'n2',
          caption: 'Tuesday',
          content: (
            <StickyNote color="green" rotate={0} className="w-full">
              Design review at 3 pm
            </StickyNote>
          ),
        },
        {
          id: 'n3',
          caption: 'Wednesday',
          content: (
            <StickyNote color="pink" rotate={0} className="w-full">
              Ship the new feature!
            </StickyNote>
          ),
        },
      ]}
    />
  ),
}

export const SingleSlide: Story = {
  args: {
    items: [photoItems[0]!],
    showArrows: true,
    showDots: true,
  },
}

export const NoControls: Story = {
  args: {
    items: photoItems.slice(0, 3),
    showArrows: false,
    showDots: false,
  },
}
