import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { cn } from '../lib/cn'
import { CraftPaperClip, type CraftPaperClipTone } from './CraftPaperClip'

// ─── CraftClippedCard ────────────────────────────────────────────────────────
// A CraftCard variant with a paperclip peeking over the top edge.
// The clip is absolutely positioned so it overlaps the card border naturally.

export type ClipPosition = 'left' | 'center' | 'right'

export type CraftClippedCardProps = ComponentPropsWithoutRef<'div'> & {
  /** Clip color tone */
  clip?: CraftPaperClipTone
  /** Where along the top edge the clip sits */
  clipPosition?: ClipPosition
  /** Paper variant */
  variant?: 'default' | 'kraft' | 'parchment'
  /** Slight random tilt — pass a value between -3 and 3 (degrees) */
  rotate?: number
}

const clipOffsets: Record<ClipPosition, string> = {
  left: 'left-6',
  center: 'left-1/2 -translate-x-1/2',
  right: 'right-6',
}

export const CraftClippedCard = forwardRef<HTMLDivElement, CraftClippedCardProps>(
  function CraftClippedCard(
    {
      className,
      clip = 'silver',
      clipPosition = 'left',
      variant = 'default',
      rotate = 0,
      children,
      style,
      ...props
    },
    ref,
  ) {
    const paperClass =
      variant === 'kraft'
        ? 'craft-paper-kraft'
        : variant === 'parchment'
          ? 'craft-paper-parchment'
          : 'craft-paper-surface'

    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined, ...style }}
        {...props}
      >
        {/* Clip sits above the card, overlapping the top edge */}
        <div
          className={cn(
            'absolute -top-5 z-10 drop-shadow-md',
            clipOffsets[clipPosition],
          )}
        >
          <CraftPaperClip tone={clip} size={40} />
        </div>

        {/* Card body */}
        <div
          className={cn(
            'relative rounded-sm border border-black/[0.07] px-5 pb-5 pt-7',
            paperClass,
            'box-shadow-craft-paper',
          )}
        >
          {children}
        </div>
      </div>
    )
  },
)

// ─── CraftClippedStack ───────────────────────────────────────────────────────
// Multiple "papers" stacked behind each other with a single clip holding them.
// The back sheets peek out from behind the front card — like a physical paper stack.

export type CraftClippedStackProps = ComponentPropsWithoutRef<'div'> & {
  clip?: CraftPaperClipTone
  clipPosition?: ClipPosition
  /** Number of background "ghost" sheets visible behind the front card (1–3) */
  depth?: 1 | 2 | 3
  /** Color of the ghost sheets */
  sheetColors?: string[]
}

const defaultSheetColors = ['#e8dfc8', '#ddd5bc', '#d0c8b0']

export const CraftClippedStack = forwardRef<HTMLDivElement, CraftClippedStackProps>(
  function CraftClippedStack(
    {
      className,
      clip = 'silver',
      clipPosition = 'left',
      depth = 2,
      sheetColors = defaultSheetColors,
      children,
      ...props
    },
    ref,
  ) {
    const sheets = Array.from({ length: depth }, (_, i) => i)

    const sheetOffsets = [
      { rotate: '3deg',  translate: '4px, 4px'  },
      { rotate: '-2deg', translate: '-3px, 7px' },
      { rotate: '5deg',  translate: '6px, 8px'  },
    ]

    return (
      <div ref={ref} className={cn('relative inline-block', className)} {...props}>
        {/* Back sheets */}
        {sheets.reverse().map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-sm border border-black/[0.06]"
            style={{
              backgroundColor: sheetColors[i] ?? defaultSheetColors[i] ?? '#e0d8c4',
              transform: `rotate(${sheetOffsets[i]?.rotate}) translate(${sheetOffsets[i]?.translate})`,
              zIndex: i,
            }}
          />
        ))}

        {/* Front card */}
        <div className="relative z-10">
          <CraftClippedCard clip={clip} clipPosition={clipPosition}>
            {children}
          </CraftClippedCard>
        </div>
      </div>
    )
  },
)
