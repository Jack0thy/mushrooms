# Ever Again Mushrooms — Design System & Homepage Spec

## A) Style Guide

### Brand
- **Name:** Ever Again Mushrooms  
- **Positioning:** Rediscovery. Quiet attention. A gentle invitation. Human resilience. "Cooking feels new again."  
- **Vibe:** Quiet gallery-like space; minimal, editorial, natural textures; calm confidence (not rustic-cute, not psychedelic, not corporate-tech).

### Color Palette
- **Background:** White and warm off-white (e.g. `hsl(40 20% 99%)`). Lots of negative space.
- **Foreground:** Warm near-black (e.g. `hsl(24 12% 12%)`).
- **Muted text:** Soft warm gray (e.g. `hsl(24 8% 45%)`).
- **Accent (restrained):** Sage/moss `hsl(142 18% 38%)` or muted gold `hsl(42 28% 48%)`. Use sparingly—borders, small caps, one CTA.
- **Borders:** Very light warm gray; fine rules (e.g. `1px`).
- **No:** Neon greens, loud colors, farmhouse browns.

### Typography
- **Headings:** Editorial serif (e.g. Lora, Source Serif 4, or Fraunces). Clear hierarchy; plenty of spacing.
- **Body:** Clean humanist sans (e.g. Source Sans 3, Inter, or system). Comfortable line height and line length (max ~65ch).
- **Labels / small caps:** Uppercase, letter-spacing, small size (e.g. `0.08em`), muted color.
- **No:** Farmhouse or novelty fonts.

### Spacing & Layout
- **Sections:** Generous vertical padding (e.g. `py-20 md:py-28` or more). One main idea per section.
- **Containers:** Max-width for readability (e.g. `max-w-3xl` for hero/copy, `max-w-6xl` for grids).
- **Grids:** Calm gaps (e.g. `gap-8` or `gap-10`). Exhibit-like cards, not dense.

### UI Patterns
- **Exhibit labels:** Small caps, fine rule above/below, understated.
- **Cards:** White or subtle tint, thin border, quiet hover (e.g. border darkens slightly, no heavy shadow).
- **Buttons:** Primary = accent (sage or muted gold); secondary = outline, minimal. Max 2 CTAs per block.
- **Links:** Underline on hover, or subtle color shift. No loud underlines by default.

### Accessibility & Performance
- WCAG AA contrast for text.
- Keyboard navigable; visible focus states.
- Mobile-first, responsive.
- Optimized images; fast load.

---

## B) Homepage Layout (Component Hierarchy)

1. **Header (global)**  
   Logo: "Ever Again Mushrooms". Nav: Shop · Mushrooms · Cultures & Spawn · Learn · About · Contact. Cart; optional theme toggle. Minimal, one line.

2. **Hero**  
   One block: brand name, one strong line about rediscovery, two CTAs max (e.g. Shop / Weekly delivery). No long paragraph. Optional subtle texture or single large image.

3. **What we offer — Gallery cards**  
   Section label: small caps "What we offer". Three cards in a row (stack on mobile):  
   - **For the Kitchen** — Fresh mushrooms, small-batch; pickup or delivery. CTA: Shop fresh.  
   - **For Growers** — Cultures & spawn; lab-minded, contamination-tested. CTA: Cultures & spawn.  
   - **For Learners** — Guides and growing tips. CTA: Learn.  
   Cards: exhibit-style, plenty of padding, fine border, quiet hover.

4. **Species — Exhibit grid**  
   Label: "Our species". Grid of species cards: image area, name, short sensory line (taste/texture), "View species". Not cluttered; like exhibit placards.

5. **New this week / In season** (optional module)  
   Small "In season now" or "New this week" strip or grid—curated, 1–2 lines per item. Links to shop or species.

6. **Featured products**  
   Label: "From the farm" or "Curated selection". Limited product grid: image, name, one-line descriptor, price, quick add or View. One row or small grid; "View all" link.

7. **Weekly delivery**  
   Framed as membership / exhibit pass. One short block: what it is (CSA-like share), benefit (cook something new again), CTA: Get on the list or Learn more. Not buried; calm, inviting.

