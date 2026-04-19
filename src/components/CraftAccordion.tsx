import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useId,
  useState,
} from 'react'

import { cn } from '../lib/cn'
import { CraftScribble } from './CraftScribble'
import { WashiStrip } from './WashiStrip'

// ─── Types ───────────────────────────────────────────────────────────────────

export type CraftAccordionItem = {
  value: string
  label: ReactNode
  content: ReactNode
  disabled?: boolean
  /** Optional washi-tape tint shown on the open header */
  tint?: 'yellow' | 'mint' | 'pink' | 'lavender'
}

export type CraftAccordionProps = {
  items: CraftAccordionItem[]
  /** Allow multiple panels open simultaneously */
  multiple?: boolean
  defaultValue?: string | string[]
  /** Controlled open value(s) */
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  className?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalize(v: string | string[] | undefined): string[] {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

// ─── CraftAccordion ───────────────────────────────────────────────────────────

/**
 * Accordion that opens like an envelope flap — the content unfolds beneath
 * the header with a smooth `grid-template-rows` transition (no JS measurement).
 * Tabs for each open item wear a WashiStrip accent along the top.
 *
 * ```tsx
 * <CraftAccordion
 *   items={[
 *     { value: 'a', label: 'Materials', content: <p>…</p>, tint: 'mint' },
 *     { value: 'b', label: 'Instructions', content: <p>…</p>, tint: 'pink' },
 *   ]}
 * />
 * ```
 */
export function CraftAccordion({
  items,
  multiple = false,
  defaultValue,
  value: valueProp,
  onValueChange,
  className,
}: CraftAccordionProps) {
  const uid = useId().replace(/:/g, '')
  const isControlled = valueProp !== undefined
  const [innerOpen, setInnerOpen] = useState<string[]>(() => normalize(defaultValue))
  const open: string[] = isControlled ? normalize(valueProp) : innerOpen

  const toggle = useCallback(
    (v: string) => {
      let next: string[]
      const isOpen = open.includes(v)

      if (multiple) {
        next = isOpen ? open.filter((x) => x !== v) : [...open, v]
      } else {
        next = isOpen ? [] : [v]
      }

      if (!isControlled) setInnerOpen(next)
      onValueChange?.(multiple ? next : (next[0] ?? ''))
    },
    [isControlled, multiple, open, onValueChange],
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, v: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggle(v)
      }
    },
    [toggle],
  )

  return (
    <div className={cn('w-full space-y-2', className)} role="list">
      {items.map((item) => {
        const isOpen = open.includes(item.value)
        const headId = `craft-accordion-head-${uid}-${item.value}`
        const panelId = `craft-accordion-panel-${uid}-${item.value}`

        return (
          <div
            key={item.value}
            role="listitem"
            className={cn(
              'overflow-hidden rounded-xl border border-black/[0.08]',
              'craft-paper-base',
              'shadow-craft-paper transition-shadow duration-300',
              isOpen && 'shadow-craft-paper-lg',
              item.disabled && 'opacity-50',
            )}
          >
            {/* Header / flap */}
            <button
              id={headId}
              type="button"
              role="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              disabled={item.disabled}
              onClick={() => toggle(item.value)}
              onKeyDown={(e) => onKeyDown(e, item.value)}
              className={cn(
                'relative flex w-full items-center justify-between gap-3 px-5 py-4',
                'text-left font-craftMarker text-xl font-semibold text-craft-ink',
                'transition-[background-color] duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-craft-orange/50',
                'disabled:cursor-not-allowed',
                isOpen && 'border-b border-black/[0.07]',
              )}
            >
              {/* Washi-tape accent strip when open */}
              {isOpen && item.tint && (
                <WashiStrip
                  tint={item.tint}
                  className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-none !px-0 !py-0 opacity-80"
                />
              )}

              <span>{item.label}</span>

              {/* Chevron scribble arrow — rotates when open */}
              <span
                aria-hidden
                className={cn(
                  'shrink-0 transition-transform duration-350',
                  isOpen ? 'rotate-180' : 'rotate-0',
                )}
                style={{ transition: 'transform 0.35s cubic-bezier(0.33,1,0.68,1)' }}
              >
                <CraftScribble
                  type="arrow-down"
                  size={20}
                  strokeWidth={2.2}
                  className="text-craft-muted"
                />
              </span>
            </button>

            {/* Content panel — CSS grid trick for smooth height animation without JS */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={headId}
              className="grid"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.38s cubic-bezier(0.33,1,0.68,1)',
              }}
            >
              {/* Inner div must overflow-hidden to collapse properly */}
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pt-3 font-craftSans text-base text-craft-ink/90">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
