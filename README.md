# ui-starter-tanstack

The same catalog as `ui-starter`, with TanStack Start for the app. `packages/ui` holds tokens, components, and Storybook. `apps/web` routes live in `apps/web/src/routes`. `/` renders the demo page.

## Commands

```bash
bun install
bun run dev         # http://localhost:3000
bun run storybook   # http://localhost:6006
bun run typecheck
```

## Where to go

| Job | Open first | Change |
| --- | --- | --- |
| Mock up a screen | `Patterns/Overview`, then the closest pattern story | A story beside that pattern |
| Pick a workflow | `Patterns/Overview`, "How to choose a workflow" | Copy that pattern. Keep `Shell` as the frame |
| Build a table | `Modules/Table` Overview | The smallest table story that matches the task |
| Add a control that does not exist | The matching story under Components, Layout, or Modules | `packages/ui/src/components`, export it from `packages/ui/src/index.ts`, and add a story next to the file. A module that already has a `stories/` folder gets the story there |
| Change color, type, or space | Foundations stories | Semantic tokens in `packages/ui/src/styles/theme.css`. Leave the primitive ramps fixed |
| Add a page | `apps/web/src/routes/index.tsx` | `apps/web/src/routes/<name>.tsx` with `createFileRoute`. Keep `__root.tsx` as the document shell |

`Patterns/Overview` chooses the workflow: navigating domains, create a record, modifying a record, wizard, onboarding, task management, or the visualization page.

## How to change

Import reusable components from `@ui-starter/ui`. The public list is `packages/ui/src/index.ts`. A pattern story shows a composition, so check that list before importing the pattern as a component. Run `bun run typecheck`, then review the screen or story at desktop (1440px) and mobile (375px).

## Catalog

Storybook groups the catalog into Foundations, Layout, Components, Modules, and Patterns. Navigation controls sit with Components. Foundations covers color, type, spacing, sizing, radius, shadow, and motion. Layout holds frames, overlays, rules, and arrangement. Modules are the shell, forms, detail, and table. Patterns are the workflows that use those modules. The toolbar switches light and dark. The viewport can be Mobile (375px) or Desktop (1440px).

## Public demo

The employer catalog is the Storybook build, intended at `https://ui-starter.rickvang.com`.

- Vercel team `team_aDqth5R7Xpr6XKtxgfpfvTZt`, project `ui-starter` (`prj_Mw2jup7aZYyAuQk16lAUnR3xCRYS`).
- The project serves a static upload. Framework, install, build, output, and root directory are unset.
- The custom domain is attached. `*.vercel.app` stays behind Vercel login. The custom host is the public URL.
- DNS is Namecheap BasicDNS (`dns1.registrar-servers.com` and `dns2.registrar-servers.com`). Add one record: CNAME `ui-starter` to `b43800c0aab11715.vercel-dns-017.com`. Leave the apex and `www` records alone. `work.rickvang.com` points at the VPS and is a different service.

Update the demo from `packages/ui`:

```bash
bun run build-storybook
```

`storybook-static` is generated and gitignored. Deploy a copy from outside this repo, or the CLI walks up to `packages/ui` and the site returns 404. The CLI needs one local `vercel login`.

```bash
$dst = "$env:TEMP\ui-starter-storybook"
Remove-Item $dst -Recurse -Force -ErrorAction SilentlyContinue
robocopy storybook-static $dst /E /XD .vercel /XF vercel.json
npx vercel deploy --prod --yes --force --scope team_aDqth5R7Xpr6XKtxgfpfvTZt --project ui-starter $dst
```
