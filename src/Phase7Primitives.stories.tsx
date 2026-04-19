import type { Meta, StoryObj } from '@storybook/react'

import { CraftAccordion } from './components/CraftAccordion'
import { CraftCard } from './components/CraftCard'
import { CraftPushpin } from './components/CraftPushpin'
import { CraftScribble, type CraftScribbleType } from './components/CraftScribble'
import { CraftStamp } from './components/CraftStamp'
import { StickyNote } from './components/StickyNote'

// ─── Meta (required for Storybook file) ──────────────────────────────────────
const meta = {
  title: 'Craft/Phase7 — Primitives',
} satisfies Meta

export default meta
type Story = StoryObj

// ─── CraftPushpin ─────────────────────────────────────────────────────────────

export const Pushpins: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="font-craftMarker text-2xl text-craft-ink">CraftPushpin tones</h2>
      <div className="flex flex-wrap items-end gap-6">
        {(['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'lime', 'silver', 'gold'] as const).map(
          (tone) => (
            <div key={tone} className="flex flex-col items-center gap-1">
              <CraftPushpin tone={tone} size={36} />
              <span className="font-craftSans text-xs text-craft-muted capitalize">{tone}</span>
            </div>
          ),
        )}
      </div>

      <h3 className="font-craftMarker text-xl text-craft-ink">Sizes</h3>
      <div className="flex flex-wrap items-end gap-6">
        {([16, 24, 32, 40, 52] as const).map((s) => (
          <div key={s} className="flex flex-col items-center gap-1">
            <CraftPushpin tone="red" size={s} />
            <span className="font-craftSans text-xs text-craft-muted">{s}px</span>
          </div>
        ))}
      </div>

      <h3 className="font-craftMarker text-xl text-craft-ink">On a sticky note</h3>
      <div className="relative inline-block">
        <StickyNote color="yellow" rotate={-2}>
          Remember to call the vet!
        </StickyNote>
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <CraftPushpin tone="red" size={32} />
        </div>
      </div>
    </div>
  ),
}

// ─── CraftStamp ───────────────────────────────────────────────────────────────

export const Stamps: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="font-craftMarker text-2xl text-craft-ink">CraftStamp tones</h2>
      <div className="flex flex-wrap items-center gap-8">
        {(['red', 'blue', 'green', 'violet', 'gold'] as const).map((tone) => (
          <div key={tone} className="flex flex-col items-center gap-2">
            <CraftStamp label={tone.toUpperCase()} tone={tone} rotate={-8} size="md" />
            <span className="font-craftSans text-xs text-craft-muted capitalize">{tone}</span>
          </div>
        ))}
      </div>

      <h3 className="font-craftMarker text-xl text-craft-ink">Common labels</h3>
      <div className="flex flex-wrap items-center gap-10">
        <CraftStamp label="APPROVED" tone="green" rotate={-12} size="lg" />
        <CraftStamp label="DRAFT" tone="blue" rotate={8} size="lg" />
        <CraftStamp label="PAID" tone="violet" rotate={-6} size="lg" />
        <CraftStamp label="URGENT" tone="red" rotate={10} size="lg" />
        <CraftStamp label="PENDING" tone="gold" rotate={-9} size="lg" />
      </div>

      <h3 className="font-craftMarker text-xl text-craft-ink">Oval shape</h3>
      <div className="flex flex-wrap items-center gap-8">
        <CraftStamp label="VOID" tone="red" rotate={-8} shape="oval" size="md" />
        <CraftStamp label="CERTIFIED" tone="blue" rotate={6} shape="oval" size="md" />
      </div>

      <h3 className="font-craftMarker text-xl text-craft-ink">On a card</h3>
      <div className="relative inline-block">
        <CraftCard className="min-w-[16rem] p-6">
          <p className="font-craftMarker text-xl text-craft-ink">Invoice #2042</p>
          <p className="mt-2 font-craftSans text-sm text-craft-muted">Amount due: $420.00</p>
          <CraftStamp label="PAID" tone="green" rotate={-14} size="lg" className="absolute right-4 top-4" />
        </CraftCard>
      </div>
    </div>
  ),
}

