"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart, getCartItemDisplayName, getCartItemPrice } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/utils";
import {
  isMedusaStoreConfigured,
  createCart,
  addCartLineItem,
  getShippingOptions,
  addShippingMethodToCart,
  getCartWithPayment,
  createPaymentCollection,
  initStripePaymentSession,
} from "@/lib/medusa-store";
import { CheckoutStripe } from "./checkout-stripe";

function getVariantId(item: { product: { variantId?: string; variants?: { id: string }[] }; variantId?: string }): string | null {
  if (item.variantId) return item.variantId;
  if (item.product.variantId) return item.product.variantId;
  return item.product.variants?.[0]?.id ?? null;
}

export function CheckoutClient() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<"sync" | "pay" | "error">("sync");
  const [cartId, setCartId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const syncCartAndInitPayment = useCallback(async () => {
    if (!isMedusaStoreConfigured()) {
      setError("Checkout is not configured (Medusa + region).");
      setStep("error");
      return;
    }
    if (items.length === 0) {
      router.replace("/shop");
      return;
    }
    const variantIds = items.map(getVariantId);
    if (variantIds.some((id) => !id)) {
      setError("Some items are missing variant. Try removing and re-adding.");
      setStep("error");
      return;
    }
    setError(null);
    try {
      const { id: newCartId } = await createCart();
      for (let i = 0; i < items.length; i++) {
        await addCartLineItem(newCartId, variantIds[i]!, items[i].quantity);
      }
      const shippingOptions = await getShippingOptions(newCartId);
      if (shippingOptions.length > 0) {
        await addShippingMethodToCart(newCartId, shippingOptions[0].id);
      }
      let cart = await getCartWithPayment(newCartId);
      if (!cart.payment_collection?.id) {
        const { id: pcId } = await createPaymentCollection(newCartId);
        await initStripePaymentSession(pcId);
        cart = await getCartWithPayment(newCartId);
      } else if (!cart.payment_collection.payment_sessions?.length) {
        await initStripePaymentSession(cart.payment_collection.id);
        cart = await getCartWithPayment(newCartId);
      }
      const session = cart.payment_collection?.payment_sessions?.find(
        (s) => s.provider_id === "pp_stripe_stripe"
      );
      const secret = session?.data?.client_secret;
      if (!secret) {
        setError("Could not initialize Stripe. Check region has Stripe enabled.");
        setStep("error");
        return;
      }
      setCartId(newCartId);
      setClientSecret(secret);
      setStep("pay");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
      setStep("error");
    }
  }, [items, router]);

  useEffect(() => {
    if (items.length === 0 && step === "sync") {
      router.replace("/shop");
      return;
    }
    if (step === "sync" && items.length > 0) {
      syncCartAndInitPayment();
    }
  }, [items.length, step, router, syncCartAndInitPayment]);

  function handleOrderPlaced() {
    clearCart();
    router.replace("/checkout/success");
  }

  if (items.length === 0 && step !== "pay") {
    return (
      <div className="container mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Button asChild className="mt-4">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="container mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <p className="mt-4 text-destructive">{error}</p>
        <div className="mt-6 flex gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/shop">Back to shop</Link>
          </Button>
          <Button onClick={() => { setStep("sync"); setError(null); }}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (step === "sync") {
    return (
      <div className="container mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <p className="mt-4 text-muted-foreground">Preparing payment…</p>
      </div>
    );
  }

  if (!cartId || !clientSecret) return null;

  return (
    <div className="container mx-auto max-w-xl px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
      <div className="mt-8 rounded-lg border border-border p-4">
        <h2 className="text-sm font-medium text-muted-foreground">Order summary</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {items.map((item) => (
            <li key={`${item.product.id}:${item.variantId ?? ""}`} className="flex justify-between">
              <span>{getCartItemDisplayName(item)} × {item.quantity}</span>
              <span>{formatPrice(getCartItemPrice(item) * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex justify-between font-medium">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-sm font-medium mb-3">Payment (Stripe)</h2>
        <CheckoutStripe
          cartId={cartId}
          clientSecret={clientSecret}
          onOrderPlaced={handleOrderPlaced}
        />
      </div>
      <p className="mt-6 text-center">
        <Link href="/shop" className="text-sm text-muted-foreground hover:underline">
          ← Back to shop
        </Link>
      </p>
    </div>
  );
}
