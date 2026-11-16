# API conventions

Shared naming for catalog components in `@ui-starter/ui`. Follow these when adding or extending controls.

## Booleans

- Prefer `is*` / `has*` for state the component owns or reflects: `isOpen`, `isDisabled` only when the prop is not already the HTML attribute.
- Prefer plain adjectives for mode flags that configure chrome: `disabled`, `loading`, `selectable`, `stickyHeader`, `virtualize`.
- Do not invent double negatives (`isNotHidden`).

## Events

- Callbacks use `on*` + noun: `onValueChange`, `onOpenChange`, `onPageChange`.
- Controlled pairs are `value` + `onValueChange`, or `open` + `onOpenChange`.
- Uncontrolled defaults use `defaultValue` / `defaultOpen`.

## Variants and size

- Visual family: `variant` (e.g. `primary` | `secondary` | `ghost` | `danger`).
- Density / footprint: `size` (`dense` | `wide`) or a named density prop when the control already uses `size` for another scale.
- Status tone on badges/rows: `statusVariant` / `tone` — keep status separate from action `variant`.

## Slots and composition

- Prefer children for the primary content slot.
- Named slots as props only when the chrome needs a fixed place: `label`, `description`, `error`, `actions`, `renderDetail`, `renderCell`.
- Do not add a `slots` object API unless an existing module already uses one.

## Tokens

- Product UI uses semantic tokens and utilities from `theme.css` (`bg-surface`, `text-ink`, `gap-spacing-04`, `rounded-md`).
- Do not hard-code hex, ad-hoc rem, or px for theme values in components.
- Primitive ramps stay fixed; change look by retargeting semantic aliases under `:root` / `.dark`.
- See Foundations → Theme sheet for the live sheet.

## Class names

- Merge caller `className` with `cx` / `tailwind-merge` at the root.
- Keep layout concerns on the caller when the component is a control; keep chrome spacing inside the component.

## Story and agent metadata

- Every new public control gets a story with `parameters.agent` pointing at an `*AgentGuidance` export.
- After adding or renaming guidance, run `bun run catalog:build` so `catalog-index.json` stays current.
