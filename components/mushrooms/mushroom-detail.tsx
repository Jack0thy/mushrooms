"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SporeCircles } from "@/components/icons";
import type { Species } from "@/data/species";
import type { Product } from "@/data/products";

const difficultyLabels = ["", "Easy", "Moderate", "Moderate+", "Advanced", "Expert"];
const yieldLabels = { low: "Low", medium: "Medium", high: "High" };
const co2Labels = { low: "Low", medium: "Medium", high: "High" };

export function MushroomDetail({
  species,
  products,
}: {
  species: Species;
  products: Product[];
}) {
  const freshProduct = products.find((p) => p.category === "fresh");
  const spawnProduct = products.find((p) => p.category === "grain-spawn");
  const cultureProduct = products.find((p) => p.category === "liquid-culture");

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
            <SporeCircles className="h-24 w-24 text-muted-foreground/50" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{species.name}</CardTitle>
              <p className="text-sm italic text-muted-foreground">{species.scientificName}</p>
              <p className="text-muted-foreground">{species.tagline}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <dt className="text-muted-foreground">Taste</dt>
                <dd>{species.taste}</dd>
                <dt className="text-muted-foreground">Texture</dt>
                <dd>{species.texture}</dd>
                <dt className="text-muted-foreground">Best cooking</dt>
                <dd>{species.bestForCooking}</dd>
                <dt className="text-muted-foreground">Difficulty to grow</dt>
                <dd>{difficultyLabels[species.difficultyToGrow]}</dd>
                <dt className="text-muted-foreground">Yield</dt>
                <dd>{yieldLabels[species.yield]}</dd>
                <dt className="text-muted-foreground">CO₂ tolerance</dt>
                <dd>{co2Labels[species.co2Tolerance]}</dd>
                <dt className="text-muted-foreground">Storage (fridge)</dt>
                <dd>{species.storageLifeFridge}</dd>
              </dl>
              <div className="flex flex-wrap gap-2 pt-4">
                {freshProduct && (
                  <Button asChild size="sm">
                    <Link href={`/shop?highlight=${freshProduct.slug}`}>Buy Fresh</Link>
                  </Button>
                )}
                {spawnProduct && (
                  <Button asChild variant="secondary" size="sm">
                    <Link href={`/shop?highlight=${spawnProduct.slug}`}>Buy Grain Spawn</Link>
                  </Button>
                )}
                {cultureProduct && (
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/shop?highlight=${cultureProduct.slug}`}>Buy Liquid Culture</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="mt-16 space-y-12">
        <section>
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">{species.overview}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Flavor & cooking</h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">{species.flavorAndCooking}</p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {species.cookingSuggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Cultivation notes</h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">{species.cultivationNotes}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Storage & handling</h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">{species.storageAndHandling}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Why Cedar Roots grows it</h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">{species.whyWeGrowIt}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Pairs well with</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {species.pairsWellWith.map((item) => (
              <Badge key={item} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
