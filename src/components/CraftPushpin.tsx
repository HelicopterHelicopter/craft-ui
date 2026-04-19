import { type SVGProps, forwardRef, useId } from 'react'

import { cn } from '../lib/cn'
import type { CraftCrayon } from './CraftCard'

export type CraftPushpinTone = CraftCrayon | 'silver' | 'gold'

export type CraftPushpinProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  /** Head color tone */
  tone?: CraftPushpinTone
  /** Height in px (width scales proportionally) */
  size?: number
}

const tints: Record<CraftPushpinTone, { hi: string; mid: string; lo: string }> = {
  red:    { hi: '#fca5a5', mid: '#d12a3a', lo: '#7f1d1d' },
  orange: { hi: '#fdba74', mid: '#e85d2a', lo: '#9a3412' },
  yellow: { hi: '#fde68a', mid: '#f5c018', lo: '#a16207' },
  green:  { hi: '#86efac', mid: '#2dd54a', lo: '#14532d' },
  blue:   { hi: '#93c5fd', mid: '#3b82f6', lo: '#1e3a8a' },
  pink:   { hi: '#f9a8d4', mid: '#ff4fa8', lo: '#831843' },
  lime:   { hi: '#d9f99d', mid: '#9ae06b', lo: '#3f6212' },
  silver: { hi: '#f8fafc', mid: '#94a3b8', lo: '#334155' },
  gold:   { hi: '#fef3c7', mid: '#d97706', lo: '#78350f' },
}

/**
 * Decorative thumbtack / pushpin — standalone SVG for pinning things to a surface.
 * Use it on card corners, sticky notes, cork boards, or anywhere physical fastening
 * is implied. Pairs naturally with `CraftCard` and `StickyNote`.
 */
export const CraftPushpin = forwardRef<SVGSVGElement, CraftPushpinProps>(function CraftPushpin(
  { className, tone = 'red', size = 28, ...props },
  ref,
) {
  const uid = useId().replace(/:/g, '')
  const g = tints[tone]
  // viewBox 0 0 20 28: head (r=9) centred at (10,10), short pin below
  const w = Math.round(size * (20 / 28))

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={size}
      viewBox="0 0 20 28"
      fill="none"
      className={cn('shrink-0', className)}
      aria-hidden
      {...props}
    >
      <defs>
        {/* Sphere gradient: lit from upper-left */}
        <radialGradient id={`cp-h-${uid}`} cx="32%" cy="28%" r="68%">
          <stop offset="0%"   stopColor={g.hi} />
          <stop offset="52%"  stopColor={g.mid} />
          <stop offset="100%" stopColor={g.lo} />
        </radialGradient>
        {/* Pin: warm steel grey top → bright silver bottom */}
        <linearGradient id={`cp-p-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#78909c" />
          <stop offset="100%" stopColor="#cfd8dc" />
        </linearGradient>
      </defs>

      {/* Cast shadow on surface */}
      <ellipse cx="11" cy="27" rx="4.5" ry="1.2" fill="rgba(0,0,0,0.22)" />

      {/* Metal pin / needle */}
      <line
        x1="10"  y1="18.5"
        x2="10.5" y2="26"
        stroke={`url(#cp-p-${uid})`}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Shank collar (where pin meets head) */}
      <ellipse cx="10" cy="18" rx="3" ry="1.4" fill={g.lo} opacity="0.6" />

      {/* Head shadow rim */}
      <circle cx="10" cy="10.5" r="9.5" fill={g.lo} opacity="0.45" />

      {/* Head dome with sphere gradient */}
      <circle cx="10" cy="9.5" r="9" fill={`url(#cp-h-${uid})`} />

      {/* Primary specular blob */}
      <ellipse cx="6.5" cy="5.5" rx="3.8" ry="2.6" fill="rgba(255,255,255,0.5)" />

      {/* Bright hot-spot */}
      <circle cx="5.5" cy="4.8" r="1.6" fill="rgba(255,255,255,0.72)" />
    </svg>
  )
})
