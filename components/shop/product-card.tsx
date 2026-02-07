"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";
import { SporeCircles } from "@/components/icons";
import { useCart } from "@/components/cart/cart-provider";
import { ProductDetailSheet } from "./product-detail-sheet";
import { useState } from "react";

const stockLabels: Record<string, string> = {
  in_stock: "In stock",
  limited: "Limited",
  out: "Out",
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
      <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
        <div className="aspect-[4/3] bg-muted flex items-center justify-center">
          <SporeCircles className="h-12 w-12 text-muted-foreground/50" />
        </div>
        <CardHeader className="pb-2">
          <p className="text-xs font-medium text-muted-foreground">{stockLabel}</p>
          <h3 className="font-semibold leading-tight">{product.name}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
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
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
            <div className="flex flex-wrap gap-1 pt-1">
              {product.tags.slice(0, 2).map((t) => (
                <Badge key={t} variant="secondary" className="text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>
        <CardFooter className="mt-auto flex items-center justify-between border-t pt-4">
          <span className="font-medium">{formatPrice(displayPrice)}</span>
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
