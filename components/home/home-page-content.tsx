"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MyceliumLines, SporeCircles, LabIcon, LocalPickupIcon } from "@/components/icons";
import type { Product } from "@/data/products";
import { getFeaturedSpecies } from "@/data/species";
import { formatPrice } from "@/lib/utils";
import { HomeEmailCapture } from "@/components/home/email-capture";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export function HomePageContent({ products = [] }: { products?: Product[] }) {
  const freshProducts = products.filter((p) => p.category === "fresh").slice(0, 4);
  const cultureSpawnProducts = products.filter((p) => p.category === "liquid-culture" || p.category === "grain-spawn").slice(0, 4);
  const featuredSpecies = getFeaturedSpecies();
  const featuredProducts = [...freshProducts, ...cultureSpawnProducts].slice(0, 8);

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/50 to-background py-20 md:py-28">
        <div className="container relative mx-auto max-w-6xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">Local, craft-grown gourmet mushrooms.</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We grow premium mushrooms for your kitchen and supply liquid cultures and grain spawn for growers. Our guides help you cook and cultivate with confidence.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg"><Link href="/shop">Shop Fresh Mushrooms</Link></Button>
              <Button asChild variant="secondary" size="lg"><Link href="/shop#grow-supplies">Buy Spawn & Cultures</Link></Button>
              <Link href="/learn" className="text-sm font-medium text-primary underline-offset-4 hover:underline">Learn to Grow</Link>
            </div>
          </motion.div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-30">
            <MyceliumLines className="h-8 w-32" />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <p className="text-center text-sm font-medium text-muted-foreground">
            <strong className="text-foreground">TL;DR:</strong> Fresh mushrooms locally · Cultures & spawn for growers · Guides to help you succeed
          </p>
          <p className="mt-2 text-center text-xs text-muted-foreground">Weekly harvest drops · Limited quantities · Subscribe for updates</p>
        </div>
      </section>

      <section className="border-b border-border py-6">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span>Small-batch</span><span>·</span><span>Lab-minded</span><span>·</span>
            <span className="inline-flex items-center gap-1"><LocalPickupIcon className="h-3.5 w-3.5" /> Local pickup</span><span>·</span>
            <span>Cultures & spawn</span><span>·</span><span>Guides included</span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-8 md:grid-cols-3">
            <motion.div variants={item}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">For the kitchen</CardTitle>
                  <CardDescription>Fresh mushrooms for cooking. Small-batch harvests, local pickup or delivery.</CardDescription>
                </CardHeader>
                <CardFooter><Button asChild variant="outline" size="sm"><Link href="/shop?category=fresh">Shop fresh</Link></Button></CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2"><LabIcon className="h-4 w-4 text-muted-foreground" /><CardTitle className="text-lg">For growers</CardTitle></div>
                  <CardDescription>Liquid cultures and grain spawn. Lab-prepared, contamination-tested. Ship or local pickup.</CardDescription>
                </CardHeader>
                <CardFooter><Button asChild variant="outline" size="sm"><Link href="/shop#grow-supplies">Shop cultures & spawn</Link></Button></CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">For learners</CardTitle>
                  <CardDescription>Guides on cultivation basics, troubleshooting, and cooking.</CardDescription>
                </CardHeader>
                <CardFooter><Button asChild variant="outline" size="sm"><Link href="/learn">Learn to grow</Link></Button></CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight">Featured species</h2>
          <p className="mt-1 text-muted-foreground">Meet the mushrooms we grow and sell.</p>
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredSpecies.map((s) => (
              <motion.div key={s.slug} variants={item}>
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                  <div className="aspect-[4/3] bg-muted flex items-center justify-center"><SporeCircles className="h-16 w-16 text-muted-foreground/60" /></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{s.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{s.tagline}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0"><Button asChild size="sm" variant="outline"><Link href={"/mushrooms/" + s.slug}>View species</Link></Button></CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight">Featured products</h2>
          <p className="mt-1 text-muted-foreground">Fresh mushrooms and cultivation supplies.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((p) => (
              <Card key={p.id} className="overflow-hidden transition-shadow hover:shadow-md">
                <div className="aspect-[4/3] bg-muted flex items-center justify-center"><SporeCircles className="h-12 w-12 text-muted-foreground/50" /></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{p.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{p.description}</CardDescription>
                  <div className="flex flex-wrap gap-1 pt-2">{p.tags.slice(0, 2).map((t) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}</div>
                </CardHeader>
                <CardFooter className="flex items-center justify-between">
                  <span className="font-medium">{formatPrice(p.price)}</span>
                  <Button asChild size="sm"><Link href={"/shop?highlight=" + p.slug}>View</Link></Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center"><Button asChild><Link href="/shop">View all products</Link></Button></div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight">How local buying works</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <div><p className="text-sm font-semibold text-primary">1. Choose mushrooms</p><p className="mt-2 text-sm text-muted-foreground">Browse fresh species and add what you want to your cart.</p></div>
            <div><p className="text-sm font-semibold text-primary">2. Select pickup or delivery</p><p className="mt-2 text-sm text-muted-foreground">Pick a pickup window at checkout or opt for local delivery where available.</p></div>
            <div><p className="text-sm font-semibold text-primary">3. Cook and store</p><p className="mt-2 text-sm text-muted-foreground">After purchase we’ll send storage and handling tips.</p></div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="container mx-auto max-w-xl px-4 text-center">
          <h2 className="text-xl font-semibold tracking-tight">Get harvest updates</h2>
          <p className="mt-2 text-sm text-muted-foreground">We’ll let you know when new harvests drop and when spawn or cultures are back in stock.</p>
          <HomeEmailCapture />
        </div>
      </section>
    </div>
  );
}
