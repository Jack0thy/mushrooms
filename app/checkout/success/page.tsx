import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Thank you for your order.",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Order confirmed</h1>
      <p className="mt-4 text-muted-foreground">
        Thank you for your order. We’ll be in touch with next steps.
      </p>
      <Button asChild className="mt-8">
        <Link href="/shop">Continue shopping</Link>
      </Button>
    </div>
  );
}
