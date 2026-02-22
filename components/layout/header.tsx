"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { CartSheet } from "@/components/cart/cart-sheet";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils";

/* Kitchen-first: Shop, Mushrooms primary; Learn secondary; Grow Supplies tertiary */
const navPrimary = [
  { href: "/shop", label: "Shop" },
  { href: "/mushrooms", label: "Species" },
];
const navSecondary = [{ href: "/learn", label: "Learn" }];
const navTertiary = [
  { href: "/shop#grow-supplies", label: "Grow Supplies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
const allNav = [...navPrimary, ...navSecondary, ...navTertiary];

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:h-18">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link
              href="/"
              className="font-serif text-xl font-semibold tracking-tight text-foreground md:text-2xl"
            >
              Ever Again
            </Link>
          </div>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navPrimary.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === href || (href === "/shop" && pathname?.startsWith("/shop"))
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </Link>
            ))}
            {navSecondary.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  pathname === href && "text-foreground"
                )}
              >
                {label}
              </Link>
            ))}
            <span className="text-border">·</span>
            {navTertiary.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm text-muted-foreground transition-colors hover:text-foreground",
                  pathname === href && "text-foreground"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              className="relative rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={"Cart, " + itemCount + " items"}
            >
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </button>
            <Link
              href="/shop"
              className="hidden rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted sm:inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Shop Fresh
            </Link>
          </div>
        </div>
      </header>
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-72 border-border/80">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <nav className="mt-8 flex flex-col gap-1" aria-label="Main navigation">
            {allNav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileNavOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === href ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/shop"
              onClick={() => setMobileNavOpen(false)}
              className="mt-6 block rounded-md bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Shop Fresh
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <CartSheet />
    </>
  );
}
