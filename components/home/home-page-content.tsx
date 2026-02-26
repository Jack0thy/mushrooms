"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { getFeaturedSpecies } from "@/data/species";
import { formatPrice } from "@/lib/utils";
import { HomeEmailCapture } from "@/components/home/email-capture";

function stockBadgeLabel(stock: Product["stock"]): string {
  switch (stock) {
    case "in_stock":
      return "In stock";
    case "limited":
      return "Limited";
    case "out":
      return "Back next week";
    default:
      return "In stock";
  }
}

export function HomePageContent({ products = [] }: { products?: Product[] }) {
  const freshProducts = products.filter((p) => p.category === "fresh").slice(0, 4);
  const cultureSpawnProducts = products.filter(
    (p) => p.category === "liquid-culture" || p.category === "grain-spawn"
  ).slice(0, 4);
  const featuredSpecies = getFeaturedSpecies();
  const featuredProducts = [...freshProducts, ...cultureSpawnProducts].slice(0, 8);

  return (
    <div className="flex flex-col">
      {/* 1) Hero — quiet, one thesis, primary + secondary CTA */}
      <section className="border-b border-border/80">
   
        <div className="container mx-auto max-w-2xl px-4 py-24 text-center md:py-32">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Cedar Roots Mushrooms
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Gourmet mushrooms and growing supplies.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="font-medium">
              <Link href="/shop">Shop Fresh</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-medium">
              <Link href="/mushrooms">Explore Species</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2) Micro-proof line */}
      <section className="border-b border-border/80 py-4">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs text-muted-foreground">
            Weekly harvest drops · Limited quantities · Local pickup & delivery
          </p>
        </div>
      </section>

      {/* 3) What we offer — Kitchen, Learn, Growers */}
      <section className="border-b border-border/80 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            What we offer
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Link
              href="/shop"
              className="group flex flex-col rounded-lg border border-border/80 bg-card p-6 transition-colors hover:border-primary/30 hover:bg-muted/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="font-serif text-lg font-semibold text-foreground group-hover:text-primary">
                For the kitchen
              </span>
              <p className="mt-2 text-sm text-muted-foreground">
                Fresh mushrooms for curious kitchens. Small-batch, weekly harvests.
              </p>
              <span className="mt-4 text-sm font-medium text-primary">Shop Fresh →</span>
            </Link>
            <Link
              href="/learn"
              className="flex flex-col rounded-lg border border-border/80 bg-card p-6 transition-colors hover:border-border hover:bg-muted/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="font-serif text-lg font-semibold text-foreground">Learn</span>
              <p className="mt-2 text-sm text-muted-foreground">
                Guides for cooking and storage. Start here.
              </p>
              <span className="mt-4 text-sm text-muted-foreground">Explore →</span>
            </Link>
            <Link
              href="/shop#grow-supplies"
              className="flex flex-col rounded-lg border border-border/80 bg-card p-6 transition-colors hover:border-border hover:bg-muted/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="font-serif text-lg font-semibold text-foreground">For growers</span>
              <p className="mt-2 text-sm text-muted-foreground">
                Liquid cultures and grain spawn. Precise, trustworthy.
              </p>
              <span className="mt-4 text-sm text-muted-foreground">Grow Supplies →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4) Featured species — editorial grid, large placeholders, sensory descriptors */}
      <section className="border-b border-border/80 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Species we grow
          </h2>
          <p className="mt-2 text-muted-foreground">
            Each with its own character. Explore taste, texture, and best uses.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredSpecies.map((s) => (
              <Link
                key={s.slug}
                href={"/mushrooms/" + s.slug}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border/80 bg-muted/30">
                  <div className="flex h-full w-full items-center justify-center bg-muted/50 text-muted-foreground/40">
                    <span className="text-xs uppercase tracking-wider">Photo</span>
                  </div>
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-foreground group-hover:text-primary">
                  {s.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {s.tagline}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/mushrooms">View all species</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 5) Featured products — clean grid, tags (Meaty, Delicate, Umami etc.) */}
      <section className="border-b border-border/80 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Available this week
          </h2>
          <p className="mt-2 text-muted-foreground">
            Fresh and grow-at-home. Tags below suggest character.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className="flex flex-col rounded-lg border border-border/80 bg-card overflow-hidden"
              >
                <div className="aspect-[4/3] flex items-center justify-center bg-muted/30 text-muted-foreground/40">
                  <span className="text-xs uppercase tracking-wider">Product</span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-foreground">{p.name}</h3>
                    <span className="shrink-0 rounded border border-border/80 px-2 py-0.5 text-xs text-muted-foreground">
                      {stockBadgeLabel(p.stock)}
                    </span>
                  </div>
                  {p.tags.length > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {p.tags.slice(0, 3).join(" · ")}
                    </p>
                  )}
                  <p className="mt-2 font-medium">{formatPrice(p.price)}</p>
                  <div className="mt-auto pt-4">
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <Link href={"/shop?highlight=" + p.slug}>View</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild>
              <Link href="/shop">View all products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 6) How local buying works — minimalist 3-step timeline */}
      <section className="border-b border-border/80 py-20 md:py-28">
        <div className="container mx-auto max-w-2xl px-4">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl text-center">
            How local buying works
          </h2>
          <ol className="mt-14 space-y-12">
            <li className="flex gap-6">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 font-serif text-sm font-semibold text-foreground">
                1
              </span>
              <div>
                <h3 className="font-medium text-foreground">Choose your mushrooms</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse and add to cart.
                </p>
              </div>
            </li>
            <li className="flex gap-6">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 font-serif text-sm font-semibold text-foreground">
                2
              </span>
              <div>
                <h3 className="font-medium text-foreground">Pickup or delivery</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Select at checkout.
                </p>
              </div>
            </li>
            <li className="flex gap-6">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 font-serif text-sm font-semibold text-foreground">
                3
              </span>
              <div>
                <h3 className="font-medium text-foreground">Enjoy</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Storage tips included with every order.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* 7) Email — gallery guest list feel */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-xl px-4 text-center">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Harvest drops & small notes
          </h2>
          <p className="mt-3 text-muted-foreground">
            Get harvest drops and small notes from the grow room. No spam.
          </p>
          <div className="mt-8">
            <HomeEmailCapture />
          </div>
        </div>
      </section>
    </div>
  );
}
