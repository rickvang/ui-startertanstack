# ui-starter-tanstack

`packages/ui` is the catalog. `apps/web` is a TanStack Start demo. Mockups belong in Storybook. A new product page is a file in `apps/web/src/routes`.

## Route

| Job | Open first | Put the work |
| --- | --- | --- |
| Mock up a screen | `Patterns/Overview`, then the closest pattern story | A story beside that pattern |
| Pick a workflow | `Patterns/Overview`, "How to choose a workflow" | Copy that pattern. Keep `Shell` as the frame |
| Add a control that does not exist | The matching story under Components, Layout, or Modules | `packages/ui/src/components`, export from `packages/ui/src/index.ts`, story beside the file |
| Change color, type, or space | Foundations stories | Semantic tokens in `packages/ui/src/styles/theme.css`. Primitive ramps stay fixed |
| Add a page | `apps/web/src/routes/index.tsx` | `apps/web/src/routes/<name>.tsx` with `createFileRoute`. Keep `__root.tsx` as the document shell |

Workflows in `Patterns/Overview`: navigating domains, create a record, modifying a record, wizard, onboarding, task management, visualization page.

## Commands

```bash
bun install
bun run dev         # http://localhost:3000
bun run storybook   # http://localhost:6006
bun run typecheck
```

## Catalog folders

- `foundations` — token stories
- `base`, `layout`, `navigation`, `modules` — product components
- `patterns` — workflows
- `templates` — catalog prose (`DocPage`), not product controls

Storybook groups: Foundations, Layout, Components, Modules, and Patterns. Navigation controls sit with Components. The toolbar switches light and dark. The viewport can be Mobile (375px) or Desktop (1440px).