8. **How it works**  
   Three steps only. Minimal icons or numbers. Plenty of spacing. e.g. 1) Choose 2) Pickup or delivery 3) Enjoy & store. One line per step. Optional fine-print line: Local pickup & delivery · Small-batch · Guides included.

9. **Harvest notes (email signup)**  
   Label: "Harvest notes" or "Stay in the loop". One line: new harvests, restocks, no spam. Single email field + Subscribe. Quiet, not pushy.

10. **Footer**  
    Ever Again Mushrooms. Short line: local mushrooms, cultures & spawn, Ottawa Valley (or your location). Location & hours; contact email. Links: Shop, Mushrooms, Learn, About, Contact, Weekly Share. Legal: Privacy, Terms, Shipping & Pickup.

11. **Trust strip**  
    Optional thin strip: Local pickup & delivery · Small-batch · Weekly harvests · Guides included. Fine rule; muted text; center or inline.

---

## C) Homepage Copy (Final Text)

### Hero
- **Headline:** Cooking feels new again.
- **Subline (optional):** Small-batch mushrooms and cultivation supplies. For the kitchen, the lab, and the curious.
- **CTAs:** Shop · Weekly delivery

### What we offer
- **Section label:** What we offer  
- **For the Kitchen:** Fresh mushrooms for cooking. Small-batch harvests, local pickup or delivery.  
- **For Growers:** Liquid cultures and grain spawn. Lab-prepared, contamination-tested. Ship or local pickup.  
- **For Learners:** Guides on cultivation basics, troubleshooting, and cooking.

### Species
- **Section label:** Our species  
- **Heading:** Meet the mushrooms we grow  
- **Sub:** Varieties for cooking and cultivation.  
- Card: [Name], [short sensory line from data], "View species".

### Featured products
- **Section label:** From the farm  
- **Heading:** A curated selection  
- **Sub:** Fresh harvests and cultivation supplies.  
- Card: [Name], [one-line descriptor], [Price], "View".

### Weekly delivery
- **Heading:** Weekly delivery  
- **Body:** A share of fresh, seasonal varieties delivered to you—like a membership to what’s in season. Skip or opt out anytime.  
- **CTA:** Get on the list

### How it works
- **Section label:** How it works  
- **Heading:** Simple, local, reliable  
- **Steps:**  
  1) Choose what you want — Browse fresh species and cultivation supplies.  
  2) Pickup or delivery — Select a window at checkout.  
  3) Enjoy & store — We’ll send storage and handling tips with your order.  
- **Fine print:** Local pickup & delivery · Small-batch · Guides included

### Harvest notes (email)
- **Section label:** Harvest notes  
- **Heading:** Get harvest updates  
- **Sub:** New harvests, restocks, and growing tips. No spam.  
- **Button:** Subscribe

### Footer
- **Brand:** Ever Again Mushrooms  
- **Blurb:** Small-batch mushrooms for the kitchen; cultures and spawn for growers. Ottawa Valley.  
- **Location:** Ottawa Valley. Pickup in Pembroke; weekly delivery available.  
- **Contact:** [email]  
- **Links:** Shop, Mushrooms, Learn, About, Contact, Weekly Share.  
- **Legal:** Privacy, Terms, Shipping & Pickup.  
- **Copyright:** © [Year] Ever Again Mushrooms.

### Trust strip
- Local pickup & delivery · Small-batch · Weekly harvests · Guides included

---

## D) Implementation Notes

- **Stack:** Next.js, TypeScript, Tailwind. Use CSS variables for palette; editorial serif + humanist sans via next/font.
- **Components:** Reuse existing (Button, Card, Input, Sheet) with new tokens. Add section label component (small caps, optional rule).
- **Routes:** Unchanged (Shop, Mushrooms, Learn, About, Contact, etc.). Nav label "Grow Supplies" → "Cultures & Spawn" where it matches the catalog.
- **Product/Species UX:** Product cards: large image, name, one-line descriptor, price, quick add or View. Species: "Best uses" and "Simple method" (sauté, roast, grill) on detail page.
- **Images:** Prefer large, clean, museum-like mushroom photography where assets exist; placeholders otherwise.
