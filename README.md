# @kuboxx/craft-ui

React components with a **handmade desk** look: **paper** surfaces, **rope** frames, and a **crayon** palette. Use it when you want UI that feels like cardstock, tape, and markers—not flat corporate chrome.

**Docs in the browser:** [Storybook](https://craft-ui.jheels.in/)  
**Package:** [`@kuboxx/craft-ui` on npm](https://www.npmjs.com/package/@kuboxx/craft-ui)

## Install

```bash
npm install @kuboxx/craft-ui
```

Peer dependencies: **React 18+ or 19** (`react`, `react-dom`).

## Quick start

Import components from the package entry and load the stylesheet **once** (usually at your app or layout root). Wrap craft-themed UI in **`CraftProvider`** so typography and theme hooks apply.

```tsx
import { CraftProvider, CraftCard, CraftButton, RopeFrame } from '@kuboxx/craft-ui'
import '@kuboxx/craft-ui/styles.css'

export function App() {
  return (
    <CraftProvider>
      <RopeFrame>
        <CraftCard tint="yellow" elevation="lg">
          <CraftButton variant="clay" crayon="pink">
            Hello
          </CraftButton>
        </CraftCard>
      </RopeFrame>
    </CraftProvider>
  )
}
```

For a warmer **scrapbook / greeting-card** feel, use `CraftProvider vibe="scrapbook"` and pieces like `CraftTwineGarland`, `CraftLetterChip`, and `CraftCard lift="paste"`. Examples live in Storybook.

### Fonts

For the intended script and marker typography, load **Caveat** and **Kalam** (see [`.storybook/preview-head.html`](.storybook/preview-head.html) for reference), or set `--craft-font-display` / `--craft-font-marker` in your own CSS.

### Styling and Tailwind

The library ships **ready-to-use CSS** via `import '@kuboxx/craft-ui/styles.css'` (built with Tailwind; design tokens such as `--craft-paper` and `--craft-orange` live on `:root`). Consumer apps do **not** need Tailwind to use it. If your app also runs Tailwind and you customize purging, you may need to include the package’s built JS in `content`—see advanced notes in published typings or Storybook.

**TypeScript:** all public exports and props are described in **`dist/index.d.ts`** after install (`node_modules/@kuboxx/craft-ui/dist/index.d.ts`).

## What’s in the box

Exports include primitives for **layout & surfaces** (e.g. `RopeFrame`, `CraftCard`, `CraftClippedCard`, `CraftClippedStack`, sticky notes, tape strips, washes), **forms** (labels, inputs, radios, switch, select), **navigation** (tabs, breadcrumbs), **overlays & feedback** (tooltip, popover, dialog, alerts, toasts, progress, spinner, skeleton), and **data display** (lists, avatars, table building blocks). **`cn`** is included for class names.

The interactive catalog, prop variations, and composition ideas are maintained in **[Storybook](https://craft-ui.jheels.in/)**—that’s the best place to browse before coding.

## Agent skill (optional)

The published tarball includes an **[Agent Skills](https://agentskills.io/)** folder (`cursor-skills/craft-ui-library-usage/`) so tools like **Cursor** or **Claude Code** can follow correct imports, CSS setup, and composition when you ask for help with this library.

Copy that folder from `node_modules` into your project’s skills directory (e.g. `.cursor/skills/` or `.claude/skills/`), or use the plugin layouts in this repo for marketplace submission. Maintainer notes: **[docs/marketplace-publish.md](docs/marketplace-publish.md)**.

## Contributing

```bash
npm install
npm run storybook   # http://localhost:6006
npm run build      # library output in dist/
```

## License

MIT
