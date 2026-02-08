"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart, getCartItemDisplayName, getCartItemPrice } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/utils";
import type { ShippingOption } from "@/lib/medusa-store";
import type { MedusaAddress } from "@/lib/medusa-store";
import {
  isMedusaStoreConfigured,
  createCart,
  addCartLineItem,
  updateCart,
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
  const [step, setStep] = useState<"sync" | "email" | "address" | "shipping" | "pay" | "error">("sync");
  const [cartId, setCartId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState<MedusaAddress>({});
  const [cartForAddress, setCartForAddress] = useState<Awaited<ReturnType<typeof getCartWithPayment>> | null>(null);
  const [cartForPayment, setCartForPayment] = useState<Awaited<ReturnType<typeof getCartWithPayment>> | null>(null);
  const [shippingOptions, setShippingOptionsState] = useState<ShippingOption[]>([]);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [shippingOptionsLoading, setShippingOptionsLoading] = useState(false);

  const initPaymentForCart = useCallback(async (cid: string) => {
    let cart = await getCartWithPayment(cid);
    if (!cart.payment_collection?.id) {
      const { id: pcId } = await createPaymentCollection(cid);
      await initStripePaymentSession(pcId);
      cart = await getCartWithPayment(cid);
    } else if (!cart.payment_collection.payment_sessions?.length) {
      await initStripePaymentSession(cart.payment_collection.id);
      cart = await getCartWithPayment(cid);
    }
    const session = cart.payment_collection?.payment_sessions?.find((s) =>
      s.provider_id.startsWith("pp_stripe_")
    );
    const secret = session?.data?.client_secret;
    if (!secret) {
      setError("Could not initialize Stripe. Check region has Stripe enabled.");
      setStep("error");
      return;
    }
    setCartForPayment(cart);
    setClientSecret(secret);
    setStep("pay");
  }, []);

  const syncCart = useCallback(async () => {
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
      setCartId(newCartId);
      setStep("email");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
      setStep("error");
    }
  }, [items, router]);

  const handleEmailSubmit = useCallback(async () => {
    if (!cartId || !email.trim()) return;
    setEmailLoading(true);
    setError(null);
    try {
      await updateCart(cartId, { email: email.trim() });
      setStep("address");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not set email.");
      setStep("error");
    } finally {
      setEmailLoading(false);
    }
  }, [cartId, email]);

  const handleAddressSubmit = useCallback(async () => {
    if (!cartId) return;
    const rawCountry = (address.country_code || "").trim();
    const addr = {
      first_name: address.first_name || "",
      last_name: address.last_name || "",
      address_1: address.address_1 || "",
      company: address.company || "",
      postal_code: address.postal_code || "",
      city: address.city || "",
      country_code: rawCountry ? rawCountry.toLowerCase() : "",
      province: address.province || "",
      phone: address.phone || "",
    };
    if (!addr.address_1 || !addr.city || !addr.country_code || !addr.postal_code) {
      setError("Please fill in address, city, country and postal code.");
      return;
    }
    setAddressLoading(true);
    setError(null);
    try {
      await updateCart(cartId, { shipping_address: addr, billing_address: addr });
      setStep("shipping");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not set address.");
      setStep("error");
    } finally {
      setAddressLoading(false);
    }
  }, [cartId, address]);

  useEffect(() => {
    if (step === "address" && cartId) {
      getCartWithPayment(cartId).then(setCartForAddress).catch(() => setCartForAddress(null));
    }
  }, [step, cartId]);

  useEffect(() => {
    if (step === "shipping" && cartId) {
      setShippingOptionsLoading(true);
      getShippingOptions(cartId)
        .then((opts) => {
          setShippingOptionsState(opts);
          if (opts.length > 0 && !selectedOptionId) setSelectedOptionId(opts[0].id);
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : "Could not load shipping options.");
          setStep("error");
        })
        .finally(() => setShippingOptionsLoading(false));
    }
  }, [step, cartId]);

  const handleShippingContinue = useCallback(async () => {
    if (!cartId || !selectedOptionId) return;
    setShippingLoading(true);
    setError(null);
    try {
      await addShippingMethodToCart(cartId, selectedOptionId);
      await initPaymentForCart(cartId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not set shipping.");
      setStep("error");
    } finally {
      setShippingLoading(false);
    }
  }, [cartId, selectedOptionId, initPaymentForCart]);

  useEffect(() => {
    if (items.length === 0 && step === "sync") {
      router.replace("/shop");
      return;
    }
    if (step === "sync" && items.length > 0) {
      syncCart();
    }
  }, [items.length, step, router, syncCart]);

  useEffect(() => {
    if (step === "shipping" && shippingOptions.length > 0 && !selectedOptionId) {
      setSelectedOptionId(shippingOptions[0].id);
    }
  }, [step, shippingOptions.length, selectedOptionId]);

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
        <p className="mt-4 text-muted-foreground">Preparing checkout…</p>
      </div>
    );
  }

  if (step === "email" && cartId) {
    return (
      <div className="container mx-auto max-w-xl px-4 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <p className="mt-2 text-muted-foreground">Step 1 of 4 — Email</p>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleEmailSubmit();
          }}
        >
          <div>
            <label htmlFor="checkout-email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              id="checkout-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <Button type="submit" disabled={emailLoading} className="w-full">
            {emailLoading ? "Saving…" : "Continue"}
          </Button>
        </form>
        <p className="mt-6 text-center">
          <Link href="/shop" className="text-sm text-muted-foreground hover:underline">
            ← Back to shop
          </Link>
        </p>
      </div>
    );
  }

  if (step === "address" && cartId) {
    const countries = cartForAddress?.region?.countries ?? [];
    return (
      <div className="container mx-auto max-w-xl px-4 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <p className="mt-2 text-muted-foreground">Step 2 of 4 — Shipping & billing address</p>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddressSubmit();
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="checkout-first-name" className="mb-2 block text-sm font-medium">
                First name
              </label>
              <input
                id="checkout-first-name"
                type="text"
                value={address.first_name ?? ""}
                onChange={(e) => setAddress((a) => ({ ...a, first_name: e.target.value }))}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="checkout-last-name" className="mb-2 block text-sm font-medium">
                Last name
              </label>
              <input
                id="checkout-last-name"
                type="text"
                value={address.last_name ?? ""}
                onChange={(e) => setAddress((a) => ({ ...a, last_name: e.target.value }))}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="checkout-address1" className="mb-2 block text-sm font-medium">
              Address
            </label>
            <input
              id="checkout-address1"
              type="text"
              required
              placeholder="Street address"
              value={address.address_1 ?? ""}
              onChange={(e) => setAddress((a) => ({ ...a, address_1: e.target.value }))}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="checkout-city" className="mb-2 block text-sm font-medium">
              City
            </label>
            <input
              id="checkout-city"
              type="text"
              required
              value={address.city ?? ""}
              onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="checkout-postal" className="mb-2 block text-sm font-medium">
                Postal code
              </label>
              <input
                id="checkout-postal"
                type="text"
                required
                value={address.postal_code ?? ""}
                onChange={(e) => setAddress((a) => ({ ...a, postal_code: e.target.value }))}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="checkout-country" className="mb-2 block text-sm font-medium">
                Country
              </label>
              {countries.length > 0 ? (
                <select
                  id="checkout-country"
                  required
                  value={address.country_code ?? ""}
                  onChange={(e) => setAddress((a) => ({ ...a, country_code: e.target.value }))}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select</option>
                  {countries.map((c) => (
                    <option key={c.iso_2} value={c.iso_2}>
                      {c.display_name ?? c.iso_2}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id="checkout-country"
                  type="text"
                  required
                  placeholder="e.g. US"
                  value={address.country_code ?? ""}
                  onChange={(e) => setAddress((a) => ({ ...a, country_code: e.target.value }))}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              )}
            </div>
          </div>
          <div>
            <label htmlFor="checkout-phone" className="mb-2 block text-sm font-medium">
              Phone (optional)
            </label>
            <input
              id="checkout-phone"
              type="tel"
              value={address.phone ?? ""}
              onChange={(e) => setAddress((a) => ({ ...a, phone: e.target.value }))}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <Button type="submit" disabled={addressLoading} className="w-full">
            {addressLoading ? "Saving…" : "Continue to shipping"}
          </Button>
        </form>
        <p className="mt-6 text-center">
          <Link href="/shop" className="text-sm text-muted-foreground hover:underline">
            ← Back to shop
          </Link>
        </p>
      </div>
    );
  }

  if (step === "shipping" && cartId) {
    return (
      <div className="container mx-auto max-w-xl px-4 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <p className="mt-2 text-muted-foreground">Step 3 of 4 — Shipping method</p>
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
          <h2 className="text-sm font-medium mb-3">Shipping method</h2>
          <p className="text-sm text-muted-foreground mb-3">Choose how you’d like your order delivered.</p>
          <ul className="space-y-2">
            {shippingOptions.map((opt) => (
              <li key={opt.id}>
                <label
                  className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 ${
                    selectedOptionId === opt.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={opt.id}
                    checked={selectedOptionId === opt.id}
                    onChange={() => setSelectedOptionId(opt.id)}
                    className="sr-only"
                  />
                  <span className="flex-1 font-medium">{opt.name ?? "Shipping"}</span>
                  {opt.amount != null && (
                    <span className="text-sm text-muted-foreground">{formatPrice(opt.amount)}</span>
                  )}
                </label>
              </li>
            ))}
          </ul>
          {shippingOptions.length === 0 && !shippingOptionsLoading && (
            <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-3 text-sm text-amber-800 dark:text-amber-200">
              <p className="font-medium">No shipping methods available</p>
              <p className="mt-1 text-muted-foreground">
                The cart requires a shipping method. Add a fulfillment option (e.g. <strong>Local delivery</strong>) for this region in Medusa Admin: Settings → Regions → [your region] → Fulfillment.
              </p>
            </div>
          )}
          <Button
            className="mt-6 w-full"
            onClick={handleShippingContinue}
            disabled={shippingOptions.length === 0 || !selectedOptionId || shippingLoading || shippingOptionsLoading}
          >
            {shippingLoading ? "Continuing…" : shippingOptionsLoading ? "Loading options…" : "Continue to payment"}
          </Button>
        </div>
        <p className="mt-6 text-center">
          <Link href="/shop" className="text-sm text-muted-foreground hover:underline">
            ← Back to shop
          </Link>
        </p>
      </div>
    );
  }

  if (!cartId || !clientSecret) return null;

  return (
    <div className="container mx-auto max-w-xl px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
      <p className="mt-2 text-muted-foreground">Step 4 of 4 — Payment</p>
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
          cart={cartForPayment}
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
