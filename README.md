# ui-starter-tanstack

The same starter as `ui-starter`, with TanStack Start instead of the Vite client app.

- `packages/ui` holds design tokens, reusable controls, layout components, composed modules, and Storybook examples.
- `apps/web` is a TanStack Start app. Routes live in `apps/web/src/routes`.

## Building with this starter

### Find what exists

- [Public exports](packages/ui/src/index.ts) list reusable components and types.
- In Storybook, browse Foundations → Layout → Components → Modules → Patterns.
- Read the relevant component's `.stories.tsx` examples beside its source. Larger modules may have a `stories/` folder with an Overview.

### Choose and reuse

- Start with the relevant module or pattern's usage guidance.
- Import reusable components from `@ui-starter/ui`.
- Patterns demonstrate compositions; check the public exports before assuming a pattern is an importable component.
- For tables, start with [Modules → Table → Overview](packages/ui/src/components/modules/table/stories/overview.stories.tsx), then choose the smallest example matching the task.

### Put changes in the right place

- Prototype pages and feature-specific behavior belong in `apps/web/src`.
- Reusable controls and modules belong in `packages/ui/src/components`.
- Shared visual tokens live in `packages/ui/src/styles/theme.css`.
- Use existing semantic tokens and spacing utilities; consult Foundations for their intended use.

### Check the result

- Run `bun run typecheck`.
- Review the affected screen or story at desktop and mobile sizes.

## Scripts

```bash
bun install
bun run dev         # http://localhost:3000
bun run storybook   # http://localhost:6006
bun run typecheck
```

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

Add a page by creating a file in `apps/web/src/routes`. Change colors in `packages/ui/src/styles/theme.css`. Primitive ramps stay fixed. Semantic tokens (`canvas`, `ink`, `accent`, `danger`, and the rest) swap under the `dark` class.

Storybook groups the catalog into Foundations, Layout, Components, Modules, and Patterns. Navigation controls sit with Components. Layout frames, overlays, and rules are skeletons. Modules are the shell, forms, detail, and table. Patterns holds navigating domains and the workflows that use those modules. Foundations covers color primitives, semantic color, type, spacing, sizing, radius, shadow, and motion. Motion durations are feedback (150ms), enter (200ms), leave (100ms), and travel (300ms). Type, color, sizing, radius, and shadow examples compare dense product UI, web pages, and graphic assets. Spacing and sizing share one scale, `spacing-01` (2px) through `spacing-13` (160px), with `spacing-05.5` (20px) between 16px and 24px. Utilities are `gap-spacing-05`, `p-spacing-05`, `w-spacing-05`, and `h-spacing-05`. Foundations/Spacing also documents usage and examples for stack, actions, fields, forms, and pages. Patterns stays the group for composed components. The toolbar switches light and dark, and the viewport can be Mobile (375px) or Desktop (1440px).
