# مهرساز گستر: Premium Automotive Lighting (sales prototype)

A client demonstration prototype by Nexxol Media. It has four working experiences in Persian RTL: **Home**, **Catalog**, **Product Detail** (`/products/:slug`) and **Wholesale Inquiry**, plus a designed 404 page.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build at http://localhost:4173
```

### Offline copy (opens with a double-click)

```bash
npm run build:offline
```

This writes `dist-offline/index.html`: one self-contained file (about 690 KB) with scripts, styles, fonts and images inlined. Open it directly from the folder, or copy it to a USB stick or laptop for the meeting. No server or internet connection is needed. It uses `#/` URLs (e.g. `index.html#/products`) because `file://` pages can't use normal paths.

Double-clicking the `index.html` in the project root (or `dist/index.html`) also works: opened from disk, it forwards to `dist-offline/index.html`. `npm run build` regenerates that copy along with the web build (`build:web` and `build:offline` run them separately), so rebuild after changes for the double-click version to include them.

Stack: Vite, React 19, TypeScript, React Router 7, plain CSS (design tokens plus CSS modules), and Lucide icons. Fonts (Vazirmatn and Inter) are self-hosted from npm packages and bundled at build time; nothing loads from Google Fonts or any other CDN.

Static hosting needs an SPA fallback: every route should serve `index.html`.

## Structure

```
src/
  data/products.ts     typed sample dataset (10 products, 5 categories), all flagged isSample
  lib/persian.ts       ی/ي, ک/ك, ZWNJ, diacritic and digit normalization for search
  lib/search.ts        token + compact matching, ranking, facet filtering
  lib/validators.ts    form validators incl. Iranian mobile numbers (Persian/Latin digits, +98)
  hooks/               useProducts (data seam), useReveal, useModalDialog, useScrolled
  components/          Header, SearchDialog, MobileMenu, Footer, ProductCard, ProductImage,
                       SpecTable, FilterBar, SearchBox, InquiryForm, Breadcrumbs, SampleBadge…
  pages/               Home, Catalog, ProductDetail, Wholesale, NotFound
  styles/              tokens.css, base.css, typography.css, fonts.css
src/assets/products   temporary SVG renderings (imported via src/data/images.ts)
docs/design-brief.md   concept, palette with contrast notes, type, grid, motion
```

To scale to the full catalog, replace `src/data/products.ts`, or point `useProducts` at an API. Every page is driven by data.

## What is placeholder or illustrative

- **All products, codes (`DEMO-…`), specs and compatibility entries** are sample data. They are labeled «داده نمونه» on cards, the catalog and product pages. The vehicle names in compatibility lists are generic placeholders.
- **All product images** are temporary SVG renderings labeled «رندر نمایشی». The product «مه‌شکن مستطیلی هالوژن» deliberately has no image so the missing-image state can be shown.
- **The logo** is a temporary wordmark.
- **The wholesale form** sends nothing. After validation it shows «نمونه نمایشی: درخواست ارسال نشد».
- **The wholesale process steps** are labeled as a proposed flow.
- **No contact details, certifications, statistics or customer logos** appear anywhere. The footer and the "approach" section contain clearly marked slots for verified information.

## What the client should supply next

1. High-resolution product photography (ideally on a neutral background, consistent angle) for each catalog item
2. The official logo (SVG) and any brand guidelines
3. The real catalog: product names, codes, categories, verified specifications, and verified vehicle compatibility
4. Verified company facts: history, certifications, business partners, address, phone and response hours
5. The destination for wholesale inquiries (CRM, email or API), and the real follow-up process
