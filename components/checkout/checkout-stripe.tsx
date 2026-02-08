"use client";

import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { completeCart } from "@/lib/medusa-store";
import type { MedusaCart } from "@/lib/medusa-store";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder"
);

export function CheckoutStripe({
  cartId,
  clientSecret,
  cart,
  onOrderPlaced,
}: {
  cartId: string;
  clientSecret: string;
  cart?: MedusaCart | null;
  onOrderPlaced: () => void;
}) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripeForm
        cartId={cartId}
        clientSecret={clientSecret}
        cart={cart}
        onOrderPlaced={onOrderPlaced}
      />
    </Elements>
  );
}

function StripeForm({
  cartId,
  clientSecret,
  cart,
  onOrderPlaced,
}: {
  cartId: string;
  clientSecret: string;
  cart?: MedusaCart | null;
  onOrderPlaced: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const billing = cart?.billing_address;
  const billingDetails = billing
    ? {
        name: [billing.first_name, billing.last_name].filter(Boolean).join(" ") || undefined,
        email: cart?.email || undefined,
        phone: billing.phone || undefined,
        address: {
          city: billing.city || undefined,
          country: billing.country_code || undefined,
          line1: billing.address_1 || undefined,
          line2: billing.address_2 || undefined,
          postal_code: billing.postal_code || undefined,
        },
      }
    : undefined;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const card = elements?.getElement(CardElement);
    if (!stripe || !elements || !card || !clientSecret) {
      setError("Stripe not ready.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: billingDetails,
        },
      });
      if (confirmError) {
        const msg = confirmError.message ?? "Payment failed.";
        const code = confirmError.code ? ` (${confirmError.code})` : "";
        const keyHint =
          confirmError.code === "resource_missing" ||
          (confirmError.message?.toLowerCase().includes("payment_intent") ?? false)
            ? " Ensure NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is from the same Stripe account as the backend STRIPE_API_KEY."
            : "";
        setError(`${msg}${code}${keyHint}`);
        return;
      }
      const result = await completeCart(cartId);
      if (result.type === "order") {
        onOrderPlaced();
        return;
      }
      setError((result as { error?: string }).error ?? "Could not complete order.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-md border border-input bg-background p-3">
        <CardElement
          options={{
            style: {
              base: { fontSize: "16px", color: "#1a1a1a" },
              invalid: { color: "#dc2626" },
            },
          }}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={!stripe || loading} className="w-full">
        {loading ? "Processing…" : "Pay and place order"}
      </Button>
    </form>
  );
}
