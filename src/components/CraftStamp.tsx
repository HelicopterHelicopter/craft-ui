import { type CSSProperties, type ReactNode, forwardRef, useId } from 'react'

import { cn } from '../lib/cn'

export type CraftStampTone = 'red' | 'blue' | 'green' | 'violet' | 'gold'
export type CraftStampSize = 'sm' | 'md' | 'lg'
export type CraftStampShape = 'rect' | 'oval'

export type CraftStampProps = {
  /** Short stamp text (e.g. "APPROVED", "DRAFT", "PAID") */
  label?: string
  /** Ink color */
  tone?: CraftStampTone
  /** Rotation in degrees — negative tilts left, positive right */
  rotate?: number
  size?: CraftStampSize
  /** Outer shape of the stamp impression */
  shape?: CraftStampShape
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

const inkMap: Record<CraftStampTone, { ink: string; bg: string; shadow: string }> = {
  red:    { ink: '#b91c1c', bg: 'rgba(185,28,28,0.07)',   shadow: 'rgba(185,28,28,0.22)' },
  blue:   { ink: '#1d4ed8', bg: 'rgba(29,78,216,0.07)',   shadow: 'rgba(29,78,216,0.22)' },
  green:  { ink: '#15803d', bg: 'rgba(21,128,61,0.07)',   shadow: 'rgba(21,128,61,0.22)' },
  violet: { ink: '#7c3aed', bg: 'rgba(124,58,237,0.07)',  shadow: 'rgba(124,58,237,0.22)' },
  gold:   { ink: '#b45309', bg: 'rgba(180,83,9,0.07)',    shadow: 'rgba(180,83,9,0.22)' },
}

const sizeMap: Record<CraftStampSize, { text: string; px: string; py: string; border: string }> = {
  sm: { text: 'text-sm',  px: 'px-2',   py: 'py-0.5', border: 'border-[2.5px]' },
  md: { text: 'text-base', px: 'px-3',  py: 'py-1',   border: 'border-[3px]' },
  lg: { text: 'text-lg',  px: 'px-4',   py: 'py-1.5', border: 'border-[3.5px]' },
}

/**
 * Rubber-stamp impression overlay — for labelling cards with status or intent.
 *
 * Designed to sit `position: absolute` on top of a `CraftCard` or similar
 * surface; `mix-blend-mode: multiply` makes it look pressed into the paper.
 *
 * ```tsx
 * <div className="relative">
 *   <CraftCard>Invoice #42</CraftCard>
 *   <CraftStamp label="PAID" tone="green" rotate={-10} className="absolute top-4 right-4" />
 * </div>
 * ```
 */
export const CraftStamp = forwardRef<HTMLDivElement, CraftStampProps>(function CraftStamp(
  {
    label,
    tone = 'red',
    rotate = 12,
    size = 'md',
    shape = 'rect',
    className,
    style,
    children,
  },
  ref,
) {
  const uid = useId().replace(/:/g, '')
  const filterId = `craft-stamp-${uid}`
  const c = inkMap[tone]
  const s = sizeMap[size]

  return (
    <>
      {/* Inline SVG filter — displaces pixels slightly to simulate ink roughness */}
      <svg
        width="0"
        height="0"
        className="pointer-events-none absolute overflow-hidden"
        aria-hidden
      >
        <defs>
          <filter id={filterId} x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        ref={ref}
        className={cn(
          'inline-block select-none font-craftMarker font-bold uppercase tracking-widest',
          'mix-blend-multiply',
          s.text,
          s.px,
          s.py,
          s.border,
          shape === 'oval' ? 'rounded-full' : 'rounded-[3px]',
          className,
        )}
        style={{
          color: c.ink,
          borderColor: c.ink,
          borderStyle: 'solid',
          backgroundColor: c.bg,
          boxShadow: [
            `inset 0 0 0 1px ${c.shadow}`,
            `0 0 0 1px ${c.shadow}`,
            `0 0 4px 1px rgba(0,0,0,0.08)`,
          ].join(', '),
          textShadow: `0 0 1.5px ${c.shadow}`,
          filter: `url(#${filterId})`,
          transform: `rotate(${rotate}deg)`,
          ...style,
        }}
      >
        {children ?? label}
      </div>
    </>
  )
})
