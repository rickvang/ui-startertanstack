# ui-starter-tanstack

`packages/ui` is the catalog. `apps/web` is a TanStack Start demo. Use this page to decide where a change goes, then change that place.

## Where to go

| Job | Open first | Change |
| --- | --- | --- |
| Mock up a screen | `Patterns/Overview`, then the closest pattern story | A story beside that pattern |
| Pick a workflow | `Patterns/Overview`, "How to choose a workflow" | Copy that pattern. Keep `Shell` as the frame |
| Build a table | `Modules/Table` Overview | The smallest table story that matches the task |
| Add a control that does not exist | The matching story under Components, Layout, or Modules | `packages/ui/src/components`, export from `packages/ui/src/index.ts`, and add a story beside the file. A module that already has a `stories/` folder gets the story there |
| Change color, type, or space | Foundations stories | Semantic tokens in `packages/ui/src/styles/theme.css`. Primitive ramps stay fixed |
| Add a page | `apps/web/src/routes/_areas/index.tsx` | `apps/web/src/routes/<name>.tsx` with `createFileRoute`. Keep `__root.tsx` as the document shell |
| Hold a workspace, client, or project | `apps/web/src/areas.ts` | Add one entry to `areas`. Leave the page unbuilt |
| Show one of those areas | `apps/web/src/routes/_areas/route.tsx` | Add `routes/_areas/$kind.$areaId.tsx` when a page is requested. `_areas` adds no URL. The home page stays `routes/_areas/index.tsx` |

Workflows in `Patterns/Overview`: navigating domains, create a record, modifying a record, wizard, onboarding, task management, visualization page.

## How to change

- A workspace, client, or project is an entry in `apps/web/src/areas.ts`. The list is empty. Its page, when requested, is a child of `apps/web/src/routes/_areas`. The home page stays `routes/_areas/index.tsx`.
- Import reusable components from `@ui-starter/ui`. The public list is `packages/ui/src/index.ts`.
- A pattern story shows a composition. Check that list before importing the pattern as a component.
- Run `bun run typecheck`.
- Review the screen or story at desktop (1440px) and mobile (375px). The Storybook toolbar switches light and dark.

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

Storybook groups: Foundations, Layout, Components, Modules, and Patterns. Navigation controls sit with Components.
