"use client";

import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { species } from "@/data/species";

export function MushroomsDirectoryContent() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 md:py-22">
      <div className="max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Species
        </h1>
        <p className="mt-3 text-muted-foreground">
          A calm directory of what we grow. Learn taste, texture, and best uses—then shop.
        </p>
      </div>
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {species.map((s) => (
          <Card
            key={s.slug}
            className="overflow-hidden border-border/80 bg-card transition-shadow hover:shadow-sm"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted/30">
              <img
                // src={getSpeciesImage(s.slug)}
                alt=""
                className="h-full w-full object-cover"
                width={800}
                height={600}
              />
            </div>
            <CardHeader className="space-y-2">
              <h2 className="font-serif text-lg font-semibold text-foreground">
                <Link
                  href={"/mushrooms/" + s.slug}
                  className="hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  {s.name}
                </Link>
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {s.taste} · {s.texture}
              </p>
              <p className="text-xs text-muted-foreground">Best for: {s.bestForCooking}</p>
            </CardHeader>
            <div className="flex gap-2 px-6 pb-6">
              <Button asChild variant="outline" size="sm">
                <Link href={"/mushrooms/" + s.slug}>Learn</Link>
              </Button>
              <Button asChild size="sm">
                <Link href={"/shop?species=" + s.slug}>Shop</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
