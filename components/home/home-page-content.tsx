"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SporeCircles, LabIcon, LocalPickupIcon } from "@/components/icons";
import type { Product } from "@/data/products";
import { getFeaturedSpecies } from "@/data/species";
import { formatPrice } from "@/lib/utils";
import { HomeEmailCapture } from "@/components/home/email-capture";

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

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
      {/* Hero — minimal */}
      <section className="relative border-b border-border bg-background">
        <div className="container mx-auto max-w-3xl px-4 py-24 text-center md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Cooking feels new again.
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              Small-batch mushrooms and cultivation supplies. For the kitchen, the lab, and the curious.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/shop">Shop</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact?interest=weekly-delivery">Weekly delivery</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What we offer — gallery cards */}
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
              <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                For the kitchen, the lab, and the curious
              </h2>
            </motion.div>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="mt-14 grid gap-8 md:grid-cols-3"
          >
            <motion.div variants={fadeUp}>
              <Card className="h-full border-border/80 bg-card transition-colors hover:border-primary/30">
                <CardHeader className="pb-4">
                  <CardTitle className="font-serif text-lg font-medium">For the kitchen</CardTitle>
                  <CardDescription className="leading-relaxed text-muted-foreground">
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
              <Card className="h-full border-border/80 bg-card transition-colors hover:border-primary/30">
                <CardHeader className="pb-4">
                  <div className="mb-1 flex items-center gap-2">
                    <LabIcon className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="font-serif text-lg font-medium">For growers</CardTitle>
                  </div>
                  <CardDescription className="leading-relaxed text-muted-foreground">
                    Liquid cultures and grain spawn. Lab-prepared, contamination-tested. Ship or local pickup.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/shop#grow-supplies">Cultures & spawn</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Card className="h-full border-border/80 bg-card transition-colors hover:border-primary/30">
                <CardHeader className="pb-4">
                  <CardTitle className="font-serif text-lg font-medium">For learners</CardTitle>
                  <CardDescription className="leading-relaxed text-muted-foreground">
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

      {/* Species — exhibit grid */}
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
              <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                Meet the mushrooms we grow
              </h2>
              <p className="mt-2 text-muted-foreground">
                Varieties for cooking and cultivation.
              </p>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {featuredSpecies.map((s) => (
                <motion.div key={s.slug} variants={fadeUp}>
                  <Card className="h-full overflow-hidden border-border/80 bg-card transition-colors hover:border-primary/30">
                    <div className="aspect-[4/3] flex items-center justify-center bg-muted/50">
                      <SporeCircles className="h-12 w-12 text-muted-foreground/40" />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="font-serif text-base font-medium">{s.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
                        {s.tagline}
                      </CardDescription>
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

      {/* Featured products — curated selection */}
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
              <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                A curated selection
              </h2>
              <p className="mt-2 text-muted-foreground">
                Fresh harvests and cultivation supplies.
              </p>
            </motion.div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((p) => (
                <Card
                  key={p.id}
                  className="overflow-hidden border-border/80 bg-card transition-colors hover:border-primary/30"
                >
                  <div className="aspect-[4/3] flex items-center justify-center bg-muted/50">
                    <SporeCircles className="h-12 w-12 text-muted-foreground/40" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="font-serif text-base font-medium">{p.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
                      {p.description}
                    </CardDescription>
                    {p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-2">
                        {p.tags.slice(0, 2).map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs font-normal">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-sm font-medium">{formatPrice(p.price)}</span>
                    <Button asChild size="sm" variant="outline">
                      <Link href={"/shop?highlight=" + p.slug}>View</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild variant="outline">
                <Link href="/shop">View all products</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Weekly delivery — membership / exhibit pass */}
      <section className="border-t border-border bg-muted/20 py-20 md:py-28">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionLabel>Weekly delivery</SectionLabel>
            <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
              A share of what’s in season
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Fresh, seasonal varieties delivered to you—like a membership to what’s in season. Skip or opt out anytime.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact?interest=weekly-delivery">Get on the list</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How it works — 3 steps */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center">
              <SectionLabel>How it works</SectionLabel>
              <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
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
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-sm font-medium text-foreground">
                  1
                </span>
                <h3 className="mt-4 font-serif font-medium text-foreground">Choose what you want</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Browse fresh species and cultivation supplies.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="text-center md:text-left">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-sm font-medium text-foreground">
                  2
                </span>
                <h3 className="mt-4 font-serif font-medium text-foreground">Pickup or delivery</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Select a window at checkout.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="text-center md:text-left">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-sm font-medium text-foreground">
                  3
                </span>
                <h3 className="mt-4 font-serif font-medium text-foreground">Enjoy & store</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  We’ll send storage and handling tips with your order.
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground"
            >
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

      {/* Harvest notes — email signup */}
      <section className="border-t border-border bg-muted/20 py-20 md:py-28">
        <div className="container mx-auto max-w-xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionLabel>Harvest notes</SectionLabel>
            <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight text-foreground">
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

      {/* Trust strip */}
      <section className="border-t border-border py-5">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-muted-foreground">
            <span>Local pickup & delivery</span>
            <span className="text-border">|</span>
            <span>Small-batch</span>
            <span className="text-border">|</span>
            <span>Weekly harvests</span>
            <span className="text-border">|</span>
            <span>Guides included</span>
          </div>
        </div>
      </section>
    </div>
  );
}
