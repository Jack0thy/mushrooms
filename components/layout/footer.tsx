import Link from "next/link";
import { LocalPickupIcon } from "@/components/icons";

const footerLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/mushrooms", label: "Mushrooms" },
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/subscribe", label: "Weekly Share" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/shipping", label: "Shipping & Pickup" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-serif text-lg font-medium text-foreground">Ever Again Mushrooms</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Small-batch mushrooms for the kitchen; cultures and spawn for growers. Ottawa Valley.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Location & hours
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <LocalPickupIcon className="h-4 w-4 shrink-0" />
              Ottawa Valley. Pickup in Pembroke; weekly delivery available.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              <a href="mailto:info@everagainmushrooms.com" className="underline hover:text-foreground">
                info@everagainmushrooms.com
              </a>
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Links
            </p>
            <ul className="mt-2 space-y-1">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted-foreground underline hover:text-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ever Again Mushrooms.
          </p>
          <ul className="flex gap-4">
            {legalLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-xs text-muted-foreground underline hover:text-foreground">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
