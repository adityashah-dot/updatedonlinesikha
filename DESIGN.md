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

### Colour usage rules

- **Blue is for things you can act on**: buttons, links, the active tab or filter. Not for decoration.
- **Cards are white with a neutral `border-line`**, not blue outlines. Sections alternate white and `canvas`.
- **Brand tint (`bg-brand-50`)** only for icon tiles, selected rows and removable filter chips.
- **Amber (`accent-*`)** only for NAAC grades, ratings and "popular" markers.
- **Green (`success-*`)** only for status: "Online", "UGC-DEB entitled", success messages.
- **Text contrast:** body `ink-700`, secondary `ink-500` (passes AA on white and canvas). `ink-400` is for
  placeholders and icons only, never for readable text.

## Components

Use the shared primitives in `src/components/ui/` instead of hand-written Tailwind:
`Button` (primary / secondary / ghost), `Badge` (neutral / brand / success / warning), `Card`,
`Chip` (filter toggle), `Sheet` (bottom sheet or side drawer), `Skeleton`, `SectionHeader`.

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
