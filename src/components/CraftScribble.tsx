import { type SVGProps, forwardRef } from 'react'

import { cn } from '../lib/cn'

export type CraftScribbleType =
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up'
  | 'arrow-down'
  | 'check'
  | 'cross'
  | 'circle'
  | 'underline'
  | 'star'
  | 'heart'
  | 'bracket-left'
  | 'bracket-right'

export type CraftScribbleProps = SVGProps<SVGSVGElement> & {
  /** Which hand-drawn mark to render */
  type: CraftScribbleType
  /** Width and height in px */
  size?: number
  /** Stroke thickness (default 2) */
  strokeWidth?: number
}

/**
 * Paths keyed by scribble type.
 * All paths are drawn in a 24×24 viewBox with slightly imperfect
 * curves to simulate a fast marker or pen stroke.
 *
 * Each entry is an array of `d` strings — each becomes one `<path>`.
 * star and heart also carry `filled: true` so they close correctly.
 */
const PATHS: Record<CraftScribbleType, { d: string[]; filled?: boolean }> = {
  'arrow-right': {
    d: [
      'M 2 12 C 7 11.5 13 12.5 20 12',      // shaft (slightly wavy)
      'M 14 7.5 C 16.5 9.5 19 11 21 12',    // upper wing
      'M 14 16.5 C 16.5 14.5 19 13 21 12',  // lower wing
    ],
  },
  'arrow-left': {
    d: [
      'M 22 12 C 17 11.5 11 12.5 4 12',
      'M 10 7.5 C 7.5 9.5 5 11 3 12',
      'M 10 16.5 C 7.5 14.5 5 13 3 12',
    ],
  },
  'arrow-up': {
    d: [
      'M 12 22 C 11.5 17 12.5 11 12 4',
      'M 7.5 10 C 9.5 7.5 11 5 12 3',
      'M 16.5 10 C 14.5 7.5 13 5 12 3',
    ],
  },
  'arrow-down': {
    d: [
      'M 12 2 C 11.5 7 12.5 13 12 20',
      'M 7.5 14 C 9.5 16.5 11 19 12 21',
      'M 16.5 14 C 14.5 16.5 13 19 12 21',
    ],
  },
  // Single confident pen stroke: dip down then sweep up-right
  check: {
    d: ['M 3 13.5 C 5.5 16.5 7.5 19 9.5 20.5 C 13 17 17.5 10 22 4'],
  },
  cross: {
    d: [
      'M 5 5 C 9 9 14.5 14 19 19',
      'M 19 5 C 15 9 9.5 14 5 19',
    ],
  },
  // Loose loop — hand-circling something
  circle: {
    d: [
      'M 20 10 C 20 5 16.5 2.5 12 2.5 C 7.5 2.5 4 6 3.5 10.5 C 3 15 6 19.5 11 21 C 16 22.5 21 19 21.5 14.5 C 21.8 12 20.5 10 19 10',
    ],
  },
  underline: {
    d: ['M 2 20 C 6 19.2 10 20.5 14 19.8 C 18 19.1 20 20.3 22 20'],
  },
  // 5-pointed star with imperfect coordinates for a hand-drawn feel
  star: {
    filled: true,
    d: [
      'M 12 2 L 14.7 8.9 L 22.1 9.4 L 16.8 14.2 L 18.9 21.5 L 12 17.4 L 5.1 21.5 L 7.2 14.2 L 1.9 9.4 L 9.3 8.9 Z',
    ],
  },
  // Bezier heart — drawn in one stroke each side
  heart: {
    filled: true,
    d: [
      'M 12 20.5 C 8 16.5 2.5 13.5 2.5 8.5 C 2.5 5 5.5 3 8.5 4 C 10 4.5 11.2 5.8 12 7 C 12.8 5.8 14 4.5 15.5 4 C 18.5 3 21.5 5 21.5 8.5 C 21.5 13.5 16 16.5 12 20.5 Z',
    ],
  },
  'bracket-left': {
    d: ['M 14 3 C 9 3 7 6 7 12 C 7 18 9 21 14 21'],
  },
  'bracket-right': {
    d: ['M 10 3 C 15 3 17 6 17 12 C 17 18 15 21 10 21'],
  },
}

/**
 * Hand-drawn SVG marks — arrows, check, cross, circle, star, heart.
 *
 * All marks use `currentColor` so they inherit the surrounding text color.
 * Stars and hearts can be filled by also setting `fill="currentColor"`.
 *
 * ```tsx
 * <CraftScribble type="arrow-right" size={32} className="text-craft-orange" />
 * <CraftScribble type="check" size={28} strokeWidth={2.5} className="text-craft-green" />
 * <CraftScribble type="star" size={24} fill="currentColor" className="text-craft-yellow" />
 * ```
 */
export const CraftScribble = forwardRef<SVGSVGElement, CraftScribbleProps>(function CraftScribble(
  { type, size = 24, strokeWidth = 2, className, fill, ...props },
  ref,
) {
  const mark = PATHS[type]

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ?? 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('shrink-0', className)}
      aria-hidden
      {...props}
    >
      {mark.d.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
})
