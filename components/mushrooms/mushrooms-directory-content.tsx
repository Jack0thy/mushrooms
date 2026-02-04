"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SporeCircles } from "@/components/icons";
import { species } from "@/data/species";

export function MushroomsDirectoryContent() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Mushroom species</h1>
      <p className="mt-2 text-muted-foreground">
        A clean directory of the species we grow and sell. Learn about each one, then shop products.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {species.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full transition-shadow hover:shadow-md">
              <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                <SporeCircles className="h-14 w-14 text-muted-foreground/50" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{s.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {s.taste} · {s.texture}
                </CardDescription>
                <p className="text-xs text-muted-foreground">Best for: {s.bestForCooking}</p>
              </CardHeader>
              <CardFooter className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={"/mushrooms/" + s.slug}>Learn</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={"/shop?species=" + s.slug}>Shop products</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
