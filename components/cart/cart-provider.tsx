"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export interface CartItem {
  product: Product;
  quantity: number;
  /** When product has variants (e.g. size), which variant was added */
  variantId?: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variantId?: string) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product, quantity = 1, variantId?: string) => {
    setItems((prev) => {
      const key = (id: string, vid?: string) => `${id}:${vid ?? ""}`;
      const existing = prev.find(
        (i) => key(i.product.id, i.variantId) === key(product.id, variantId)
      );
      if (existing) {
        return prev.map((i) =>
          key(i.product.id, i.variantId) === key(product.id, variantId)
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity, variantId }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && (i.variantId ?? "") === (variantId ?? ""))
      )
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && (i.variantId ?? "") === (variantId ?? "")
          ? { ...i, quantity }
          : i
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const getItemPrice = (item: CartItem) => {
    if (item.variantId && item.product.variants) {
      return item.product.variants.find((v) => v.id === item.variantId)?.price ?? item.product.price;
    }
    return item.product.price;
  };
  const subtotal = items.reduce((sum, i) => sum + getItemPrice(i) * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function useCartSubtotal() {
  return useCart().subtotal;
}

export function formatCartPrice(cents: number) {
  return formatPrice(cents);
}

/** Price for one unit of this cart line (respects variant). */
export function getCartItemPrice(item: CartItem): number {
  if (item.variantId && item.product.variants) {
    return item.product.variants.find((v) => v.id === item.variantId)?.price ?? item.product.price;
  }
  return item.product.price;
}

/** Display name for cart line (includes variant title when present). */
export function getCartItemDisplayName(item: CartItem): string {
  if (item.variantId && item.product.variants) {
    const title = item.product.variants.find((v) => v.id === item.variantId)?.title;
    return title ? `${item.product.name} — ${title}` : item.product.name;
  }
  return item.product.name;
}
