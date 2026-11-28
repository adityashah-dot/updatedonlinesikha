# Online Siksha design system

All tokens live in the `@theme` block at the top of [src/index.css](src/index.css).
Use them as Tailwind classes. **Do not add new hex colours, arbitrary shadows
(`shadow-[...]`) or arbitrary radii in components** — extend the token list instead.

## Colour

| Token | Class example | Use for |
|---|---|---|
| `brand-600` | `bg-brand-600`, `text-brand-600` | Primary buttons, links, active states |
| `brand-700` | `hover:bg-brand-700` | Primary hover |
| `brand-50` / `brand-100` | `bg-brand-50` | Icon tiles, selected rows, soft highlights |
| `brand-200` / `brand-300` | `border-brand-200` | Brand-tinted borders |
| `brand-900` | `bg-brand-900` | Dark surfaces (footer) |
| `ink-900` | `text-ink-900` | Headings, key numbers |
| `ink-700` | `text-ink-700` | Body text |
| `ink-500` | `text-ink-500` | Secondary text, captions |
| `ink-400` | `text-ink-400` | Placeholders, disabled |
| `line` / `line-strong` | `border-line`, `border-line-strong` | Card borders / input borders |
| `canvas` | `bg-canvas` | Page and soft section backgrounds |
| `accent-*` | `text-accent-700` | Small highlights only — never primary actions |
| `success-*` / `danger-*` | `text-success-600` | Status, validation |

## Type

- Headings: **Poppins** (`font-display`), 600–700, tracking `-0.02em`.
- Body and UI: **Inter** (`font-sans`, the default), 400–600.

## Shape and elevation

- Radius: `rounded-md` 6px (chips) · `rounded-lg` 8px (buttons, inputs) · `rounded-xl` 12px (cards, modals) · `rounded-full` (pills, avatars).
  `rounded-2xl`/`3xl` are mapped to 12px on purpose.
- Shadow: `shadow-sm` for resting cards, `shadow-lg` for floating elements, `shadow-2xl` for modals.
  Neutral only — no coloured glows, no neumorphic insets.

## Patterns to avoid

These make the site look template- or AI-generated:

- Decorative dots before headings, squiggle underlines, sparkles, dashed arrows.
- Tilted/rotated badges, spring "pop-in" animations, infinitely bouncing arrows.
- Emoji inside buttons.
- Rainbow icon tiles (green/amber/purple side by side) — icon tiles use `bg-brand-50 text-brand-600`.
- Gradient text or gradient buttons.
- Hiding above-the-fold content behind entrance animations (`initial={{ opacity: 0 }}`).
