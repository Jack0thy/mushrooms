# Migration notes — Cedar Roots redesign (aesthetics retained)

## What changed
- **Brand:** Cedar Roots name retained. New typography, palette, and editorial layout applied site-wide.
- **Design system:** New palette (warm off-white, charcoal, sage, soft gold), Cormorant Garamond + Inter, gallery-like spacing and components.
- **IA:** Nav is kitchen-first: Shop, Species, Learn, then Grow Supplies, About, Contact. “Mushrooms” appears as “Species” in nav and metadata where appropriate.
- **Pages:** Home, Species index, Species detail, Shop, Learn, About, Contact restyled; product detail sheet now includes “How to cook it” and “Storage” (from species when `product.speciesSlug` is set).

## Migrating existing content

### Products
- **Data shape:** Unchanged. `Product` still has `speciesSlug`, `storageNotes`, `tags`, etc.
- **Medusa:** No change to API or cart/checkout. Ensure products that should link to a species have `speciesSlug` set so the detail sheet can show “How to cook it” and storage from the species.
- **Tags:** Used on homepage and product cards as “character” (e.g. Meaty, Delicate, Umami). Populate `product.tags` for richer presentation.

### Species
- **Data:** `data/species.ts` unchanged. No new fields. “Why we grow it” is used on species detail (currently component says “Full species guide” and doesn’t reference the old name in new UI).
- **Species detail:** Template now expects products filtered by `speciesSlug`; the dynamic page already does this.

### Learn (articles)
- **Data:** `data/articles.ts` unchanged. Categories and slugs stay the same. Only layout and typography changed.

### Copy and config
- **Metadata:** `app/layout.tsx` — title template and default description use Cedar Roots. Update `metadataBase` URL when the production domain is set.
- **Contact email:** `info@cedarrootsmushrooms.com` in footer and contact page. Change via env or find/replace if needed.
- **Location:** Footer and contact page say “Ottawa Valley”, “Pembroke” for pickup. Update if your location differs.

### Images
- Placeholders are used for species and product imagery (e.g. “Photo”, “Product”). To add real assets:
  - Use Next.js `Image` with a consistent aspect ratio (e.g. 4:3).
  - Lazy-load and set `width`/`height` or `sizes` for performance.
  - Store in `public/` or your CDN and point product/species data or components to the URLs.

### Theme / dark mode
- Design tokens support `.dark` in `globals.css`. The current brand is light-first; dark mode is available if `ThemeProvider` is kept and theme is toggled. Header no longer shows a theme toggle to keep the gallery look minimal; you can add it back if needed.

## Performance
- No extra heavy JS: framer-motion removed from homepage and learn for a lighter first load.
- Images: when you add real images, use `loading="lazy"` and appropriate `sizes` for responsive images.
- Fonts: Cormorant Garamond and Inter loaded from Google Fonts in `layout.tsx`; consider self-hosting if you want to avoid third-party requests.

## Deployment
- Build and run as before: `npm run build`, `npm run start`, or deploy to Vercel/static export per your setup.
- Env: Keep existing vars for Medusa, Formspree (or equivalent) for contact and subscribe.

## Rollback
- Git history holds the previous design. To revert branding only, restore `layout.tsx` metadata, `header.tsx`, `footer.tsx`, and `globals.css` from the last commit before this redesign; then re-run build.
