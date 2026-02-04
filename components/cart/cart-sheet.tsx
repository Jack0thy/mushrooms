"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "./cart-provider";
import { formatPrice } from "@/lib/utils";

export function CartSheet() {
  const { items, isOpen, closeCart, subtotal, itemCount, updateQuantity, removeItem } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Cart {itemCount > 0 ? `(${itemCount})` : ""}</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex justify-between gap-2 border-b border-border pb-3 text-sm">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-muted-foreground">
                      {formatPrice(product.price)} x {quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="rounded border px-2 py-0.5 hover:bg-muted"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="rounded border px-2 py-0.5 hover:bg-muted"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                      aria-label="Remove"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-border pt-4">
            <p className="flex justify-between text-sm font-medium">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </p>
            <Button asChild className="mt-4 w-full">
              <Link href="/checkout" onClick={closeCart}>
                Checkout
              </Link>
            </Button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Checkout is a placeholder. Wire Stripe or Shopify later.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
