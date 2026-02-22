"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { CartSheet } from "@/components/cart/cart-sheet";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/shop", label: "Shop" },
  { href: "/mushrooms", label: "Mushrooms" },
  { href: "/shop#grow-supplies", label: "Cultures & Spawn" },
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  useEffect(() => setMounted(true), []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <nav className="mt-6 flex flex-col gap-1" aria-label="Main navigation">
                  {navItems.map(({ href, label }) => (
                    <Link
                      key={href + label}
                      href={href}
                      onClick={() => setMobileNavOpen(false)}
                      className={cn(
                        "block rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted",
                        pathname === href ? "text-primary bg-muted/50" : "text-foreground"
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                  <Link
                    href="/shop"
                    onClick={() => setMobileNavOpen(false)}
                    className="mt-4 block rounded-md bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Shop
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2 font-serif text-lg font-medium text-foreground">
              Ever Again
            </Link>
          </div>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {navItems.map(({ href, label }) => (
              <Link
                key={href + label}
                href={href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  pathname === href ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}
            <button
              type="button"
              onClick={openCart}
              className="relative rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label={"Cart, " + itemCount + " items"}
            >
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </button>
            <Button asChild className="hidden sm:inline-flex" size="sm">
              <Link href="/shop">Shop</Link>
            </Button>
          </div>
        </div>
      </header>
      <CartSheet />
    </>
  );
}
