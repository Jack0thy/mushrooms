/**
 * Client-side Medusa Store API helpers for cart and checkout.
 * Use from browser only (reads NEXT_PUBLIC_* env).
 */

const MEDUSA_BACKEND = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.replace(/\/$/, "");
const MEDUSA_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
const MEDUSA_REGION_ID = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID;

function headers(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY || "",
  };
}

export function isMedusaStoreConfigured(): boolean {
  return Boolean(MEDUSA_BACKEND && MEDUSA_PUBLISHABLE_KEY && MEDUSA_REGION_ID);
}

/** Create a new cart with region. Returns cart id. */
export async function createCart(): Promise<{ id: string }> {
  const res = await fetch(`${MEDUSA_BACKEND}/store/carts`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ region_id: MEDUSA_REGION_ID }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`createCart failed: ${res.status} ${err}`);
  }
  const data = (await res.json()) as { cart: { id: string } };
  return { id: data.cart.id };
}

/** Add a line item to the cart. */
export async function addCartLineItem(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<void> {
  const res = await fetch(`${MEDUSA_BACKEND}/store/carts/${cartId}/line-items`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      variant_id: variantId,
      quantity: Math.max(1, Math.floor(Number(quantity))),
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    let errDetail = text;
    try {
      const json = JSON.parse(text) as { message?: string; code?: string; type?: string };
      if (json.message) errDetail = json.message;
      if (json.code) errDetail = `${json.code}: ${errDetail}`;
    } catch {
      // use raw text
    }
    const hint =
      res.status === 500 && errDetail.toLowerCase().includes("unknown")
        ? " Check Medusa server logs for the real error. Ensure NEXT_PUBLIC_MEDUSA_REGION_ID matches a region with product prices and NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY is linked to your sales channel."
        : "";
    throw new Error(`addCartLineItem failed: ${res.status} ${errDetail}${hint}`);
  }
}

export interface ShippingOption {
  id: string;
  name?: string;
  /** Display amount in cents if present (flat price options) */
  amount?: number;
}

/** List available shipping options for the cart. */
export async function getShippingOptions(cartId: string): Promise<ShippingOption[]> {
  const res = await fetch(
    `${MEDUSA_BACKEND}/store/shipping-options?cart_id=${encodeURIComponent(cartId)}`,
    { headers: headers() }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`getShippingOptions failed: ${res.status} ${err}`);
  }
  const data = await res.json();
  const list = Array.isArray(data) ? data : (data as { shipping_options?: ShippingOption[] }).shipping_options;
  return list ?? [];
}

/** Add a shipping method to the cart (required before complete). */
export async function addShippingMethodToCart(cartId: string, optionId: string): Promise<void> {
  const res = await fetch(`${MEDUSA_BACKEND}/store/carts/${cartId}/shipping-methods`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ option_id: optionId }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`addShippingMethodToCart failed: ${res.status} ${err}`);
  }
}

/** Get cart with payment_collection and payment_sessions (for client_secret). */
export async function getCartWithPayment(cartId: string): Promise<MedusaCart> {
  const res = await fetch(`${MEDUSA_BACKEND}/store/carts/${cartId}`, {
    headers: headers(),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`getCart failed: ${res.status} ${err}`);
  }
  const data = (await res.json()) as { cart: MedusaCart };
  return data.cart;
}

export interface MedusaAddress {
  first_name?: string;
  last_name?: string;
  address_1?: string;
  address_2?: string;
  company?: string;
  postal_code?: string;
  city?: string;
  country_code?: string;
  province?: string;
  phone?: string;
}

export interface MedusaCart {
  id: string;
  email?: string;
  shipping_address?: MedusaAddress | null;
  billing_address?: MedusaAddress | null;
  region?: {
    id: string;
    countries?: Array<{ iso_2: string; display_name?: string }>;
  };
  payment_collection?: {
    id: string;
    payment_sessions?: Array<{
      provider_id: string;
      data?: { client_secret?: string };
    }>;
  } | null;
}

/** Update cart (email, shipping_address, billing_address). */
export async function updateCart(
  cartId: string,
  payload: { email?: string; shipping_address?: MedusaAddress; billing_address?: MedusaAddress }
): Promise<{ id: string }> {
  const res = await fetch(`${MEDUSA_BACKEND}/store/carts/${cartId}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`updateCart failed: ${res.status} ${err}`);
  }
  const data = (await res.json()) as { cart: { id: string } };
  return { id: data.cart.id };
}

/** Create a payment collection for the cart. */
export async function createPaymentCollection(cartId: string): Promise<{ id: string }> {
  const res = await fetch(`${MEDUSA_BACKEND}/store/payment-collections`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ cart_id: cartId }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`createPaymentCollection failed: ${res.status} ${err}`);
  }
  const data = (await res.json()) as { payment_collection: { id: string } };
  return { id: data.payment_collection.id };
}

/** Initialize a Stripe payment session. Provider id: pp_stripe_stripe */
export async function initStripePaymentSession(
  paymentCollectionId: string
): Promise<void> {
  const res = await fetch(
    `${MEDUSA_BACKEND}/store/payment-collections/${paymentCollectionId}/payment-sessions`,
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ provider_id: "pp_stripe_stripe" }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`initStripePaymentSession failed: ${res.status} ${err}`);
  }
}

/** Complete the cart and place the order. */
export async function completeCart(
  cartId: string
): Promise<{ type: "cart"; cart?: unknown; error?: string } | { type: "order"; order: unknown }> {
  const res = await fetch(`${MEDUSA_BACKEND}/store/carts/${cartId}/complete`, {
    method: "POST",
    headers: headers(),
  });
  const data = (await res.json()) as
    | { type: "cart"; cart?: unknown; error?: string }
    | { type: "order"; order: unknown }
    | { message?: string; code?: string };
  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && "message" in data && data.message) ||
      (data && typeof data === "object" && "error" in data && (data as { error?: string }).error) ||
      res.statusText;
    const code = data && typeof data === "object" && "code" in data ? ` (${(data as { code?: string }).code})` : "";
    throw new Error(`completeCart failed: ${res.status} ${msg}${code}`);
  }
  return data as { type: "cart"; cart?: unknown; error?: string } | { type: "order"; order: unknown };
}
