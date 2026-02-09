import type { Product, ProductCategory, StockLevel } from "@/data/products";

const MEDUSA_BACKEND = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
const MEDUSA_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
/** Canadian (or other) region ID so Store API returns prices in that region's currency (e.g. CAD). Get from Admin → Settings → Regions or GET /store/regions */
const MEDUSA_REGION_ID = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID;

export function isMedusaConfigured(): boolean {
  return Boolean(MEDUSA_BACKEND && MEDUSA_PUBLISHABLE_KEY);
}

/** Minimal shape of Medusa Store API product (v2) */
interface MedusaVariant {
  id: string;
  title?: string | null;
  calculated_price?: {
    calculated_amount?: number;
    calculated_amount_with_tax?: number;
    calculated_amount_without_tax?: number;
  };
  prices?: Array<{ amount: number }>;
}

/** Collection from Store API (when requested via *collection) */
interface MedusaCollection {
  id: string;
  handle?: string | null;
  title?: string | null;
}

interface MedusaProduct {
  id: string;
  title: string | null;
  handle: string | null;
  description: string | null;
  variants?: MedusaVariant[];
  metadata?: Record<string, unknown>;
  /** Set when requesting *collection in fields. Used to map to species slug for left-hand filter. */
  collection?: MedusaCollection | null;
  collection_id?: string | null;
}

interface MedusaProductsResponse {
  products: MedusaProduct[];
  count?: number;
}

/** Map Medusa collection handle/title to our species slug (for left-hand filter). */
function speciesSlugFromCollection(collection: MedusaCollection | null | undefined): string | undefined {
  if (!collection) return undefined;
  const handle = (collection.handle ?? "").toLowerCase().replace(/_/g, "-");
  const title = (collection.title ?? "").toLowerCase();
  // Black Pearl King collection → species "Black Pearl King Oyster" (slug black-pearl-king-oyster)
  if (
    handle.includes("black-pearl-king") ||
    handle === "black-pearl-king" ||
    title.includes("black pearl king")
  ) {
    return "black-pearl-king-oyster";
  }
  return undefined;
}

function medusaProductToProduct(m: MedusaProduct): Product {
  const meta = (m.metadata ?? {}) as Record<string, string | string[]>;
  const variants = m.variants ?? [];
  const variantList = variants.map((v) => {
    const amount =
      v.calculated_price?.calculated_amount ??
      v.calculated_price?.calculated_amount_without_tax ??
      v.calculated_price?.calculated_amount_with_tax ??
      v.prices?.[0]?.amount ??
      0;
    const raw = Number(amount);
    // Medusa v2 Store API: calculated_amount and price amounts are in minor units (cents).
    const priceCents = Math.round(raw);
    return {
      id: v.id,
      title: v.title?.trim() || "Variant",
      price: priceCents,
    };
  });
  const firstPrice = variantList[0]?.price ?? 0;
  const singleVariantId = variantList.length === 1 ? variantList[0].id : undefined;
  return {
    id: m.id,
    slug: (m.handle ?? m.id).replace(/^\/+|\/+$/g, "") || m.id,
    name: m.title?.trim() ?? "Product",
    description: m.description ?? "",
    price: firstPrice,
    category: (meta.category as ProductCategory) ?? "fresh",
    intendedUse: Array.isArray(meta.intendedUse) ? (meta.intendedUse as Product["intendedUse"]) : ["cooking"],
    speciesSlug:
    typeof meta.speciesSlug === "string"
      ? meta.speciesSlug
      : speciesSlugFromCollection(m.collection),
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    stock: (meta.stock as StockLevel) ?? "in_stock",
    imagePlaceholder: true,
    medusaProductId: m.id,
    variantId: singleVariantId,
    variants: variantList.length > 1 ? variantList : undefined,
  };
}

/**
 * Fetches products from Medusa Store API and maps them to our Product type.
 * One card per product; products with multiple variants get a variant selector on the card.
 * Call from server only (uses env vars).
 */
export async function getMedusaProducts(): Promise<Product[]> {
  if (!isMedusaConfigured()) return [];
  const base = MEDUSA_BACKEND!.replace(/\/$/, "");
  if (!base.startsWith("http")) {
    console.warn("[medusa] NEXT_PUBLIC_MEDUSA_BACKEND_URL must be a full URL (e.g. http://localhost:9000)");
    return [];
  }
  const params = new URLSearchParams({
    fields:
      "*variants.calculated_price,*variants.id,*variants.title,id,title,handle,description,metadata,*collection",
  });
  if (MEDUSA_REGION_ID) {
    params.set("region_id", MEDUSA_REGION_ID);
  } else {
    params.set("country_code", "ca");
  }
  const url = `${base}/store/products?${params.toString()}`;
  try {
    const res = await fetch(url, {
      headers: {
        "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY!,
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as MedusaProductsResponse;
    const products = data.products ?? [];
    return products.map(medusaProductToProduct);
  } catch (err) {
    console.warn("[medusa] Failed to fetch products:", err instanceof Error ? err.message : err);
    return [];
  }
}
