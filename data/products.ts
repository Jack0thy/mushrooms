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
}

export const products: Product[] = [
  // Fresh mushrooms
  {
    id: "fresh-bpko-113",
    slug: "black-pearl-king-oyster-113g",
    name: "Black Pearl King Oyster — 113g (¼ lb)",
    description: "Thick-stemmed, meaty oyster. Subtly sweet and savory. Ideal for searing and roasting.",
    price: 1250,
    category: "fresh",
    intendedUse: ["cooking"],
    speciesSlug: "black-pearl-king-oyster",
    tags: ["High yield", "Meaty texture"],
    stock: "in_stock",
    storageNotes: "Refrigerate in paper bag; use within 5–7 days.",
  },
  {
    id: "fresh-lions-mane-113",
    slug: "lions-mane-113g",
    name: "Lion's Mane — 113g (¼ lb)",
    description: "Tender, seafood-like. Delicate flavor, soft texture. Great pan-seared or in \"crab\" cakes.",
    price: 1450,
    category: "fresh",
    intendedUse: ["cooking"],
    speciesSlug: "lions-mane",
    tags: ["Delicate", "Seafood-like"],
    stock: "limited",
    storageNotes: "Refrigerate in paper bag; use within 5–7 days.",
  },
  {
    id: "fresh-chestnut-113",
    slug: "chestnut-mushroom-113g",
    name: "Chestnut Mushroom — 113g (¼ lb)",
    description: "Firm, nutty, earthy. Holds up in sautés, stir-fries, and roasting.",
    price: 1150,
    category: "fresh",
    intendedUse: ["cooking"],
    speciesSlug: "chestnut",
    tags: ["Firm texture", "Cold tolerant"],
    stock: "in_stock",
    storageNotes: "Refrigerate in paper bag; use within 5–7 days.",
  },
  {
    id: "fresh-pioppino-113",
    slug: "pioppino-113g",
    name: "Pioppino — 113g (¼ lb)",
    description: "Rich, wine-like umami. Firm and meaty. Excellent in sauces and risottos.",
    price: 1250,
    category: "fresh",
    intendedUse: ["cooking"],
    speciesSlug: "pioppino",
    tags: ["Umami", "Firm"],
    stock: "in_stock",
    storageNotes: "Refrigerate in paper bag; use within 5–7 days.",
  },
  // Liquid cultures
  {
    id: "lc-lions-mane",
    slug: "lions-mane-liquid-culture",
    name: "Lion's Mane Liquid Culture",
    description: "Sterile liquid culture syringe. Ready to inoculate grain or use with agar.",
    price: 2495,
    category: "liquid-culture",
    intendedUse: ["beginner-grow", "intermediate-grow"],
    speciesSlug: "lions-mane",
    tags: ["Beginner-friendly", "Fast colonizer"],
    stock: "in_stock",
    labNotes: "Prepared in laminar flow; tested for contamination. Best used within 3 months.",
    shippingPickupNotes: "Ships insulated; local pickup available.",
  },
  {
    id: "lc-bpko",
    slug: "black-pearl-king-oyster-liquid-culture",
    name: "Black Pearl King Oyster Liquid Culture",
    description: "Sterile LC for high-yield, meaty oysters. Good for buckets or bags.",
    price: 2495,
    category: "liquid-culture",
    intendedUse: ["beginner-grow", "intermediate-grow"],
    speciesSlug: "black-pearl-king-oyster",
    tags: ["High yield", "Fast colonizer"],
    stock: "in_stock",
    labNotes: "Prepared in laminar flow; tested for contamination.",
    shippingPickupNotes: "Ships insulated; local pickup available.",
  },
  {
    id: "lc-chestnut",
    slug: "chestnut-liquid-culture",
    name: "Chestnut Liquid Culture",
    description: "Sterile LC. Cold-tolerant strain; good for cooler fruiting.",
    price: 2495,
    category: "liquid-culture",
    intendedUse: ["intermediate-grow"],
    speciesSlug: "chestnut",
    tags: ["Cold tolerant", "Intermediate"],
    stock: "in_stock",
    labNotes: "Prepared in laminar flow; tested for contamination.",
    shippingPickupNotes: "Ships insulated; local pickup available.",
  },
  // Grain spawn
  {
    id: "spawn-lions-mane",
    slug: "lions-mane-grain-spawn",
    name: "Lion's Mane Grain Spawn (2 lb)",
    description: "Rye grain spawn. Ready to spawn to bulk substrate.",
    price: 3495,
    category: "grain-spawn",
    intendedUse: ["beginner-grow", "intermediate-grow"],
    speciesSlug: "lions-mane",
    tags: ["Beginner-friendly", "Ready to spawn"],
    stock: "in_stock",
    labNotes: "Sterilized rye; colonized in controlled conditions. Use within 2–4 weeks of receipt.",
    shippingPickupNotes: "Heavy; local pickup preferred. Shipping available.",
  },
  {
    id: "spawn-bpko",
    slug: "black-pearl-king-oyster-grain-spawn",
    name: "Black Pearl King Oyster Grain Spawn (2 lb)",
    description: "Rye grain spawn. Ideal for bucket or bag grows.",
    price: 3295,
    category: "grain-spawn",
    intendedUse: ["beginner-grow", "intermediate-grow"],
    speciesSlug: "black-pearl-king-oyster",
    tags: ["High yield", "Beginner-friendly"],
    stock: "limited",
    labNotes: "Sterilized rye; colonized in controlled conditions.",
    shippingPickupNotes: "Heavy; local pickup preferred.",
  },
  // Grow kit
  {
    id: "kit-oyster",
    slug: "oyster-grow-kit",
    name: "Oyster Mushroom Grow Kit",
    description: "All-in-one kit: inoculated substrate block, bag, and instructions. Fruit in 1–2 weeks.",
    price: 4495,
    category: "grow-kit",
    intendedUse: ["beginner-grow"],
    tags: ["Beginner-friendly", "All-in-one"],
    stock: "in_stock",
    shippingPickupNotes: "Local pickup or delivery within 30 mi. Minimum order for delivery.",
  },
];

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

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsBySpecies(speciesSlug: string): Product[] {
  return products.filter((p) => p.speciesSlug === speciesSlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
