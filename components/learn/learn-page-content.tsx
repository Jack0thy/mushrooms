"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { articles, articleCategories } from "@/data/articles";

export function LearnPageContent() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Learn</h1>
      <p className="mt-2 text-muted-foreground">
        Education hub for growers and cooks. Start here, then explore by topic.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {articleCategories.map((c) => (
          <a
            key={c.value}
            href={"#" + c.value}
            className="rounded-md bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          >
            {c.label}
          </a>
        ))}
      </div>
      <div className="mt-12 space-y-10">
        {articleCategories.map((cat) => {
          const list = articles.filter((a) => a.category === cat.value);
          if (list.length === 0) return null;
          return (
            <section key={cat.value} id={cat.value}>
              <h2 className="text-xl font-semibold">{cat.label}</h2>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
                className="mt-4 grid gap-4 sm:grid-cols-2"
              >
                {list.map((a) => (
                  <motion.div key={a.slug} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
                    <Card className="h-full transition-shadow hover:shadow-md">
                      <CardHeader>
                        <CardTitle className="text-base">
                          <Link href={"/learn/" + a.slug} className="hover:underline">
                            {a.title}
                          </Link>
                        </CardTitle>
                        <CardDescription>{a.blurb}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
