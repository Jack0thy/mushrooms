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
            <p className="font-semibold text-foreground">Cedar Roots Mushrooms</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Local, craft-grown gourmet mushrooms. Fresh for the kitchen, cultures and spawn for growers. Madawaska, Maine.
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Location & hours</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <LocalPickupIcon className="h-4 w-4 shrink-0" />
              Madawaska, Maine. Pickup by appointment; hours TBD.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              <a href="mailto:info@cedarrootsmushrooms.com" className="underline hover:text-foreground">
                info@cedarrootsmushrooms.com
              </a>
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Links</p>
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
            © {new Date().getFullYear()} Cedar Roots Mushrooms. All rights reserved.
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
