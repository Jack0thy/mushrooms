import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order.",
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
      <p className="mt-4 text-muted-foreground">
        This is a placeholder. Wire Stripe or Shopify later.
      </p>
      <ul className="mt-6 list-inside list-disc text-left text-sm text-muted-foreground">
        <li>Add your Stripe or Shopify checkout session here.</li>
        <li>Use cart context or URL params to pass line items and totals.</li>
        <li>Include pickup window selector (dummy data for now).</li>
        <li>Optional: delivery radius and minimum order (copy only).</li>
      </ul>
      <Button asChild className="mt-8">
        <Link href="/shop">Back to shop</Link>
      </Button>
    </div>
  );
}
