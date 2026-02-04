# Cedar Roots Mushrooms

A modern, premium Next.js 14 (App Router) site for **Cedar Roots Mushrooms**—a local gourmet mushroom farm selling fresh mushrooms, liquid cultures, grain spawn, and grow kits. Built with TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- **`app/`** — Next.js App Router pages and API routes
  - `page.tsx` — Homepage
  - `shop/` — Storefront catalog with filters
  - `mushrooms/` — Species directory and detail (`/mushrooms/[slug]`)
  - `learn/` — Education hub and article pages (`/learn/[slug]`)
  - `about/`, `contact/`, `checkout/`, `subscribe/`
  - `api/contact/` — Contact form (logs server-side)
  - `api/subscribe/` — Email capture (logs server-side)
- **`components/`** — UI and layout (header, footer, cart, forms, shadcn-style `ui/`)
- **`data/`** — Static content and types
  - `products.ts` — Products (fresh, liquid culture, grain spawn, kits)
  - `species.ts` — Mushroom species with facts and copy
  - `articles.ts` — Learn hub articles
- **`lib/utils.ts`** — `cn()`, `formatPrice()`

## Where to edit content

- **Products** — `data/products.ts`. Add/edit entries; use `ProductCategory`, `IntendedUse`, `StockLevel` types. Filtering on the shop page uses this data.
- **Species** — `data/species.ts`. Edit species fields (taste, texture, cultivation notes, etc.). Species detail page and shop species filter use this.
- **Learn articles** — `data/articles.ts`. Add or edit `Article` entries; categories: `start-here`, `cultivation-basics`, `troubleshooting`, `cooking-storage`.
- **Copy** — Inline in page components and in `data/` files. No CMS; change text in place.

## Wiring payments later

- **Stripe or Shopify** — The cart lives in client state (`components/cart/cart-provider.tsx`). Cart items are `Product` + quantity. To add real checkout:
  1. On "Checkout", send cart items (and optional pickup window) to your backend or a server action.
  2. Create a Stripe Checkout Session or redirect to Shopify checkout with line items.
  3. Replace the placeholder `app/checkout/page.tsx` with the redirect or embedded checkout flow.
- **Pickup window** — Add a pickup-day/time selector (dummy data is fine at first) in the cart sheet or checkout page; pass it to your order backend.

## Replacing placeholder images

- Product and species images currently use inline SVG placeholders (`components/icons.tsx`: `SporeCircles`, etc.) or a simple muted block.
- To use real photos: add images to `public/` (e.g. `public/products/`, `public/species/`). In product/species data, add an `image` or `imageUrl` field and render with Next.js `<Image>` in the relevant cards and detail views.
- Update `next.config.mjs` with `images.domains` if you host images on an external domain.

## Tech stack

- **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**
- **shadcn-style UI** — Radix primitives + CVA + `lib/utils.ts` (`cn`)
- **Framer Motion** — Subtle motion on homepage and lists
- **next-themes** — Light/dark mode toggle
- **SEO** — Metadata and OpenGraph in `app/layout.tsx` and per-page `metadata` exports

## Deploy to GitHub Pages

The site is configured for **static export** and deploys to **https://jack0thy.github.io/mushrooms/**.

1. **Enable GitHub Pages**
   - Repo **Settings → Pages**
   - Under "Build and deployment", set **Source** to **GitHub Actions**.

2. **Push to `main`**
   - Each push to `main` runs the workflow in `.github/workflows/deploy.yml`, builds the app, and deploys the `out/` folder to GitHub Pages.

3. **Contact & subscribe forms on GH Pages**
   - GitHub Pages is static; `/api/contact` and `/api/subscribe` do not run there.
   - To make forms work, use [Formspree](https://formspree.io): create two forms (Contact, Subscribe), get each form’s endpoint URL.
   - In the repo **Settings → Secrets and variables → Actions**, add **Variables**:
     - `NEXT_PUBLIC_FORMSPREE_CONTACT` = your Formspree contact form URL (e.g. `https://formspree.io/f/xxxxx`)
     - `NEXT_PUBLIC_FORMSPREE_SUBSCRIBE` = your Formspree subscribe form URL
   - Re-run the workflow or push a commit so the next build picks them up. Submissions will then go to Formspree and you’ll get emails (or use Formspree’s dashboard).

**Local dev:** Run `npm run dev` (no `GITHUB_PAGES_REPO_NAME`), so the app is at **http://localhost:3000/** and API routes work for the contact and subscribe forms. The GitHub Actions build sets `GITHUB_PAGES_REPO_NAME=mushrooms` so the deployed site uses basePath `/mushrooms`.

## Scripts

- `npm run dev` — Development server (no basePath; runs at root)
- `npm run build` — Production static export → `out/`
- `npm run start` — Not used for static export; use the `out/` folder or deploy to GH Pages
- `npm run lint` — Next.js ESLint
