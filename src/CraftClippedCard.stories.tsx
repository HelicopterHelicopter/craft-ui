import type { Meta, StoryObj } from '@storybook/react'
import { CraftProvider } from './components/CraftProvider'
import { CraftClippedCard, CraftClippedStack } from './components/CraftClippedCard'

const meta: Meta = {
  title: 'Paper / Paperclip',
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '100vh',
          background: '#2b1f14',
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.03) 3px,rgba(0,0,0,.03) 4px),repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(0,0,0,.02) 3px,rgba(0,0,0,.02) 4px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3rem',
          padding: '4rem 3rem',
        }}
      >
        <CraftProvider>
          <Story />
        </CraftProvider>
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj

// ── Single clipped card ──────────────────────────────────────────────────────
export const SingleCard: Story = {
  name: 'Clipped Card',
  render: () => (
    <CraftClippedCard clip="blue" clipPosition="left" style={{ width: 280 }}>
      <p style={{ fontFamily: 'Caveat, cursive', fontSize: '1.1rem', lineHeight: 1.75, color: '#3a2e20' }}>
        A note held by a blue paperclip. The clip overlaps the top edge naturally — 
        just like a real paper on a board.
      </p>
    </CraftClippedCard>
  ),
}

// ── Clip positions ───────────────────────────────────────────────────────────
export const ClipPositions: Story = {
  name: 'Clip Positions',
  render: () => (
    <>
      {(['left', 'center', 'right'] as const).map((pos) => (
        <CraftClippedCard key={pos} clip="orange" clipPosition={pos} rotate={pos === 'left' ? -1 : pos === 'right' ? 1 : 0} style={{ width: 240 }}>
          <p style={{ fontFamily: 'Caveat, cursive', fontSize: '1rem', lineHeight: 1.7, color: '#3a2e20' }}>
            clip="{pos}"
          </p>
        </CraftClippedCard>
      ))}
    </>
  ),
}

// ── Color variety ────────────────────────────────────────────────────────────
export const ClipColors: Story = {
  name: 'Clip Colors',
  render: () => (
    <>
      {(['silver', 'red', 'green', 'pink', 'yellow'] as const).map((tone) => (
        <CraftClippedCard key={tone} clip={tone} clipPosition="left" style={{ width: 200 }}>
          <p style={{ fontFamily: 'Caveat, cursive', fontSize: '1rem', lineHeight: 1.7, color: '#3a2e20' }}>
            {tone}
          </p>
        </CraftClippedCard>
      ))}
    </>
  ),
}

// ── Paper variants ───────────────────────────────────────────────────────────
export const PaperVariants: Story = {
  name: 'Paper Variants + Clip',
  render: () => (
    <>
      <CraftClippedCard clip="silver" variant="default" rotate={-1} style={{ width: 260 }}>
        <p style={{ fontFamily: 'Caveat, cursive', fontSize: '1.05rem', lineHeight: 1.75, color: '#2e2418' }}>
          Cream / Handmade<br/>Silver clip
        </p>
      </CraftClippedCard>
      <CraftClippedCard clip="orange" variant="kraft" rotate={1} style={{ width: 260 }}>
        <p style={{ fontFamily: 'Caveat, cursive', fontSize: '1.05rem', lineHeight: 1.75, color: '#2e1a00' }}>
          Kraft Paper<br/>Orange clip
        </p>
      </CraftClippedCard>
      <CraftClippedCard clip="yellow" variant="parchment" rotate={-0.5} style={{ width: 260 }}>
        <p style={{ fontFamily: 'Caveat, cursive', fontSize: '1.05rem', lineHeight: 1.75, color: '#3a2c00' }}>
          Parchment<br/>Yellow clip
        </p>
      </CraftClippedCard>
    </>
  ),
}

// ── Stacked papers ───────────────────────────────────────────────────────────
export const StackedPapers: Story = {
  name: '✦ Clipped Stack',
  render: () => (
    <>
      <CraftClippedStack clip="red" depth={2} style={{ width: 280 }}>
        <p style={{ fontFamily: 'Caveat, cursive', fontSize: '1.1rem', lineHeight: 1.75, color: '#2e2418' }}>
          A stack of papers held together by a red clip. The sheets behind peek out at slight angles.
        </p>
      </CraftClippedStack>

      <CraftClippedStack clip="blue" depth={3} clipPosition="center" style={{ width: 280 }}>
        <p style={{ fontFamily: 'Caveat, cursive', fontSize: '1.1rem', lineHeight: 1.75, color: '#2e2418' }}>
          Three sheets deep.<br/>
          Center-clipped.<br/>
          Attached documents, receipts, notes…
        </p>
      </CraftClippedStack>
    </>
  ),
}

// ── Real-world use: attachment card ─────────────────────────────────────────
export const AttachmentCard: Story = {
  name: 'Real Use — Attachment',
  render: () => (
    <CraftClippedStack clip="silver" depth={2} style={{ width: 320 }}>
      <div style={{ fontFamily: 'Caveat, cursive', color: '#2e2418' }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>
          Project Brief
        </div>
        <div style={{ fontSize: '1rem', lineHeight: 1.75, color: '#5a4a30', marginBottom: 16 }}>
          Q2 2026 — Craft UI Redesign<br/>
          Owner: Kuboxx<br/>
          Status: In Review
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['brief.pdf', 'mockup.fig', 'notes.txt'].map((f) => (
            <span key={f} style={{
              background: 'rgba(0,0,0,0.07)',
              borderRadius: 4,
              padding: '2px 10px',
              fontSize: '0.85rem',
            }}>{f}</span>
          ))}
        </div>
      </div>
    </CraftClippedStack>
  ),
}
