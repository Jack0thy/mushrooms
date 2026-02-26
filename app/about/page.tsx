import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "Cedar Roots Mushrooms: gourmet mushrooms and growing supplies. Small-batch cultivation, calm education.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 md:py-22">
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        About
      </h1>

      <section className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Cedar Roots Mushrooms grows gourmet mushrooms and supplies cultures and spawn for growers. We work in small batches, handle everything with care, and offer calm, practical education—for the kitchen and for the lab.
        </p>
        <p>
          We’re here for curious kitchens and for growers who want precision without the noise.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-xl font-semibold text-foreground">The method</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Small-batch cultivation. Careful handling. No hype. We sell fresh mushrooms for the kitchen and, for growers, liquid cultures and grain spawn—prepared in a clean environment, with clear documentation. We also write guides: cooking, storage, and cultivation basics. Education is part of the offer.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-xl font-semibold text-foreground">The value</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Resilience and curiosity. We’re rooted in place—Ottawa Valley—with local pickup and weekly delivery where we can. We serve our community first. The brand is quiet by design: no rustic clichés, no lab aesthetic. Just a calm invitation to cook something new again.
        </p>
      </section>

      <div className="mt-14 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/shop">Shop Fresh</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact</Link>
        </Button>
      </div>
    </div>
  );
}
