# ui-starter-tanstack

The same starter as `ui-starter`, with TanStack Start instead of the Vite client app.

- `packages/ui` holds tokens, `Button`, `TextField`, and Storybook.
- `apps/web` is a TanStack Start app. Routes live in `apps/web/src/routes`.

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
