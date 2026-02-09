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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
      {children}
    </p>
  );
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
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/40 to-background">
        <div className="container relative mx-auto max-w-4xl px-4 pt-24 pb-20 text-center md:pt-32 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Craft-grown gourmet mushrooms, locally.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Fresh harvests for your kitchen, liquid cultures and grain spawn for growers. Local pickup and delivery available. Small-batch, lab-minded, with guides to help you cook and cultivate.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/shop">Shop</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/shop#grow-supplies">Cultures & spawn</Link>
              </Button>
              <Link
                href="/learn"
                className="ml-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Learn to grow
              </Link>
            </div>
          </motion.div>
          <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-20">
            <MyceliumLines className="h-6 w-28" />
          </div>
        </div>
      </section>

      {/* Weekly delivery — flagship offer */}
      <section className="border-y border-border bg-primary/8">
        <div className="container mx-auto max-w-3xl px-4 py-16 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="text-center"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="secondary" className="mb-4">
                New
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
            >
              Weekly mushroom delivery
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-lg text-muted-foreground md:text-lg"
            >
              Like a CSA for mushrooms. A weekly share of fresh, seasonal varieties delivered to you. Skip or opt out anytime—no commitment.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
            >
              <span>Weekly delivery</span>
              <span>Opt out anytime</span>
              <span>Seasonal variety</span>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact?interest=weekly-delivery">Get on the list</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What we offer — three pillars */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="text-center"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>What we offer</SectionLabel>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                For the kitchen, the lab, and the curious
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
                Fresh mushrooms, cultivation supplies, and guides to help you succeed.
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="mt-12 grid gap-6 md:grid-cols-3"
          >
            <motion.div variants={fadeUp}>
              <Card className="h-full border-border/80 bg-card transition-colors hover:border-primary/20 hover:shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-medium">For the kitchen</CardTitle>
                  <CardDescription className="leading-relaxed">
                    Fresh mushrooms for cooking. Small-batch harvests, local pickup or delivery.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/shop?category=fresh">Shop fresh</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Card className="h-full border-border/80 bg-card transition-colors hover:border-primary/20 hover:shadow-sm">
                <CardHeader className="pb-4">
                  <div className="mb-1 flex items-center gap-2">
                    <LabIcon className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-lg font-medium">For growers</CardTitle>
                  </div>
                  <CardDescription className="leading-relaxed">
                    Liquid cultures and grain spawn. Lab-prepared, contamination-tested. Ship or local pickup.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/shop#grow-supplies">Shop cultures & spawn</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Card className="h-full border-border/80 bg-card transition-colors hover:border-primary/20 hover:shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-medium">For learners</CardTitle>
                  <CardDescription className="leading-relaxed">
                    Guides on cultivation basics, troubleshooting, and cooking.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/learn">Learn to grow</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our species */}
      <section className="border-t border-border bg-muted/20 py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Our species</SectionLabel>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Meet the mushrooms we grow
              </h2>
              <p className="mt-2 text-muted-foreground">
                Premium varieties for cooking and cultivation.
              </p>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {featuredSpecies.map((s) => (
                <motion.div key={s.slug} variants={fadeUp}>
                  <Card className="h-full overflow-hidden border-border/80 bg-card transition-colors hover:border-primary/20 hover:shadow-sm">
                    <div className="aspect-[4/3] flex items-center justify-center bg-muted/60">
                      <SporeCircles className="h-14 w-14 text-muted-foreground/50" />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">{s.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">{s.tagline}</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0">
                      <Button asChild variant="outline" size="sm">
                        <Link href={"/mushrooms/" + s.slug}>View species</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>From the farm</SectionLabel>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Featured products
              </h2>
              <p className="mt-2 text-muted-foreground">
                Fresh harvests and cultivation supplies.
              </p>
            </motion.div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((p) => (
                <Card
                  key={p.id}
                  className="overflow-hidden border-border/80 bg-card transition-colors hover:border-primary/20 hover:shadow-sm"
                >
                  <div className="aspect-[4/3] flex items-center justify-center bg-muted/60">
                    <SporeCircles className="h-12 w-12 text-muted-foreground/40" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">{p.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">{p.description}</CardDescription>
                    {p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-2">
                        {p.tags.slice(0, 2).map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between">
                    <span className="font-medium">{formatPrice(p.price)}</span>
                    <Button asChild size="sm">
                      <Link href={"/shop?highlight=" + p.slug}>View</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild>
                <Link href="/shop">View all products</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-muted/20 py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center">
              <SectionLabel>How it works</SectionLabel>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Simple, local, reliable
              </h2>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="mt-14 grid gap-12 md:grid-cols-3"
            >
              <motion.div variants={fadeUp} className="text-center md:text-left">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  1
                </span>
                <h3 className="mt-4 font-semibold text-foreground">Choose what you want</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Browse fresh species and cultivation supplies. Add to cart.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="text-center md:text-left">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  2
                </span>
                <h3 className="mt-4 font-semibold text-foreground">Pickup or delivery</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Select a pickup window or local delivery at checkout.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="text-center md:text-left">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  3
                </span>
                <h3 className="mt-4 font-semibold text-foreground">Enjoy & store</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  We’ll send storage and handling tips with your order.
                </p>
              </motion.div>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <LocalPickupIcon className="h-3.5 w-3.5" />
                Local pickup & delivery
              </span>
              <span>Small-batch</span>
              <span>Guides included</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter / Stay in the loop */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="container mx-auto max-w-xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionLabel>Stay in the loop</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Get harvest updates
            </h2>
            <p className="mt-2 text-muted-foreground">
              New harvests, restocks, and growing tips. No spam.
            </p>
            <div className="mt-8">
              <HomeEmailCapture />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
