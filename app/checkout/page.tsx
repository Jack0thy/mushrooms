import { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/checkout-client";
import { isMedusaConfigured } from "@/lib/medusa";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order.",
};

export default function CheckoutPage() {
  if (!isMedusaConfigured()) {
    return (
      <div className="container mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <p className="mt-4 text-muted-foreground">
          Checkout is not available. Connect Medusa and Stripe to enable payments.
        </p>
        <Button asChild className="mt-8">
          <Link href="/shop">Back to shop</Link>
        </Button>
      </div>
    );
  }

  return <CheckoutClient />;
}
