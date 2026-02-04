"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product, ProductCategory, IntendedUse } from "@/data/products";
import { cn } from "@/lib/utils";

type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

interface ShopClientProps {
  products: Product[];
  categories: { value: ProductCategory; label: string }[];
  intendedUseOptions: { value: IntendedUse; label: string }[];
  species: { slug: string; name: string }[];
}

export function ShopClient({
  products,
  categories,
  intendedUseOptions,
  species,
}: ShopClientProps) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [intendedUse, setIntendedUse] = useState<IntendedUse | "all">("all");
  const [speciesFilter, setSpeciesFilter] = useState<string | "all">("all");
  const [inStockOnly, setInStockOnly] = useState(true);
  const [sort, setSort] = useState<SortOption>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categories.some((c) => c.value === cat)) setCategory(cat as ProductCategory);
    const sp = searchParams.get("species");
    if (sp) setSpeciesFilter(sp);
  }, [searchParams, categories]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (intendedUse !== "all") list = list.filter((p) => p.intendedUse.includes(intendedUse));
    if (speciesFilter !== "all") list = list.filter((p) => p.speciesSlug === speciesFilter);
    if (inStockOnly) list = list.filter((p) => p.stock !== "out");
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "newest") list.reverse();
    return list;
  }, [products, category, intendedUse, speciesFilter, inStockOnly, sort]);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Shop</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-muted-foreground">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex gap-8">
        <aside
          id="grow-supplies"
          className={cn(
            "w-56 shrink-0 space-y-6 border-r border-border pr-6",
            "max-md:fixed max-md:left-0 max-md:top-0 max-md:z-50 max-md:h-full max-md:w-72 max-md:border-r max-md:bg-background max-md:pr-4 max-md:pt-20",
            !mobileFiltersOpen && "max-md:hidden"
          )}
        >
          <div>
            <p className="text-sm font-semibold">Category</p>
            <ul className="mt-2 space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => setCategory("all")}
                  className={cn(
                    "w-full rounded px-2 py-1 text-left text-sm",
                    category === "all" ? "bg-muted font-medium" : "hover:bg-muted/50"
                  )}
                >
                  All
                </button>
              </li>
              {categories.map((c) => (
                <li key={c.value}>
                  <button
                    type="button"
                    onClick={() => setCategory(c.value)}
                    className={cn(
                      "w-full rounded px-2 py-1 text-left text-sm",
                      category === c.value ? "bg-muted font-medium" : "hover:bg-muted/50"
                    )}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Intended use</p>
            <ul className="mt-2 space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => setIntendedUse("all")}
                  className={cn(
                    "w-full rounded px-2 py-1 text-left text-sm",
                    intendedUse === "all" ? "bg-muted font-medium" : "hover:bg-muted/50"
                  )}
                >
                  All
                </button>
              </li>
              {intendedUseOptions.map((o) => (
                <li key={o.value}>
                  <button
                    type="button"
                    onClick={() => setIntendedUse(o.value)}
                    className={cn(
                      "w-full rounded px-2 py-1 text-left text-sm",
                      intendedUse === o.value ? "bg-muted font-medium" : "hover:bg-muted/50"
                    )}
                  >
                    {o.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Species</p>
            <ul className="mt-2 space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => setSpeciesFilter("all")}
                  className={cn(
                    "w-full rounded px-2 py-1 text-left text-sm",
                    speciesFilter === "all" ? "bg-muted font-medium" : "hover:bg-muted/50"
                  )}
                >
                  All
                </button>
              </li>
              {species.map((s) => (
                <li key={s.slug}>
                  <button
                    type="button"
                    onClick={() => setSpeciesFilter(s.slug)}
                    className={cn(
                      "w-full rounded px-2 py-1 text-left text-sm",
                      speciesFilter === s.slug ? "bg-muted font-medium" : "hover:bg-muted/50"
                    )}
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded border-input"
            />
            In stock only
          </label>
        </aside>

        <div className="min-w-0 flex-1">
          <Button
            variant="outline"
            className="md:hidden mb-4"
            onClick={() => setMobileFiltersOpen((o) => !o)}
          >
            {mobileFiltersOpen ? "Hide filters" : "Show filters"}
          </Button>
          <p className="text-sm text-muted-foreground mb-4">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">No products match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}
