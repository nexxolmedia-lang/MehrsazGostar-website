# Design brief: «مهرساز گستر» sales prototype

Prepared by Nexxol Media for the client presentation. Covers four pages: Home, Catalog, Product Detail and Wholesale Inquiry, plus a designed 404.

## Concept: Luminous Precision
The product is the hero. Pages are light and calm, with the feel of a technical drawing: thin hairlines, measured tick marks (the "optical bench" rule), part callouts with leader lines, and one signature motion, a single light sweep masked to the lamp's glass. The site should read as a serious lighting supplier, not as a tuning shop, a nightclub or a black-and-gold luxury brand.

## Palette (contrast-checked)
| Role | Value | Notes |
|---|---|---|
| Canvas | Porcelain `#F8FAFC` | Main background |
| Surface | Optical White `#FFFFFF` | Separated from canvas by hairlines and shadow, not color blocks |
| Atmosphere | Glacier `#E8F2F8` | Gradients only (light through glass) |
| Ink | Deep Ink Navy `#172A3A` | Headlines, approach band, footer |
| Accent | Electric Cobalt `#315FEA` | Actions, active state, focus, links only (5.3:1 on white) |
| Secondary text | **`#5E6E7C`** | Adjusted: the original Titanium `#738392` scores 3.7:1 on Porcelain and 3.4:1 on Glacier, which fails AA. Titanium is kept for icons and ticks (≥3:1) |
| Text on navy | `#A9B7C3` | 7.2:1 |
| Ice Blue `#C9E7F7` | — | Effects and ticks only; never used for text |
| Signal Amber `#D99338` | — | One micro-accent (the pending-verification dot), always paired with text |

## Type
Vazirmatn Variable, with Inter Variable for product codes, units and standards. Both are self-hosted and limited to the Arabic and Latin subsets (no CDN). The fluid `clamp()` scale is defined in `src/styles/tokens.css`. The hero headline contrasts weight 800 with weight 300.
Numerals: Persian digits in prose and counts; Latin digits in codes, specs and years. Latin strings sit in `<bdi class="ltr">` with `unicode-bidi: isolate`.

## Grid and spacing
12 columns, 1280px max content width, fluid gutter of 16–48px, 4px spacing base, fluid section spacing (`--space-section`). Radii stay restrained (4–14px); pills are used only for filter chips.

## Homepage rhythm
1. Asymmetric hero: text at the start (right), oversized lamp rendering with callouts at the end
2. Product finder panel overlapping the hero
3. Categories: one large tile plus an index list (not three identical cards)
4. Featured: one wide feature card, standard cards, and a "can't find it?" tile
5. Approach: a dark navy technical band stating catalog principles, plus an honest slot for verified company facts
6. Wholesale: a Glacier panel with a three-step process and a cropped tail-lamp rendering
7. Calm navy footer with no invented contact details

## Motion
Duration and easing tokens. Motion is limited to the hero sweep (once on load, replayed on hover), the hero fade-in, a few section reveals, arrow nudges and quick filter transitions. Everything is transform/opacity. `prefers-reduced-motion` turns it all off, and content never waits on an animation.

## Responsive
At phone widths the hero order is headline → product → primary action. Category chips become a contained one-hand rail. Cards switch to a compact horizontal layout. Product detail gets a sticky inquiry bar. Checked at 360, 390, 768, 1024, 1280 and 1440 with no horizontal overflow.
