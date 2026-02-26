"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";
import { useCart } from "@/components/cart/cart-provider";
import { ProductDetailSheet } from "./product-detail-sheet";
import { useState } from "react";

const stockLabels: Record<string, string> = {
  in_stock: "In stock",
  limited: "Limited",
  out: "Back next week",
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [detailOpen, setDetailOpen] = useState(false);
  const hasVariants = product.variants && product.variants.length > 1;
  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? product.variants![0] : null
  );
  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  const variantIdForCart = selectedVariant ? selectedVariant.id : product.variantId;
  const stockLabel = stockLabels[product.stock] ?? product.stock;

  return (
    <>
      <Card className="flex h-full flex-col overflow-hidden border-border/80 bg-card transition-shadow hover:shadow-sm">
        <div className="aspect-[4/3] overflow-hidden bg-muted/20">
          <img
            // src={getProductImage(product.speciesSlug)}
            alt=""
            className="h-full w-full object-cover"
            width={800}
            height={600}
          />
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium leading-tight text-foreground">{product.name}</h3>
            <span className="shrink-0 rounded border border-border/80 px-2 py-0.5 text-xs text-muted-foreground">
              {stockLabel}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
          {hasVariants && (
            <div className="pt-2">
              <label htmlFor={`variant-${product.id}`} className="sr-only">
                Size
              </label>
              <select
                id={`variant-${product.id}`}
                value={selectedVariant?.id ?? ""}
                onChange={(e) => {
                  const v = product.variants!.find((x) => x.id === e.target.value);
                  if (v) setSelectedVariant(v);
                }}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {product.variants!.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.title} — {formatPrice(v.price)}
                  </option>
                ))}
              </select>
            </div>
          )}
          {product.tags.length > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              {product.tags.slice(0, 3).join(" · ")}
            </p>
          )}
        </CardHeader>
        <CardFooter className="mt-auto flex items-center justify-between border-t border-border/80 pt-4">
          <span className="font-medium text-foreground">{formatPrice(displayPrice)}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setDetailOpen(true)}>
              Details
            </Button>
            <Button
              size="sm"
              disabled={product.stock === "out"}
              onClick={() => addItem(product, 1, variantIdForCart)}
            >
              Add to cart
            </Button>
          </div>
        </CardFooter>
      </Card>
      <ProductDetailSheet product={product} open={detailOpen} onOpenChange={setDetailOpen} />
    </>
  );
}
