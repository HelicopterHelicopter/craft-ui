import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useId,
  useRef,
} from 'react'

import { cn } from '../lib/cn'
import { useControllableState } from '../lib/useControllableState'
import { CraftScribble } from './CraftScribble'

// ─── Types ───────────────────────────────────────────────────────────────────

export type CraftCarouselItem = {
  /** Unique key */
  id: string
  /** The slide content (fills the photo area of the Polaroid) */
  content: ReactNode
  /** Optional handwritten caption below the photo strip */
  caption?: string
  /**
   * Per-slide tilt in degrees.
   * Defaults to a small, natural-looking rotation that alternates per index.
   */
  rotate?: number
}

export type CraftCarouselProps = {
  items: CraftCarouselItem[]
  defaultIndex?: number
  /** Controlled current index */
  value?: number
  onValueChange?: (index: number) => void
  /** Show left/right navigation arrows (default true) */
  showArrows?: boolean
  /** Show pushpin-dot pagination (default true) */
  showDots?: boolean
  /** Extra class on the outer wrapper */
  className?: string
}

// ─── Internals ───────────────────────────────────────────────────────────────

const DEFAULT_ROTATIONS = [-1.5, 2, -2.5, 1, -1, 2.5]

function getSlideTransform(offset: number): string {
  if (offset === 0)  return 'translateX(0%)   scale(1)'
  if (offset === 1)  return 'translateX(76%)  scale(0.88)'
  if (offset === -1) return 'translateX(-76%) scale(0.88)'
  if (offset > 1)   return 'translateX(200%) scale(0.78)'
  return 'translateX(-200%) scale(0.78)'
}

/** Washi-tape strip rendered at a corner of the active Polaroid. */
function WashiCorner({ side }: { side: 'left' | 'right' }) {
  const colors = ['rgba(245,192,24,0.72)', 'rgba(255,79,168,0.68)', 'rgba(45,213,74,0.65)', 'rgba(59,130,246,0.68)']
  const color = colors[side === 'left' ? 0 : 1]!
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-20"
      style={{
        top: side === 'left' ? '-10px' : '-8px',
        [side]: '-8px',
        width: '42px',
        height: '14px',
        background: color,
        backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0 3px, transparent 3px 8px)',
        borderRadius: '2px',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.45)',
        transform: side === 'left' ? 'rotate(-32deg)' : 'rotate(32deg)',
      }}
    />
  )
}

/** Single Polaroid frame wrapping slide content. */
function PolaroidFrame({
  children,
  caption,
  rotate,
  active,
}: {
  children: ReactNode
  caption?: string
  rotate: number
  active: boolean
}) {
  return (
    <div
      className="relative mx-auto w-[80%]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {active && <WashiCorner side="left" />}
      {active && <WashiCorner side="right" />}

      {/* Photo border frame */}
      <div
        className={cn(
          'rounded-sm bg-white',
          'shadow-[0_4px_12px_rgba(0,0,0,0.14),0_1px_4px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(0,0,0,0.05)]',
          'transition-shadow duration-500',
          active && 'shadow-[0_8px_28px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(0,0,0,0.06)]',
        )}
      >
        {/* Photo area */}
        <div className="overflow-hidden p-3 pb-2">{children}</div>

        {/* Caption strip */}
        <div className="min-h-[2.5rem] px-3 pb-4 pt-1 text-center font-craftMarker text-sm text-craft-ink/75">
          {caption}
        </div>
      </div>
    </div>
  )
}

/** Pushpin-style dot for pagination */
function PushpinDot({
  active,
  index,
  onClick,
  label,
}: {
  active: boolean
  index: number
  onClick: () => void
  label: string
}) {
  const dotColors = ['#d12a3a', '#3b82f6', '#e85d2a', '#2dd54a', '#ff4fa8', '#f5c018']
  const color = active ? (dotColors[index % dotColors.length]!) : '#94a3b8'

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-craft-orange/60',
        active ? 'w-4 h-4' : 'w-2.5 h-2.5 opacity-55 hover:opacity-80',
      )}
      style={{
        background: active
          ? `radial-gradient(circle at 35% 32%, ${color}dd, ${color})`
          : color,
        boxShadow: active ? `0 1px 4px ${color}66, inset 0 1px 0 rgba(255,255,255,0.3)` : undefined,
      }}
    />
  )
}

