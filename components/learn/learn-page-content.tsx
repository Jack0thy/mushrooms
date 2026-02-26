"use client";

import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { articles, articleCategories } from "@/data/articles";

export function LearnPageContent() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 md:py-22">
      <div className="max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Learn
        </h1>
        <p className="mt-3 text-muted-foreground">
          For curious kitchens and careful growers. Cooking and storage guides, cultivation basics.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {articleCategories.map((c) => (
          <a
            key={c.value}
            href={"#" + c.value}
            className="rounded-md border border-border/80 bg-background px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {c.label}
          </a>
        ))}
      </div>
      <div className="mt-14 space-y-14">
        {articleCategories.map((cat) => {
          const list = articles.filter((a) => a.category === cat.value);
          if (list.length === 0) return null;
          return (
            <section key={cat.value} id={cat.value}>
              <h2 className="font-serif text-xl font-semibold text-foreground">{cat.label}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {list.map((a) => (
                  <Card
                    key={a.slug}
                    className="border-border/80 bg-card transition-shadow hover:shadow-sm"
                  >
                    <CardHeader className="space-y-2">
                      <h3 className="font-medium text-foreground">
                        <Link
                          href={"/learn/" + a.slug}
                          className="hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                        >
                          {a.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground">{a.blurb}</p>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
