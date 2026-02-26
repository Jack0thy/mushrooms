import { Suspense } from "react";
import { Metadata } from "next";
import { ShopClient } from "@/components/shop/shop-client";
import { categories, intendedUseOptions } from "@/data/products";
import { species } from "@/data/species";
import { getMedusaProducts, isMedusaConfigured } from "@/lib/medusa";

export const metadata: Metadata = {
  title: "Shop",
  description: "Fresh mushrooms and grow supplies. Local pickup and weekly delivery in the Ottawa Valley.",
};

export default async function ShopPage() {
  const products = isMedusaConfigured() ? await getMedusaProducts() : [];
  return (
    <Suspense fallback={<div className="container mx-auto min-h-[40vh] px-4 py-8" />}>
      <ShopClient
        products={products}
        categories={categories}
        intendedUseOptions={intendedUseOptions}
        species={species.map((s) => ({ slug: s.slug, name: s.name }))}
      />
    </Suspense>
  );
}
