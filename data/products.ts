export type ProductCategory = "fresh" | "liquid-culture" | "grain-spawn" | "grow-kit" | "supplies";
export type IntendedUse = "cooking" | "beginner-grow" | "intermediate-grow";
export type StockLevel = "in_stock" | "limited" | "out";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number; // cents
  category: ProductCategory;
  intendedUse: IntendedUse[];
  speciesSlug?: string; // links to /mushrooms/[slug]
  tags: string[]; // e.g. "Beginner-friendly", "Fast colonizer"
  stock: StockLevel;
  imagePlaceholder?: boolean;
  // For fresh
  storageNotes?: string;
  // For culture/spawn
  labNotes?: string;
  shippingPickupNotes?: string;
  /** Medusa: variant id for cart/checkout when product is from Store API (single-variant products) */
  variantId?: string;
  /** Medusa: product id when product is from Store API */
  medusaProductId?: string;
  /** Medusa: when product has multiple variants (e.g. ¼ lb, ½ lb, 1 lb), user picks one on the card */
  variants?: { id: string; title: string; price: number }[];
}

export const categories: { value: ProductCategory; label: string }[] = [
  { value: "fresh", label: "Fresh Mushrooms" },
  { value: "liquid-culture", label: "Liquid Cultures" },
  { value: "grain-spawn", label: "Grain Spawn" },
  { value: "grow-kit", label: "Grow Kits" },
  { value: "supplies", label: "Supplies" },
];

export const intendedUseOptions: { value: IntendedUse; label: string }[] = [
  { value: "cooking", label: "Cooking" },
  { value: "beginner-grow", label: "Beginner grow" },
  { value: "intermediate-grow", label: "Intermediate grow" },
];
