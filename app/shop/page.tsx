import { Suspense } from "react";
import { Metadata } from "next";
import { ShopClient } from "@/components/shop/shop-client";
import { products, categories, intendedUseOptions } from "@/data/products";
import { species } from "@/data/species";

export const metadata: Metadata = {
  title: "Shop",
  description: "Fresh gourmet mushrooms, liquid cultures, grain spawn, and grow kits. Local pickup and shipping.",
};

export default function ShopPage() {
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
