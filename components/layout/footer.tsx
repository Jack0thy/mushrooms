import Link from "next/link";

const mainLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/mushrooms", label: "Species" },
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/shipping", label: "Shipping & Pickup" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-muted/20">
      <div className="container mx-auto max-w-5xl px-4 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-serif text-lg font-semibold text-foreground">Cedar Roots Mushrooms</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Ottawa Valley. Weekly harvest drops. Local pickup and delivery.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <a
                href="mailto:info@cedarrootsmushrooms.com"
                className="underline underline-offset-2 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                info@cedarrootsmushrooms.com
              </a>
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Footer navigation">
            {mainLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border/80 pt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Cedar Roots Mushrooms.
          </p>
          <ul className="flex gap-6">
            {legalLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
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
