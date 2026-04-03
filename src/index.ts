import './index.css'

export { cn } from './lib/cn'
export { CraftProvider, type CraftProviderProps, type CraftVibe } from './components/CraftProvider'
export { CraftCard, type CraftCardProps, type CraftCrayon } from './components/CraftCard'
export { RopeFrame, type RopeFrameProps } from './components/RopeFrame'
export {
  CraftButton,
  type CraftButtonProps,
  type CraftButtonVariant,
} from './components/CraftButton'
export { CraftBadge, type CraftBadgeProps } from './components/CraftBadge'
export { CraftLetterChip, type CraftLetterChipProps } from './components/CraftLetterChip'
export { CraftTwineGarland, type CraftTwineGarlandProps } from './components/CraftTwineGarland'

/* Phase 2 — surfaces & layout */
export { StickyNote, type StickyNoteProps } from './components/StickyNote'
export { WashiStrip, type WashiStripProps, type WashiPattern } from './components/WashiStrip'
export { CraftTag, type CraftTagProps } from './components/CraftTag'
export { CrayonDivider, type CrayonDividerProps } from './components/CrayonDivider'
export { CraftSketchUnderline, type CraftSketchUnderlineProps } from './components/CraftSketchUnderline'
export { WatercolorPanel, type WatercolorPanelProps } from './components/WatercolorPanel'
export { GlitterAccent, type GlitterAccentProps } from './components/GlitterAccent'
export { TissuePanel, type TissuePanelProps } from './components/TissuePanel'

/* Phase 3 — forms */
export { CraftLabel, type CraftLabelProps } from './components/CraftLabel'
export { CraftInput, type CraftInputProps } from './components/CraftInput'
export { CraftTextarea, type CraftTextareaProps } from './components/CraftTextarea'
export { CraftCheckbox, type CraftCheckboxProps } from './components/CraftCheckbox'
export { CraftRadio, type CraftRadioProps } from './components/CraftRadio'
export { CraftRadioGroup, type CraftRadioGroupProps } from './components/CraftRadioGroup'
export { CraftSwitch, type CraftSwitchProps } from './components/CraftSwitch'
export { CraftSelect, type CraftSelectProps } from './components/CraftSelect'
export {
  CraftRoughFieldFrame,
  type CraftRoughFieldFrameProps,
} from './components/CraftRoughFieldFrame'
export { craftFieldAppearanceClass, type CraftFieldAppearance } from './lib/craftFieldAppearance'

/* Phase 4 — navigation */
export { CraftTabs, type CraftTabsProps, type CraftTabItem } from './components/CraftTabs'
export {
  CraftBreadcrumb,
  CraftBreadcrumbList,
  CraftBreadcrumbItem,
  CraftBreadcrumbLink,
  CraftBreadcrumbPage,
  CraftBreadcrumbSeparator,
  CraftBreadcrumbSepLi,
  type CraftBreadcrumbProps,
  type CraftBreadcrumbListProps,
  type CraftBreadcrumbItemProps,
  type CraftBreadcrumbLinkProps,
  type CraftBreadcrumbPageProps,
  type CraftBreadcrumbSeparatorProps,
} from './components/CraftBreadcrumb'

/* Phase 5 — overlays & feedback */
export { CraftTooltip, type CraftTooltipProps } from './components/CraftTooltip'
export { CraftPopover, type CraftPopoverProps } from './components/CraftPopover'
export { CraftDialog, type CraftDialogProps } from './components/CraftDialog'
export { CraftAlert, type CraftAlertProps, type CraftAlertTone } from './components/CraftAlert'
export { CraftToast, type CraftToastProps } from './components/CraftToast'
export {
  CraftProgress,
  type CraftProgressProps,
  type CraftProgressWashiPattern,
} from './components/CraftProgress'
export { CraftSpinner, type CraftSpinnerProps } from './components/CraftSpinner'
export { CraftSkeleton, type CraftSkeletonProps } from './components/CraftSkeleton'

/* Phase 6 — data display */
export {
  CraftList,
  CraftListItem,
  type CraftListProps,
  type CraftListItemProps,
  type CraftListMarker,
} from './components/CraftList'
export { CraftAvatar, type CraftAvatarProps } from './components/CraftAvatar'
export {
  CraftPaperClip,
  type CraftPaperClipProps,
  type CraftPaperClipTone,
} from './components/CraftPaperClip'
export {
  CraftClippedCard,
  CraftClippedStack,
  type CraftClippedCardProps,
  type CraftClippedStackProps,
  type ClipPosition,
} from './components/CraftClippedCard'
export {
  CraftTable,
  CraftTableCaption,
  CraftTableHeader,
  CraftTableBody,
  CraftTableFooter,
  CraftTableRow,
  CraftTableHeadCell,
  CraftTableCell,
  type CraftTableProps,
  type CraftTableCaptionProps,
  type CraftTableHeaderProps,
  type CraftTableBodyProps,
  type CraftTableFooterProps,
  type CraftTableRowProps,
  type CraftTableHeadCellProps,
  type CraftTableCellProps,
} from './components/CraftTable'
