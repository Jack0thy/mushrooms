"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";
import { getSpeciesBySlug } from "@/data/species";
import { useCart } from "@/components/cart/cart-provider";

interface ProductDetailSheetProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailSheet({ product, open, onOpenChange }: ProductDetailSheetProps) {
  const { addItem } = useCart();
  const hasVariants = product.variants && product.variants.length > 1;
  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? product.variants![0] : null
  );
  useEffect(() => {
    if (open && hasVariants) setSelectedVariant(product.variants![0]);
  }, [open, hasVariants, product.variants]);
  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  const variantIdForCart = selectedVariant ? selectedVariant.id : product.variantId;
  const species = product.speciesSlug ? getSpeciesBySlug(product.speciesSlug) : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg border-border/80">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>
        <div className="aspect-[4/3] w-full rounded-md flex items-center justify-center my-4 bg-muted/20 text-muted-foreground/40">
          <span className="text-xs uppercase tracking-wider">Product</span>
        </div>
        {hasVariants && (
          <div className="mb-4">
            <label htmlFor={`detail-variant-${product.id}`} className="text-sm font-medium">
              Size
            </label>
            <select
              id={`detail-variant-${product.id}`}
              value={selectedVariant?.id ?? ""}
              onChange={(e) => {
                const v = product.variants!.find((x) => x.id === e.target.value);
                if (v) setSelectedVariant(v);
              }}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {product.variants!.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.title} — {formatPrice(v.price)}
                </option>
              ))}
            </select>
          </div>
        )}
        <p className="text-lg font-semibold text-foreground">{formatPrice(displayPrice)}</p>

        {species && (
          <>
            <Separator className="my-4" />
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                How to cook it
              </h3>
              <p className="mt-2 text-sm text-foreground">
                {species.cookingSuggestions[0] ?? species.bestForCooking}
              </p>
              <Link
                href={"/mushrooms/" + species.slug}
                className="mt-2 inline-block text-sm text-primary underline-offset-4 hover:underline"
              >
                Full species guide →
              </Link>
            </div>
          </>
        )}

        <Separator className="my-4" />
        <div>
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Storage
          </h3>
          <p className="mt-2 text-sm text-foreground">
            {product.storageNotes ?? (species ? species.storageLifeFridge : "Keep refrigerated in a paper bag. Use within 5–7 days.")}
          </p>
        </div>

        {product.labNotes && (
          <>
            <Separator className="my-4" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Lab notes
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{product.labNotes}</p>
            </div>
          </>
        )}
        {product.shippingPickupNotes && (
          <>
            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground">{product.shippingPickupNotes}</p>
          </>
        )}
        <div className="flex gap-2 pt-4">
          <Button
            className="flex-1"
            disabled={product.stock === "out"}
            onClick={() => {
              addItem(product, 1, variantIdForCart);
              onOpenChange(false);
            }}
          >
            Add to cart
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