/** Arrow navigation button (left or right) */
function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 'left' | 'right'
  onClick: () => void
  disabled: boolean
}) {
  return (
    <button
      type="button"
      aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'absolute top-1/2 z-20 -translate-y-1/2',
        direction === 'left' ? 'left-0' : 'right-0',
        'flex h-9 w-9 items-center justify-center rounded-full',
        'craft-paper-base border border-black/10',
        'shadow-[0_2px_8px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.4)]',
        'transition-[transform,opacity] duration-150',
        'hover:scale-105 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-craft-orange/60',
        'disabled:pointer-events-none disabled:opacity-30',
      )}
    >
      <CraftScribble
        type={direction === 'left' ? 'arrow-left' : 'arrow-right'}
        size={16}
        strokeWidth={2.2}
        className="text-craft-ink"
      />
    </button>
  )
}

// ─── CraftCarousel ────────────────────────────────────────────────────────────

/**
 * Polaroid-strip carousel — slides look like photo prints laid across a desk,
 * secured with washi-tape corners on the active shot. Neighboring photos
 * peek in from the sides.
 *
 * ```tsx
 * <CraftCarousel
 *   items={[
 *     { id: 'a', content: <img src="..." />, caption: 'Beach day' },
 *     { id: 'b', content: <CraftCard tint="yellow">…</CraftCard>, caption: 'Market trip' },
 *   ]}
 * />
 * ```
 */
export function CraftCarousel({
  items,
  defaultIndex = 0,
  value,
  onValueChange,
  showArrows = true,
  showDots = true,
  className,
}: CraftCarouselProps) {
  const uid = useId().replace(/:/g, '')
  const [current, setCurrent] = useControllableState({
    value,
    defaultValue: defaultIndex,
    onChange: onValueChange,
  })

  const containerRef = useRef<HTMLDivElement>(null)

  const go = useCallback(
    (dir: 1 | -1) => {
      setCurrent((items.length + current + dir) % items.length)
    },
    [current, items.length, setCurrent],
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); go(-1) }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
      if (e.key === 'Home') { e.preventDefault(); setCurrent(0) }
      if (e.key === 'End')  { e.preventDefault(); setCurrent(items.length - 1) }
    },
    [go, items.length, setCurrent],
  )

  if (items.length === 0) return null

  const single = items.length === 1

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Photo carousel"
      className={cn('relative select-none', className)}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {/* Slide track — all items stacked in one grid cell; overflow clips neighbors */}
      <div
        className="relative overflow-hidden px-10"
        style={{ paddingLeft: showArrows ? '2.5rem' : '0', paddingRight: showArrows ? '2.5rem' : '0' }}
      >
        <div
          className="grid"
          style={{ gridTemplateColumns: '1fr', gridTemplateRows: '1fr' }}
        >
          {items.map((item, i) => {
            const offset = i - current
            const absOffset = Math.abs(offset)
            const isActive = offset === 0
            const rotate = item.rotate ?? DEFAULT_ROTATIONS[i % DEFAULT_ROTATIONS.length] ?? 0

            return (
              <div
                key={item.id}
                role="group"
                aria-label={`Slide ${i + 1} of ${items.length}`}
                aria-hidden={!isActive}
                id={`craft-carousel-${uid}-${i}`}
                className="[grid-column:1] [grid-row:1]"
                style={{
                  transform: getSlideTransform(offset),
                  opacity: absOffset > 1 ? 0 : absOffset === 1 ? 0.65 : 1,
                  zIndex: isActive ? 10 : absOffset === 1 ? 5 : 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                  transition: 'transform 0.45s cubic-bezier(0.33,1,0.68,1), opacity 0.45s ease',
                }}
              >
                <PolaroidFrame
                  caption={item.caption}
                  rotate={rotate}
                  active={isActive}
                >
                  {item.content}
                </PolaroidFrame>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation arrows */}
      {showArrows && !single && (
        <>
          <ArrowButton direction="left"  onClick={() => go(-1)} disabled={false} />
          <ArrowButton direction="right" onClick={() => go(1)}  disabled={false} />
        </>
      )}

      {/* Pushpin dot pagination */}
      {showDots && !single && (
        <div className="mt-5 flex items-center justify-center gap-2.5" role="tablist" aria-label="Carousel pagination">
          {items.map((item, i) => (
            <PushpinDot
              key={item.id}
              active={i === current}
              index={i}
              label={`Go to slide ${i + 1}${item.caption ? ': ' + item.caption : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
