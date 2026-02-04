"use client";

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
import { useCart } from "@/components/cart/cart-provider";
import { SporeCircles } from "@/components/icons";

interface ProductDetailSheetProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailSheet({ product, open, onOpenChange }: ProductDetailSheetProps) {
  const { addItem } = useCart();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>
        <div className="aspect-[4/3] w-full bg-muted rounded-md flex items-center justify-center my-4">
          <SporeCircles className="h-16 w-16 text-muted-foreground/50" />
        </div>
        <p className="text-lg font-semibold">{formatPrice(product.price)}</p>
        {product.storageNotes && (
          <>
            <Separator />
            <div>
              <p className="text-sm font-medium">Storage & care</p>
              <p className="text-sm text-muted-foreground">{product.storageNotes}</p>
            </div>
          </>
        )}
        {product.labNotes && (
          <>
            <Separator />
            <div>
              <p className="text-sm font-medium">Lab notes</p>
              <p className="text-sm text-muted-foreground">{product.labNotes}</p>
            </div>
          </>
        )}
        {product.shippingPickupNotes && (
          <>
            <Separator />
            <p className="text-sm text-muted-foreground">{product.shippingPickupNotes}</p>
          </>
        )}
        <div className="flex gap-2 pt-4">
          <Button
            className="flex-1"
            disabled={product.stock === "out"}
            onClick={() => {
              addItem(product, 1);
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