// ─── CraftScribble ────────────────────────────────────────────────────────────

export const Scribbles: Story = {
  render: () => {
    const marks: CraftScribbleType[] = [
      'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down',
      'check', 'cross', 'circle', 'underline', 'star', 'heart',
      'bracket-left', 'bracket-right',
    ]
    const colors = [
      'text-craft-orange', 'text-craft-blue', 'text-craft-green',
      'text-craft-pink', 'text-craft-red', 'text-craft-yellow',
      'text-craft-lime', 'text-craft-ink',
    ]

    return (
      <div className="space-y-6">
        <h2 className="font-craftMarker text-2xl text-craft-ink">CraftScribble marks</h2>
        <div className="flex flex-wrap gap-6">
          {marks.map((type, i) => (
            <div key={type} className="flex flex-col items-center gap-1">
              <CraftScribble
                type={type}
                size={32}
                strokeWidth={2.2}
                className={colors[i % colors.length]}
              />
              <span className="font-craftSans text-xs text-craft-muted">{type}</span>
            </div>
          ))}
        </div>

        <h3 className="font-craftMarker text-xl text-craft-ink">Filled variants (star, heart)</h3>
        <div className="flex items-center gap-6">
          <CraftScribble type="star"  size={40} fill="currentColor" className="text-craft-yellow" strokeWidth={1.5} />
          <CraftScribble type="heart" size={40} fill="currentColor" className="text-craft-pink"   strokeWidth={1.5} />
        </div>

        <h3 className="font-craftMarker text-xl text-craft-ink">Sizing</h3>
        <div className="flex items-end gap-4">
          {[16, 24, 32, 40, 56].map((s) => (
            <CraftScribble key={s} type="check" size={s} className="text-craft-green" />
          ))}
        </div>
      </div>
    )
  },
}

// ─── CraftAccordion ───────────────────────────────────────────────────────────

export const Accordion: Story = {
  render: () => (
    <div className="max-w-xl space-y-8">
      <h2 className="font-craftMarker text-2xl text-craft-ink">CraftAccordion</h2>

      <CraftAccordion
        defaultValue="materials"
        items={[
          {
            value: 'materials',
            label: 'Materials',
            tint: 'mint',
            content: (
              <ul className="list-disc pl-5 font-craftSans text-sm text-craft-ink/90 space-y-1">
                <li>Cardstock — 200 gsm</li>
                <li>Bone folder</li>
                <li>Scoring board</li>
                <li>Washi tape (assorted)</li>
              </ul>
            ),
          },
          {
            value: 'instructions',
            label: 'Instructions',
            tint: 'lavender',
            content: (
              <ol className="list-decimal pl-5 font-craftSans text-sm text-craft-ink/90 space-y-1">
                <li>Score the fold lines with the bone folder</li>
                <li>Fold along the scored lines</li>
                <li>Apply washi tape to the seams</li>
                <li>Decorate as desired</li>
              </ol>
            ),
          },
          {
            value: 'tips',
            label: 'Tips & tricks',
            tint: 'pink',
            content: (
              <p className="font-craftSans text-sm text-craft-ink/90">
                Always score on the outside of the fold for crisp clean creases. Dampening
                the fold slightly before scoring helps with heavier card stock.
              </p>
            ),
          },
          {
            value: 'locked',
            label: 'Locked panel (disabled)',
            tint: 'yellow',
            disabled: true,
            content: <p>You cannot see this.</p>,
          },
        ]}
      />

      <h3 className="font-craftMarker text-xl text-craft-ink">Multiple open at once</h3>
      <CraftAccordion
        multiple
        defaultValue={['a', 'b']}
        items={[
          { value: 'a', label: 'First panel', tint: 'yellow', content: <p className="font-craftSans text-sm">Open by default</p> },
          { value: 'b', label: 'Second panel', tint: 'mint', content: <p className="font-craftSans text-sm">Also open by default</p> },
          { value: 'c', label: 'Third panel', content: <p className="font-craftSans text-sm">Closed by default</p> },
        ]}
      />
    </div>
  ),
}
