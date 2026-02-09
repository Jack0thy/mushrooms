# Custom CLI Script

A custom CLI script is a function to execute through Medusa's CLI tool. This is useful when creating custom Medusa tooling to run as a CLI tool.

> Learn more about custom CLI scripts in [this documentation](https://docs.medusajs.com/learn/fundamentals/custom-cli-scripts).

## How to Create a Custom CLI Script?

To create a custom CLI script, create a TypeScript or JavaScript file under the `src/scripts` directory. The file must default export a function.

For example, create the file `src/scripts/my-script.ts` with the following content:

```ts title="src/scripts/my-script.ts"
import { 
  ExecArgs,
} from "@medusajs/framework/types"

export default async function myScript ({
  container
}: ExecArgs) {
  const productModuleService = container.resolve("product")

  const [, count] = await productModuleService.listAndCountProducts()

  console.log(`You have ${count} product(s)`)
}
```

The function receives as a parameter an object having a `container` property, which is an instance of the Medusa Container. Use it to resolve resources in your Medusa application.

---

## How to Run Custom CLI Script?

To run the custom CLI script, run the `exec` command:

```bash
npx medusa exec ./src/scripts/my-script.ts
```

---

## Custom CLI Script Arguments

Your script can accept arguments from the command line. Arguments are passed to the function's object parameter in the `args` property.

For example:

```ts
import { ExecArgs } from "@medusajs/framework/types"

export default async function myScript ({
  args
}: ExecArgs) {
  console.log(`The arguments you passed: ${args}`)
}
```

Then, pass the arguments in the `exec` command after the file path:

```bash
npx medusa exec ./src/scripts/my-script.ts arg1 arg2
```

---

## Create a product from the terminal

Use the `create-product` script to create a product without the Admin UI.

### Quick (positional args)

```bash
npm run create-product -- "Product Title" handle "Optional description"
```

Optional env vars: `PRODUCT_TITLE`, `PRODUCT_HANDLE`, `PRODUCT_DESCRIPTION`, `PRODUCT_METADATA_JSON`.

### Batch upload (JSON array)

Pass a JSON file whose content is an **array** of product specs to create many products in one run:

```bash
npm run create-product -- ./src/scripts/products-batch.json
```

`products-batch.json` in this repo contains all species and product types (fresh, liquid culture, grain spawn, grow kit) from the storefront data. Edit it to set your `collection_id` values (from Medusa Admin → Collections) so products appear in the right collection/species filter. Then run the command above.

### Full product spec (single JSON)

Pass a JSON file or the `PRODUCT_JSON` env var to set all product fields (same shape as the Store API):

- **title**, **handle**, **description**, **subtitle**
- **weight**
- **images**: `[{ "url": "https://..." }]`
- **options**: `[{ "title": "Weight", "values": ["¼ lb", "½ lb", "1 lb"] }]`
- **variants**: each `{ "title", "sku?", "options": { "Weight": "½ lb" }, "prices": [{ "amount", "currency_code" }] }`
- **metadata**: e.g. `{ "category": "fresh", "intendedUse": ["cooking"], "speciesSlug": "black-pearl-king-oyster", "tags": [], "stock": "in_stock" }`
- **collection_id**: Medusa collection id (e.g. from Admin) so the product appears in that collection and in the storefront species filter

Example with a JSON file:

```bash
# Copy and edit the example (set your collection_id from Admin)
cp src/scripts/product.example.json src/scripts/my-product.json
npm run create-product -- ./src/scripts/my-product.json
```

Or inline:

```bash
PRODUCT_JSON='{"title":"Blue Oyster","handle":"blue-oyster","description":"...","variants":[{"title":"Default","prices":[{"amount":1500,"currency_code":"usd"}]}]}' npm run create-product
```

Prerequisites: run `npm run seed` once so a shipping profile and sales channel exist.

---

## Add Canada shipping (no full seed)

Adds a Canada-only fulfillment set and two shipping options (Standard 10 CAD, Express 20 CAD) without re-seeding products or other data.

```bash
npm run add-canada-shipping
```

Requires a region named **"Canada"** and at least one **stock location** (e.g. from an initial seed). If your DB uses different entity names for query, set optional env vars:

- `REGION_ID` – Canada region ID (from Admin → Settings → Regions)
- `STOCK_LOCATION_ID` – Any stock location ID (from Admin → Locations)

Then set `NEXT_PUBLIC_MEDUSA_REGION_ID` in your storefront to the Canada region ID so checkout shows these options.