# Ever Again Mushrooms — Brand Spec

## Core idea
**Rediscovery.** “Cooking feels new again.”

- Emotional tone: quiet attention, gentle invitation, human resilience.
- Visual metaphor: a small gallery or bookshop—calm, editorial, minimal, lots of whitespace.
- Avoid: rustic clichés, cartoon fungi, psychedelic vibes, loud “market” aesthetics, overly techy “lab” aesthetics.

## Brand language
- Short, confident lines. No hype. No exclamation marks.
- Key phrases (use sparingly): “Rediscover cooking.” “Cook something new again.” “For curious kitchens.”
- If someone asks what “Ever Again” means: “Because good cooking is something you rediscover again and again.”

---

## Design tokens

### Colour
- **Background:** Warm off-white / eggshell (`hsl(40 20% 98%)`).
- **Text:** Deep charcoal (`hsl(24 15% 12%)`).
- **Primary (accent):** Muted sage/moss—no bright green (`hsl(140 18% 32%)`).
- **Highlight:** Soft gold/tan (`hsl(38 28% 88%)` for accent surfaces).
- **Borders:** Subtle, warm grey.
- **Contrast:** AA-compliant; foreground on background meets WCAG AA.

### Typography
- **Headings:** Refined serif — Cormorant Garamond (variable `--font-serif`). Editorial feel.
- **Body:** Clean humanist sans — Inter (variable `--font-sans`).
- Weights: 400, 500, 600, 700 for both. Headings use semibold (600) by default.

### Spacing and layout
- Generous whitespace. Calm rhythm.
- Container max-width: `max-w-5xl` for main content; `max-w-2xl` for reading (about, contact).
- Section vertical rhythm: `py-16 md:py-22` or `py-20 md:py-28` for major sections.

### Components
- **Cards:** Gallery-label feel. Subtle borders (`border-border/80`). Minimal shadows; no busy gradients.
- **Buttons:** Primary = sage fill; outline = border only. Clear focus states (`focus-visible:ring-2 focus-visible:ring-ring`).
- **Accessibility:** AA contrast, visible focus rings, keyboard navigable.

---

## Information architecture (kitchen-first)
1. **Shop** — primary  
2. **Species** (Mushrooms) — primary  
3. **Learn** — secondary  
4. **Grow Supplies** — tertiary (de-emphasised but accessible; “hidden library” feel)  
5. **About**, **Contact**

---

## Page outlines (wireframe-level)

- **Home:** Hero (name + thesis + Shop Fresh / Explore Species) → Micro-proof line → Three ways (Kitchen / Learn / Growers) → Featured species grid → Featured products grid → How local buying works (3 steps) → Email (guest list).
- **Species index:** Title + intro → Grid of species cards (image, name, taste/texture, Learn + Shop).
- **Species detail:** Left: gallery. Right: How it tastes, Best uses, Quick method, Storage; CTAs. Bottom: Overview, Flavor & cooking, Shop this species, Learn.
- **Shop:** Title + intro; filters (Category, Use, Species, In stock); product grid. Clean, premium cards.
- **Product detail (sheet/modal):** Image, name, price, variants; **How to cook it**; **Storage**; Add to cart.
- **Learn:** Title + intro; category filters; sections of article cards by topic.
- **Grow Supplies:** Accessed via Shop (#grow-supplies) and nav. Minimal, precise, trustworthy.
- **About:** Short manifesto (mission, method, value). No long story.
- **Contact:** Form + Elsewhere (email, pickup, delivery).

---

## Tech stack
- Next.js 14, TypeScript, Tailwind CSS, existing UI (Radix/shadcn-style).
- Design tokens: `app/globals.css` (CSS variables), `tailwind.config.ts` (theme extend).
- Fonts: Google Fonts — Cormorant Garamond (serif), Inter (sans).
