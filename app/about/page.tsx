import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SporeCircles } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description: "Ever Again Mushrooms: small-batch mushrooms, lab-minded cultivation, quiet attention.",
};

const values = [
  { title: "Craft", body: "We grow in small batches with attention to quality and consistency." },
  { title: "Science", body: "Our cultures and spawn are prepared in a clean environment. We follow sterile technique." },
  { title: "Soil", body: "We are rooted in place—local food, local pickup, sustainable growing." },
  { title: "Local", body: "We serve our community first. Pickup in Pembroke; weekly delivery in the Ottawa Valley." },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-3xl font-medium tracking-tight">About Ever Again</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
        Ever Again Mushrooms is a small-batch mushroom grower. We sell fresh mushrooms for the kitchen and liquid cultures and grain spawn for growers. We emphasize quiet attention, cleanliness, and education.
      </p>
      <section className="mt-16">
        <h2 className="text-xl font-semibold">Values</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <Card key={v.title} className="h-full">
              <CardHeader>
                <CardTitle className="text-base">{v.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="mt-16">
        <div className="aspect-[2/1] max-w-3xl rounded-lg border bg-muted flex items-center justify-center">
          <SporeCircles className="h-20 w-20 text-muted-foreground/40" />
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">Photo placeholder.</p>
      </section>
    </div>
  );
}
