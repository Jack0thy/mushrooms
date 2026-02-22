"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Species } from "@/data/species";
import type { Product } from "@/data/products";

export function MushroomDetail({
  species,
  products,
}: {
  species: Species;
  products: Product[];
}) {
  const freshProduct = products.find((p) => p.category === "fresh" && p.speciesSlug === species.slug);
  const spawnProduct = products.find((p) => p.category === "grain-spawn" && p.speciesSlug === species.slug);
  const cultureProduct = products.find((p) => p.category === "liquid-culture" && p.speciesSlug === species.slug);
  const shopProducts = products.filter(
    (p) => p.speciesSlug === species.slug
  );

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 md:py-22">
      <div className="grid gap-14 lg:grid-cols-5 lg:gap-16">
        {/* Left: large gallery area */}
        <div className="lg:col-span-3">
          <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border/80 bg-muted/30">
            <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
              <span className="text-sm uppercase tracking-wider">Gallery</span>
            </div>
          </div>
        </div>

        {/* Right: How it tastes, Best uses, Quick method, Storage */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {species.name}
            </h1>
            <p className="mt-1 text-sm italic text-muted-foreground">{species.scientificName}</p>
          </div>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              How it tastes
            </h2>
            <p className="mt-2 text-foreground">{species.taste}</p>
            <p className="mt-1 text-muted-foreground">{species.texture}</p>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Best uses
            </h2>
            <p className="mt-2 text-foreground">{species.bestForCooking}</p>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Quick method
            </h2>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-foreground">
              {species.cookingSuggestions.slice(0, 3).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Storage
            </h2>
            <p className="mt-2 text-foreground">{species.storageLifeFridge}</p>
            <p className="mt-1 text-sm text-muted-foreground">{species.storageAndHandling}</p>
          </section>

          <div className="flex flex-wrap gap-3 pt-2">
            {freshProduct && (
              <Button asChild size="sm">
                <Link href={`/shop?highlight=${freshProduct.slug}`}>Shop fresh</Link>
              </Button>
            )}
            {spawnProduct && (
              <Button asChild variant="outline" size="sm">
                <Link href={`/shop?highlight=${spawnProduct.slug}`}>Grain spawn</Link>
              </Button>
            )}
            {cultureProduct && (
              <Button asChild variant="outline" size="sm">
                <Link href={`/shop?highlight=${cultureProduct.slug}`}>Liquid culture</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom: full overview, flavor & cooking, shop products, Learn links */}
      <div className="mt-20 space-y-16 border-t border-border/80 pt-16">
        <section className="max-w-2xl">
          <h2 className="font-serif text-xl font-semibold text-foreground">Overview</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">{species.overview}</p>
        </section>
        <section className="max-w-2xl">
          <h2 className="font-serif text-xl font-semibold text-foreground">Flavor & cooking</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">{species.flavorAndCooking}</p>
          <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {species.cookingSuggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>

        {shopProducts.length > 0 && (
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">Shop this species</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {shopProducts.map((p) => (
                <li key={p.id}>
                  <Button asChild variant="outline" size="sm">
                    <Link href={"/shop?highlight=" + p.slug}>{p.name}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="font-serif text-xl font-semibold text-foreground">Learn more</h2>
          <p className="mt-2 text-muted-foreground">
            Guides for cooking, storage, and cultivation.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-3">
            <Link href="/learn">Explore Learn</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
