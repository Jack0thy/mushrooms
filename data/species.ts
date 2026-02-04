export type Difficulty = 1 | 2 | 3 | 4 | 5;
export type YieldLevel = "low" | "medium" | "high";
export type CO2Tolerance = "low" | "medium" | "high";

export interface Species {
  slug: string;
  name: string;
  scientificName: string;
  tagline: string;
  taste: string;
  texture: string;
  bestForCooking: string;
  difficultyToGrow: Difficulty;
  yield: YieldLevel;
  co2Tolerance: CO2Tolerance;
  storageLifeFridge: string;
  overview: string;
  flavorAndCooking: string;
  cookingSuggestions: string[];
  cultivationNotes: string;
  storageAndHandling: string;
  whyWeGrowIt: string;
  pairsWellWith: string[];
  imagePlaceholder?: boolean;
}

export const species: Species[] = [
  {
    slug: "black-pearl-king-oyster",
    name: "Black Pearl King Oyster",
    scientificName: "Pleurotus eryngii × Pleurotus ostreatus",
    tagline: "Thick-stemmed, meaty, subtly sweet and savory.",
    taste: "Subtly sweet, savory, umami.",
    texture: "Dense, meaty; stems hold up to high heat.",
    bestForCooking: "Searing, grilling, roasting; slice stems like scallops.",
    difficultyToGrow: 2,
    yield: "high",
    co2Tolerance: "medium",
    storageLifeFridge: "5–7 days in paper bag.",
    overview:
      "Black Pearl King Oyster is a hearty hybrid that combines the best of king oyster and wood oyster. Thick stems and dense caps make it a standout for high-heat cooking and as a center-of-plate option for plant-based meals.",
    flavorAndCooking:
      "The flavor is subtly sweet and savory, with a dense, meaty texture that caramelizes well. Stems can be sliced into medallions and seared like scallops; caps absorb flavors beautifully in stir-fries and braises.",
    cookingSuggestions: [
      "Slice stems into medallions, sear in a hot pan with butter and thyme.",
      "Grill whole caps; brush with olive oil and finish with lemon.",
      "Add to Asian stir-fries or use as a meat substitute in bao or tacos.",
    ],
    cultivationNotes:
      "Prefers moderate temps and good air exchange. Works well in buckets or bags with supplemented sawdust or straw. Colonizes quickly; fruits in clusters.",
    storageAndHandling:
      "Keep refrigerated in a paper bag. Avoid sealed plastic. Use within 5–7 days for best texture.",
    whyWeGrowIt:
      "We grow Black Pearl King Oyster for its reliability, high yield, and versatility. It’s one of the most satisfying mushrooms to cook with and to grow—consistent, clean, and rewarding for both kitchen and cultivation.",
    pairsWellWith: ["Garlic", "Thyme", "Soy", "Ginger", "Miso"],
  },
  {
    slug: "lions-mane",
    name: "Lion's Mane",
    scientificName: "Hericium erinaceus",
    tagline: "Tender, seafood-like; delicate flavor, soft texture.",
    taste: "Delicate, mildly sweet, often compared to crab or lobster.",
    texture: "Tender, soft, meaty when cooked properly.",
    bestForCooking: "Pan-searing, \"crab\" cakes, pasta, simple sautés.",
    difficultyToGrow: 3,
    yield: "medium",
    co2Tolerance: "low",
    storageLifeFridge: "5–7 days in paper bag.",
    overview:
      "Lion's Mane is a distinctive mushroom with cascading spines instead of a traditional cap. It’s prized for its delicate, seafood-like flavor and its potential wellness applications, alongside its culinary versatility.",
    flavorAndCooking:
      "When fresh, Lion's Mane has a mild, slightly sweet flavor that becomes more pronounced when cooked. Pan-searing develops a golden crust while keeping the interior tender. It works beautifully as a crab or lobster substitute.",
    cookingSuggestions: [
      "Pan-sear in butter until golden; finish with lemon and herbs.",
      "Use in vegetarian \"crab\" cakes or \"lobster\" rolls.",
      "Tear into chunks and add to creamy pasta or risotto.",
    ],
    cultivationNotes:
      "Prefers cooler temperatures and high humidity. Needs good fresh air exchange; CO₂ buildup reduces spine formation. Best on supplemented hardwood or masters mix.",
    storageAndHandling:
      "Refrigerate in paper bag. Handle gently; spines are delicate. Use within 5–7 days.",
    whyWeGrowIt:
      "We grow Lion's Mane for its unique appearance, gentle flavor, and the interest it sparks in both cooks and growers. Our process emphasizes clean fruiting and consistent quality so you get a product that’s as good in the pan as it is in the lab.",
    pairsWellWith: ["Butter", "Lemon", "Garlic", "Cream", "White wine"],
  },
  {
    slug: "chestnut",
    name: "Chestnut Mushroom",
    scientificName: "Pholiota adiposa",
    tagline: "Firm, nutty, earthy; robust texture.",
    taste: "Mildly nutty, earthy.",
    texture: "Firm, substantial; holds shape in long cooks.",
    bestForCooking: "Sautés, stir-fries, roasting, soups, and stews.",
    difficultyToGrow: 3,
    yield: "medium",
    co2Tolerance: "medium",
    storageLifeFridge: "5–7 days in paper bag.",
    overview:
      "Chestnut mushroom is a firm, earthy variety with a mildly nutty flavor. Its robust texture makes it ideal for dishes that need a mushroom that holds up—sautés, stir-fries, and long-simmered stews.",
    flavorAndCooking:
      "Chestnuts have a firm bite and a nutty, earthy flavor that pairs well with Mediterranean and Asian cuisines. They roast beautifully and add substance to soups without turning mushy.",
    cookingSuggestions: [
      "Sauté with thyme and garlic; use in pasta or on toast.",
      "Roast whole or halved with olive oil and salt.",
      "Add to stir-fries or braises; they hold their shape well.",
    ],
    cultivationNotes:
      "Prefers cooler, humid conditions. Grows in clusters on hardwood. Cold-tolerant; can fruit at lower temps than many species. Good for growers with basement or garage setups.",
    storageAndHandling:
      "Refrigerate in paper bag. Slightly sticky cap when fresh is normal. Use within 5–7 days.",
    whyWeGrowIt:
      "We grow Chestnut for its reliable texture and versatile flavor. It’s a workhorse in the kitchen and in the grow room—consistent, clean, and satisfying for both chefs and home growers.",
    pairsWellWith: ["Thyme", "Rosemary", "Soy", "Mirin", "Garlic"],
  },
  {
    slug: "pioppino",
    name: "Pioppino",
    scientificName: "Agrocybe aegerita",
    tagline: "Rich, wine-like umami; firm and meaty.",
    taste: "Deep umami, wine-like, rich.",
    texture: "Firm, meaty; holds shape in sauces and long cooks.",
    bestForCooking: "Sautéing, sauces, risottos, pasta, roasting.",
    difficultyToGrow: 3,
    yield: "medium",
    co2Tolerance: "medium",
    storageLifeFridge: "5–7 days in paper bag.",
    overview:
      "Pioppino, or Black Poplar mushroom, is a richly flavored gourmet variety with a firm texture and deep, wine-like umami. It has been cultivated for centuries and is a staple in Mediterranean and Asian cooking.",
    flavorAndCooking:
      "Pioppino offers a complex, wine-like umami that deepens when cooked. The texture is firm and meaty—ideal for sauces, risottos, and stir-fries where you want the mushroom to hold its own.",
    cookingSuggestions: [
      "Sauté until golden; add to pasta or risotto.",
      "Roast with olive oil and herbs; serve as a side.",
      "Use in rich sauces and gravies; the umami carries through.",
    ],
    cultivationNotes:
      "Grows on hardwood; prefers cooler temps and high humidity. Colonizes well on supplemented sawdust or straw. Fruits in clusters; harvest when caps are still slightly inrolled for best shelf life.",
    storageAndHandling:
      "Refrigerate in paper bag. Use within 5–7 days. Avoid sealing in plastic.",
    whyWeGrowIt:
      "We grow Pioppino for its exceptional flavor and versatility. It’s a chef favorite and a grower favorite—rewarding to cultivate and to cook, with a depth that elevates simple dishes.",
    pairsWellWith: ["White wine", "Garlic", "Parmesan", "Cream", "Thyme"],
  },
];

export function getSpeciesBySlug(slug: string): Species | undefined {
  return species.find((s) => s.slug === slug);
}

export function getFeaturedSpecies(): Species[] {
  return species; // all four as featured
}
