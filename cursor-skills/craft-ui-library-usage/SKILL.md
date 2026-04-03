---
name: craft-ui-library-usage
description: Teaches correct usage of the npm package `@kuboxx/craft-ui` — install, CSS export, CraftProvider, full component catalog, and composition patterns for surfaces, forms, navigation, overlays, and data display. Use whenever the user mentions `@kuboxx/craft-ui`, kuboxx craft-ui, scoped imports from that package, or asks to build UI with this library; also use when choosing components or auditing craft-ui usage in app code. Same SKILL.md works in Cursor and Claude Code (Agent Skills) and other tools that support the open Agent Skills format.
---

# `@kuboxx/craft-ui` — agent usage guide

This file ships inside the **`@kuboxx/craft-ui`** npm package under `cursor-skills/craft-ui-library-usage/` (the folder name is historical; the content is **not** Cursor-specific). It follows the **[Agent Skills](https://agentskills.io/)** layout (`<skill-name>/SKILL.md`). Install it into the skills directory your coding agent uses (see **Installing this skill** below).

**Marketplace installs:** This repository also packages the same skill as a **Cursor** plugin (`plugins/kuboxx-craft-ui/`) and a **Claude Code** plugin (`claude-plugin/kuboxx-craft-ui/`). Maintainer steps for submitting those to each marketplace are in [`docs/marketplace-publish.md`](https://github.com/HelicopterHelicopter/craft-ui/blob/main/docs/marketplace-publish.md).

## Package facts (use these in consumer apps)

- **npm name:** `@kuboxx/craft-ui` (scoped package — not `craft-ui` unless the user’s project aliases it).
- **Peers:** `react` and `react-dom` — `^18.0.0 || ^19.0.0`.
- **Install:** `npm install @kuboxx/craft-ui` (or pnpm/yarn equivalent).
- **Exports:**
  - **Components & types:** `import { … } from '@kuboxx/craft-ui'` → resolves to `dist/craft-ui.js` / `dist/index.d.ts`.
  - **Styles:** `import '@kuboxx/craft-ui/styles.css'` → shipped CSS (built Tailwind utilities + `:root` tokens such as `--craft-paper`, `--craft-orange`, etc.).
- **Typings in node_modules:** `node_modules/@kuboxx/craft-ui/dist/index.d.ts` lists every export and prop type — prefer this when implementing in an app repo.
- **Live reference:** Storybook at [craft-ui.jheels.in](https://craft-ui.jheels.in/) (component behavior and layout ideas).

## Installing this skill

After installing the library, copy the **`craft-ui-library-usage`** folder into your **application** repo (not inside `node_modules` — that tree is often gitignored and may be wiped on reinstall). The source path is always:

`node_modules/@kuboxx/craft-ui/cursor-skills/craft-ui-library-usage/`

**From GitHub** (no npm): copy [`cursor-skills/craft-ui-library-usage/`](https://github.com/HelicopterHelicopter/craft-ui/tree/main/cursor-skills/craft-ui-library-usage) from the craft-ui repository.

### Cursor

Project skill (this repo only):

```bash
mkdir -p .cursor/skills
cp -R node_modules/@kuboxx/craft-ui/cursor-skills/craft-ui-library-usage .cursor/skills/
```

Personal skill (all projects): copy the same folder to `~/.cursor/skills/`.

Discovery: `.cursor/skills/<skill-name>/SKILL.md`. See [Cursor Agent Skills](https://cursor.com/docs/context/skills).

### Claude Code

[Claude Code](https://code.claude.com/docs/en/skills) uses the same directory layout under **`.claude/skills/`** (project) or **`~/.claude/skills/`** (personal). Copy the folder so the entry file is `.claude/skills/craft-ui-library-usage/SKILL.md`.

Project skill:

```bash
mkdir -p .claude/skills
cp -R node_modules/@kuboxx/craft-ui/cursor-skills/craft-ui-library-usage .claude/skills/
```

Personal skill:

```bash
mkdir -p ~/.claude/skills
cp -R node_modules/@kuboxx/craft-ui/cursor-skills/craft-ui-library-usage ~/.claude/skills/
```

Invoke with `/craft-ui-library-usage` or rely on automatic loading when the task matches the **description** in the YAML frontmatter.

### Other coding agents

Any product that implements **Agent Skills** expects a folder per skill with `SKILL.md` inside. Install paths differ by tool (for example some use `~/.codex/skills/<name>/SKILL.md`). Copy the same `craft-ui-library-usage` directory into that product’s skills location; do not flatten the folder.

## Quick start (required imports + wrapper)

1. Import primitives from `@kuboxx/craft-ui`.
2. Import `@kuboxx/craft-ui/styles.css` once at app (or layout) root so classes and design tokens apply.
3. Wrap the UI tree in `CraftProvider` (`data-theme`, optional `data-craft-vibe` for scrapbook).

```tsx
import {
  CraftProvider,
  CraftCard,
  CraftButton,
  RopeFrame,
} from '@kuboxx/craft-ui'
import '@kuboxx/craft-ui/styles.css'

export function App() {
  return (
    <CraftProvider vibe="default">
      <RopeFrame>
        <CraftCard tint="yellow" lift="paste" elevation="lg">
          <CraftButton variant="clay" crayon="pink">
            Hello
          </CraftButton>
        </CraftCard>
      </RopeFrame>
    </CraftProvider>
  )
}
```

### Vibe theming

- `CraftProvider` props:
  - `theme?: string` (defaults to `"craft"`)
  - `vibe?: 'default' | 'scrapbook'` (defaults to `'default'`)
- Use `vibe="scrapbook"` for sunnier paper + stronger fiber grain + twine-forward browns (handmade card / desk collage). Pair with `CraftTwineGarland`, `CraftLetterChip`, and `CraftCard lift="paste"` as needed.

### Fonts & typography

- For the intended script + marker look, load **Caveat** and **Kalam** (or set CSS variables `--craft-font-display` / `--craft-font-marker` per project setup). Without them, fallback stack still works but may look less “craft”.

### Tailwind in the host app

- The library ships **prebuilt CSS**; apps do not need Tailwind config to consume it.
- If the app **also** uses Tailwind and you purge/build your own bundle, you may need to include the library’s built JS in `content` for safelisting (advanced) — see the package README.

## Component discovery (available exports)

If you need to pick components, use the catalog below. Prefer composing by “phases” (surfaces -> forms -> navigation -> overlays -> data display).

### Base + utilities

- `cn` — className helper (if you need conditional classes)
- `CraftProvider` — required wrapper for craft typography/tokens

### Phase 1 — frames + cards

- `RopeFrame` — rope/border container; use around card-like content
- `CraftCard` — paper surface container (control `tint`, `lift`, `elevation`, `variant`, `deckled`)
- `CraftButton` — clay/eraser button; uses `variant` + `crayon`
- `CraftBadge` — small sparkle badge chip
- `CraftLetterChip` — letter “chip” for garlands/collages
- `CraftTwineGarland` — garland built from letter chips

### Phase 2 — surfaces & layout

- `StickyNote` — neon square note (rotate + color)
- `WashiStrip` — torn-edge tape strip (`pattern`, `tint`)
- `CraftTag` — gradient label (or paper variant)
- `CrayonDivider` — wavy horizontal rule
- `CraftSketchUnderline` — marker underline under inline text
- `WatercolorPanel` — soft wash backgrounds
- `GlitterAccent` — sparkle badge accent
- `TissuePanel` — frosted crinkled overlay

### Phase 3 — forms

- `CraftLabel` — marker-style field label; can show required star
- `CraftInput` / `CraftTextarea` — paper inset fields (`appearance` prop available)
- `CraftCheckbox` — chunky eraser-style checkbox
- `CraftRadio` — square tile radio
- `CraftRadioGroup` — `role="radiogroup"` wrapper; pair with `CraftRadio` using the same `name`
- `CraftSwitch` — clay thumb switch (controlled or `defaultChecked`)
- `CraftSelect` — native `<select>` with craft styling
- `CraftRoughFieldFrame` — sketchy decorative frame (wrap the real input/control)
- `craftFieldAppearanceClass` — internal styling helper exposed by the library (only use if you know why)

### Phase 4 — navigation

- `CraftTabs` — sticky-note tabs (`items[]` with `{ value, label, content, disabled? }`)
- `CraftBreadcrumb` — breadcrumb `<nav>`
- `CraftBreadcrumbList` — `<ol>`
- `CraftBreadcrumbItem` — `<li>`
- `CraftBreadcrumbLink` — crumb link
- `CraftBreadcrumbPage` — current page (sets `aria-current="page"`)
- `CraftBreadcrumbSeparator` / `CraftBreadcrumbSepLi` — dot separator helpers (use `SepLi` between items)

### Phase 5 — overlays & feedback

- `CraftTooltip` — hover/focus tooltip (`content`, `children`, optional `side`)
- `CraftPopover` — click-to-toggle anchored panel (outside click + Escape closes)
- `CraftDialog` — native `<dialog showModal>` paper sheet with scrim + footer slot
- `CraftAlert` — banner alert (`tone`, optional `live` for `role="alert"`)
- `CraftToast` — portal’d sticky-note toast (duration + dismiss)
- `CraftProgress` — determinate bar (`value` + `max`, optional `crayon` fill)
- `CraftSpinner` — indeterminate spinner (safe with reduced motion)
- `CraftSkeleton` — paper + noise pulse placeholder

### Phase 6 — data display

- `CraftList` / `CraftListItem` — list with selectable markers; optional ordered mode
- `CraftPaperClip` — 3D paper clip SVG icon
- `CraftClippedCard` / `CraftClippedStack` — clipped-corner card surfaces; `ClipPosition` for clip placement
- `CraftAvatar` — avatar with `src` or initials fallback (size/shape/crayon wash)
- `CraftTable` and table parts:
  - `CraftTableCaption`
  - `CraftTableHeader` / `CraftTableBody` / `CraftTableFooter`
  - `CraftTableRow`
  - `CraftTableHeadCell` / `CraftTableCell`

## Common composition rules (how to use components “properly”)

### Root styling

- Always import `@kuboxx/craft-ui/styles.css` once (your bundler must include CSS).
- Always wrap the craft UI tree in `CraftProvider`.
- If the output must be “scrapbook vibe”, set `CraftProvider vibe="scrapbook"`.

### Surfaces (paper/rope) + controls

- Use `RopeFrame` as an outer container for “card” layouts.
- Put content inside `CraftCard`; use:
  - `tint` (crayon color)
  - `lift` (`"none" | "paste" | "paste-lg"`)
  - `elevation` (`"sm" | "lg"`)
  - `variant` (`"default" | "kraft" | "parchment"`)
  - `deckled` (tear edge profile: `1 | 2 | 3`)
- Put `CraftButton` inside `CraftCard` (or anywhere).
  - `CraftButton` props: `variant` (`"clay" | "eraser"`) and `crayon` (color)

### Forms (accessibility + decoration)

- Prefer using the provided wrappers:
  - `CraftLabel` for labels
  - `CraftRadioGroup` for radios (with `label?: ReactNode`)
- If you use `CraftRoughFieldFrame`, keep it decorative:
  - place the real `CraftInput`/`CraftTextarea` inside it
  - do not move focus styles to the decorative wrapper

### Navigation

- `CraftTabs`:
  - pass `items` with `{ value, label, content, disabled? }`
  - optionally control with `value` + `onValueChange` or set `defaultValue`
- `CraftBreadcrumb`:
  - compose as `CraftBreadcrumbList` -> `CraftBreadcrumbItem` -> separators (`CraftBreadcrumbSepLi`) and links/pages

### Overlays/feedback

- `CraftTooltip`:
  - the `children` should be a focusable or hoverable element so the tooltip can open on hover/focus
  - use `side="top" | "bottom"` when you need the bubble placement
- `CraftPopover` and `CraftDialog` manage open/close behavior internally; only provide the trigger/content/slots they expect.

### Data display

- `CraftTable` is a wrapper around `<table>`.
  - Compose with the provided `CraftTable*` parts (thead/tbody/tfoot/rows/cells).
- `CraftList`:
  - use `CraftListItem` and let the component handle marker rendering; keep custom leading art as `marker="none"` when supported by your use case.

## Output quality checks (agent self-audit)

Before finalizing generated code that uses **`@kuboxx/craft-ui`**, verify:

- Imports use the scoped package: `from '@kuboxx/craft-ui'` and `import '@kuboxx/craft-ui/styles.css'` (not an unscoped name unless the user’s monorepo/workspace explicitly uses another alias).
- Correct CSS import is present **once** at a root that wraps all craft UI.
- The UI is wrapped in `CraftProvider` (and `vibe` is set when the design is scrapbook/collage).
- Component composition matches the catalog (e.g., `CraftRadioGroup` wraps `CraftRadio`; `CraftTable` uses `CraftTableHeader/Body/Row/Cell` parts).
- For accessibility-sensitive components:
  - tooltips use focus/hoverable children
  - radios share the same `name` across `CraftRadio` children in a `CraftRadioGroup`.

## Working in this repo (`craft-ui` source)

If the skill applies while editing **this** repository (the library itself), public API and export order live in `src/index.ts`; Storybook files under `src/*.stories.tsx` show composition. Published behavior matches `dist/` after `npm run build`. The canonical skill file for npm lives at `cursor-skills/craft-ui-library-usage/SKILL.md`.
